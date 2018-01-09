import { storiesOf } from '@storybook/vue';
import Vue from 'vue';

// Import your custom components.
import { Editor } from '../src/components/Editor';
import { content } from './fakeContent';

storiesOf('TestComponent', module)
  .add('inline', () => ({
    components: { Editor },
    data: () => ({content}),
    template: '<editor inline :init="{theme: \'inlite\'}" :initialValue="content" />'
  }))
  .add('iframe', () => ({
    components: { Editor },
    data: () => ({content}),
    methods: {
      // tslint:disable-next-line:no-console
      log: (e: any, editor: any) => console.log(editor.getContent()),
      setup: (editor: any) => {
        setTimeout(() => {
          editor.setContent('hellooo');
          editor.undoManager.add();
        }, 2000);
      }
    },
    template: `<div>
      <editor
        :init="{branding: false, height: 300, setup: setup}"
        v-model="content"
        :modelEvents="['change', 'keyup']" />
      <div v-html="content"></div>
    </div>`
  }));
