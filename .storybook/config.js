import { configure, addDecorator } from '@storybook/vue';

import Vue from 'vue';

import { withNotes } from '@storybook/addon-notes';

addDecorator(withNotes);

function loadStories() {
  // You can require as many stories as you need.
  require('../stories');
}

configure(loadStories, module);
