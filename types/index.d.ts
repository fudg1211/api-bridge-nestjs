export declare const Config: {
    outputDir: string;
    tplFile: string;
    remoteUrl: string;
    apis: never[];
};
export declare const Build: {
    sourceData: string;
    initDir(): Promise<void>;
    initSource(): Promise<void>;
    init(): Promise<void>;
    genApiFile(): Promise<void>;
};
