/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { uuid } from './Utils';

export type callbackFn = () => void;
export interface IStateObj {
  listeners: callbackFn[];
  scriptId: string;
  scriptLoaded: boolean;
}

const injectScriptTag = (
  scriptId: string,
  doc: Document,
  url: string,
  callback: callbackFn
) => {
  const scriptTag = doc.createElement('script');
  scriptTag.type = 'application/javascript';
  scriptTag.id = scriptId;
  scriptTag.addEventListener('load', callback);
  scriptTag.src = url;
  doc.head.appendChild(scriptTag);
};

export const create = (): IStateObj => {
  return {
    listeners: [],
    scriptId: uuid('tiny-script'),
    scriptLoaded: false
  };
};

export const load = (
  state: IStateObj,
  doc: Document,
  url: string,
  callback: callbackFn
) => {
  if (state.scriptLoaded) {
    callback();
  } else {
    state.listeners.push(callback);
    if (!doc.getElementById(state.scriptId)) {
      injectScriptTag(state.scriptId, doc, url, () => {
        state.listeners.forEach((fn) => fn());
        state.scriptLoaded = true;
      });
    }
  }
};
