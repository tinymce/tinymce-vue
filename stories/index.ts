import { storiesOf } from '@storybook/vue';

import { Editor } from '../src/main/ts/components/Editor';

const apiKey = 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc';
const content = `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`;

storiesOf('tinymce-vue', module)
  .add(
    'Iframe editor',
    () => ({
      components: { Editor },
      data: () => ({ content }),
      template: `
        <editor
          api-key="${apiKey}"
          :init="{height: 300}"
          v-model="content"
        />`
    }),
    { notes: 'Iframe editor.' }
  )
  .add(
    'Inline editor',
    () => ({
      components: { Editor },
      data: () => ({ content }),
      template: `
        <div style="padding-top: 100px;">
          <editor
            api-key="${apiKey}"
            v-model="content"
            inline
          />
        </div>
      `
    }),
    { notes: 'Inline editor.' }
  )
  .add(
    'Controlled input',
    () => ({
      components: { Editor },
      data: () => ({ content }),
      methods: {
        // tslint:disable-next-line:no-console
        log: (e: any, editor: any) => console.log(e)
      },
      template: `
        <div>
          <editor
            api-key="${apiKey}"
            :init="{height: 300}"
            v-model="content"
            @onBlur="log"
          />
          <textarea
            style="width: 100%;
            height:200px;"
            v-model="content"
          ></textarea>
          <div v-html="content"></div>
        </div>
      `
    }),
    { notes: 'Example of usage as as a controlled component.' }
  )
  .add(
    'Disable button', () => ({
      components: { Editor },
      data: () => ({ content, disabled: true }),
      methods: {
        toggleDisabled(e: any) {
          this.disabled = !this.disabled;
        }
      } as any,
      template: `
        <div>
          <button @click="toggleDisabled">{{ disabled ? 'enable' : 'disable' }}</button>
          <editor
            api-key="${apiKey}"
            v-bind:disabled="disabled"
            :init="{height: 300}"
            v-model="content"
          />
        </div>
      `
    }),
    { notes: 'Example with setting the editor into readonly mode using the disabled prop.' }
  )
  .add(
    'cloudChannel set to 5-dev',
    () => ({
      components: { Editor },
      data: () => ({ content }),
      methods: {
        // tslint:disable-next-line:no-console
        log: (e: any, editor: any) => console.log(e)
      },
      template: `
        <editor
          api-key="${apiKey}"
          cloudChannel="5-dev"
          :init="{height: 300}"
          v-model="content"
        />
      `
    }),
    { notes: 'Editor with cloudChannel set to 5-dev, please make sure to reload page to load tinymce 5.' }
  );
