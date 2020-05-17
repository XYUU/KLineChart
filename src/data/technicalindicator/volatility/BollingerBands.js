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

import TechnicalIndicator from '../TechnicalIndicator'
import { BOLL } from '../technicalIndicatorType'

export default class BollingerBands extends TechnicalIndicator {
  constructor () {
    super(
      BOLL, [20],
      [
        { key: 'up', type: 'line' },
        { key: 'mid', type: 'line' },
        { key: 'dn', type: 'line' }
      ], 4, true
    )
  }

  calcTechnicalIndicator (dataList) {
    const p = this.calcParams[0] - 1
    let closeSum = 0
    this._calc(dataList, i => {
      const close = dataList[i].close
      const boll = {}
      closeSum += close
      if (i >= p) {
        boll.mid = closeSum / this.calcParams[0]
        const md = this._getBollMd(dataList.slice(i - p, i + 1), boll.mid)
        boll.up = boll.mid + 2 * md
        boll.dn = boll.mid - 2 * md
        closeSum -= dataList[i - p].close
      }
      dataList[i].boll = boll
    })
  }

  /**
   * 计算布林指标中的标准差
   * @param dataList
   * @param ma
   * @returns {number}
   * @private
   */
  _getBollMd (dataList, ma) {
    const dataSize = dataList.length
    let sum = 0
    dataList.forEach(data => {
      const closeMa = data.close - ma
      sum += closeMa * closeMa
    })
    const b = sum > 0
    sum = Math.abs(sum)
    const md = Math.sqrt(sum / dataSize)
    return b ? md : -1 * md
  }
}