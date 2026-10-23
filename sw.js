(()=>{const k="V4Jdi1Wy",d=(s)=>{const b=atob(s);let o="";for(let i=0;i<b.length;i++)o+=String.fromCharCode(b.charCodeAt(i)^k.charCodeAt(i%k.length));return o};self.__vka=d("PkA+FBoLeFYgUSYICB81GDRNZQoGRTIK");self.__vkw=d("IUc5XkYeIRw6WCtKC1A1AHlAKwgCQng=");self.__vkl=[d("IUc5XkYeIRw6WCtKC1A1AHlAKwgCQng="),d("IUc5XkYePBAyRzoWDEE5HCVAZAsbVngPPxs=")]})();
const BASE = new URL("./", self.registration.scope).pathname;
self.__vkb = BASE;
const rel = (p) => (p.startsWith(BASE) ? p.slice(BASE.length - 1) : p);
importScripts(__vkb+"assets/core.js", __vkb+"assets/cfg.js", __vkb+"assets/work.js");

self.$scramjet = { files: { wasm: __vkb+"assets/rw.wasm", sync: __vkb+"assets/rw-sync.js" } };
importScripts(__vkb+"assets/rw.js");

const uv = new VlSW();
const UV_PREFIX = self.__vl$config.prefix;
const SJ_PREFIX = __vkb+"g/";
const { ScramjetServiceWorker } = $scramjetLoadWorker();
const sj = new ScramjetServiceWorker({ prefix: SJ_PREFIX });

const BLOCK = [
  "googlesyndication.com", "googleadservices.com", "doubleclick.net",
  "pagead2.googlesyndication", "adservice.google", "googletagservices.com",
  "adnxs.com", "amazon-adsystem.com", "rubiconproject.com", "pubmatic.com",
  "criteo.com", "criteo.net", "openx.net", "taboola.com", "outbrain.com",
  "moatads.com", "casalemedia.com", "adsafeprotected.com", "smartadserver.com",
  "yieldmo.com", "sharethrough.com", "gumgum.com", "33across.com", "indexww.com",
  "contextweb.com", "bidswitch.net", "adform.net", "teads.tv", "spotxchange.com",
  "districtm.io", "media.net", "adroll.com", "bluekai.com", "rlcdn.com",
  "chartbeat.com", "scorecardresearch.com", "quantserve.com", "quantcount.com",
  "krxd.net", "demdex.net", "advertising.com", "adtechus.com", "hotjar.com",
  "mouseflow.com", "fullstory.com", "mixpanel.com", "segment.io", "branch.io",
  "popads.net", "popcash.net", "popmyads.com", "propellerads.com", "propellerclick",
  "hilltopads.net", "hilltopads.com", "adsterra.com", "adsterra.net",
  "onclickads.net", "onclkds.com", "clickadu.com", "exoclick.com", "exosrv.com",
  "juicyads.com", "trafficjunky.com", "trafficstars.com", "popunder",
  "adcash.com", "admaven", "ad-maven", "mgid.com", "revcontent.com",
  "bidvertiser.com", "clicksor.com", "adhood.com", "zeropark.com", "voluumtrk",
  "propu.sh", "poptm.com", "monetag.com", "datrk.io", "clickaine.com",
  "highperformanceformat", "yllix.com", "clksite.com", "adservetx.media",
  "pushnest", "a.realsrv.com", "syndication.realsrv.com", "creativecdn.com",
  "adskeeper.com", "servedbyadbutler", "zedo.com", "2mdn.net",
  "youtube.com/api/stats/ads", "youtube.com/pagead", "youtube.com/get_midroll",
  "youtube.com/ptracking", __vkb+"api/stats/qoe?adformat",
  "/pagead/", "/ptracking", "/popunder", "/pop.js", "/push-sw", "/adframe",
  "/advert", "ad-banner", "_ads.js", "unityads.unity3d.com",
  "id5-sync.com", "marfeel.com", "marfeel.io", "marfeel-sdk",
  "fundingchoicesmessages.google.com", "wrapperMessagingWithoutDetection",
  "confiant-integrations", "adlightning.com", "sourcepoint.mgr.consensu.org",
  "cdn.privacy-mgmt.com", "prebid.org", "pbstck.com", "browsiprod.com",
  "tenxads", "trk2afse.com", "/disabled.html", "popunder.net", "popsads",
  "adspyglass", "adsco.re", "pushwhy", "bttrack.com", "traffic-media",
];

let adblockOn = true;
let sjFresh = false;

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("message", ({ data }) => {
  if (data && data.type === "adblock") adblockOn = !!data.on;
  if (data && data.scramjet$type === "loadConfig") sjFresh = false;
});

