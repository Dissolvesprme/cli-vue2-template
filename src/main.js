import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/filter';
import '@/directives';
import './elInstall';
import '@/styles/index.scss';
import '@/styles/reset.css';
import '@/utils/tools/prototype.js';

window.Vue = Vue;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
