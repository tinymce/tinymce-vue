/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { IPropTypes } from './EditorPropTypes';
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
export declare const Editor: import("vue").DefineComponent<import("./EditorPropTypes").CopyProps<IPropTypes>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
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
} & {}>, {
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
}>;
//# sourceMappingURL=Editor.d.ts.map