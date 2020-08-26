/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IPropTypes } from './EditorPropTypes';
import { ComponentPublicInstance } from 'vue';
export interface IEditor {
    $props: Partial<IPropTypes>;
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        elementId: string;
        element: Element | null;
        editor: any;
        inlineEditor: boolean;
        $props: Partial<IPropTypes>;
    }
}
export declare const Editor: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: {
            apiKey: any;
            cloudChannel: any;
            id: any;
            init: any;
            initialValue: any;
            outputFormat: any;
            inline: any;
            modelEvents: any;
            plugins: any;
            tagName: any;
            toolbar: any;
            modelValue: any;
            disabled: any;
            tinymceScriptSrc: any;
        } & {} & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
        $attrs: Record<string, unknown>;
        $refs: Record<string, unknown>;
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, string>> | null;
        $parent: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, string>> | null;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<{
            apiKey: any;
            cloudChannel: any;
            id: any;
            init: any;
            initialValue: any;
            outputFormat: any;
            inline: any;
            modelEvents: any;
            plugins: any;
            tagName: any;
            toolbar: any;
            modelValue: any;
            disabled: any;
            tinymceScriptSrc: any;
        } & {}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>;
        $forceUpdate: import("vue").ReactiveEffect<any>;
        $nextTick: typeof import("vue").nextTick;
        $watch: (this: import("vue").ComponentInternalInstance, source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean> | undefined) => import("vue").WatchStopHandle;
    } & {
        apiKey: any;
        cloudChannel: any;
        id: any;
        init: any;
        initialValue: any;
        outputFormat: any;
        inline: any;
        modelEvents: any;
        plugins: any;
        tagName: any;
        toolbar: any;
        modelValue: any;
        disabled: any;
        tinymceScriptSrc: any;
    } & {} & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties & Readonly<{
        apiKey: any;
        cloudChannel: any;
        id: any;
        init: any;
        initialValue: any;
        outputFormat: any;
        inline: any;
        modelEvents: any;
        plugins: any;
        tagName: any;
        toolbar: any;
        modelValue: any;
        disabled: any;
        tinymceScriptSrc: any;
    } & {}>;
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<{
    apiKey: any;
    cloudChannel: any;
    id: any;
    init: any;
    initialValue: any;
    outputFormat: any;
    inline: any;
    modelEvents: any;
    plugins: any;
    tagName: any;
    toolbar: any;
    modelValue: any;
    disabled: any;
    tinymceScriptSrc: any;
} & {}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: import("./EditorPropTypes").CopyProps<IPropTypes> & ThisType<void>;
} & ThisType<ComponentPublicInstance<Readonly<{
    apiKey: any;
    cloudChannel: any;
    id: any;
    init: any;
    initialValue: any;
    outputFormat: any;
    inline: any;
    modelEvents: any;
    plugins: any;
    tagName: any;
    toolbar: any;
    modelValue: any;
    disabled: any;
    tinymceScriptSrc: any;
} & {}>, {}, {}, {}, {}, Record<string, any>, Readonly<{
    apiKey: any;
    cloudChannel: any;
    id: any;
    init: any;
    initialValue: any;
    outputFormat: any;
    inline: any;
    modelEvents: any;
    plugins: any;
    tagName: any;
    toolbar: any;
    modelValue: any;
    disabled: any;
    tinymceScriptSrc: any;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    apiKey: any;
    cloudChannel: any;
    id: any;
    init: any;
    initialValue: any;
    outputFormat: any;
    inline: any;
    modelEvents: any;
    plugins: any;
    tagName: any;
    toolbar: any;
    modelValue: any;
    disabled: any;
    tinymceScriptSrc: any;
} & {}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
//# sourceMappingURL=Editor.d.ts.map