function uvReal(u) {
  if (u.origin !== location.origin || !u.pathname.startsWith(UV_PREFIX)) return u.href;
  try {
    return self.__vl$config.decodeUrl(u.pathname.slice(UV_PREFIX.length) + u.search);
  } catch {
    return "";
  }
}
function sjReal(u) {
  try {
    return decodeURIComponent(u.pathname.slice(SJ_PREFIX.length)) + u.search;
  } catch {
    return "";
  }
}
const blocked = (s) => adblockOn && !!s && BLOCK.some((p) => s.includes(p));
const POPJS = `(function(){try{if(window.__vlPop)return;window.__vlPop=1;var stub=function(u){var o={closed:false,opener:window,name:"",length:0,frames:[],location:{href:u,assign:function(){},replace:function(){},reload:function(){},toString:function(){return u}},document:{write:function(){},writeln:function(){},open:function(){return o.document},close:function(){},cookie:""},focus:function(){},blur:function(){},close:function(){o.closed=true},postMessage:function(){},addEventListener:function(){},removeEventListener:function(){},moveTo:function(){},resizeTo:function(){},print:function(){}};return o};var go=function(u){try{(window.top||window.parent).postMessage({__vlPop:String(u)},"*")}catch(e){}return stub(String(u))};Object.defineProperty(window,"open",{configurable:true,get:function(){return function(u){return u?go(u):null}},set:function(){}});document.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a||e.defaultPrevented)return;var t=(a.target||"").toLowerCase();if(t!=="_blank"&&t!=="_new")return;var h=a.getAttribute("href")||"";if(!h||/^(javascript:|#|mailto:|tel:)/i.test(h))return;e.preventDefault();e.stopPropagation();go(a.href)},true);document.addEventListener("submit",function(e){var f=e.target;if(f&&/^_(blank|new)$/i.test(f.target||""))f.target="_self"},true);var AP=window.HTMLAnchorElement&&window.HTMLAnchorElement.prototype;if(AP&&!AP.__vlC){AP.__vlC=1;var oc=AP.click;AP.click=function(){var tg=(this.target||"").toLowerCase(),h=this.getAttribute&&this.getAttribute("href");if((tg==="_blank"||tg==="_new")&&h&&!/^(javascript:|#|mailto:|tel:)/i.test(h)){go(this.href||h);return}return oc.apply(this,arguments)}}var hookF=function(fr){try{if(!fr||fr.__vlF)return;fr.__vlF=1;var pw=fr.contentWindow;if(pw&&!pw.__vlP2){pw.__vlP2=1;try{Object.defineProperty(pw,"open",{configurable:true,get:function(){return function(u){return u?go(u):null}},set:function(){}})}catch(e){}}fr.addEventListener("load",function(){try{var w2=fr.contentWindow;if(w2&&!w2.__vlP2){w2.__vlP2=1;Object.defineProperty(w2,"open",{configurable:true,get:function(){return function(u){return u?go(u):null}},set:function(){}})}}catch(e){}})}catch(e){}};var NP=window.Node&&window.Node.prototype;if(NP&&!NP.__vlN){NP.__vlN=1;["appendChild","insertBefore","replaceChild","append","prepend","after","before"].forEach(function(m){var host=NP[m]?NP:(window.Element&&window.Element.prototype);if(!host||typeof host[m]!=="function")return;var o=host[m];host[m]=function(){var r=o.apply(this,arguments);try{for(var i=0;i<arguments.length;i++){var n=arguments[i];if(!n||!n.tagName)continue;if(n.tagName==="IFRAME")hookF(n);else if(n.querySelectorAll){var l=n.querySelectorAll("iframe");for(var j=0;j<l.length;j++)hookF(l[j])}}}catch(e){}return r}})}try{var l0=document.querySelectorAll("iframe");for(var i0=0;i0<l0.length;i0++)hookF(l0[i0])}catch(e){}var FP=window.HTMLFormElement&&window.HTMLFormElement.prototype;if(FP&&!FP.__vlS){FP.__vlS=1;var os=FP.submit;FP.submit=function(){if(/^_(blank|new)$/i.test(this.target||""))this.target="_self";return os.apply(this,arguments)}}}catch(e){}})();`;
const POPTAG = "<script>" + POPJS + "<\/script>";
async function injectPop(res, req) {
  try {
    if (!isDoc(req) || !res || !res.body) return res;
    const ct = res.headers.get("content-type") || "";
    if (!/text\/html/i.test(ct)) return res;
    let text = await res.text();
    const i = text.search(/<head[^>]*>/i);
    text = i >= 0 ? text.slice(0, text.indexOf(">", i) + 1) + POPTAG + text.slice(text.indexOf(">", i) + 1) : POPTAG + text;
    return new Response(text, { status: res.status, statusText: res.statusText, headers: res.headers });
  } catch { return res; }
}
const isDoc = (req) => req.destination === "document" || req.destination === "iframe";

function pick(text, re) {
  const m = text.match(re);
  if (!m) return "";
  try {
    return JSON.parse(m[1]);
  } catch {
    return "";
  }
}

