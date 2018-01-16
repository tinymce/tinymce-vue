/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type CopyProps<T> = {
  [P in keyof T]: any
};

export interface IPropTypes {
  apiKey: string;
  cloudChannel: string;
  id: string;
  init: any;
  initialValue: string;
  inline: boolean;
  modelEvents: string[] | string;
  plugins: string[] | string;
  tagName: string;
  toolbar: string[] | string;
  value: string;
}

export const editorProps: CopyProps<IPropTypes> = {
  apiKey: String,
  cloudChannel: {
    validator: (val: string) => {
      const validChannels = ['stable', 'testing', 'dev'];
      if (validChannels.indexOf(val.toLowerCase()) !== -1) {
        return true;
      } else {
        // tslint:disable-next-line:no-console
        console.error(`VALIDATION ERROR! cloudChannel should be one of: ${validChannels.join(', ')}`);
        return false;
      }
    }
  },
  id: String,
  init: Object,
  initialValue: String,
  inline: Boolean,
  modelEvents: [String, Array],
  plugins: [String, Array],
  tagName: String,
  toolbar: [String, Array],
  value: String
};
