import Vue from 'vue'
import Router from 'vue-router'
import index from 'views/index'
import mainPage from 'views/mainPage'
import sjsc from 'router/sjsc/sjsc'

const login = ()=>import("views/login")
/* const sjsc = ()=>import("router/sjsc/sjsc") */

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


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
      component: mainPage,
    }].concat(sjsc)
    
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
]

const router = new Router({
  mode: 'history',
  base: "/changjingyun",
  routes
})

export default router
