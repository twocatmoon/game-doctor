var N=Object.defineProperty;var S=(o,t,e)=>t in o?N(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var l=(o,t,e)=>(S(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=e(r);fetch(r.href,i)}})();function h(o,t){for(const e in t)!t[e]||typeof t[e]=="function"||(o[e]=t[e]);return o}function y(o){try{const t={};for(const e in o)o[e]&&(t[e]=o[e]);return JSON.parse(JSON.stringify(t))}catch(t){throw t}}function A(){return{reportId:Math.random().toString(16).slice(2),date:new Date().toISOString(),timezone:new Date().getTimezoneOffset()}}function C(){try{const o=h({},performance);return o.eventCounts={},h(o.eventCounts,performance.eventCounts),o.memory={},h(o.memory,performance.memory||console.memory||{}),y(o)}catch(o){return{error:o}}}async function b(o){try{const t=h({},navigator.connection);try{const n=await(await fetch("https://api.ipify.org/?format=json")).json();t.ipAddress=n.ip}catch(e){t.ipAddress={error:e}}if(o)try{const e=performance.now(),n=new Image;await new Promise(r=>{n.onload=r,n.onerror=r,n.src=o}),t.ping=performance.now()-e}catch(e){t.ping={error:e}}return y(t)}catch(t){return{error:t}}}function F(){try{return{innerWidth:window.innerWidth,innerHeight:window.innerHeight,pixelRatio:window.devicePixelRatio,href:window.location.href,title:window.document.title,isEmbedded:window.top!==window.self,referrer:document.referrer}}catch(o){return{error:o}}}function T(){try{return{language:navigator.language,languages:navigator.languages,userAgent:navigator.userAgent,deviceMemory:navigator.deviceMemory||-1,doNotTrack:navigator.doNotTrack,hardwareConcurrency:navigator.hardwareConcurrency||-1,maxTouchPoints:navigator.maxTouchPoints||0}}catch(o){return{error:o}}}function k(){try{const t=document.createElement("canvas").getContext("webgl");if(!t)return{error:new Error("Unable to get WebGL context.")};const e=t.getExtension("WEBGL_debug_renderer_info");return{renderer:t.getParameter(t.RENDERER),rendererUnmasked:e&&t.getParameter(e.UNMASKED_RENDERER_WEBGL),vendor:t.getParameter(t.VENDOR),vendorUnmasked:e&&t.getParameter(e.UNMASKED_VENDOR_WEBGL)}}catch(o){return{error:o}}}async function M(o,t){try{const e=document.createElement("canvas"),n=Math.min(512/e.width,512/e.height);e.width=e.width*n,e.height=e.height*n;const r=e.getContext("2d");return t&&await t(),r.drawImage(o,0,0,e.width,e.height),e.toDataURL("image/jpeg",65)}catch(e){return{error:e}}}function O(){try{return new Promise((o,t)=>{navigator.geolocation.getCurrentPosition(e=>o(y(e.coords)),e=>t({error:e}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})})}catch(o){return{error:o}}}async function K(o={}){try{const e=new TextEncoder().encode(JSON.stringify({...T(),...k(),...b(),additionalInfo:o})),n=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}catch(t){return{error:t}}}function P(o=20){window.__frameTime=0;let t=performance.now();return()=>{const n=performance.now()-t;window.__frameTime+=(n-window.__frameTime)/o,t=performance.now()}}function g(){try{return window.__frameTime===void 0?-1:(1e3/window.__frameTime).toFixed(1)}catch(o){return{error:o}}}class R{constructor(t){l(this,"_options");l(this,"_lastError");l(this,"onTick");l(this,"_fpsTickInterval");l(this,"_fpsEl");l(this,"_noticeTimeout");l(this,"_noticeEl");var e,n,r;if(this._options=t,this.onTick=P(),((e=this._options.reports)==null?void 0:e.lastError)!==!1&&(window.onerror=(i,a,c)=>{this._lastError=[i,a,c]}),this._options.attachToWindow&&(window.__generateReport=this.generateReport.bind(this),window.__toggleFps=this.showFps.call(this,this._fpsEl)),(n=this._options.keyboardShortcuts)!=null&&n.generateReport){const i=this._options.keyboardShortcuts.generateReport;window.addEventListener("keydown",a=>{if(a.key.toLowerCase()===i.key.toLowerCase()){if(i.altKey&&!a.altKey||i.ctrlKey&&!a.ctrlKey||i.shiftKey&&!a.shiftKey||i.metaKey&&!a.metaKey)return;this.generateReport()}})}if((r=this._options.keyboardShortcuts)!=null&&r.toggleFps){const i=this._options.keyboardShortcuts.toggleFps;window.addEventListener("keydown",a=>{if(a.key.toLowerCase()===i.key.toLowerCase()){if(i.altKey&&!a.altKey||i.ctrlKey&&!a.ctrlKey||i.shiftKey&&!a.shiftKey||i.metaKey&&!a.metaKey)return;this.showFps(!this._fpsEl)}})}}_showNotice(t){this._noticeEl&&(document.body.removeChild(this._noticeEl),this._noticeEl=void 0),clearTimeout(this._noticeTimeout);const e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.right="0",e.style.zIndex=Number.MAX_SAFE_INTEGER.toString(),e.style.backgroundColor="#000",e.style.color="#fff",e.style.fontFamily="monospace",e.style.fontSize="12px",e.style.padding="5px",e.innerHTML=t,this._noticeEl=e,document.body.appendChild(e),this._noticeTimeout=setTimeout(()=>{this._noticeEl&&(document.body.removeChild(this._noticeEl),this._noticeEl=void 0)},1e3)}showFps(t=!0){if(!(t&&this._fpsEl))if(t){const e=document.createElement("div");e.style.position="fixed",e.style.top="0",e.style.right="0",e.style.zIndex=Number.MAX_SAFE_INTEGER.toString(),e.style.backgroundColor="#000",e.style.color="#fff",e.style.fontFamily="monospace",e.style.fontSize="12px",e.style.padding="5px";const n=g();e.innerHTML=`FPS: ${n}`,this._fpsEl=e,document.body.appendChild(e),clearInterval(this._fpsTickInterval),this._fpsTickInterval=setInterval(()=>{if(!this._fpsEl)return;const r=g();this._fpsEl.innerHTML=`FPS: ${r}`},1e3)}else this._fpsEl&&(document.body.removeChild(this._fpsEl),this._fpsEl=void 0),clearInterval(this._fpsTickInterval)}hideFps(){this.showFps(!1)}setFingerprintInfo(t){this._options.additionalFingerprintInfo=t}async getFingerprint(){return await K(this._options.additionalFingerprintInfo)}async generateReport(){const t=this._options.getAdditionalInfo?await this._options.getAdditionalInfo():{},e={...A(),gameName:this._options.gameName,gameVersion:this._options.gameVersion,additionalInfo:t},n=this._options.reports||{};if(n.performance!==!1&&(e.performance=C()),n.network!==!1&&(e.network=await b(this._options.pingUrl)),n.window!==!1&&(e.window=F()),n.device!==!1&&(e.device=T()),n.graphicsDevice!==!1&&(e.graphicsDevice=k()),n.screenshot!==!1){if(!this._options.canvasEl)throw new Error("No canvas element provided for screenshot.");e.screenshot=await M(this._options.canvasEl,this._options.canvasRenderFn)}n.location&&(e.location=await O()),n.fingerprint!==!1&&(e.fingerprint=await this.getFingerprint()),n.fps!==!1&&(e.fps=g()),n.lastError!==!1&&(e.lastError=this._lastError);const r=JSON.stringify(e),i=btoa(r);if(this._options.outputToConsole&&(console.log("=== Game Doctor Diagnostic Report ==="),console.log(JSON.stringify(JSON.parse(r),null,4)),console.log("=== End of Report ===")),this._options.outputFormat==="image/png"){const a=this._encodeReportAsImage(e.reportId,i),c=a.toDataURL("image/png"),s=await new Promise(d=>{a.toBlob(v=>d(v),"image/png")});return this._options.copyToClipboard&&(navigator.clipboard.write([new ClipboardItem({"image/png":s})]),this._showNotice("Report copied to clipboard!")),c}else{const a=this._options.outputFormat==="base64"?i:r;return this._options.copyToClipboard&&(navigator.clipboard.writeText(a),this._showNotice("Report copied to clipboard!")),a}}static decodeBase64(t){return JSON.parse(atob(t))}_encodeReportAsImage(t,e){const n=document.createElement("canvas"),r=n.getContext("2d");n.width=Math.ceil(Math.sqrt(e.length)),n.height=n.width;let i;this._options.overlayImage&&(r.drawImage(this._options.overlayImage,0,0,n.width,n.height),i=r.getImageData(0,0,n.width,n.height)),n.width=Math.ceil(Math.sqrt(e.length)),n.height=n.width,r.fillStyle="#000",r.fillRect(0,0,n.width,n.height),r.font="12px monospace",r.fillStyle="#f00",r.fillText(t,5,15);const a=r.getImageData(0,0,n.width,n.height),c=a.data;for(let s=0;s<e.length;s++){const d=s%n.width,f=(Math.floor(s/n.width)*n.width+d)*4,x=e[s].charCodeAt(0);c[f+1]=i?i.data[f+1]:0,c[f+2]=x,c[f+3]=255}return r.putImageData(a,0,0),n}static async decodeImageUrl(t){const e=new Image;e.src=t,await new Promise(s=>{e.onload=s});const n=document.createElement("canvas");n.width=e.width,n.height=e.height;const r=n.getContext("2d");r.drawImage(e,0,0);const a=r.getImageData(0,0,n.width,n.height).data;let c="";for(let s=0;s<a.length;s+=4){const d=a[s+2];if(d===0)break;c+=String.fromCharCode(d)}return this.decodeBase64(c)}static async decodeImage(t){const e=document.createElement("canvas");return e.width=t.width,e.height=t.height,e.getContext("2d").drawImage(t,0,0),await this.decodeImageUrl(e.toDataURL("image/png"))}}const w=document.getElementById("app"),_=document.getElementById("reportOutput"),u=document.getElementById("reportInputTextarea"),B=document.getElementById("printButton"),U=document.getElementById("resetButton"),$=document.getElementById("reportTitle");let I="ready";const E=o=>{const t=document.querySelectorAll(`[data-view=${I}]`);for(let n of Array.from(t))n.style.display="none";const e=document.querySelectorAll(`[data-view=${o}]`);for(let n of Array.from(e))n.style.display="block";I=o,w.setAttribute("data-current-view",o)},p=()=>{E("ready"),u.value="",_.innerHTML="",document.title="Game Doctor by Two-Cat Moon"},D=o=>o.replace(/([A-Z])/g," $1").replace(/^./,t=>t.toUpperCase()),m=o=>{if(o===null)return"NULL";if(o===void 0)return"UNDEFINED";if(Array.isArray(o)){let e="<ul>";for(let n of o)typeof n=="object"?e+="<li>"+m(n)+"</li>":e+=`<li>${n}</li>`;return e+="</ul>",e}let t="<table>";for(let e of Object.keys(o))t+="<tr>",t+=`<td><strong>${D(e)}</strong></td>`,typeof o[e]=="object"?t+="<td>"+m(o[e])+"</td>":t+=`<td>${o[e]}</td>`,t+="</tr>";return t+="</table>",t},L=o=>{$.innerHTML=`Diagnostic Report for ${o.gameName}`,document.title=`Diagnostic Report for ${o.gameName}`;let t="";for(let e of Object.keys(o)){let n="<section>";n+=`<h3>${D(e)}</h3>`,e==="screenshot"?n+=`<img src="${o[e]}" alt="screenshot" />`:typeof o[e]=="object"?n+=m(o[e]):n+=`${o[e]}`,n+="</section>",t+=n}return t};u.addEventListener("input",async()=>{const o=u.value;try{const t=await R.decodeBase64(o),e=L(t);_.innerHTML=e,E("report")}catch{p()}});w.addEventListener("dragover",o=>{o.preventDefault(),o.stopPropagation()});w.addEventListener("drop",o=>{o.preventDefault(),o.stopPropagation();try{const t=o.dataTransfer.files[0],e=new FileReader;e.onerror=()=>{p()},e.onload=async n=>{const r=n.target.result,i=await R.decodeImageUrl(r),a=L(i);_.innerHTML=a,E("report")},e.readAsDataURL(t)}catch{p()}});B.addEventListener("click",()=>{window.print()});U.addEventListener("click",()=>{p()});