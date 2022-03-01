import { Story } from '@storybook/vue3';
import { onBeforeMount, ref } from 'vue';
import { ScriptLoader } from '../main/ts/ScriptLoader';

import { Editor } from '../main/ts/components/Editor';

const apiKey = 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc';
const content = `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`;

let lastChannel = '5';
const getConf = (stringConf) => {
  let conf  = {};
  console.log('parsing: ', stringConf);
  try {
    conf = JSON.parse(stringConf);
  } catch (err) {
    console.error('failed to parse configuration: ', err);
  }
  return conf;
}


export default {
  title: 'Editor',
  component: Editor,
  argTypes: {
    channel: {
      defaultValue: '5',
      options: ['5', '5-dev', '6-dev', '6-testing', '6-stable'],
      control: { type: 'select'}
    },
    conf: {
      defaultValue: '{"height": 300}',
      control: { type: 'text' }
    }
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true
    }
  }
};

export const Iframe: Story = (args) => ({
  components: {Editor},
  setup() {
    onBeforeMount(() => {
      if (args.channel !== lastChannel) {
        delete (window as any).tinymce;
        ScriptLoader.reinitialize();
        ScriptLoader.load(document, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${args.channel}/tinymce.min.js`, () => {
          console.log('script ready');
        });
        lastChannel = args.channel;
      }
    });
    const cc = args.channel || lastChannel;
    const conf = getConf(args.conf);
    return {
      apiKey,
      content,
      cloudChannel: cc,
      conf
    }
  },
  template: '<div ><p>Ready</p><editor :api-key="apiKey" :initialValue="content" :cloud-channel="cloudChannel" :init="conf" /></div>'
});

export const Inline: Story = (args) => ({
  components: { Editor },
  setup() {
    onBeforeMount(() => {
      if (args.channel !== lastChannel) {
        delete (window as any).tinymce;
        ScriptLoader.reinitialize();
        ScriptLoader.load(document, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${args.channel}/tinymce.min.js`, () => {
          console.log('script ready');
        });
        lastChannel = args.channel;
      }
    });
    const cc = args.channel || lastChannel;
    const conf = getConf(args.conf);
    return {
      apiKey,
      content,
      cloudChannel: cc,
      conf
    }
  },
  template: `
    <div style="padding-top: 100px;">
      <editor
        api-key="${apiKey}"
        v-model="content"
        inline
        :init="conf"
      />
    </div>`
});

export const Controlled: Story = (args) => ({
  components: { Editor },
  setup() {
    onBeforeMount(() => {
      if (args.channel !== lastChannel) {
        delete (window as any).tinymce;
        ScriptLoader.reinitialize();
        ScriptLoader.load(document, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${args.channel}/tinymce.min.js`, () => {
          console.log('script ready');
        });
        lastChannel = args.channel;
      }
    });
    const cc = args.channel || lastChannel;
    const conf = getConf(args.conf);
    const log = (e, editor) => {console.log(e);};
    const controlledContent = ref(content);
    return {
      apiKey,
      content: controlledContent,
      cloudChannel: cc,
      conf,
      log
    }
  },
  template: `
    <div>
      <editor
        api-key="${apiKey}"
        v-model="content"
        @onBlur="log"
        :init="conf"
      />
      <textarea
        style="width: 100%;
        height:200px;"
        v-model="content"
      ></textarea>
      <div v-html="content"></div>
    </div>`
});

export const Disable: Story = (args) => ({
  components: { Editor },
  setup() {
    onBeforeMount(() => {
      if (args.channel !== lastChannel) {
        delete (window as any).tinymce;
        ScriptLoader.reinitialize();
        ScriptLoader.load(document, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${args.channel}/tinymce.min.js`, () => {
          console.log('script ready');
        });
        lastChannel = args.channel;
      }
    });
    const cc = args.channel || lastChannel;
    const conf = getConf(args.conf);
    const disabled = ref(false);
    const toggleDisabled = (_e) => {
      disabled.value = !disabled.value;
    }
    return {
      apiKey,
      content,
      cloudChannel: cc,
      conf,
      disabled,
      toggleDisabled
    }
  },
  template: `
    <div>
      <button @click="toggleDisabled">{{ disabled ? 'enable' : 'disable' }}</button>
      <editor
        api-key="${apiKey}"
        v-bind:disabled="disabled"
        :init="conf"
        v-model="content"
      />
    </div>`
});