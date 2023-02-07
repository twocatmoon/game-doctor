import { getDeviceInformation, getFingerprint, getFps, getGraphicsDeviceInformation, getInformation, getLocation, getNetworkInformation, getPerformanceInformation, getScreenshot, getWindowInformation, trackFps } from './util'

export * from './util'

export type GameDoctorOptions = {
    gameName: string
    gameVersion: string
    copyToClipboard?: boolean
    additionalFingerprintInfo?: any
    canvasEl?: HTMLCanvasElement
    canvasRenderFn?: () => Promise<void>
    pingUrl?: string
    attachToWindow?: boolean
    getAdditionalInfo?: () => Promise<any>
    outputToConsole?: boolean
    outputFormat?: 'json' | 'base64' | 'image/png'
    overlayImage?: HTMLCanvasElement | HTMLImageElement
    keyboardShortcuts?: {
        generateReport: {
            key: string
            ctrlKey?: boolean
            altKey?: boolean
            shiftKey?: boolean
            metaKey?: boolean
        },
        toggleFps: {
            key: string
            ctrlKey?: boolean
            altKey?: boolean
            shiftKey?: boolean
            metaKey?: boolean
        },
    }
    reports?: {
        performance?: boolean
        network?: boolean
        window?: boolean
        device?: boolean
        graphicsDevice?: boolean
        screenshot?: boolean
        location?: boolean
        fingerprint?: boolean
        fps?: boolean
        lastError?: boolean
    }
}

export class GameDoctor {
    private _options: GameDoctorOptions
    private _lastError?: [any, string?, number?]
    onTick: () => void

    private _fpsTickInterval?: number
    private _fpsEl?: HTMLDivElement

    constructor (options: GameDoctorOptions) {
        this._options = options
        this.onTick = trackFps()

        if (this._options.reports?.lastError !== false) {
            window.onerror = (error, url, line) => {
                this._lastError = [error, url, line]
            }
        }

        if (this._options.attachToWindow) {
            // @ts-ignore
            window['__generateReport'] = this.generateReport.bind(this)
            // @ts-ignore
            window['__toggleFps'] = this.showFps.call(this, this._fpsEl)
        }

        if (this._options.keyboardShortcuts?.generateReport) {
            const keyboardOptions = this._options.keyboardShortcuts.generateReport

            window.addEventListener('keydown', (event) => {
                if (event.key.toLowerCase() === keyboardOptions.key.toLowerCase()) {
                    if (keyboardOptions.altKey && !event.altKey) return
                    if (keyboardOptions.ctrlKey && !event.ctrlKey) return
                    if (keyboardOptions.shiftKey && !event.shiftKey) return
                    if (keyboardOptions.metaKey && !event.metaKey) return

                    this.generateReport()
                }
            })
        }

        if (this._options.keyboardShortcuts?.toggleFps) {
            const keyboardOptions = this._options.keyboardShortcuts.toggleFps

            window.addEventListener('keydown', (event) => {
                if (event.key.toLowerCase() === keyboardOptions.key.toLowerCase()) {
                    if (keyboardOptions.altKey && !event.altKey) return
                    if (keyboardOptions.ctrlKey && !event.ctrlKey) return
                    if (keyboardOptions.shiftKey && !event.shiftKey) return
                    if (keyboardOptions.metaKey && !event.metaKey) return

                    this.showFps(!this._fpsEl)
                }
            })
        }
    }

    showFps (showFps = true) {
        if (showFps && this._fpsEl) return

        if (showFps) {
            const el = document.createElement('div')
            el.style.position = 'fixed'
            el.style.top = '0'
            el.style.right = '0'
            el.style.zIndex = Number.MAX_SAFE_INTEGER.toString()
            el.style.backgroundColor = '#000'
            el.style.color = '#fff'
            el.style.fontFamily = 'monospace'
            el.style.fontSize = '12px'
            el.style.padding = '5px'

            const fps = getFps()
            el.innerHTML = `FPS: ${fps}`

            this._fpsEl = el
            document.body.appendChild(el)

            clearInterval(this._fpsTickInterval)
            this._fpsTickInterval = setInterval(() => {
                if (!this._fpsEl) return

                const fps = getFps()
                this._fpsEl.innerHTML = `FPS: ${fps}`
            }, 1000) as unknown as number
        }

        else {
            if (this._fpsEl) {
                document.body.removeChild(this._fpsEl)
                this._fpsEl = undefined
            }

            clearInterval(this._fpsTickInterval)
        }
    }

    hideFps () {
        this.showFps(false)
    }

