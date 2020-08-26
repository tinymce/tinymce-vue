import { ComponentPublicInstance } from 'vue';
declare const bindHandlers: (initEvent: Event, listeners: any, editor: any) => void;
declare const bindModelHandlers: (ctx: ComponentPublicInstance, editor: any) => void;
declare const initEditor: (initEvent: Event, ctx: ComponentPublicInstance, editor: any) => void;
declare const uuid: (prefix: string) => string;
declare const isTextarea: (element: Element | null) => element is HTMLTextAreaElement;
declare const mergePlugins: (initPlugins: string | string[], inputPlugins?: string | string[] | undefined) => string[];
declare const isNullOrUndefined: (value: any) => value is null | undefined;
export { bindHandlers, bindModelHandlers, initEditor, uuid, isTextarea, mergePlugins, isNullOrUndefined };
//# sourceMappingURL=Utils.d.ts.map