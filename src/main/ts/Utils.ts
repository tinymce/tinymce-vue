/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue from 'vue';
import type { Editor as TinyMCEEditor, EditorEvent } from 'tinymce';

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
  'onCommentChange',
  'onCompositionEnd',
  'onCompositionStart',
  'onCompositionUpdate',
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
  'onInput',
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

const isValidKey = (key: string) =>
  validEvents.map((event) => event.toLowerCase()).indexOf(key.toLowerCase()) !== -1;

const bindHandlers = (initEvent: EditorEvent<any>, listeners: Record<string, any>, editor: TinyMCEEditor): void => {
  Object.keys(listeners)
    .filter(isValidKey)
    .forEach((key: string) => {
      const handler = listeners[key];
      if (typeof handler === 'function') {
        if (key === 'onInit') {
          handler(initEvent, editor);
        } else {
          editor.on(key.substring(2), (e: EditorEvent<any>) => handler(e, editor));
        }
      }
    });
};

const bindModelHandlers = (vm: Vue, editor: TinyMCEEditor) => {
  const modelEvents = vm.$props.modelEvents ? vm.$props.modelEvents : null;
  const normalizedEvents = Array.isArray(modelEvents) ? modelEvents.join(' ') : modelEvents;

  const unwatchModelValue = vm.$watch('modelValue', (val: string, prevVal: string) => {
    // @ts-expect-error - original code, types issue
    if (editor && typeof val === 'string' && val !== prevVal && val !== editor.getContent({ format: vm.$props.outputFormat })) {
      editor.setContent(val);
    }
  });

  editor.on(normalizedEvents ? normalizedEvents : 'change input undo redo', () => {
    vm.$emit('update:modelValue', editor.getContent({ format: vm.$props.outputFormat }));
  });

  return unwatchModelValue;
};

const initEditor = (
  initEvent: EditorEvent<any>,
  vm: Vue,
  editor: TinyMCEEditor,
  content: () => string) => {
  editor.setContent(content());
  const hasModelListener = !!vm.$listeners['update:modelValue'];
  const unwatchModelValue = hasModelListener ? bindModelHandlers(vm, editor) : undefined;
  bindHandlers(initEvent, vm.$listeners, editor);
  return unwatchModelValue;
};

let unique = 0;

const uuid = (prefix: string): string => {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

const isTextarea = (element: Element | null): element is HTMLTextAreaElement =>
  element !== null && element.tagName.toLowerCase() === 'textarea';

const normalizePluginArray = (plugins?: string | string[]): string[] => {
  if (typeof plugins === 'undefined' || plugins === '') {
    return [];
  }

  return Array.isArray(plugins) ? plugins : plugins.split(' ');
};

const mergePlugins = (initPlugins: string | string[] | undefined, inputPlugins?: string | string[]) =>
  normalizePluginArray(initPlugins).concat(normalizePluginArray(inputPlugins));

const isNullOrUndefined = (value: any): value is null | undefined =>
  value === null || value === undefined;

const isDisabledOptionSupported = (editor: TinyMCEEditor): boolean =>
  typeof editor.options?.set === 'function' && editor.options.isRegistered('disabled');

export {
  bindHandlers,
  bindModelHandlers,
  initEditor,
  isValidKey,
  uuid,
  isTextarea,
  mergePlugins,
  isNullOrUndefined,
  isDisabledOptionSupported
};
