/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue, { CreateElement, VNode } from 'vue';
import { ScriptLoader } from '../ScriptLoader';
import { getTinymce } from '../TinyMCE';
import { isTextarea, mergePlugins, uuid, isNullOrUndefined, initEditor, isDisabledOptionSupported } from '../Utils';
import { editorProps } from './EditorPropTypes';
import type { Editor as TinyMCEEditor, EditorEvent, TinyMCE } from 'tinymce';

type EditorOptions = Parameters<TinyMCE['init']>[0];

const renderInline = (h: CreateElement, id: string, tagName?: string) =>
  h(tagName ? tagName : 'div', {
    attrs: { id },
    ref: 'element'
  });

const renderIframe = (h: CreateElement, id: string) =>
  h('textarea', {
    attrs: { id },
    style: { visibility: 'hidden' },
    ref: 'element'
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

export const Editor = Vue.extend({
  name: 'Editor',
  props: editorProps,
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  data() {
    return {
      conf: this.init ? { ...this.init, ...defaultInitValues } : { ...defaultInitValues },
      element: null as Element | null,
      vueEditor: null as TinyMCEEditor | null,
      elementId: this.id || uuid('tiny-vue'),
      inlineEditor: (this.init && (this.init as any).inline) || this.inline,
      mounting: true,
      cache: '',
      modelUnwatch: undefined as undefined | (() => void)
    };
  },
  computed: {
    modelBind(): boolean {
      return !!this.$listeners['update:modelValue'];
    }
  },
  watch: {
    readonly(isReadonly: boolean) {
      if (this.vueEditor !== null) {
        setMode(this.vueEditor, isReadonly ? 'readonly' : 'design');
      }
    },
    disabled(isDisabled: boolean) {
      if (this.vueEditor !== null) {
        if (isDisabledOptionSupported(this.vueEditor)) {
          this.vueEditor.options.set('disabled', isDisabled);
        } else {
          setMode(this.vueEditor, isDisabled ? 'readonly' : 'design');
        }
      }
    },
    tagName() {
      if (this.vueEditor) {
        if (!this.modelBind) {
          this.cache = this.vueEditor.getContent();
        }
        getTinymce()?.remove(this.vueEditor);
        this.modelUnwatch?.();
        this.modelUnwatch = undefined;
        this.$nextTick(() => this.initWrapper());
      }
    }
  },
  mounted() {
    this.element = this.$refs.element as Element | null;
    if (getTinymce() !== null) {
      this.initWrapper();
    } else if (this.element && this.element.ownerDocument) {
      const channel = this.cloudChannel ? this.cloudChannel : '8';
      const apiKey = this.apiKey ? this.apiKey : 'no-api-key';
      const scriptSrc: string = isNullOrUndefined(this.tinymceScriptSrc) ?
        `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js` :
        this.tinymceScriptSrc as string;
      ScriptLoader.load(
        this.element.ownerDocument,
        scriptSrc,
        () => this.initWrapper()
      );
    }
  },
  beforeDestroy() {
    if (getTinymce() !== null) {
      getTinymce().remove(this.vueEditor);
    }
    this.modelUnwatch?.();
    this.modelUnwatch = undefined;
  },
  activated() {
    if (!this.inlineEditor && !this.mounting) {
      this.initWrapper();
    }
  },
  deactivated() {
    if (!this.inlineEditor && this.vueEditor) {
      if (!this.modelBind) {
        this.cache = this.vueEditor.getContent();
      }
      getTinymce()?.remove(this.vueEditor);
      this.modelUnwatch?.();
      this.modelUnwatch = undefined;
    }
  },
  methods: {
    getContent(isMounting: boolean): () => string {
      if (this.modelBind) {
        return () => (this.modelValue ? this.modelValue as string : '');
      } else {
        const initialValue: string = this.initialValue ? this.initialValue as string : '';
        return () => isMounting ? initialValue : this.cache;
      }
    },
    initWrapper(): void {
      if (!this.element) {
        return;
      }
      const content = this.getContent(this.mounting);
      const finalInit = {
        ...this.conf,
        disabled: this.disabled,
        readonly: this.readonly,
        target: this.element,
        plugins: mergePlugins((this.conf as EditorOptions).plugins, this.plugins as string | string[]),
        toolbar: this.toolbar || (this.conf as EditorOptions).toolbar,
        inline: this.inlineEditor,
        license_key: this.licenseKey,
        setup: (editor: TinyMCEEditor) => {
          this.vueEditor = editor;

          if (!isDisabledOptionSupported(editor) && this.disabled === true) {
            setMode(editor, 'readonly');
          }

          editor.on('init', (e: EditorEvent<any>) => {
            this.modelUnwatch?.();
            this.modelUnwatch = initEditor(e, this as Vue, editor, content);
          });

          (this.conf as EditorOptions).setup?.(editor);
        }
      };
      if (isTextarea(this.element)) {
        (this.element as HTMLTextAreaElement).style.visibility = '';
      }
      getTinymce().init(finalInit);
      this.mounting = false;
    },
    rerender(init: EditorOptions) {
      if (this.vueEditor) {
        this.cache = this.vueEditor.getContent();
        getTinymce()?.remove(this.vueEditor);
        this.modelUnwatch?.();
        this.modelUnwatch = undefined;
        this.conf = { ...this.conf, ...init, ...defaultInitValues };

        this.$nextTick(() => this.initWrapper());
      }
    },
    getEditor() {
      return this.vueEditor;
    }
  },
  render(h: CreateElement): VNode {
    return this.inlineEditor ?
      renderInline(h, this.elementId as string, this.tagName as string) :
      renderIframe(h, this.elementId as string);
  }
});
