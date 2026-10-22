// Loaded only by the isolated authenticated TEST server, before canonical app.js.
window.__SFERA_TEST__=true;
const bar=document.createElement("div");
bar.setAttribute("role","status");
bar.setAttribute("aria-label","Identificación del laboratorio");
bar.style.cssText="position:fixed;left:0;right:0;bottom:0;z-index:2147483600;padding:7px 12px;background:#182939;color:#fff;font:600 12px system-ui;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;box-shadow:0 -2px 10px #0002";
bar.innerHTML="<strong>SFERA TEST WEB</strong><span>SUPERUSUARIO FICTICIO</span><span>Sin conexiones ni escrituras a producción</span><span id='testVersion'>Versión: consultando…</span>";
document.body.append(bar);
try{
 const response=await fetch(new URL("./manifest.json",import.meta.url),{cache:"no-store"});
 const x=await response.json();
 document.querySelector("#testVersion").textContent="SHA: "+String(x.sha||"SIN_SHA").slice(0,12);
 document.title="SFERA TEST WEB · "+String(x.sha||"").slice(0,8);
 // A user can leave the tab open: new approved mirror SHAs refresh themselves.
 if(!x.local && /^[a-f0-9]{40}$/i.test(String(x.sha||""))){
  const loadedSha=String(x.sha);
  setInterval(async()=>{
   try{
    const response=await fetch(new URL("./manifest.json?check="+Date.now(),import.meta.url),{cache:"no-store"});
    if(!response.ok)return;
    const next=await response.json();
    if(next.synthetic===true && next.productionConnected===false && /^[a-f0-9]{40}$/i.test(String(next.sha||"")) && next.sha!==loadedSha){
     window.location.reload();
    }
   }catch{ /* transient CDN/network errors must not break the page */ }
  },30000);
 }
 if(x.local){
  const events=new EventSource("/__test/events");
  events.addEventListener("reload",()=>window.location.reload());
 }
}catch{
 document.querySelector("#testVersion").textContent="SHA: no disponible";
}
