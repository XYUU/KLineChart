/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ChartData from '../data/ChartData'
import { createTechnicalIndicatorInfo } from '../data/store/TechnicalIndicatorStore'

import CandlePane from './CandlePane'
import XAxisPane from './XAxisPane'

import { YAxisPosition } from '../data/options/styleOptions'
import { isArray, isBoolean, isFunction, isValid, isNumber } from '../utils/typeChecks'
import { formatValue } from '../utils/format'
import TechnicalIndicatorPane from './TechnicalIndicatorPane'
import SeparatorPane from './SeparatorPane'

import ChartEvent from '../event/ChartEvent'
import { getPixelRatio } from '../utils/canvas'
import { throttle } from '../utils/performance'
import { createElement } from '../utils/element'
import Annotation from '../component/overlay/Annotation'
import Tag from '../component/overlay/Tag'
import { perfectOverlayFunc } from '../component/overlay/Overlay'

import {
  CANDLE_PANE_ID,
  DEFAULT_TECHNICAL_INDICATOR_PANE_HEIGHT,
  TECHNICAL_INDICATOR_PANE_ID_PREFIX,
  GRAPHIC_MARK_ID_PREFIX,
  ActionType, InvalidateLevel
} from '../data/constants'

export default class ChartPane {
  constructor (container, styleOptions) {
    this._initChartContainer(container)
    this._graphicMarkBaseId = 0
    this._paneBaseId = 0
    this._separatorDragStartTopPaneHeight = 0
    this._separatorDragStartBottomPaneHeight = 0
    this._chartData = new ChartData(styleOptions, {
      invalidate: this._invalidatePane.bind(this),
      crosshair: this._crosshairObserver.bind(this)
    })
    this._xAxisPane = new XAxisPane({ container: this._chartContainer, chartData: this._chartData })
    this._panes = new Map([[CANDLE_PANE_ID, new CandlePane({
      container: this._chartContainer,
      chartData: this._chartData,
      xAxis: this._xAxisPane.xAxis(),
      id: CANDLE_PANE_ID
    })]])
    this._separators = new Map()
    this._chartWidth = {}
    this._chartHeight = {}
    this._chartEvent = new ChartEvent(this._chartContainer, this._chartData)
    this.adjustPaneViewport(true, true, true)
  }

  /**
   * 初始化图表容器
   * @param container
   * @private
   */
  _initChartContainer (container) {
    this._container = container
    this._chartContainer = createElement('div', {
      userSelect: 'none',
      webkitUserSelect: 'none',
      msUserSelect: 'none',
      MozUserSelect: 'none',
      webkitTapHighlightColor: 'transparent',
      position: 'relative',
      outline: 'none',
      borderStyle: 'none',
      width: '100%',
      cursor: 'crosshair'
    })
    this._chartContainer.tabIndex = 1
    container.appendChild(this._chartContainer)
  }

  /**
   * 十字光标观察者
   * @private
   */
  _crosshairObserver ({ dataIndex, kLineData, x, y }) {
    if (this.chartData().actionStore().has(ActionType.CROSSHAIR)) {
      const technicalIndicatorData = {}
      this._panes.forEach((pane, id) => {
        const data = {}
        pane.technicalIndicators().forEach(tech => {
          const result = tech.result
          data[tech.name] = result[dataIndex]
        })
        technicalIndicatorData[id] = data
      })
      this._chartData.actionStore().execute(ActionType.CROSSHAIR, {
        coordinate: { x, y },
        dataIndex,
        kLineData,
        technicalIndicatorData
      })
    }
  }

  /**
   * 分割线拖拽开始
   * @param topPaneId
   * @param bottomPaneId
   * @private
   */
  _separatorStartDrag (topPaneId, bottomPaneId) {
    this._separatorDragStartTopPaneHeight = this._panes.get(topPaneId).height()
    this._separatorDragStartBottomPaneHeight = this._panes.get(bottomPaneId).height()
  }

