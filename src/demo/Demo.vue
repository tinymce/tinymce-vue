<template>
  <div>
    <div id="nav" class="nav">
      <router-link :class="{ active: $route.path==='/'}" to="/">Home</router-link>
      <router-link :class="{ active: $route.path==='/iframe'}" to="/iframe">Iframe Editor</router-link>
      <router-link :class="{ active: $route.path==='/inline'}" to="/inline">Inline Editor</router-link>
      <router-link :class="{ active: $route.path==='/controlled'}" to="/controlled">Controlled component</router-link>
      <router-link :class="{ active: $route.path==='/keepalive'}" to="/keepalive">Keep-alive</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: 'Demo',
})
</script>
