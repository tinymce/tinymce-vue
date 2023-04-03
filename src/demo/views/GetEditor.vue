<template>
  <div>
    <h2>Sample refreshing the editor</h2>
    <editor ref="editorRef" :api-key="apiKey" :initialValue="value" :init="conf" />
    <div v-html="value"></div>
    <button @click="log">Log</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Editor from "/@/main/ts/index";
const apiKey = "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc";
const content = `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`;

export default defineComponent({
  components: {
    Editor,
  },
  data() {
    return {
      apiKey,
      value: content,
      conf: {
        toolbar: 'undo redo | change'
      }
    };
  },
  methods: {
    log() {
      console.log('editor instance: ', this.$refs.editorRef.getEditor());
    }
  },
});
</script>
