import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,//是否水平折叠收起菜单
    screenWidth: document.documentElement.clientWidth,//可视化区域宽度
    screenHeight: document.documentElement.clientHeight,//可视化区域宽度
    contentHeight: 0,
    list:[
      { name:"mainPage",
        path:"/",
        tabname:"主页zhuye主页zzzzzzzzzzz",
        /* components: MainPage */
      },
    ],//控制首页tab标签内容列表
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
