export * from './util';
export type GameDoctorOptions = {
    gameName: string;
    gameVersion: string;
    copyToClipboard?: boolean;
    additionalFingerprintInfo?: any;
    canvasEl?: HTMLCanvasElement;
    canvasRenderFn?: () => Promise<void>;
    pingUrl?: string;
    attachToWindow?: boolean;
    getAdditionalInfo?: () => Promise<any>;
    outputToConsole?: boolean;
    outputFormat?: 'json' | 'base64' | 'image/png';
    overlayImage?: HTMLCanvasElement | HTMLImageElement;
    keyboardShortcuts?: {
        generateReport: {
            key: string;
            ctrlKey?: boolean;
            altKey?: boolean;
            shiftKey?: boolean;
            metaKey?: boolean;
        };
        toggleFps: {
            key: string;
            ctrlKey?: boolean;
            altKey?: boolean;
            shiftKey?: boolean;
            metaKey?: boolean;
        };
    };
    reports?: {
        performance?: boolean;
        network?: boolean;
        window?: boolean;
        device?: boolean;
        graphicsDevice?: boolean;
        screenshot?: boolean;
        location?: boolean;
        fingerprint?: boolean;
        fps?: boolean;
        lastError?: boolean;
    };
};
export declare class GameDoctor {
    private _options;
    private _lastError?;
    onTick: () => void;
    private _fpsTickInterval?;
    private _fpsEl?;
    private _noticeTimeout?;
    private _noticeEl?;
    constructor(options: GameDoctorOptions);
    private _showNotice;
    showFps(showFps?: boolean): void;
    hideFps(): void;
    setFingerprintInfo(info: any): void;
    getFingerprint(): Promise<string | {
        error: unknown;
    }>;
    generateReport(): Promise<string>;
    static decodeBase64(report: string): any;
    private _encodeReportAsImage;
    static decodeImageUrl(report: string): Promise<any>;
    static decodeImage(report: HTMLCanvasElement | HTMLImageElement): Promise<any>;
}