  /**
   * 分割线拖拽
   * @param dragDistance
   * @param topPaneId
   * @param bottomPaneId
   * @private
   */
  _separatorDrag (dragDistance, topPaneId, bottomPaneId) {
    let topPaneHeight = this._separatorDragStartTopPaneHeight + dragDistance
    let bottomPaneHeight = this._separatorDragStartBottomPaneHeight - dragDistance
    if (topPaneHeight > this._separatorDragStartTopPaneHeight + this._separatorDragStartBottomPaneHeight) {
      topPaneHeight = this._separatorDragStartTopPaneHeight + this._separatorDragStartBottomPaneHeight
      bottomPaneHeight = 0
    }
    if (topPaneHeight < 0) {
      topPaneHeight = 0
      bottomPaneHeight = this._separatorDragStartTopPaneHeight + this._separatorDragStartBottomPaneHeight
    }
    this._panes.get(topPaneId).setHeight(topPaneHeight)
    this._panes.get(bottomPaneId).setHeight(bottomPaneHeight)
    this._chartData.actionStore().execute(ActionType.PANE_DRAG, { topPaneId, bottomPaneId, topPaneHeight, bottomPaneHeight })
    this.adjustPaneViewport(true, true, true, true, true)
  }

  /**
   * 更新所有pane
   * @private
   */
  _invalidatePane (invalidateLevel = InvalidateLevel.FULL) {
    if (invalidateLevel === InvalidateLevel.OVERLAY) {
      this._xAxisPane.invalidate(invalidateLevel)
      this._panes.forEach((pane) => {
        pane.invalidate(invalidateLevel)
      })
    } else {
      let shouldMeasureWidth = false
      this._panes.forEach((pane) => {
        const should = pane.yAxis().computeAxis()
        if (should) {
          shouldMeasureWidth = should
        }
      })
      this.adjustPaneViewport(false, shouldMeasureWidth, true)
    }
  }

  /**
   * 计算所有pane的指标
   * @private
   */
  _calcAllPaneTechnicalIndicator () {
    const tasks = []
    this._panes.forEach(pane => {
      tasks.push(
        Promise.resolve(pane.calcAllTechnicalIndicator())
      )
    })
    Promise.all(tasks).then(
      result => {
        const shouldMeasureWidth = result.indexOf(true) > -1
        this.adjustPaneViewport(false, shouldMeasureWidth, true)
      }
    )
  }

  /**
   * 测量pane高度
   * @private
   */
  _measurePaneHeight () {
    const styleOptions = this._chartData.styleOptions()
    const paneHeight = this._container.offsetHeight
    const separatorSize = styleOptions.separator.size
    const separatorTotalHeight = separatorSize * this._separators.size
    const xAxisHeight = this._xAxisPane.xAxis().getSelfHeight()
    const paneExcludeXAxisSeparatorHeight = paneHeight - xAxisHeight - separatorTotalHeight
    let techPaneTotalHeight = 0
    this._panes.forEach(pane => {
      if (pane.id() !== CANDLE_PANE_ID) {
        const paneHeight = pane.height()
        if (techPaneTotalHeight + paneHeight > paneExcludeXAxisSeparatorHeight) {
          pane.setHeight(paneExcludeXAxisSeparatorHeight - techPaneTotalHeight)
          techPaneTotalHeight = paneExcludeXAxisSeparatorHeight
        } else {
          techPaneTotalHeight += paneHeight
        }
      }
    })

    const candlePaneHeight = paneExcludeXAxisSeparatorHeight - techPaneTotalHeight

    const paneContentSize = {}
    paneContentSize[CANDLE_PANE_ID] = { contentTop: 0, contentBottom: candlePaneHeight }
    let contentTop = candlePaneHeight
    let contentBottom = candlePaneHeight
    this._panes.get(CANDLE_PANE_ID).setHeight(candlePaneHeight)
    this._chartHeight[CANDLE_PANE_ID] = candlePaneHeight
    this._panes.forEach(pane => {
      if (pane.id() !== CANDLE_PANE_ID) {
        const paneHeight = pane.height()
        contentBottom += (paneHeight + separatorSize)
        paneContentSize[pane.id()] = { contentTop, contentBottom }
        this._chartHeight[pane.id()] = paneHeight
        contentTop = contentBottom
      }
    })
    this._xAxisPane.setHeight(xAxisHeight)
    this._chartHeight.xAxis = xAxisHeight
    this._chartHeight.total = paneHeight
    this._chartEvent.setPaneContentSize(paneContentSize)
    this._chartEvent.setChartContentTopBottom({ contentTop: 0, contentBottom })
  }

