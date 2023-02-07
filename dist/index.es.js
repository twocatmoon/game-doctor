var v = Object.defineProperty;
var E = (n, e, t) => e in n ? v(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var d = (n, e, t) => (E(n, typeof e != "symbol" ? e + "" : e, t), t);
function f(n, e) {
  for (const t in e)
    !e[t] || typeof e[t] == "function" || (n[t] = e[t]);
  return n;
}
function p(n) {
  try {
    const e = {};
    for (const t in n)
      n[t] && (e[t] = n[t]);
    return JSON.parse(JSON.stringify(e));
  } catch (e) {
    throw e;
  }
}
function I() {
  return {
    reportId: Math.random().toString(16).slice(2),
    date: new Date().toISOString(),
    timezone: new Date().getTimezoneOffset()
  };
}
function k() {
  try {
    const n = f({}, performance);
    return n.eventCounts = {}, f(n.eventCounts, performance.eventCounts), n.memory = {}, f(n.memory, performance.memory || console.memory || {}), p(n);
  } catch (n) {
    return { error: n };
  }
}
async function w(n) {
  try {
    const e = f({}, navigator.connection);
    try {
      const o = await (await fetch("https://api.ipify.org/?format=json")).json();
      e.ipAddress = o.ip;
    } catch (t) {
      e.ipAddress = { error: t };
    }
    if (n)
      try {
        const t = performance.now(), o = new Image();
        await new Promise((r) => {
          o.onload = r, o.onerror = r, o.src = n;
        }), e.ping = performance.now() - t;
      } catch (t) {
        e.ping = { error: t };
      }
    return p(e);
  } catch (e) {
    return { error: e };
  }
}
function R() {
  try {
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
      href: window.location.href,
      title: window.document.title,
      isEmbedded: window.top !== window.self,
      referrer: document.referrer
    };
  } catch (n) {
    return { error: n };
  }
}
function u() {
  try {
    return {
      language: navigator.language,
      languages: navigator.languages,
      userAgent: navigator.userAgent,
      deviceMemory: navigator.deviceMemory || -1,
      doNotTrack: navigator.doNotTrack,
      hardwareConcurrency: navigator.hardwareConcurrency || -1,
      maxTouchPoints: navigator.maxTouchPoints || 0
    };
  } catch (n) {
    return { error: n };
  }
}
function y() {
  try {
    const e = document.createElement("canvas").getContext("webgl");
    if (!e)
      return {
        error: new Error("Unable to get WebGL context.")
      };
    const t = e.getExtension("WEBGL_debug_renderer_info");
    return {
      renderer: e.getParameter(e.RENDERER),
      rendererUnmasked: t && e.getParameter(t.UNMASKED_RENDERER_WEBGL),
      vendor: e.getParameter(e.VENDOR),
      vendorUnmasked: t && e.getParameter(t.UNMASKED_VENDOR_WEBGL)
    };
  } catch (n) {
    return { error: n };
  }
}
async function T(n, e) {
  try {
    const t = document.createElement("canvas"), o = Math.min(512 / t.width, 512 / t.height);
    t.width = t.width * o, t.height = t.height * o;
    const r = t.getContext("2d");
    return e && await e(), r.drawImage(n, 0, 0, t.width, t.height), t.toDataURL("image/jpeg", 65);
  } catch (t) {
    return { error: t };
  }
}
function x() {
  try {
    return new Promise((n, e) => {
      navigator.geolocation.getCurrentPosition(
        (t) => n(p(t.coords)),
        (t) => e({ error: t }),
        {
          enableHighAccuracy: !0,
          timeout: 5e3,
          maximumAge: 0
        }
      );
    });
  } catch (n) {
    return { error: n };
  }
}
async function S(n = {}) {
  try {
    const t = new TextEncoder().encode(JSON.stringify({
      ...u(),
      ...y(),
      ...w(),
      additionalInfo: n
    })), o = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(o)).map((a) => a.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    return { error: e };
  }
}
function b(n = 20) {
  window.__frameTime = 0;
  let e = performance.now();
  return () => {
    const o = performance.now() - e;
    window.__frameTime += (o - window.__frameTime) / n, e = performance.now();
  };
}
function l() {
  try {
    return window.__frameTime === void 0 ? -1 : (1e3 / window.__frameTime).toFixed(1);
  } catch (n) {
    return { error: n };
  }
}
class C {
  constructor(e) {
    d(this, "_options");
    d(this, "_lastError");
    d(this, "onTick");
    d(this, "_fpsTickInterval");
    d(this, "_fpsEl");
    var t, o, r;
    if (this._options = e, this.onTick = b(), ((t = this._options.reports) == null ? void 0 : t.lastError) !== !1 && (window.onerror = (a, i, c) => {
      this._lastError = [a, i, c];
    }), this._options.attachToWindow && (window.__generateReport = this.generateReport.bind(this), window.__toggleFps = this.showFps.call(this, this._fpsEl)), (o = this._options.keyboardShortcuts) != null && o.generateReport) {
      const a = this._options.keyboardShortcuts.generateReport;
      window.addEventListener("keydown", (i) => {
        if (i.key.toLowerCase() === a.key.toLowerCase()) {
          if (a.altKey && !i.altKey || a.ctrlKey && !i.ctrlKey || a.shiftKey && !i.shiftKey || a.metaKey && !i.metaKey)
            return;
          this.generateReport();
        }
      });
    }
    if ((r = this._options.keyboardShortcuts) != null && r.toggleFps) {
      const a = this._options.keyboardShortcuts.toggleFps;
      window.addEventListener("keydown", (i) => {
        if (i.key.toLowerCase() === a.key.toLowerCase()) {
          if (a.altKey && !i.altKey || a.ctrlKey && !i.ctrlKey || a.shiftKey && !i.shiftKey || a.metaKey && !i.metaKey)
            return;
          this.showFps(!this._fpsEl);
        }
      });
    }
  }
  showFps(e = !0) {
    if (!(e && this._fpsEl))
      if (e) {
        const t = document.createElement("div");
        t.style.position = "fixed", t.style.top = "0", t.style.right = "0", t.style.zIndex = Number.MAX_SAFE_INTEGER.toString(), t.style.backgroundColor = "#000", t.style.color = "#fff", t.style.fontFamily = "monospace", t.style.fontSize = "12px", t.style.padding = "5px";
        const o = l();
        t.innerHTML = `FPS: ${o}`, this._fpsEl = t, document.body.appendChild(t), clearInterval(this._fpsTickInterval), this._fpsTickInterval = setInterval(() => {
          if (!this._fpsEl)
            return;
          const r = l();
          this._fpsEl.innerHTML = `FPS: ${r}`;
        }, 1e3);
      } else
        this._fpsEl && (document.body.removeChild(this._fpsEl), this._fpsEl = void 0), clearInterval(this._fpsTickInterval);
  }
  hideFps() {
    this.showFps(!1);
  }
  setFingerprintInfo(e) {
    this._options.additionalFingerprintInfo = e;
  }
  async getFingerprint() {
    return await S(this._options.additionalFingerprintInfo);
  }
  async generateReport() {
    const e = this._options.getAdditionalInfo ? await this._options.getAdditionalInfo() : {}, t = {
      ...I(),
      gameName: this._options.gameName,
      gameVersion: this._options.gameVersion,
      additionalInfo: e
    }, o = this._options.reports || {};
    if (o.performance !== !1 && (t.performance = k()), o.network !== !1 && (t.network = await w(this._options.pingUrl)), o.window !== !1 && (t.window = R()), o.device !== !1 && (t.device = u()), o.graphicsDevice !== !1 && (t.graphicsDevice = y()), o.screenshot !== !1) {
      if (!this._options.canvasEl)
        throw new Error("No canvas element provided for screenshot.");
      t.screenshot = await T(this._options.canvasEl, this._options.canvasRenderFn);
    }
    o.location && (t.location = await x()), o.fingerprint !== !1 && (t.fingerprint = await this.getFingerprint()), o.fps !== !1 && (t.fps = l()), o.lastError !== !1 && (t.lastError = this._lastError);
    const r = JSON.stringify(t), a = btoa(r);
    if (this._options.outputToConsole && (console.log("=== Game Doctor Diagnostic Report ==="), console.log(JSON.stringify(JSON.parse(r), null, 4)), console.log("=== End of Report ===")), this._options.outputFormat === "image/png") {
      const i = this._encodeReportAsImage(t.reportId, a), c = i.toDataURL("image/png"), s = await new Promise((h) => {
        i.toBlob((m) => h(m), "image/png");
      });
      return this._options.copyToClipboard && navigator.clipboard.write([
        new ClipboardItem({
          "image/png": s
        })
      ]), c;
    } else {
      const i = this._options.outputFormat === "base64" ? a : r;
      return this._options.copyToClipboard && navigator.clipboard.writeText(i), i;
    }
  }
  static decodeBase64(e) {
    return JSON.parse(atob(e));
  }
  _encodeReportAsImage(e, t) {
    const o = document.createElement("canvas"), r = o.getContext("2d");
    o.width = Math.ceil(Math.sqrt(t.length)), o.height = o.width;
    let a;
    this._options.overlayImage && (r.drawImage(this._options.overlayImage, 0, 0, o.width, o.height), a = r.getImageData(0, 0, o.width, o.height)), o.width = Math.ceil(Math.sqrt(t.length)), o.height = o.width, r.fillStyle = "#000", r.fillRect(0, 0, o.width, o.height), r.font = "12px monospace", r.fillStyle = "#f00", r.fillText(e, 5, 15);
    const i = r.getImageData(0, 0, o.width, o.height), c = i.data;
    for (let s = 0; s < t.length; s++) {
      const h = s % o.width, g = (Math.floor(s / o.width) * o.width + h) * 4, _ = t[s].charCodeAt(0);
      c[g + 1] = a ? a.data[g + 1] : 0, c[g + 2] = _, c[g + 3] = 255;
    }
    return r.putImageData(i, 0, 0), o;
  }
  static async decodeImageUrl(e) {
    const t = new Image();
    t.src = e, await new Promise((s) => {
      t.onload = s;
    });
    const o = document.createElement("canvas");
    o.width = t.width, o.height = t.height;
    const r = o.getContext("2d");
    r.drawImage(t, 0, 0);
    const i = r.getImageData(0, 0, o.width, o.height).data;
    let c = "";
    for (let s = 0; s < i.length; s += 4) {
      const h = i[s + 2];
      if (h === 0)
        break;
      c += String.fromCharCode(h);
    }
    return this.decodeBase64(c);
  }
  static async decodeImage(e) {
    const t = document.createElement("canvas");
    return t.width = e.width, t.height = e.height, t.getContext("2d").drawImage(e, 0, 0), await this.decodeImageUrl(t.toDataURL("image/png"));
  }
}
export {
  C as GameDoctor,
  u as getDeviceInformation,
  S as getFingerprint,
  l as getFps,
  y as getGraphicsDeviceInformation,
  I as getInformation,
  x as getLocation,
  w as getNetworkInformation,
  k as getPerformanceInformation,
  T as getScreenshot,
  R as getWindowInformation,
  b as trackFps
};
