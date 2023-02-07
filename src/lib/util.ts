declare global {
    interface Window { __frameTime: number }
}

function applyValues (to: any, from: any) {
    for (const key in from) {
        if (!from[ key ] || typeof from[ key ] === 'function') {
            continue
        }
        to[ key ] = from[ key ]
    }

    return to
}

function serialize (obj: any) {
    try {
        const result = {} as any
        for (const key in obj) {
            if (!!obj[ key ]) {
                result[ key ] = obj[ key ]
            }
        }
        return JSON.parse(JSON.stringify(result))
    } catch (error) {
        throw error
    }
}

export function getInformation () {
    return {
        reportId: Math.random().toString(16).slice(2),
        date: new Date().toISOString(),
        timezone: new Date().getTimezoneOffset(),
    }
}

export function getPerformanceInformation () {
    try {
        const info = applyValues({}, performance)

        // Serialize event counts
        info.eventCounts = {}
        applyValues(info.eventCounts, performance.eventCounts)

        // Serialize memory information
        info.memory = {}
        // @ts-ignore
        applyValues(info.memory, performance.memory || console.memory || {})

        return serialize(info)
    }

    catch (error) {
        return { error }
    }
}

export async function getNetworkInformation (pingUrl?: string) {
    try {
        // @ts-ignore
        const info = applyValues({}, navigator.connection)

        try {
            const ipResponse = await fetch('https://api.ipify.org/?format=json')
            const ipResponseData = await ipResponse.json()
            info.ipAddress = ipResponseData.ip
        } catch (error) {
            info.ipAddress = { error }
        }

        if (pingUrl) {
            try {
                const started = performance.now()
                const image = new Image()
                await new Promise((resolve) => {
                    image.onload = resolve
                    image.onerror = resolve
                    image.src = pingUrl
                })
                info.ping = performance.now() - started
            } catch (error) {
                info.ping = { error }
            }
        }

        return serialize(info)
    }

    catch (error) {
        return { error }
    }
}

export function getWindowInformation () {
    try {
        return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            pixelRatio: window.devicePixelRatio,
            href: window.location.href,
            title: window.document.title,
            isEmbedded: window.top !== window.self,
            referrer: document.referrer,
        }
    }

    catch (error) {
        return { error }
    }
}

export function getDeviceInformation () {
    try {
        return {
            language: navigator.language,
            languages: navigator.languages as string[],
            userAgent: navigator.userAgent,
            deviceMemory: (navigator as any).deviceMemory || -1,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency || -1,
            maxTouchPoints: navigator.maxTouchPoints || 0,
        }
    }

    catch (error) {
        return { error }
    }
}

export function getGraphicsDeviceInformation () {
    try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl')

        if (!gl) {
            return {
                error: new Error('Unable to get WebGL context.')
            }
        }

        const renderInfo = gl!.getExtension('WEBGL_debug_renderer_info')

        return {
            renderer: gl.getParameter(gl.RENDERER),
            rendererUnmasked: renderInfo && gl.getParameter(renderInfo.UNMASKED_RENDERER_WEBGL),
            vendor: gl.getParameter(gl.VENDOR),
            vendorUnmasked: renderInfo && gl.getParameter(renderInfo.UNMASKED_VENDOR_WEBGL),
        }
    } 
    
    catch (error) {
        return { error }
    }
}

export async function getScreenshot (sourceCanvas: HTMLCanvasElement, renderFn?: () => Promise<void>) {
    try {
        const canvas = document.createElement('canvas')
        const scale = Math.min(512 / canvas.width, 512 / canvas.height)
        canvas.width = canvas.width * scale
        canvas.height = canvas.height * scale

        const context = canvas.getContext('2d')!

        if (renderFn) await renderFn()
        context.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height)

        return canvas.toDataURL('image/jpeg', 65)
    }

    catch (error) {
        return { error }
    }
}

export function getLocation () {
    try {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(serialize(position.coords)),
                (error) => reject({ error }),
                { 
                    enableHighAccuracy: true, 
                    timeout: 5000, 
                    maximumAge: 0,
                }
            )
        })
    }

    catch (error) {
        return { error }
    }
}

export async function getFingerprint (additionalInfo = {}) {
    try {
        const encoder = new TextEncoder()
        const data = encoder.encode(JSON.stringify({
            ...getDeviceInformation(),
            ...getGraphicsDeviceInformation(),
            ...getNetworkInformation(),
            additionalInfo,
        }))

        const hashBuffer = await crypto.subtle.digest('SHA-256', data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        
        return hashArray
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('')
    }

    catch (error) {
        return { error }
    }
}

export function trackFps (smoothingStrength = 20) {
    window.__frameTime = 0

    let lastTick = performance.now()

    const onTick = () => {
        const deltaTime = (performance.now() - lastTick)
        window.__frameTime += (deltaTime - window.__frameTime) / smoothingStrength
        lastTick = performance.now()
    }

    return onTick
}

export function getFps () {
    try {
        if (window.__frameTime === undefined) return -1
        return (1000 / window.__frameTime).toFixed(1)
    } catch (error) {
        return { error }
    }
}