  /**
   * 测量pan宽度
   * @private
   */
  _measurePaneWidth () {
    const styleOptions = this._chartData.styleOptions()
    const yAxisOptions = styleOptions.yAxis
    const isYAxisLeft = yAxisOptions.position === YAxisPosition.LEFT
    const isOutside = !yAxisOptions.inside
    const paneWidth = this._container.offsetWidth
    let mainWidth
    let yAxisWidth = Number.MIN_SAFE_INTEGER
    let yAxisOffsetLeft
    let mainOffsetLeft
    if (isOutside) {
      this._panes.forEach(pane => {
        yAxisWidth = Math.max(yAxisWidth, pane.yAxis().getSelfWidth())
      })
      mainWidth = paneWidth - yAxisWidth
      if (isYAxisLeft) {
        yAxisOffsetLeft = 0
        mainOffsetLeft = yAxisWidth
      } else {
        mainOffsetLeft = 0
        yAxisOffsetLeft = paneWidth - yAxisWidth
      }
    } else {
      mainWidth = paneWidth
      yAxisWidth = paneWidth
      yAxisOffsetLeft = 0
      mainOffsetLeft = 0
    }

    this._chartData.timeScaleStore().setTotalDataSpace(mainWidth)

    this._panes.forEach((pane, paneId) => {
      pane.setWidth(mainWidth, yAxisWidth)
      pane.setOffsetLeft(mainOffsetLeft, yAxisOffsetLeft)
      const separator = this._separators.get(paneId)
      separator && separator.setSize(mainOffsetLeft, mainWidth)
    })
    this._chartWidth = { content: mainWidth, yAxis: yAxisWidth, total: paneWidth }
    this._xAxisPane.setWidth(mainWidth, yAxisWidth)
    this._xAxisPane.setOffsetLeft(mainOffsetLeft, yAxisOffsetLeft)
    this._chartEvent.setChartContentLeftRight({ contentLeft: mainOffsetLeft, contentRight: mainOffsetLeft + mainWidth })
  }

  /**
   * 调整窗口尺寸
   * @param shouldMeasureHeight
   * @param shouldMeasureWidth
   * @param shouldLayout
   * @param shouldComputeAxis
   * @param shouldForceComputeAxis
   */
  adjustPaneViewport (
    shouldMeasureHeight, shouldMeasureWidth, shouldLayout, shouldComputeAxis, shouldForceComputeAxis
  ) {
    if (shouldMeasureHeight) {
      this._measurePaneHeight()
    }
    let isAdjust = false
    if (shouldComputeAxis) {
      this._panes.forEach(pane => {
        const adjust = pane.yAxis().computeAxis(shouldForceComputeAxis)
        if (!isAdjust) {
          isAdjust = adjust
        }
      })
    }
    if ((!shouldComputeAxis && shouldMeasureWidth) || (shouldComputeAxis && isAdjust)) {
      this._measurePaneWidth()
    }
    if (shouldLayout) {
      this._xAxisPane.xAxis().computeAxis(true)
      this._xAxisPane.layout()
      this._panes.forEach(pane => {
        pane.layout()
      })
    }
  }

  /**
   * 窗口是否存在
   * @param paneId
   * @return {boolean}
   */
  hasPane (paneId) {
    return this._panes.has(paneId)
  }

