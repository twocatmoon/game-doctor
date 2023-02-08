var E = Object.defineProperty;
var v = (n, e, t) => e in n ? E(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var d = (n, e, t) => (v(n, typeof e != "symbol" ? e + "" : e, t), t);
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
function T() {
  try {
    const n = f({}, performance);
    return n.eventCounts = {}, f(n.eventCounts, performance.eventCounts), n.memory = {}, f(n.memory, performance.memory || console.memory || {}), p(n);
  } catch (n) {
    return { error: n };
  }
}
async function u(n) {
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
        await new Promise((i) => {
          o.onload = i, o.onerror = i, o.src = n;
        }), e.ping = performance.now() - t;
      } catch (t) {
        e.ping = { error: t };
      }
    return p(e);
  } catch (e) {
    return { error: e };
  }
}
function b() {
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
function w() {
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
async function k(n, e) {
  try {
    const t = document.createElement("canvas"), o = Math.min(512 / t.width, 512 / t.height);
    t.width = t.width * o, t.height = t.height * o;
    const i = t.getContext("2d");
    return e && await e(), i.drawImage(n, 0, 0, t.width, t.height), t.toDataURL("image/jpeg", 65);
  } catch (t) {
    return { error: t };
  }
}
function R() {
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
async function x(n = {}) {
  try {
    const t = new TextEncoder().encode(JSON.stringify({
      ...w(),
      ...y(),
      ...u(),
      additionalInfo: n
    })), o = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(o)).map((a) => a.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    return { error: e };
  }
}
function S(n = 20) {
  window.__frameTime = 0;
  let e = performance.now();
  return () => {
    const o = performance.now() - e;
    window.__frameTime += (o - window.__frameTime) / n, e = performance.now();
  };
}
function g() {
  try {
    return window.__frameTime === void 0 ? -1 : (1e3 / window.__frameTime).toFixed(1);
  } catch (n) {
    return { error: n };
  }
}
class D {
  constructor(e) {
    d(this, "_options");
    d(this, "_lastError");
    d(this, "onTick");
    d(this, "_fpsTickInterval");
    d(this, "_fpsEl");
    d(this, "_noticeTimeout");
    d(this, "_noticeEl");
    var t, o, i;
    if (this._options = e, this.onTick = S(), ((t = this._options.reports) == null ? void 0 : t.lastError) !== !1 && (window.onerror = (a, r, c) => {
      this._lastError = [a, r, c];
    }), this._options.attachToWindow && (window.__generateReport = this.generateReport.bind(this), window.__toggleFps = this.showFps.call(this, this._fpsEl)), (o = this._options.keyboardShortcuts) != null && o.generateReport) {
      const a = this._options.keyboardShortcuts.generateReport;
      window.addEventListener("keydown", (r) => {
        if (r.key.toLowerCase() === a.key.toLowerCase()) {
          if (a.altKey && !r.altKey || a.ctrlKey && !r.ctrlKey || a.shiftKey && !r.shiftKey || a.metaKey && !r.metaKey)
            return;
          this.generateReport();
        }
      });
    }
    if ((i = this._options.keyboardShortcuts) != null && i.toggleFps) {
      const a = this._options.keyboardShortcuts.toggleFps;
      window.addEventListener("keydown", (r) => {
        if (r.key.toLowerCase() === a.key.toLowerCase()) {
          if (a.altKey && !r.altKey || a.ctrlKey && !r.ctrlKey || a.shiftKey && !r.shiftKey || a.metaKey && !r.metaKey)
            return;
          this.showFps(!this._fpsEl);
        }
      });
    }
  }
  _showNotice(e) {
    this._noticeEl && (document.body.removeChild(this._noticeEl), this._noticeEl = void 0), clearTimeout(this._noticeTimeout);
    const t = document.createElement("div");
    t.style.position = "fixed", t.style.top = "0", t.style.right = "0", t.style.zIndex = Number.MAX_SAFE_INTEGER.toString(), t.style.backgroundColor = "#000", t.style.color = "#fff", t.style.fontFamily = "monospace", t.style.fontSize = "12px", t.style.padding = "5px", t.innerHTML = e, this._noticeEl = t, document.body.appendChild(t), this._noticeTimeout = setTimeout(() => {
      this._noticeEl && (document.body.removeChild(this._noticeEl), this._noticeEl = void 0);
    }, 1e3);
  }
  showFps(e = !0) {
    if (!(e && this._fpsEl))
      if (e) {
        const t = document.createElement("div");
        t.style.position = "fixed", t.style.top = "0", t.style.right = "0", t.style.zIndex = Number.MAX_SAFE_INTEGER.toString(), t.style.backgroundColor = "#000", t.style.color = "#fff", t.style.fontFamily = "monospace", t.style.fontSize = "12px", t.style.padding = "5px";
        const o = g();
        t.innerHTML = `FPS: ${o}`, this._fpsEl = t, document.body.appendChild(t), clearInterval(this._fpsTickInterval), this._fpsTickInterval = setInterval(() => {
          if (!this._fpsEl)
            return;
          const i = g();
          this._fpsEl.innerHTML = `FPS: ${i}`;
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
    return await x(this._options.additionalFingerprintInfo);
  }
  async generateReport() {
    const e = this._options.getAdditionalInfo ? await this._options.getAdditionalInfo() : {}, t = {
      ...I(),
      gameName: this._options.gameName,
      gameVersion: this._options.gameVersion,
      additionalInfo: e
    }, o = this._options.reports || {};
    if (o.performance !== !1 && (t.performance = T()), o.network !== !1 && (t.network = await u(this._options.pingUrl)), o.window !== !1 && (t.window = b()), o.device !== !1 && (t.device = w()), o.graphicsDevice !== !1 && (t.graphicsDevice = y()), o.screenshot !== !1) {
      if (!this._options.canvasEl)
        throw new Error("No canvas element provided for screenshot.");
      t.screenshot = await k(this._options.canvasEl, this._options.canvasRenderFn);
    }
    o.location && (t.location = await R()), o.fingerprint !== !1 && (t.fingerprint = await this.getFingerprint()), o.fps !== !1 && (t.fps = g()), o.lastError !== !1 && (t.lastError = this._lastError);
    const i = JSON.stringify(t), a = btoa(i);
    if (this._options.outputToConsole && (console.log("=== Game Doctor Diagnostic Report ==="), console.log(JSON.stringify(JSON.parse(i), null, 4)), console.log("=== End of Report ===")), this._options.outputFormat === "image/png") {
      const r = this._encodeReportAsImage(t.reportId, a), c = r.toDataURL("image/png"), s = await new Promise((h) => {
        r.toBlob((m) => h(m), "image/png");
      });
      return this._options.copyToClipboard && (navigator.clipboard.write([
        new ClipboardItem({
          "image/png": s
        })
      ]), this._showNotice("Report copied to clipboard!")), c;
    } else {
      const r = this._options.outputFormat === "base64" ? a : i;
      return this._options.copyToClipboard && (navigator.clipboard.writeText(r), this._showNotice("Report copied to clipboard!")), r;
    }
  }
  static decodeBase64(e) {
    return JSON.parse(atob(e));
  }
  _encodeReportAsImage(e, t) {
    const o = document.createElement("canvas"), i = o.getContext("2d");
    o.width = Math.ceil(Math.sqrt(t.length)), o.height = o.width;
    let a;
    this._options.overlayImage && (i.drawImage(this._options.overlayImage, 0, 0, o.width, o.height), a = i.getImageData(0, 0, o.width, o.height)), o.width = Math.ceil(Math.sqrt(t.length)), o.height = o.width, i.fillStyle = "#000", i.fillRect(0, 0, o.width, o.height), i.font = "12px monospace", i.fillStyle = "#f00", i.fillText(e, 5, 15);
    const r = i.getImageData(0, 0, o.width, o.height), c = r.data;
    for (let s = 0; s < t.length; s++) {
      const h = s % o.width, l = (Math.floor(s / o.width) * o.width + h) * 4, _ = t[s].charCodeAt(0);
      c[l + 1] = a ? a.data[l + 1] : 0, c[l + 2] = _, c[l + 3] = 255;
    }
    return i.putImageData(r, 0, 0), o;
  }
  static async decodeImageUrl(e) {
    const t = new Image();
    t.src = e, await new Promise((s) => {
      t.onload = s;
    });
    const o = document.createElement("canvas");
    o.width = t.width, o.height = t.height;
    const i = o.getContext("2d");
    i.drawImage(t, 0, 0);
    const r = i.getImageData(0, 0, o.width, o.height).data;
    let c = "";
    for (let s = 0; s < r.length; s += 4) {
      const h = r[s + 2];
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
  D as GameDoctor,
  w as getDeviceInformation,
  x as getFingerprint,
  g as getFps,
  y as getGraphicsDeviceInformation,
  I as getInformation,
  R as getLocation,
  u as getNetworkInformation,
  T as getPerformanceInformation,
  k as getScreenshot,
  b as getWindowInformation,
  S as trackFps
};
