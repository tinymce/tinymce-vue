import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo from '/Demo.vue';

import Home from '/views/Home.vue';
import Iframe from '/views/Iframe.vue';
import Inline from '/views/Inline.vue';
import Controlled from '/views/Controlled.vue';
import Keepalive from '/views/KeepAlive.vue';
import Refreshable from '/views/Refreshable.vue';
import Tagged from '/views/Tagged.vue';
import GetEditor from '/views/GetEditor.vue';

Vue.use(VueRouter);

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
  },
  {
    path: '/refreshable',
    name: 'Refreshable',
    component: Refreshable
  },
  {
    path: '/tagged',
    name: 'Tagged',
    component: Tagged
  },
  {
    path: '/get-editor',
    name: 'GetEditor',
    component: GetEditor
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  router,
  render: (h) => h(Demo)
}).$mount('#app');
