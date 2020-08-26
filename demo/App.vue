<template>
  <editor :api-key="apiKey" :init="{ height: 300 }" v-model="state.content" />
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watchEffect } from "vue";
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
  setup() {
    const state = reactive({
      content,
    });
    onMounted(() => {
      console.log(Editor);
    });
    watchEffect(() => {
      console.log(state.content);
    });
    return {
      apiKey,
      state,
    };
  },
});
</script>

<style scoped></style>