  /**
   * 获取图表上的数据
   * @returns {ChartData}
   */
  chartData () {
    return this._chartData
  }

  /**
   * 覆盖技术指标
   * @param templateInstance
   * @param name
   * @param calcParams
   * @param precision
   * @param shouldOhlc
   * @param shouldFormatBigNumber
   * @param styles
   * @param paneId
   */
  overrideTechnicalIndicator (templateInstance, { name, calcParams, precision, shouldOhlc, shouldFormatBigNumber, styles }, paneId) {
    const defaultTechStyleOptions = this._chartData.styleOptions().technicalIndicator
    let panes = new Map()
    if (isValid(paneId)) {
      if (this._panes.has(paneId)) {
        panes.set(paneId, this._panes.get(paneId))
      }
    } else {
      templateInstance.setCalcParams(calcParams)
      templateInstance.setPrecision(precision)
      templateInstance.setShouldOhlc(shouldOhlc)
      templateInstance.setShouldFormatBigNumber(shouldFormatBigNumber)
      templateInstance.setStyles(styles, defaultTechStyleOptions)
      panes = this._panes
    }
    if (panes.size > 0) {
      let shouldAdjust = false
      const tasks = []
      panes.forEach(pane => {
        const techs = pane.technicalIndicators()
        if (techs.has(name)) {
          const tech = techs.get(name)
          const calcParamsSuccess = tech.setCalcParams(calcParams)
          const precisionSuccess = tech.setPrecision(precision)
          const shouldOhlcSuccess = tech.setShouldOhlc(shouldOhlc)
          const shouldFormatBigNumberSuccess = tech.setShouldFormatBigNumber(shouldFormatBigNumber)
          const styleSuccess = tech.setStyles(styles, defaultTechStyleOptions)
          if (calcParamsSuccess || precisionSuccess || shouldOhlcSuccess || shouldFormatBigNumberSuccess || styleSuccess) {
            shouldAdjust = true
          }
          if (calcParamsSuccess) {
            tasks.push(
              Promise.resolve(pane.calcTechnicalIndicator(tech))
            )
          }
        }
      })
      if (shouldAdjust) {
        Promise.all(tasks).then(
          _ => {
            this.adjustPaneViewport(false, true, true, true)
          }
        )
      }
    }
  }

  /**
   * 处理数组数据
   * @param dataList
   * @param more
   * @param extendFun
   * @private
   */
  _applyDataList (dataList, more, extendFun) {
    if (isArray(dataList)) {
      if (isFunction(extendFun)) {
        extendFun()
      }
      this._chartData.addData(dataList, 0, more)
      this._calcAllPaneTechnicalIndicator()
    }
  }

  /**
   * 添加新数据
   * @param dataList
   * @param more
   */
  applyNewData (dataList, more) {
    this._applyDataList(dataList, more, () => {
      this._chartData.clearDataList()
    })
  }

  /**
   * 添加更多数据
   * @param dataList
   * @param more
   */
  applyMoreData (dataList, more) {
    this._applyDataList(dataList, more)
  }

  /**
   * 更新数据
   * @param data
   */
  updateData (data) {
    const dataList = this._chartData.dataList()
    const dataSize = dataList.length
    // 这里判断单个数据应该添加到哪个位置
    const timestamp = formatValue(data, 'timestamp', 0)
    const lastDataTimestamp = formatValue(dataList[dataSize - 1], 'timestamp', 0)
    if (timestamp >= lastDataTimestamp) {
      let pos = dataSize
      if (timestamp === lastDataTimestamp) {
        pos = dataSize - 1
      }
      this._chartData.addData(data, pos)
      this._calcAllPaneTechnicalIndicator()
    }
  }

