/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue, { CreateElement, VNode, VueConstructor } from 'vue';
import * as ScriptLoader from '../ScriptLoader';
import { getTinymce } from '../TinyMCE';
import { bindHandlers, bindModelHandlers, isTextarea, uuid } from '../Utils';
import { editorProps, IPropTypes } from './EditorPropTypes';

const scriptState = ScriptLoader.create();

export interface IEditor extends Vue {
  $props: IPropTypes;
  elementId: string;
  element: Element | null;
  editor: any;
}

const renderInline = (createElement: CreateElement, tagName: string, id: string): VNode => {
  return createElement(tagName ? tagName : 'div', {
    attrs: { id }
  });
};

const renderIframe = (createElement: CreateElement, id: string): VNode => {
  return createElement('textarea', {
    attrs: { id },
    style: { visibility: 'hidden' }
  });
};

const initialise = (ctx: IEditor) => () => {
  const initialValue = ctx.$props.initialValue ? ctx.$props.initialValue : '';
  const value = ctx.$props.value ? ctx.$props.value : '';
  const finalInit = {
    ...ctx.$props.init,
    selector: `#${ctx.elementId}`,
    inline: ctx.$props.inline,
    setup: (editor: any) => {
      ctx.editor = editor;
      editor.on('init', () => editor.setContent(initialValue || value));

      // checks if the v-model shorthand is used (which sets an v-on:input listener) and then binds either
      // specified the events or defaults to "change" event and emits the editor content on that event
      if (ctx.$listeners.input) {
        bindModelHandlers(ctx, editor);
      }

      bindHandlers(ctx.$listeners, editor);

      if (ctx.$props.init && typeof ctx.$props.init.setup === 'function') {
        ctx.$props.init.setup(editor);
      }
    }
  };

  if (isTextarea(ctx.element)) {
    ctx.element.style.visibility = '';
  }

  getTinymce().init(finalInit);
};

export const Editor: VueConstructor = Vue.extend({
  name: 'editor',
  props: editorProps,
  created() {
    this.elementId = this.$props.id || uuid('tiny-react');
  },
  mounted() {
    this.element = this.$el;

    if (getTinymce() !== null) {
      initialise(this)();
    } else if (this.element) {
      const doc = this.element.ownerDocument;
      const channel = this.$props.cloudChannel ? this.$props.cloudChannel : 'stable';
      const apiKey = this.$props.apiKey ? this.$props.apiKey : '';
      const url = `https://cloud.tinymce.com/${channel}/tinymce.min.js?apiKey=${apiKey}`;

      ScriptLoader.load(
        scriptState, doc, url, initialise(this)
      );
    }
  },
  beforeDestroy() {
    getTinymce().remove(this.editor);
  },
  render(createElement: any) {
    const {inline, tagName} = this.$props;
    return inline ? renderInline(createElement, tagName, this.elementId) : renderIframe(createElement, this.elementId);
  }
});