    setFingerprintInfo (info: any) {
        this._options.additionalFingerprintInfo = info
    }
    
    async getFingerprint () {
        return await getFingerprint(this._options.additionalFingerprintInfo)
    }

    async generateReport () {
        const additionalInfo = this._options.getAdditionalInfo 
            ? await this._options.getAdditionalInfo() 
            : {}
        
        const report: any = {
            ...getInformation(),
            gameName: this._options.gameName,
            gameVersion: this._options.gameVersion,
            additionalInfo,
        }

        const options = this._options.reports || {}

        if (options.performance !== false) {
            report.performance = getPerformanceInformation()
        }

        if (options.network !== false) {
            report.network = await getNetworkInformation(this._options.pingUrl)
        }

        if (options.window !== false) {
            report.window = getWindowInformation()
        }

        if (options.device !== false) {
            report.device = getDeviceInformation()
        }

        if (options.graphicsDevice !== false) {
            report.graphicsDevice = getGraphicsDeviceInformation()
        }

        if (options.screenshot !== false) {
            if (!this._options.canvasEl) throw new Error('No canvas element provided for screenshot.')
            report.screenshot = await getScreenshot(this._options.canvasEl!, this._options.canvasRenderFn)
        }

        if (options.location) {
            report.location = await getLocation()
        }

        if (options.fingerprint !== false) {
            report.fingerprint = await this.getFingerprint()
        }

        if (options.fps !== false) {
            report.fps = getFps()
        }

        if (options.lastError !== false) {
            report.lastError = this._lastError
        }

        const jsonResult = JSON.stringify(report)
        const base64Result = btoa(jsonResult)

        if (this._options.outputToConsole) {
            console.log('=== Game Doctor Diagnostic Report ===')
            console.log(JSON.stringify(JSON.parse(jsonResult), null, 4))
            console.log('=== End of Report ===')
        }

        if (this._options.outputFormat === 'image/png') {
            const canvas = this._encodeReportAsImage(report.reportId, base64Result)
            const dataUrl = canvas.toDataURL('image/png')
            const blob = await new Promise<Blob>((resolve) => {
                canvas.toBlob((blob: Blob | null) => resolve(blob!), 'image/png')
            })

            if (this._options.copyToClipboard) {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ])
            }

            return dataUrl
        }

        else {
            const output = this._options.outputFormat === 'base64' 
                ? base64Result 
                : jsonResult

            if (this._options.copyToClipboard) {
                navigator.clipboard.writeText(output)
            }

            return output
        }
    }

    static decodeBase64 (report: string) {
        return JSON.parse(atob(report))
    }

    private _encodeReportAsImage (id: string, base64: string) {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')!

        canvas.width = Math.ceil(Math.sqrt(base64.length))
        canvas.height = canvas.width

        let overlayImageData: ImageData | undefined
        if (this._options.overlayImage) {
            context.drawImage(this._options.overlayImage, 0, 0, canvas.width, canvas.height)
            overlayImageData = context.getImageData(0, 0, canvas.width, canvas.height)
        }

        canvas.width = Math.ceil(Math.sqrt(base64.length))
        canvas.height = canvas.width

        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.font = '12px monospace'
        context.fillStyle = '#f00'
        context.fillText(id, 5, 15)

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        for (let i = 0; i < base64.length; i++) {
            const x = i % canvas.width
            const y = Math.floor(i / canvas.width)
            const index = (y * canvas.width + x) * 4
            const value = base64[i].charCodeAt(0)

            // data[index + 0] = 0
            data[index + 1] = overlayImageData ? overlayImageData.data[index + 1] : 0
            data[index + 2] = value
            data[index + 3] = 255
        }

        context.putImageData(imageData, 0, 0)

        return canvas
    }

    static async decodeImageUrl (report: string) {
        const image = new Image()
        image.src = report

        await new Promise((resolve) => {
            image.onload = resolve
        })

        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        const context = canvas.getContext('2d')!
        context.drawImage(image, 0, 0)

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        let base64 = ''
        for (let i = 0; i < data.length; i += 4) {
            const color = data[i + 2]
            if (color === 0) break
            base64 += String.fromCharCode(color)
        }

        return this.decodeBase64(base64)
    }

    static async decodeImage (report: HTMLCanvasElement | HTMLImageElement) {
        const canvas = document.createElement('canvas')
        canvas.width = report.width
        canvas.height = report.height

        const context = canvas.getContext('2d')!
        context.drawImage(report, 0, 0)

        return await this.decodeImageUrl(canvas.toDataURL('image/png'))
    }
}
