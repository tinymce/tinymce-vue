import { storiesOf } from '@storybook/vue';
import Vue from 'vue';

// Import your custom components.
import { Editor } from '../src/Editor';
import { content } from './fakeContent';

storiesOf('TestComponent', module)
  .add('inline', () => ({
    components: { Editor },
    data: () => ({content}),
    template: '<editor inline :initialValue="content" />'
  }))
  .add('iframe', () => ({
    components: { Editor },
    data: () => ({content}),
    template: '<editor :initialValue="content" />'
  }));
