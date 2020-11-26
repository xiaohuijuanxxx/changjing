import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './axios/filter'//请求相应拦截器
import 'router/filter'//路由拦截器
import $ from 'jquery'
import 'assets/common/css/index'
import './api/mainApi'
import './mock/mock'
/* 右键菜单组件，暂时没用到 */
import VuecontextMenu from 'vue-context-menu';

import searchAccordion from 'components/accordion/accordion'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VuecontextMenu);

Vue.component('searchAccordion', searchAccordion);
Vue.config.productionTip = false;

//原型脸上挂载bus
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
