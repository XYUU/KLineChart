import{_ as A,h as v,u as k,o as a,c as o,k as c,t as m,m as n,e as u,F as y,E as w,d as C,j as N,f as S,R as F,a9 as $,aa as f,v as b,ab as E,ac as L,ad as O,ae as R,af as D,ag as j,ah as T,ai as V,aj as z,ak as B,Y,z as I,al as H,am as M,an as G}from"./chunks/framework.I-vAMtNN.js";import{t as x}from"./chunks/theme.z73NhivO.js";const i=[{name:"Northstar",logo:"/images/sponsors/Northstar.png",website:"https://www.quantit.tech",amount:600},{name:"flameOnYou",text:"flameOnYou",logo:"/images/sponsors/flameOnYou.jpg",website:"https://github.com/flameOnYou",amount:1100}],q={class:"home-section sponsor-section"},K={class:"home-section-content sponsor"},U={class:"sponsor-grid sponsor-top-grid"},J=["href"],Q=["src"],W={key:0,class:"text"},X=["href"],Z=["src"],ee={key:0,class:"text"},te={key:0},se={key:1,class:"sponsor-grid sponsor-platinum-grid"},ae=["href"],oe=["src"],ne={key:2},re={key:3,class:"sponsor-grid sponsor-gold-grid"},ie=["href"],ce=["src"],le={__name:"HomeSponsor",setup(e){i.sort((p,d)=>d.amount-p.amount);const t=[],s=[];for(let p=3;p<i.length;p++){const d=i[p];d.amount>=5e3?t.push(d):s.push(d)}const r=v(t),l=v(s),{lang:g}=k();return(p,d)=>(a(),o("section",q,[c("div",K,[c("h2",null,m(n(g)==="zh-CN"?"赞助商":"Sponsors"),1),c("div",U,[c("a",{class:"sponsor-grid-item item-no1",href:n(i)[0].website,target:"_blank",rel:"noreferrer"},[c("img",{class:"image",src:n(i)[0].logo},null,8,Q),n(i)[0].text?(a(),o("span",W,m(n(i)[0].text),1)):u("",!0)],8,J),c("a",{class:"sponsor-grid-item item-no1",href:n(i)[1].website,target:"_blank",rel:"noreferrer"},[c("img",{class:"image",src:n(i)[1].logo},null,8,Z),n(i)[1].text?(a(),o("span",ee,m(n(i)[1].text),1)):u("",!0)],8,X)]),r.value.length>0?(a(),o("h4",te,m(n(g)==="zh-CN"?"铂金赞助商":"Platinum Sponsors"),1)):u("",!0),r.value.length>0?(a(),o("div",se,[(a(!0),o(y,null,w(r.value,_=>(a(),o("a",{class:"sponsor-grid-item item",target:"_blank",rel:"noreferrer",href:_.website},[c("img",{class:"image",src:_.logo},null,8,oe)],8,ae))),256))])):u("",!0),l.value.length>0?(a(),o("h4",ne,m(n(g)==="zh-CN"?"黄金赞助商":"Gold Sponsors"),1)):u("",!0),l.value.length>0?(a(),o("div",re,[(a(!0),o(y,null,w(l.value,_=>(a(),o("a",{class:"sponsor-grid-item item",target:"_blank",rel:"noreferrer",href:_.website},[c("img",{class:"image",src:_.logo},null,8,ce)],8,ie))),256))])):u("",!0)])]))}},pe=A(le,[["__scopeId","data-v-7d2a1d4b"]]),de={class:"NotFound"},ue=F('<div class="logo" data-v-de22ffbd><span data-v-de22ffbd>4</span><img src="'+$+'" data-v-de22ffbd><span data-v-de22ffbd>4</span></div><p class="title" data-v-de22ffbd>Page Not Found</p><p class="tip" style="margin-top:30px;" data-v-de22ffbd>Make sure the address is correct and the page hasn&#39;t moved.</p><p class="tip" data-v-de22ffbd>Please contact your KLineChart administrator if you think this is a mistake.</p>',4),he={class:"action"},_e=["href"],me=C({__name:"NotFound",setup(e){const{lang:t}=k(),s=v("/");return N(()=>{s.value=t.value==="zh-CN"?"/":`/${t.value}/`}),(r,l)=>(a(),o("div",de,[ue,c("div",he,[c("a",{class:"link",href:n(S)(s.value),"aria-label":"go to home"}," Take me home ",8,_e)])]))}}),fe=A(me,[["__scopeId","data-v-de22ffbd"]]),ge={...x,Layout:()=>f(x.Layout,null,{"home-features-after":()=>f(pe),"not-found":()=>f(fe)}),enhanceApp({app:e,router:t,siteData:s}){}};function P(e){if(e.extends){const t=P(e.extends);return{...t,...e,async enhanceApp(s){t.enhanceApp&&await t.enhanceApp(s),e.enhanceApp&&await e.enhanceApp(s)}}}return e}const h=P(ge),ve=C({name:"VitePressApp",setup(){const{site:e}=k();return N(()=>{I(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),e.value.router.prefetchLinks&&H(),M(),G(),h.setup&&h.setup(),()=>f(h.Layout)}});async function be(){const e=ye(),t=ke();t.provide(L,e);const s=O(e.route);return t.provide(R,s),t.component("Content",D),t.component("ClientOnly",j),Object.defineProperties(t.config.globalProperties,{$frontmatter:{get(){return s.frontmatter.value}},$params:{get(){return s.page.value.params}}}),h.enhanceApp&&await h.enhanceApp({app:t,router:e,siteData:T}),{app:t,router:e,data:s}}function ke(){return V(ve)}function ye(){let e=b,t;return z(s=>{let r=B(s),l=null;return r&&(e&&(t=r),(e||t===r)&&(r=r.replace(/\.js$/,".lean.js")),l=Y(()=>import(r),__vite__mapDeps([]))),b&&(e=!1),l},h.NotFound)}b&&be().then(({app:e,router:t,data:s})=>{t.go().then(()=>{E(t.route,s.site),e.mount("#app")})});export{be as createApp};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}