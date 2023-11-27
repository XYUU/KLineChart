import{_ as s,o as i,c as a,R as t}from"./chunks/framework.I-vAMtNN.js";const g=JSON.parse('{"title":"📚 数据","description":"","frontmatter":{},"headers":[],"relativePath":"guide/datasource.md","filePath":"guide/datasource.md","lastUpdated":1692476796000}'),n={name:"guide/datasource.md"},e=t(`<h1 id="📚-数据" tabindex="-1">📚 数据 <a class="header-anchor" href="#📚-数据" aria-label="Permalink to &quot;📚 数据&quot;">​</a></h1><p>图表所需要的数据必须是固定格式。通过图表实例 API <a href="./instance-api.html#applynewdata-datalist-more">applyNewData(dataList, more)</a>，<a href="./instance-api.html#applymoredatadatalist-more">applyMoreData(dataList, more)</a>和<a href="./instance-api.html#updatedatadata">updateData(data)</a>来和图表进行数据交互。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes material-theme-palenight github-light vp-code"><code><span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">{</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 时间戳，毫秒级别，必要字段</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  timestamp</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 开盘价，必要字段</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  open</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 收盘价，必要字段</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  close</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 最高价，必要字段</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  high</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 最低价，必要字段</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  low</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 成交量，非必须字段</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  volume</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#676E95;--shiki-light:#6A737D;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">  // 成交额，非必须字段，如果需要展示技术指标&#39;EMV&#39;和&#39;AVP&#39;，则需要为该字段填充数据。</span></span>
<span class="line"><span style="--shiki-dark:#FFCB6B;--shiki-light:#6F42C1;">  turnover</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> number</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">}</span></span></code></pre></div>`,3),l=[e];function h(p,k,r,d,o,c){return i(),a("div",null,l)}const F=s(n,[["render",h]]);export{g as __pageData,F as default};