<template>
  <div class="story green">
    <h2>V-model sample with inline editor</h2>
    <editor :api-key="apiKey" v-model="value" />
    <editor :api-key="apiKey" inline v-model="value"/>
  </div>
  <div class="story blue">
    <h2>Disabling editor</h2>
    <button @click="toggleDisabled">{{ disabled ? 'enable' : 'disable' }}</button>
    <editor :api-key="apiKey" :disabled="disabled" :initialValue="content"/>
  </div>
  <div class="story red">
    <h2>Simple iframe editor</h2>
    <editor :api-key="apiKey" :initialValue="content"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const value = ref(content);
    const disabled = ref(false);
    const toggleDisabled = () => {
      disabled.value = !disabled.value;
    }
    return {
      apiKey,
      value,
      content,
      disabled,
      toggleDisabled
    };
  },
});
</script>