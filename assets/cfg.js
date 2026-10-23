self.__vkb = self.__vkb || (() => {
  let s = "";
  try { s = (typeof document !== "undefined" && document.currentScript && document.currentScript.src) || (self.location && self.location.href) || ""; } catch {}
  try { return new URL(s).pathname.replace(/(assets\/)?[^/]*$/, "") || "/"; } catch { return "/"; }
})();

self.__vl$config = {
  prefix: __vkb+"u/",
  encodeUrl: Vela.codec.xor.encode,
  decodeUrl: Vela.codec.xor.decode,
  handler: __vkb+"assets/hook.js",
  client: __vkb+"assets/view.js",
  bundle: __vkb+"assets/core.js",
  config: __vkb+"assets/cfg.js",
  sw: __vkb+"assets/work.js",
};
