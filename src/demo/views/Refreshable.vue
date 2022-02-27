<template>
  <div>
    <h2>Sample refreshing the editor</h2>
    <editor ref="editorRef" :api-key="apiKey" :initialValue="value" :init="conf" />
    <div v-html="value"></div>
    <button @click="refresh">Refresh</button>
    <button @click="update">Update</button>
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
    const self = this;
    return {
      apiKey,
      value: content,
      conf: {
        toolbar: 'undo redo | change',
        lang: 'ru',
        setup: (editor:any) => {
          editor.ui.registry.addMenuButton('change', {
            text: 'change',
            fetch: (c: any) => {
              const items: any[] = [];
              ['en','es'].forEach((i) => {
                items.push({
                  type: 'menuitem',
                  text: i.toUpperCase(),
                  onAction: () => {
                    // console.log(self);
                    self.$refs.editorRef.rerender({language: i});
                  }
                });
              });
              c(items);
            },
          });
        }
      }
    };
  },
  methods: {
    update() {
      this.$refs.editorRef.rerender({height: 600});
    }
  },
});
</script>