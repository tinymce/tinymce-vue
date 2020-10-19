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
  <div class="story cyan">
    <div>
      <span :class="['tab', {active:comp==='ContentTab'}]" @click="toggleTab">About</span>
      <span :class="['tab', {active:comp==='EditorTab'}]" @click="toggleTab">Editor</span>
    </div>
    <div>
      <keep-alive>
        <component :is="comp"/>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Editor from "/@/main/ts/index";
import ContentTab from "/ContentTab.vue";
import EditorTab from "/EditorTab.vue";
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
    ContentTab,
    EditorTab
  },
  setup() {
    const value = ref(content);
    const disabled = ref(false);
    const tab = ref('ContentTab');
    let comp = computed(() => tab.value);
    const toggleDisabled = () => {
      disabled.value = !disabled.value;
    };
    const toggleTab = () => {
      console.log('clicked', comp);
      if (tab.value === 'ContentTab') {
        tab.value = 'EditorTab';
      } else {
        tab.value = 'ContentTab';
      }
    };
    return {
      apiKey,
      value,
      content,
      disabled,
      toggleDisabled,
      toggleTab,
      comp
    };
  },
});
</script>