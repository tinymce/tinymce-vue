import { storiesOf } from '@storybook/vue';
import Vue from 'vue';

// Import your custom components.
import { Editor } from '../src/Test';

// Register custom components.
Vue.component('editor', Editor);

storiesOf('TestComponent', module)
  .add('inline', () => ({
    components: { Editor },
    template: '<editor inline />'
  }))
  .add('iframe', () => ({
    components: { Editor },
    template: '<editor initialValue="<p>This is some text</p>" />'
  }));
