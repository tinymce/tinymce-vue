/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue, {CreateElement, VNode} from 'vue';
import Component from 'vue-class-component';
import * as ScriptLoader from '../ScriptLoader';
import { getTinymce } from '../TinyMCE';
import { bindHandlers, isTextarea, uuid } from '../Utils';
import { editorProps, IPropTypes } from './EditorPropTypes';

const scriptState = ScriptLoader.create();

@Component({
  name: 'editor',
  props: editorProps
})
export class Editor extends Vue {
  public $props: IPropTypes;
  private elementId: string;
  private editor: any;
  private element: Element | null = null;

  public created() {
    this.elementId = this.$props.id || uuid('tiny-react');
  }

  public mounted() {
    this.element = this.$el;

    if (getTinymce() !== null) {
      this.initialise();
    } else if (this.element) {
      const doc = this.element.ownerDocument;
      const channel = this.$props.cloudChannel ? this.$props.cloudChannel : 'stable';
      const apiKey = this.$props.apiKey ? this.$props.apiKey : '';

      ScriptLoader.load(
        scriptState, doc, `https://cloud.tinymce.com/${channel}/tinymce.min.js?apiKey=${apiKey}`, this.initialise
      );
    }
  }

  public destroy() {
    getTinymce().remove(this.editor);
  }

  public render(createElement: CreateElement): VNode {
    return this.$props.inline ? this.renderInline(createElement) : this.renderIframe(createElement);
  }

  private initialise() {
    const initialValue = typeof this.$props.initialValue === 'string' ? this.$props.initialValue : '';
    const finalInit = {
      ...this.$props.init,
      selector: `#${this.elementId}`,
      inline: this.$props.inline,
      setup: (editor: any) => {
        this.editor = editor;
        editor.on('init', () => editor.setContent(initialValue));
        bindHandlers(this.$listeners, editor);
      }
    };

    if (isTextarea(this.element)) {
      this.element.style.visibility = '';
    }

    getTinymce().init(finalInit);
  }

  private renderInline(createElement: CreateElement) {
    const tagName = this.$props.tagName ? this.$props.tagName : 'div';
    return createElement(tagName, {
      attrs: {
        id: this.elementId
      }
    });
  }

  private renderIframe(createElement: CreateElement) {
    return createElement('textarea', {
      attrs: {
        id: this.elementId
      },
      style: {
        visibility: 'hidden'
      }
    });
  }
}