  /**
   * 移除指标
   * @param paneId
   * @param name
   */
  removeTechnicalIndicator (paneId, name) {
    if (paneId === CANDLE_PANE_ID) {
      if (this._panes.get(CANDLE_PANE_ID).removeTechnicalIndicator(name)) {
        this.adjustPaneViewport(false, true, true, true)
      }
    } else {
      const pane = this._panes.get(paneId)
      const removed = pane.removeTechnicalIndicator(name)
      if (pane.isEmptyTechnicalIndicator()) {
        pane.destroy()
        const deleteSeparatorTopPaneId = this._separators.get(paneId).topPaneId()
        this._separators.get(paneId).destroy()
        this._panes.delete(paneId)
        this._separators.delete(paneId)
        this._separators.forEach(separator => {
          const topPaneId = separator.topPaneId()
          if (!this._separators.has(topPaneId)) {
            separator.updatePaneId(deleteSeparatorTopPaneId)
          }
        })
        this.adjustPaneViewport(true, true, true, true, true)
      } else {
        if (removed) {
          this.adjustPaneViewport(false, true, true, true)
        }
      }
    }
  }

  /**
   * 设置指标类型
   * @param tech 技术指标实例
   * @param isStack 是否叠加
   * @param options 配置
   */
  createTechnicalIndicator (tech, isStack, options = {}) {
    if (this._panes.has(options.id)) {
      this.setPaneOptions(options, this._panes.get(options.id).setTechnicalIndicator(tech, isStack))
      return options.id
    }
    const id = options.id || `${TECHNICAL_INDICATOR_PANE_ID_PREFIX}${++this._paneBaseId}`
    const dragEnabled = isBoolean(options.dragEnabled) ? options.dragEnabled : true
    this._separators.set(id, new SeparatorPane(
      this._chartContainer,
      this._chartData,
      Array.from(this._panes.keys()).pop(),
      id,
      dragEnabled,
      {
        startDrag: this._separatorStartDrag.bind(this),
        drag: throttle(this._separatorDrag.bind(this), 50)
      }
    ))
    this._panes.set(id,
      new TechnicalIndicatorPane({
        container: this._chartContainer,
        chartData: this._chartData,
        xAxis: this._xAxisPane.xAxis(),
        technicalIndicatorName: tech.name,
        id,
        height: options.height || DEFAULT_TECHNICAL_INDICATOR_PANE_HEIGHT
      })
    )
    this.adjustPaneViewport(true, true, true, true, true)
    return id
  }

  /**
   * 获取窗口技术指标
   * @param paneId
   * @param name
   * @return {{}}
   */
  getPaneTechnicalIndicator (paneId, name) {
    const technicalIndicatorInfo = (pane) => {
      const paneTechs = {}
      const techs = pane.technicalIndicators()
      for (const tech of techs) {
        const techInfo = createTechnicalIndicatorInfo(tech)
        if (tech.name === name) {
          return techInfo
        }
        paneTechs[tech.name] = techInfo
      }
      return paneTechs
    }

    if (isValid(paneId)) {
      if (this._panes.has(paneId)) {
        return technicalIndicatorInfo(this._panes.get(paneId))
      }
    } else {
      const techs = {}
      this._panes.forEach(pane => {
        techs[pane.id()] = technicalIndicatorInfo(pane)
      })
      return techs
    }
    return {}
  }

  /**
   * 创建图形标记
   * @param GraphicMarkTemplateClass
   * @param graphicMark
   */
  createGraphicMark (GraphicMarkTemplateClass, graphicMark) {
    const {
      id, points, styles, lock,
      onDrawStart, onDrawing,
      onDrawEnd, onClick,
      onRightClick, onPressedMove,
      onMouseEnter, onMouseLeave,
      onRemove
    } = graphicMark
    const graphicMarkId = id || `${GRAPHIC_MARK_ID_PREFIX}${++this._graphicMarkBaseId}`
    const graphicMarkInstance = new GraphicMarkTemplateClass({
      id: graphicMarkId,
      chartData: this._chartData,
      xAxis: this._xAxisPane.xAxis(),
      yAxis: this._panes.get(CANDLE_PANE_ID).yAxis(),
      points,
      styles,
      lock
    })
    if (isFunction(onDrawStart)) {
      onDrawStart({ id: graphicMarkId })
    }
    perfectOverlayFunc(graphicMarkInstance, [
      onDrawing, onDrawEnd, onClick, onRightClick,
      onPressedMove, onMouseEnter, onMouseLeave, onRemove
    ])
    if (this._chartData.graphicMarkStore().addInstance(graphicMarkInstance)) {
      return graphicMarkId
    }
  }

