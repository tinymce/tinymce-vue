<template>
  <div>
    <div id="nav" class="nav">
      <router-link :class="{ active: $route.path==='/'}" to="/">Home</router-link>
      <router-link :class="{ active: $route.path==='/iframe'}" to="/iframe">Iframe Editor</router-link>
      <router-link :class="{ active: $route.path==='/inline'}" to="/inline">Inline Editor</router-link>
      <router-link :class="{ active: $route.path==='/controlled'}" to="/controlled">Controlled component</router-link>
      <router-link :class="{ active: $route.path==='/keepalive'}" to="/keepalive">Keep-alive</router-link>
      <router-link :class="{ active: $route.path==='/refreshable'}" to="/refreshable">Rerender</router-link>
      <router-link :class="{ active: $route.path==='/tagged'}" to="/tagged">Tag Change</router-link>
      <router-link :class="{ active: $route.path === '/get-editor' }" to="/get-editor">getEditor</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: 'Demo',
});
</script>
