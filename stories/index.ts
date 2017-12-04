import { storiesOf } from '@storybook/vue';
import Vue from 'vue';

// Import your custom components.
import { MyButton } from '../src/Test';

// Register custom components.
Vue.component('my-button', MyButton);

storiesOf('TestComponent', module)
  .add('inline', () => ({
    components: { MyButton },
    template: '<my-button inline />'
  }))
  .add('iframe', () => ({
    components: { MyButton },
    template: '<my-button />'
  }));