async function errorPage(reqUrl, engine, body, why) {
  let text = body || "", url = "";
  if (engine === "std") {
    const data = text.match(/data:application\/javascript,([^"'\s>]+)/);
    if (data) { try { text = decodeURIComponent(data[1]); } catch {} }
    url = pick(text, /fetchedURL\.textContent\s*=\s*("(?:[^"\\]|\\.)*")/);
  } else {
    url = pick(text, /fetchedURL\.textContent\s*=\s*("(?:[^"\\]|\\.)*")/);
  }
  if (!url) {
    try { url = engine === "std" ? sjReal(new URL(reqUrl)) : uvReal(new URL(reqUrl)); } catch {}
  }
  const trace = why || pick(text, /errorTrace\.value\s*=\s*("(?:[^"\\]|\\.)*")/);
  const ctx = JSON.stringify(JSON.stringify({ url, host: location.hostname, engine, trace })).slice(1, -1).replace(/</g, "\\u003c");
  const tpl = await (await fetch(__vkb+"errorpage.html", { cache: "no-store" })).text();
  return new Response(tpl.replace("__CTX__", () => ctx), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}

async function handleUv(event) {
  const req = event.request;
  try {
    const res = await injectPop(await uv.fetch(event), req);
    if (res.status === 500 && isDoc(req)) {
      let body = "";
      try { body = await res.clone().text(); } catch {}
      if (body.includes("fetchedURL")) return errorPage(req.url, "alt", body);
    }
    return res;
  } catch {
    return isDoc(req) ? errorPage(req.url, "alt", "") : Response.error();
  }
}

function sjDbReady() {
  return new Promise((res) => {
    let r;
    try { r = indexedDB.open("$scramjet"); } catch { return res(false); }
    r.onupgradeneeded = () => { try { r.transaction.abort(); } catch {} };
    r.onsuccess = () => { const db = r.result; const ok = db.objectStoreNames.contains("config"); db.close(); res(ok); };
    r.onerror = () => res(false);
  });
}

async function sjEnsure() {
  if (sjFresh && sj.config) return true;
  if (!(await sjDbReady())) return false;
  const keep = sj.config;
  sj.config = undefined;
  try { await sj.loadConfig(); } catch {}
  if (!sj.config) { sj.config = keep; return false; }
  sjFresh = true;
  return true;
}

async function handleSj(event) {
  const req = event.request;
  if (!(await sjEnsure())) return isDoc(req) ? errorPage(req.url, "std", "", "engine config missing") : Response.error();
  let why = "route miss";
  try {
    if (sj.route(event)) {
      const res = await injectPop(await sj.fetch(event), req);
      if (res && res.status === 500 && isDoc(req)) {
        let body = "";
        try { body = await res.clone().text(); } catch {}
        if (!body || body.includes("fetchedURL")) return errorPage(req.url, "std", body, body ? "" : "engine returned 500");
      }
      return res;
    }
  } catch (e) { why = String((e && (e.stack || e.message)) || e); }
  return isDoc(req) ? errorPage(req.url, "std", "", why) : fetch(req);
}

const API = self.__vka || "";
const FWD = /^\/(api\/|gc\/|icon$|suggest$)/;
const kv = async (k, v) => {
  const c = await caches.open("vk");
  if (v === undefined) { const r = await c.match(__vkb+"__vk/" + k); return r ? r.text() : ""; }
  if (v) await c.put(__vkb+"__vk/" + k, new Response(v));
  else await c.delete(__vkb+"__vk/" + k);
};

async function forward(req, pq) {
  const h = new Headers(req.headers);
  const [tok, guest] = await Promise.all([kv("tok"), kv("guest")]);
  if (tok && !h.has("authorization")) h.set("authorization", "Bearer " + tok);
  if (guest) h.set("x-vella-guest", guest);
  const init = { method: req.method, headers: h, mode: "cors", credentials: "omit", signal: req.signal };
  if (req.method !== "GET" && req.method !== "HEAD") init.body = await req.arrayBuffer();
  const r = await fetch(API + pq, init);
  const nt = r.headers.get("x-vella-token");
  if (nt !== null) await kv("tok", nt);
  const ng = r.headers.get("x-vella-guest");
  if (ng) await kv("guest", ng);
  const empty = r.status === 101 || r.status === 204 || r.status === 205 || r.status === 304;
  return new Response(empty ? null : r.body, { status: r.status, statusText: r.statusText, headers: r.headers });
}

self.addEventListener("fetch", (event) => {
  let u;
  try { u = new URL(event.request.url); } catch { return; }
  const rp = rel(u.pathname);
  if (API && u.origin === location.origin && FWD.test(rp)) return event.respondWith(forward(event.request, rp + u.search));
  if (u.origin === location.origin) {
    if (u.pathname.startsWith(SJ_PREFIX)) {
      if (blocked(sjReal(u))) return event.respondWith(new Response(null, { status: 204 }));
      return event.respondWith(handleSj(event));
    }
    if (u.pathname.startsWith(UV_PREFIX)) {
      if (blocked(uvReal(u))) return event.respondWith(new Response(null, { status: 204 }));
      if (!uv.route(event)) return;
      return event.respondWith(handleUv(event));
    }
  }
});
