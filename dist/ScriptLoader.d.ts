export declare type callbackFn = () => void;
export interface IStateObj {
    listeners: callbackFn[];
    scriptId: string;
    scriptLoaded: boolean;
}
interface ScriptLoader {
    load: (doc: Document, url: string, callback: callbackFn) => void;
    reinitialize: () => void;
}
declare const ScriptLoader: ScriptLoader;
export { ScriptLoader };
//# sourceMappingURL=ScriptLoader.d.ts.map