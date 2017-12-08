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
      log: (e: any, editor: any) => console.log(editor.getContent())
    },
    template: `<div>
      <editor :initialValue="'<p>hello world</p>'"></editor>
      <editor
        :init="{branding: false, height: 300}"
        v-model="content"
        :modelEvents="['change', 'keyup']" />
      <div v-html="content"></div>
    </div>`
  }));
