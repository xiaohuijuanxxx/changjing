import Vue from 'vue'
import VueRouter from 'vue-router'
import index from 'views/index'
const login = ()=>import("views/login")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
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
