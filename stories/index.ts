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
  .add('disable button', () => ({
    components: { Editor },
    data: () => ({ content, disabled: true }),
    methods: {
      toggleDisabled(e: any) {
        this.disabled = !this.disabled;
      }
    } as any,
    template: `<div>
      <button @click="toggleDisabled">{{ disabled ? 'enable' : 'disable' }}</button>
      <editor v-bind:disabled="disabled" v-model="content" />
    </div>`
  }))
  .add('iframe', () => ({
    components: { Editor },
    data: () => ({ content, test: '' }),
    methods: {
      // tslint:disable-next-line:no-console
      log: (e: any, editor: any) => console.log(e)
    },
    template: `<div>
      <editor
        :init="{branding: false, height: 300}"
        api-key="hello"
        plugins="link"
        toolbar="link bold italic"
        v-model="content"
        @onBlur="log"
      />
      <editor
        :init="{branding: false, height: 300}"
        api-key="hello"
        v-model="content"
      />
      <textarea style="width: 100%;height:150px;" v-model="content"></textarea>
      <div v-html="content"></div>
    </div>`
  }))
  .add(
    'cloudChannel set to 5-dev',
    () => ({
      components: { Editor },
      data: () => ({ content, test: '' }),
      methods: {
        // tslint:disable-next-line:no-console
        log: (e: any, editor: any) => console.log(e)
      },
      template: `<div>
      <editor
        plugins="link code media table"
        cloudChannel="5-dev"
      />
    </div>`
    }),
    { notes: 'Please make sure to reload page to load Tinymce 5.' }
  );
