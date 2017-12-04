/**
 * Copyright (c) 2017-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Vue, {CreateElement, VNode} from 'vue';
import Component from 'vue-class-component';
import { getTinymce } from './TinyMCE';
import { isTextarea, uuid } from './Utils';

@Component({
  name: 'editor',
  props: {
    inline: Boolean,
    id: String,
    init: Object,
    initialValue: String
  }
})
export class Editor extends Vue {
  private inline: boolean;
  private id: string;
  private init: object;
  private initialValue: string;
  private elementId: string;
  private editor: any;
  private element: Element | null = null;

  public created() {
    this.elementId = this.id || uuid('tiny-react');
  }

  public mounted() {
    this.element = this.$el;
    this.initialise();
  }

  public destroy() {
    getTinymce().remove(this.editor);
  }

  public render(createElement: CreateElement): VNode {
    return this.inline ? this.renderInline(createElement) : this.renderIframe(createElement);
  }

  private initialise() {
    const initialValue = typeof this.initialValue === 'string' ? this.initialValue : '';
    const finalInit = {
      ...this.init,
      selector: `#${this.elementId}`,
      inline: this.inline,
      setup: (editor: any) => {
        this.editor = editor;
        editor.on('init', () => editor.setContent(initialValue));
        // bindHandlers(this.props, editor);
      }
    };

    if (isTextarea(this.element)) {
      this.element.style.visibility = '';
    }

    getTinymce().init(finalInit);
  }

  private renderInline(createElement: CreateElement) {
    return createElement('div', {
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
