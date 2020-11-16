import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,//是否水平折叠收起菜单
    screenWidth: document.documentElement.clientWidth,//可视化区域宽度
    screenHeight: document.documentElement.clientHeight,//可视化区域宽度
    contentHeight: 0,
    //控制首页tab标签初始内容列表，也就是最开始进入网站显示的tab列表
    list:[
      { name:"mainPage",
        path:"/",
        tabname:"主页zhuye主页zzzzzzzzzzz",
        /* components: MainPage */
      },
    ],
    //控制当前tab标签的列表，随着点击、关闭更新,通过路由拦截器filter进行更新
    current:{
      /* name: 'mainPage',
      path:"/",
      tabname:"主页zhuye主页zzzzzzzzzzz", */
    }
  },
  mutations: {
    screenWidth(state,width){
      state.screenWidth = width
    },
    screenHeight(state,height){
      state.screenWidth = height
    },
    toggleCollapse(state){
      state.isCollapse = !state.isCollapse;
    },
    contentHeight(state, contentHeight){
      state.contentHeight = contentHeight;
    }
  },
  actions: {
  },
  modules: {
  }
})
