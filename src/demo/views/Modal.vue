<template>
  <div>
    <h2>Editor inside a modal</h2>
    <p>
      Modal and dialog libraries (Bootstrap-Vue, Vuetify, &hellip;) move their
      content to another part of the document when they open. That detaches and
      re-attaches the editor's <code>&lt;iframe&gt;</code>, which the browser blanks,
      historically leaving the editor in an unresponsive &ldquo;zombie&rdquo; state
      (<a href="https://github.com/tinymce/tinymce-vue/issues/131" target="_blank" rel="noopener">#131</a>).
      The component now detects the re-attach and transparently re-initializes while
      preserving content. This demo reproduces the exact condition with a
      <code>&lt;Teleport&gt;</code>-based modal &mdash; open and close it repeatedly and
      the editor keeps working.
    </p>
    <button @click="open = true">Open modal</button>

    <teleport to="body" :disabled="!open">
      <div v-show="open" class="demo-modal-backdrop" @click.self="open = false">
        <div class="demo-modal">
          <header class="demo-modal-header">
            <strong>Compose message</strong>
            <button @click="open = false">Close</button>
          </header>
          <editor :api-key="apiKey" :init="conf" v-model="content" />
          <p class="demo-modal-preview"><em>Live v-model:</em> {{ content }}</p>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Editor from "/@/main/ts/index";

const apiKey = "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc";

export default defineComponent({
  name: "Modal",
  components: {
    Editor
  },
  setup() {
    const open = ref(false);
    const content = ref("<p>Edit me, close the modal, then open it again.</p>");
    const conf = {
      height: 300,
      menubar: false
    };
    return {
      apiKey,
      open,
      content,
      conf
    };
  }
});
</script>

<style scoped>
.demo-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.demo-modal {
  background: #fff;
  padding: 1rem;
  border-radius: 6px;
  width: 720px;
  max-width: 90vw;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
.demo-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.demo-modal-preview {
  color: #555;
  font-size: 0.85rem;
  word-break: break-word;
}
</style>
