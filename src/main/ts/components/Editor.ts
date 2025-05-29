/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ScriptLoader } from '../ScriptLoader';
import { getTinymce } from '../TinyMCE';
import { isTextarea, mergePlugins, uuid, isNullOrUndefined, initEditor, isDisabledOptionSupported } from '../Utils';
import { editorProps, IPropTypes } from './EditorPropTypes';
import { h, defineComponent, onMounted, ref, Ref, toRefs, nextTick, watch, onBeforeUnmount, onActivated, onDeactivated } from 'vue';
import type { Editor as TinyMCEEditor, EditorEvent, TinyMCE } from 'tinymce';

type EditorOptions = Parameters<TinyMCE['init']>[0];

const renderInline = (ce: any, id: string, elementRef: Ref<Element | null>, tagName?: string) =>
  ce(tagName ? tagName : 'div', {
    id,
    ref: elementRef
  });

const renderIframe = (ce: any, id: string, elementRef: Ref<Element | null>) =>
  ce('textarea', {
    id,
    visibility: 'hidden',
    ref: elementRef
  });

const defaultInitValues = { selector: undefined, target: undefined };

const setMode = (editor: TinyMCEEditor, mode: 'readonly' | 'design') => {
  if (typeof editor.mode?.set === 'function') {
    editor.mode.set(mode);
  } else {
    // TinyMCE v4
    (editor as any).setMode(mode);
  }
};

export const Editor = defineComponent({
  props: editorProps,
  setup: (props: IPropTypes, ctx) => {
    let conf = props.init ? { ...props.init, ...defaultInitValues } : { ...defaultInitValues };
    const { disabled, readonly, modelValue, tagName } = toRefs(props);
    const element: Ref<Element | null> = ref(null);
    let vueEditor: TinyMCEEditor | null = null;
    const elementId: string = props.id || uuid('tiny-vue');
    const inlineEditor: boolean = (props.init && props.init.inline) || props.inline;
    const modelBind = !!ctx.attrs['onUpdate:modelValue'];
    let mounting = true;
    const initialValue: string = props.initialValue ? props.initialValue : '';
    let cache = '';

    const getContent = (isMounting: boolean): () => string => modelBind ?
      () => (modelValue?.value ? modelValue.value : '') :
      () => isMounting ? initialValue : cache;

    const initWrapper = (): void => {
      const content = getContent(mounting);
      const finalInit = {
        ...conf,
        disabled: props.disabled,
        readonly: props.readonly,
        target: element.value,
        plugins: mergePlugins(conf.plugins, props.plugins),
        toolbar: props.toolbar || (conf.toolbar),
        inline: inlineEditor,
        license_key: props.licenseKey,
        setup: (editor: TinyMCEEditor) => {
          vueEditor = editor;

          if (!isDisabledOptionSupported(vueEditor) && props.disabled === true) {
            setMode(vueEditor, 'readonly');
          }

          editor.on('init', (e: EditorEvent<any>) => initEditor(e, props, ctx, editor, modelValue, content));
          if (typeof conf.setup === 'function') {
            conf.setup(editor);
          }
        }
      };
      if (isTextarea(element.value)) {
        element.value.style.visibility = '';
      }
      getTinymce().init(finalInit);
      mounting = false;
    };
    watch(readonly, (isReadonly) => {
      if (vueEditor !== null) {
        setMode(vueEditor, isReadonly ? 'readonly' : 'design');
      }
    });
    watch(disabled, (isDisabled) => {
      if (vueEditor !== null) {
        if (isDisabledOptionSupported(vueEditor)) {
          vueEditor.options.set('disabled', isDisabled);
        } else {
          setMode(vueEditor, isDisabled ? 'readonly' : 'design');
        }
      }
    });
    watch(tagName, (_) => {
      if (vueEditor) {
        if (!modelBind) {
          cache = vueEditor.getContent();
        }
        getTinymce()?.remove(vueEditor);
        nextTick(() => initWrapper());
      }
    });
    onMounted(() => {
      if (getTinymce() !== null) {
        initWrapper();
      } else if (element.value && element.value.ownerDocument) {
        const channel = props.cloudChannel ? props.cloudChannel : '7';
        const apiKey = props.apiKey ? props.apiKey : 'no-api-key';
        const scriptSrc: string = isNullOrUndefined(props.tinymceScriptSrc) ?
          `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js` :
          props.tinymceScriptSrc;
        ScriptLoader.load(
          element.value.ownerDocument,
          scriptSrc,
          initWrapper
        );
      }
    });
    onBeforeUnmount(() => {
      if (getTinymce() !== null) {
        getTinymce().remove(vueEditor);
      }
    });
    if (!inlineEditor) {
      onActivated(() => {
        if (!mounting) {
          initWrapper();
        }
      });
      onDeactivated(() => {
        if (vueEditor) {
          if (!modelBind) {
            cache = vueEditor.getContent();
          }
          getTinymce()?.remove(vueEditor);
        }
      });
    }
    const rerender = (init: EditorOptions) => {
      if (vueEditor) {
        cache = vueEditor.getContent();
        getTinymce()?.remove(vueEditor);
        conf = { ...conf, ...init, ...defaultInitValues };
        nextTick(() => initWrapper());
      }
    };
    ctx.expose({
      rerender,
      getEditor: () => vueEditor
    });
    return () => inlineEditor ?
      renderInline(h, elementId, element, props.tagName) :
      renderIframe(h, elementId, element);
  }
});
