"use strict";const e={"Content-Type":"application/json"},t=({serverURL:e,lang:t,paths:n,signal:r})=>(({serverURL:e,lang:t,paths:n,type:r,signal:a})=>fetch(`${e}/article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(r.join(","))}&lang=${t}`,{signal:a}).then((e=>e.json())))({serverURL:e,lang:t,paths:n,type:["time"],signal:r}).then((e=>Array.isArray(e)?e:[e])),n=t=>(({serverURL:t,lang:n,path:r,type:a,action:o})=>fetch(`${t}/article?lang=${n}`,{method:"POST",headers:e,body:JSON.stringify({path:r,type:a,action:o})}).then((e=>e.json())))({...t,type:"time",action:"inc"}),r=e=>{const t=((e="")=>e.replace(/\/$/u,""))(e);return/^(https?:)?\/\//.test(t)?t:`https://${t}`},a=e=>{"AbortError"!==e.name&&console.error(e.message)},o=e=>e.dataset.path||e.getAttribute("id"),s=(e,t)=>{t.forEach(((t,n)=>{t.innerText=e[n].toString()}))};exports.pageviewCount=({serverURL:e,path:i=window.location.pathname,selector:l=".waline-pageview-count",update:p=!0,lang:c=navigator.language})=>{const g=new AbortController,h=Array.from(document.querySelectorAll(l)),y=e=>{const t=o(e);return null!==t&&i!==t},u=n=>t({serverURL:r(e),paths:n.map((e=>o(e)||i)),lang:c,signal:g.signal}).then((e=>s(e,n))).catch(a);if(p){const t=h.filter((e=>!y(e))),a=h.filter(y);n({serverURL:r(e),path:i,lang:c}).then((e=>s(new Array(t.length).fill(e),t))),a.length&&u(a)}else u(h);return g.abort.bind(g)},exports.version="2.14.7";
//# sourceMappingURL=pageview.cjs.map