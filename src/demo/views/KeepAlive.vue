<template>
  <div>
    <h1>Keep-alive tag</h1>
    <div class="tabs">
      <span :class="['tab', {active:computedTab==='ContentTab'}]" @click="toggleTab('ContentTab')">Content</span>
      <span :class="['tab', {active:computedTab==='EditorTab'}]" @click="toggleTab('EditorTab')">Editor</span>
    </div>
    <div>
      <keep-alive>
        <component :is="computedTab"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import Editor from "/@/main/ts/index";
import ContentTab from "/views/ContentTab.vue";
import EditorTab from "/views/EditorTab.vue";

const apiKey = "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc";
const content = `
<h2 style="text-align: center;">
  TinyMCE provides a <span style="text-decoration: underline;">full-featured</span> rich text editing experience, and a featherweight download.
</h2>
<p style="text-align: center;">
  <strong><span style="font-size: 14pt;"><span style="color: #7e8c8d; font-weight: 600;">No matter what you're building, TinyMCE has got you covered.</span></span></strong>
</p>`;

export default {
  name: "Keepalive",
  components: {
    Editor,
    EditorTab,
    ContentTab
  },
  data() {
    return {
      html: ""
    };
  },
  setup() {
    const tab = ref('ContentTab');
    const computedTab = computed(() => tab.value);
    const toggleTab = (activeTab) => {
      tab.value = activeTab;
    };
    return {
      apiKey,
      content,
      toggleTab,
      computedTab
    }
  }
};
</script>