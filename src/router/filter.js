//请求使用
import router from './router'
import store from 'store/store'
import Vue from 'vue'

const worktabFilter = (to, from, next) =>{
    if(to.name != "index"){//只有最开始进来的时候是跳到index的
       let tabTo = to;
       let tabFrom = from;
       if(tabTo){//如果要跳转
            let toCopy = {

            }
       }
    }
    next()
}
/* 一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。
检查路由记录中的 meta 字段 ，我们需要遍历 $route.matched */
const findTabRoute = (route) => {
    if(route.meta && route.meta.tabname){
        return route
    }else if (route.matched && route.matched.length > 0) {
        return findTabRoute(route.matched[route.matched.length - 1])
    } else if (route.parent) {
        return findTabRoute(route.parent)
    } else {
        return false
    }
}

router.beforeEach((to, from, next) => {
    console.log('----------路由拦截器：from -> to ------------');
    console.log(from);
    console.log(to);
    worktabFilter(to, from, next);
})
