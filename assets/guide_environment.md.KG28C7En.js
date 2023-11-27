import{_ as i,o as s,c as a,R as t}from"./chunks/framework.I-vAMtNN.js";const F=JSON.parse('{"title":"🏝️ 环境要求","description":"","frontmatter":{},"headers":[],"relativePath":"guide/environment.md","filePath":"guide/environment.md","lastUpdated":1679066795000}'),e={name:"guide/environment.md"},h=t(`<h1 id="🏝️-环境要求" tabindex="-1">🏝️ 环境要求 <a class="header-anchor" href="#🏝️-环境要求" aria-label="Permalink to &quot;🏝️ 环境要求&quot;">​</a></h1><h2 id="浏览器支持" tabindex="-1">浏览器支持 <a class="header-anchor" href="#浏览器支持" aria-label="Permalink to &quot;浏览器支持&quot;">​</a></h2><p>图表基于 html5 canvas 构建，需要运行在支持 canvas 的浏览器上，如果需要运行在移动端，请用 webview 加载。</p><h2 id="兼容处理" tabindex="-1">兼容处理 <a class="header-anchor" href="#兼容处理" aria-label="Permalink to &quot;兼容处理&quot;">​</a></h2><h3 id="core-js" tabindex="-1"><a href="https://github.com/zloirock/core-js" target="_blank" rel="noreferrer">core.js</a> <a class="header-anchor" href="#core-js" aria-label="Permalink to &quot;[core.js](https://github.com/zloirock/core-js)&quot;">​</a></h3><p>图表内部集合使用<code>Map</code>，用于兼容不支持的老版浏览器。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes material-theme-palenight github-light vp-code"><code><span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">core.js</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;"> {</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> init</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;"> }</span><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;"> from</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">klincharts</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">;</span></span></code></pre></div><h3 id="intl-js" tabindex="-1"><a href="https://github.com/andyearnshaw/Intl.js" target="_blank" rel="noreferrer">Intl.js</a> <a class="header-anchor" href="#intl-js" aria-label="Permalink to &quot;[Intl.js](https://github.com/andyearnshaw/Intl.js)&quot;">​</a></h3><p>图表依赖<code>Intl</code>，某些浏览器无此 API。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes material-theme-palenight github-light vp-code"><code><span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">intl</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">intl/local-data/jsonp/en</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;">import</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;"> {</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;"> init</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;"> }</span><span style="--shiki-dark:#89DDFF;--shiki-light:#D73A49;--shiki-dark-font-style:italic;--shiki-light-font-style:inherit;"> from</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">klincharts</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">;</span></span></code></pre></div>`,10),n=[h];function l(r,k,p,o,d,c){return s(),a("div",null,n)}const g=i(e,[["render",l]]);export{F as __pageData,g as default};
