import{_ as s,o as i,c as a,R as h}from"./chunks/framework.I-vAMtNN.js";const c=JSON.parse('{"title":"🌏 国际化","description":"","frontmatter":{},"headers":[],"relativePath":"guide/i18n.md","filePath":"guide/i18n.md","lastUpdated":1699374419000}'),n={name:"guide/i18n.md"},t=h(`<h1 id="🌏-国际化" tabindex="-1">🌏 国际化 <a class="header-anchor" href="#🌏-国际化" aria-label="Permalink to &quot;🌏 国际化&quot;">​</a></h1><p>目前图表内置了<code>en-US</code>和<code>zh-CN</code>两种语言，默认语言是<code>en-US</code>，如果需要使用其他语言，可以参考下面的方案。</p><h2 id="增加语言包" tabindex="-1">增加语言包 <a class="header-anchor" href="#增加语言包" aria-label="Permalink to &quot;增加语言包&quot;">​</a></h2><p>增加语言包通过<code>klinecharts.registerLocale(key, locales)</code>去完成。 例如，添加一个中文繁体的语言包，可以这样做：</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes material-theme-palenight github-light vp-code"><code><span class="line"><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;">klinecharts</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">.</span><span style="--shiki-dark:#82AAFF;--shiki-light:#6F42C1;">registerLocale</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;">(</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">zh-HK</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;"> {</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  time</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">時間：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  open</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">開：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  high</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">高：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  low</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">低：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  close</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">收：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  volume</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">成交量：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  turnover</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">成交額：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">,</span></span>
<span class="line"><span style="--shiki-dark:#F07178;--shiki-light:#24292E;">  change</span><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">:</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;"> &#39;</span><span style="--shiki-dark:#C3E88D;--shiki-light:#032F62;">漲幅：</span><span style="--shiki-dark:#89DDFF;--shiki-light:#032F62;">&#39;</span></span>
<span class="line"><span style="--shiki-dark:#89DDFF;--shiki-light:#24292E;">}</span><span style="--shiki-dark:#BABED8;--shiki-light:#24292E;">)</span></span></code></pre></div><h2 id="使用语言包" tabindex="-1">使用语言包 <a class="header-anchor" href="#使用语言包" aria-label="Permalink to &quot;使用语言包&quot;">​</a></h2><p>当添加完语言包后，可以通过图表API <code>init(options)</code>或者<code>setLocale(key)</code>，完成语言切换。</p>`,7),k=[t];function l(e,p,F,r,d,D){return i(),a("div",null,k)}const o=s(n,[["render",l]]);export{c as __pageData,o as default};
