declare global {
    interface Window {
        __frameTime: number;
    }
}
export declare function getInformation(): {
    reportId: string;
    date: string;
    timezone: number;
};
export declare function getPerformanceInformation(): any;
export declare function getNetworkInformation(pingUrl?: string): Promise<any>;
export declare function getWindowInformation(): {
    innerWidth: number;
    innerHeight: number;
    pixelRatio: number;
    href: string;
    title: string;
    isEmbedded: boolean;
    referrer: string;
    error?: undefined;
} | {
    error: unknown;
    innerWidth?: undefined;
    innerHeight?: undefined;
    pixelRatio?: undefined;
    href?: undefined;
    title?: undefined;
    isEmbedded?: undefined;
    referrer?: undefined;
};
export declare function getDeviceInformation(): {
    language: string;
    languages: string[];
    userAgent: string;
    deviceMemory: any;
    doNotTrack: string | null;
    hardwareConcurrency: number;
    maxTouchPoints: number;
    error?: undefined;
} | {
    error: unknown;
    language?: undefined;
    languages?: undefined;
    userAgent?: undefined;
    deviceMemory?: undefined;
    doNotTrack?: undefined;
    hardwareConcurrency?: undefined;
    maxTouchPoints?: undefined;
};
export declare function getGraphicsDeviceInformation(): {
    renderer: any;
    rendererUnmasked: any;
    vendor: any;
    vendorUnmasked: any;
    error?: undefined;
} | {
    error: unknown;
    renderer?: undefined;
    rendererUnmasked?: undefined;
    vendor?: undefined;
    vendorUnmasked?: undefined;
};
export declare function getScreenshot(sourceCanvas: HTMLCanvasElement, renderFn?: () => Promise<void>): Promise<string | {
    error: unknown;
}>;
export declare function getLocation(): Promise<unknown> | {
    error: unknown;
};
export declare function getFingerprint(additionalInfo?: {}): Promise<string | {
    error: unknown;
}>;
export declare function trackFps(smoothingStrength?: number): () => void;
export declare function getFps(): string | -1 | {
    error: unknown;
};
