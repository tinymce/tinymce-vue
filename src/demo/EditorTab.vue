<template>
  <div>
    <editor v-model="html" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"></editor>
  </div>
</template>

<script>
import Editor from "/@/main/ts/index";

export default {
  name: "EditorTab",
  components: {
    editor: Editor
  },
  data() {
    return {
      html: ""
    };
  },
  activated() {
    console.log(this.html);
  }
};
</script>