  /**
   * 创建注解
   * @param annotations
   * @param paneId
   */
  createAnnotation (annotations, paneId) {
    const instances = []
    annotations.forEach(({
      point,
      styles,
      checkEventCoordinateOnCustomSymbol,
      drawCustomSymbol,
      drawExtend,
      onClick,
      onRightClick,
      onMouseEnter,
      onMouseLeave
    }) => {
      if (point && point.timestamp) {
        const annotationInstance = new Annotation({
          id: point.timestamp,
          chartData: this._chartData,
          point,
          xAxis: this._xAxisPane.xAxis(),
          yAxis: this._panes.get(paneId).yAxis(),
          styles
        })

        perfectOverlayFunc(annotationInstance, [
          drawExtend, drawCustomSymbol, checkEventCoordinateOnCustomSymbol,
          onClick, onRightClick, onMouseEnter, onMouseLeave
        ])
        instances.push(annotationInstance)
      }
    })
    if (instances.length > 0) {
      this._chartData.annotationStore().add(instances, paneId)
    }
  }

  /**
   * 创建标签
   * @param tags
   * @param paneId
   */
  createTag (tags, paneId) {
    const instances = []
    let shouldUpdate = false
    let shouldAdd = false
    tags.forEach(({ id, point, text, mark, styles }) => {
      if (isValid(id)) {
        if (this._chartData.tagStore().has(id, paneId)) {
          const updateSuccess = this._chartData.tagStore().update(id, paneId, { point, text, mark, styles })
          if (!shouldUpdate) {
            shouldUpdate = updateSuccess
          }
        } else {
          shouldAdd = true
          instances.push(new Tag({
            id,
            point,
            text,
            mark,
            styles,
            chartData: this._chartData,
            xAxis: this._xAxisPane.xAxis(),
            yAxis: this._panes.get(paneId).yAxis()
          }))
        }
      }
    })
    if (shouldAdd) {
      this._chartData.tagStore().add(instances, paneId)
    } else {
      if (shouldUpdate) {
        this._invalidatePane(InvalidateLevel.OVERLAY)
      }
    }
  }

  /**
   * 设置窗体参数
   * @param options
   * @param forceShouldAdjust
   */
  setPaneOptions (options, forceShouldAdjust) {
    let shouldAdjust = forceShouldAdjust
    let shouldMeasureHeight = false
    if (options.id !== CANDLE_PANE_ID) {
      const pane = this._panes.get(options.id)
      if (pane) {
        if (isNumber(options.height) && options.height > 0 && pane.height() !== options.height) {
          shouldAdjust = true
          pane.setHeight(options.height)
          shouldMeasureHeight = true
        }
        if (isBoolean(options.dragEnabled)) {
          this._separators.get(options.id).setDragEnabled(options.dragEnabled)
        }
      }
    }
    if (shouldAdjust) {
      this.adjustPaneViewport(shouldMeasureHeight, true, true, true, true)
    }
  }

  /**
   * 设置时区
   * @param timezone
   */
  setTimezone (timezone) {
    this._chartData.timeScaleStore.setTimezone(timezone)
    this._xAxisPane.xAxis().computeAxis(true)
    this._xAxisPane.invalidate(InvalidateLevel.FULL)
  }

