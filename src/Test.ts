import Vue, {CreateElement, VNode} from 'vue';
import Component from 'vue-class-component';
import { uuid } from './Utils';

@Component({
  props: {
    inline: Boolean,
    id: String
  }
})
export class MyButton extends Vue {
  private inline: boolean;
  private id: string;
  private elementId: string;

  public beforeMount() {
    this.elementId = this.id || uuid('tiny-react');
  }

  public mounted() {
  }

  public destroy() {
  }

  public render(createElement: CreateElement): VNode {
    return this.inline ? this.renderInline(createElement) : this.renderIframe(createElement);
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
      }
    });
  }
}
