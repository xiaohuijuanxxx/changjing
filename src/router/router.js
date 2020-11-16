import Vue from 'vue'
import VueRouter from 'vue-router'
import index from 'views/index'
import mainPage from 'views/mainPage'
import sjsc from 'router/sjsc/sjsc'

const login = ()=>import("views/login")
/* const sjsc = ()=>import("router/sjsc/sjsc") */

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    children: [{
      path: '/mainPage',
      name: 'mainPage',
      meta: { 
        tabname:'首页',
       },
      components: mainPage,
    }].concat(sjsc)
    
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: "/changjingyun",
  routes
})

export default router
