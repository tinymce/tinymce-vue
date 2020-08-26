/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
export declare type CopyProps<T> = {
    [P in keyof T]: any;
};
export interface IPropTypes {
    apiKey: string;
    cloudChannel: string;
    id: string;
    init: any;
    initialValue: string;
    outputFormat: 'html' | 'text';
    inline: boolean;
    modelEvents: string[] | string;
    plugins: string[] | string;
    tagName: string;
    toolbar: string[] | string;
    modelValue: string;
    disabled: boolean;
    tinymceScriptSrc: string;
}
export declare const editorProps: CopyProps<IPropTypes>;
//# sourceMappingURL=EditorPropTypes.d.ts.map