import Vue from 'vue';
import { ScriptLoader } from '../main/ts/ScriptLoader';
import { Editor } from '../main/ts/components/Editor';

const apiKey = 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc';
const content = `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong>
    <span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span>
  </strong>
</p>`;

let lastChannel = '8-stable';

const getConf = (stringConf: string) => {
  let conf = {};
  try {
    conf = Function('"use strict";return (' + stringConf + ')')();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('failed to parse configuration: ', err);
  }
  return conf;
};

const removeTiny = () => {
  delete (window as any).tinymce;
  delete (window as any).tinyMCE;
};

const loadTiny = (channel?: string) => {
  const channelToLoad = channel || lastChannel;
  const shouldReload = channelToLoad !== lastChannel || !(window as any).tinymce;

  if (shouldReload) {
    removeTiny();
    ScriptLoader.reinitialize();
    ScriptLoader.load(document, `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channelToLoad}/tinymce.min.js`, () => {});
    lastChannel = channelToLoad;
  }
};

export default {
  title: 'Editor',
  component: Editor,
  args: {
    channel: '8-stable',
    disabled: false,
    readonly: false,
    conf: '{height: 300}'
  },
  argTypes: {
    channel: {
      table: {
        defaultValue: { summary: '8-stable' }
      },
      options: [ '5', '5-dev', '5-testing', '6-testing', '6-stable', '7-dev', '7-testing', '7-stable', '7.3', '7.4', '7.6', '8-dev', '8-testing', '8-stable' ],
      control: { type: 'select' }
    },
    disabled: {
      control: 'boolean'
    },
    readonly: {
      control: 'boolean'
    },
    conf: {
      control: { type: 'text' }
    }
  },
  parameters: {
    previewTabs: {
      docs: { hidden: true }
    },
    controls: {
      hideNoControlsWarning: true
    }
  }
};

const buildStory = (template: string) => (args: any, { argTypes }: any) => Vue.extend({
  components: { Editor } as any,
  props: Object.keys(argTypes) as any,
  data(): Record<string, any> {
    return {
      apiKey,
      content,
      confObject: getConf(args.conf),
      channelValue: args.channel || lastChannel,
      disabledState: args.disabled,
      readonlyState: args.readonly
    };
  },
  watch: {
    channel(val: string) {
      this.channelValue = val || lastChannel;
      loadTiny(this.channelValue);
    },
    conf(val: string) {
      this.confObject = getConf(val);
    },
    disabled(val: boolean) {
      this.disabledState = val;
    },
    readonly(val: boolean) {
      this.readonlyState = val;
    }
  },
  mounted() {
    loadTiny(this.channelValue);
  },
  methods: {
    log(e: any, editor: any) {
      // eslint-disable-next-line no-console
      console.log(e, editor);
    },
    toggleDisabled() {
      this.disabledState = !this.disabledState;
    },
    toggleReadonly() {
      this.readonlyState = !this.readonlyState;
    }
  },
  template
});

export const Iframe = buildStory(`
  <div>
    <p>Ready</p>
    <editor
      :api-key="apiKey"
      :initialValue="content"
      :cloud-channel="channelValue"
      :disabled="disabledState"
      :readonly="readonlyState"
      :init="confObject"
    />
  </div>
`);

export const Inline = buildStory(`
  <div style="padding-top: 100px;">
    <editor
      :api-key="apiKey"
      v-model="content"
      inline
      :cloud-channel="channelValue"
      :disabled="disabledState"
      :readonly="readonlyState"
      :init="confObject"
    />
  </div>
`);

export const Controlled = buildStory(`
  <div>
    <editor
      :api-key="apiKey"
      v-model="content"
      @onBlur="log"
      :cloud-channel="channelValue"
      :disabled="disabledState"
      :readonly="readonlyState"
      :init="confObject"
    />
    <textarea
      style="width: 100%;
      height:200px;"
      v-model="content"
    ></textarea>
    <div v-html="content"></div>
  </div>
`);

export const Disable = buildStory(`
  <div>
    <button @click="toggleDisabled">{{ disabledState ? 'enable' : 'disable' }}</button>
    <editor
      :api-key="apiKey"
      :disabled="disabledState"
      :cloud-channel="channelValue"
      :readonly="readonlyState"
      :init="confObject"
      v-model="content"
    />
  </div>
`);

export const Readonly = buildStory(`
  <div>
    <button @click="toggleReadonly">{{ readonlyState ? 'design' : 'readonly' }}</button>
    <editor
      :api-key="apiKey"
      :readonly="readonlyState"
      :cloud-channel="channelValue"
      :disabled="disabledState"
      :init="confObject"
      v-model="content"
    />
  </div>
`);
