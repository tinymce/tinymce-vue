import { storiesOf } from '@storybook/vue';

// Import your custom components.
import { Editor } from '../src/components/Editor';
import { content } from './fakeContent';

storiesOf('TestComponent', module)
  .add('inline', () => ({
    components: { Editor },
    data: () => ({ content }),
    template: `<div>
      <editor inline v-model="content" />
      <textarea style="width: 100%;height:150px;" v-model="content"></textarea>
      <div v-html="content"></div>
    </div>`
  }))
  .add('inlite', () => ({
    components: { Editor },
    data: () => ({ content }),
    template: `<div>
      <editor inline :init="{theme: 'inlite'}" v-model="content" />
      <textarea style="width: 100%;height:150px;" v-model="content"></textarea>
      <div v-html="content"></div>
    </div>`
  }))
  .add('iframe', () => ({
    components: { Editor },
    data: () => ({ content, test: '' }),
    methods: {
      // tslint:disable-next-line:no-console
      log: (e: any, editor: any) => console.log(e.screenY, e.screenX)
    },
    template: `<div>
      <editor
        :init="{branding: false, height: 300}"
        api-key="hello"
        plugins="link"
        toolbar="link bold italic"
        v-model="content"
      />
      <editor
        :init="{branding: false, height: 300}"
        api-key="hello"
        v-model="content"
      />
      <textarea style="width: 100%;height:150px;" v-model="content"></textarea>
      <div v-html="content"></div>
    </div>`
  }));
