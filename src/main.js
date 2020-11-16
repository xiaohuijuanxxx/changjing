import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'axios/filter'//请求相应拦截器
import 'router/filter'//路由拦截器

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
