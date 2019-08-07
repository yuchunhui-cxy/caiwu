// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 公共样式
import './assets/css/common.css'
import CommonJs from './assets/javascript/common.js';
// import Excel from './assets/javascript/excel.js';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(CommonJs);
// Vue.use(Excel);

import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import prompt from './components/prompt'
Vue.use(prompt)

import elxel from './assets/javascript/elxel'
Vue.use(elxel)

import VueLazyload from "vue-lazyload"
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: '/src/assets/images/one.png',
    loading: '/src/assets/images/one.png',
    attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
