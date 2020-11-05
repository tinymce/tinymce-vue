import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import Demo from '/Demo.vue';

import Home from '/views/Home.vue';
import Iframe from '/views/Iframe.vue';
import Inline from '/views/Inline.vue';
import Controlled from '/views/Controlled.vue';
import Keepalive from '/views/KeepAlive.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/iframe',
    name: 'Iframe',
    component: Iframe
  },
  {
    path: '/inline',
    name: 'Inline',
    component: Inline
  },
  {
    path: '/controlled',
    name: 'Controlled',
    component: Controlled
  },
  {
    path: '/keepalive',
    name: 'Keepalive',
    component: Keepalive
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(Demo).use(router).mount('#app');