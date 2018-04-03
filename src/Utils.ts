/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { IEditor } from './components/Editor';

const validEvents = [
  'onActivate',
  'onAddUndo',
  'onBeforeAddUndo',
  'onBeforeExecCommand',
  'onBeforeGetContent',
  'onBeforeRenderUI',
  'onBeforeSetContent',
  'onBeforePaste',
  'onBlur',
  'onChange',
  'onClearUndos',
  'onClick',
  'onContextMenu',
  'onCopy',
  'onCut',
  'onDblclick',
  'onDeactivate',
  'onDirty',
  'onDrag',
  'onDragDrop',
  'onDragEnd',
  'onDragGesture',
  'onDragOver',
  'onDrop',
  'onExecCommand',
  'onFocus',
  'onFocusIn',
  'onFocusOut',
  'onGetContent',
  'onHide',
  'onInit',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onLoadContent',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onNodeChange',
  'onObjectResizeStart',
  'onObjectResized',
  'onObjectSelected',
  'onPaste',
  'onPostProcess',
  'onPostRender',
  'onPreInit',
  'onPreProcess',
  'onProgressState',
  'onRedo',
  'onRemove',
  'onReset',
  'onSaveContent',
  'onSelectionChange',
  'onSetAttrib',
  'onSetContent',
  'onShow',
  'onSubmit',
  'onUndo',
  'onVisualAid'
];

const isValidKey = (key: string) => validEvents.indexOf(key) !== -1;

export const bindHandlers = (listeners: any, editor: any): void => {
  Object.keys(listeners)
    .filter(isValidKey)
    .forEach((key: string) => {
      const handler = listeners[key];
      if (typeof handler === 'function') {
        editor.on(key.substring(2), (e: any) => handler(e, editor));
      }
    });
};

export const bindModelHandlers = (ctx: IEditor, editor: any) => {
  const modelEvents = ctx.$props.modelEvents ? ctx.$props.modelEvents : null;
  const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents;
  let currentContent: any;

  ctx.$watch('value', (val: string, prevVal: string) => {
    if (editor && typeof val === 'string' && val !== currentContent && val !== prevVal) {
      editor.setContent(val);
      currentContent = val;
    }
  });

  editor.on(normalizedEvents ? normalizedEvents : 'change keyup', () => {
    currentContent = editor.getContent();
    ctx.$emit('input', currentContent);
  });
};

export const initEditor = (ctx: IEditor, editor: any) => {
  const value = ctx.$props.value ? ctx.$props.value : '';
  const initialValue = ctx.$props.initialValue ? ctx.$props.initialValue : '';

  editor.setContent(value || initialValue);

  // checks if the v-model shorthand is used (which sets an v-on:input listener) and then binds either
  // specified the events or defaults to "change keyup" event and emits the editor content on that event
  if (ctx.$listeners.input) {
    bindModelHandlers(ctx, editor);
  }

  bindHandlers(ctx.$listeners, editor);
};

let unique = 0;

export const uuid = (prefix: string): string => {
  const date = new Date();
  const time = date.getTime();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

export const isTextarea = (element: Element | null): element is HTMLTextAreaElement => {
  return element !== null && element.tagName.toLowerCase() === 'textarea';
};

const normalizePluginArray = (plugins?: string | string[]): string[] => {
  if (typeof plugins === 'undefined' || plugins === '') {
    return [];
  }

  return Array.isArray(plugins) ? plugins : plugins.split(' ');
};

export const mergePlugins = (initPlugins: string | string[], inputPlugins?: string | string[]) =>
  normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));