  /**
   * 将值装换成像素
   * @param timestamp
   * @param point
   * @param paneId
   * @param absoluteYAxis
   */
  convertToPixel (point, { paneId = CANDLE_PANE_ID, absoluteYAxis }) {
    const points = [].concat(point)
    let coordinates = []
    const separatorSize = this._chartData.styleOptions().separator.size
    let absoluteTop = 0
    const panes = this._panes.values()
    for (const pane of panes) {
      if (pane.id() === paneId) {
        coordinates = points.map(({ timestamp, dataIndex, value }) => {
          const coordinate = {}
          let index = dataIndex
          if (isValid(timestamp)) {
            index = this._chartData.timeScaleStore().timestampToDataIndex(timestamp)
          }
          if (isValid(index)) {
            coordinate.x = this._xAxisPane.xAxis().convertToPixel(index)
          }
          if (isValid(value)) {
            const y = pane.yAxis().convertToPixel(value)
            coordinate.y = absoluteYAxis ? absoluteTop + y : y
          }
          return coordinate
        })
        break
      }
      absoluteTop += (pane.height() + separatorSize)
    }
    return isArray(point) ? coordinates : (coordinates[0] || {})
  }

  /**
   * 将像素转换成值
   * @param coordinate
   * @param paneId
   * @param dataIndexXAxis
   * @param absoluteYAxis
   * @return {{}[]|*[]}
   */
  convertFromPixel (coordinate, { paneId = CANDLE_PANE_ID, absoluteYAxis }) {
    const coordinates = [].concat(coordinate)
    let points = []
    const separatorSize = this._chartData.styleOptions().separator.size
    let absoluteTop = 0
    const panes = this._panes.values()
    for (const pane of panes) {
      if (pane.id() === paneId) {
        points = coordinates.map(({ x, y }) => {
          const point = {}
          if (isValid(x)) {
            point.dataIndex = this._xAxisPane.xAxis().convertFromPixel(x)
            point.timestamp = this._chartData.timeScaleStore().dataIndexToTimestamp(point.dataIndex)
          }
          if (isValid(y)) {
            const ry = absoluteYAxis ? y - absoluteTop : y
            point.value = pane.yAxis().convertFromPixel(ry)
          }
          return point
        })
        break
      }
      absoluteTop += pane.height() + separatorSize
    }
    return isArray(coordinate) ? points : (points[0] || {})
  }

  /**
   * 图表宽度
   * @return {*|{}}
   */
  chartWidth () {
    return this._chartWidth
  }

  /**
   * 图表高度
   * @return {*|{}}
   */
  chartHeight () {
    return this._chartHeight
  }

  /**
   * 获取图表转换为图片后url
   * @param includeOverlay,
   * @param type
   * @param backgroundColor
   */
  getConvertPictureUrl (includeOverlay, type, backgroundColor) {
    const width = this._chartContainer.offsetWidth
    const height = this._chartContainer.offsetHeight
    const canvas = createElement('canvas', {
      width: `${width}px`,
      height: `${height}px`
    })
    const ctx = canvas.getContext('2d')
    const pixelRatio = getPixelRatio(canvas)
    canvas.width = width * pixelRatio
    canvas.height = height * pixelRatio
    ctx.scale(pixelRatio, pixelRatio)

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    let offsetTop = 0
    this._panes.forEach((pane, paneId) => {
      if (paneId !== CANDLE_PANE_ID) {
        const separator = this._separators.get(paneId)
        ctx.drawImage(
          separator.getImage(),
          0, offsetTop, width, separator.height()
        )
        offsetTop += separator.height()
      }
      ctx.drawImage(
        pane.getImage(includeOverlay),
        0, offsetTop, width, pane.height()
      )
      offsetTop += pane.height()
    })
    ctx.drawImage(
      this._xAxisPane.getImage(includeOverlay),
      0, offsetTop, width, this._xAxisPane.height()
    )
    return canvas.toDataURL(`image/${type}`)
  }

  destroy () {
    this._panes.forEach(pane => {
      pane.destroy()
    })
    this._separators.forEach(pane => {
      pane.destroy()
    })
    this._panes.clear()
    this._separators.clear()
    this._xAxisPane.destroy()
    this._container.removeChild(this._chartContainer)
    this._chartEvent.destroy()
  }
}
