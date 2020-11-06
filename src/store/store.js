import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenWidth: document.documentElement.clientWidth,//可视化区域宽度
    screenHeight: document.documentElement.clientHeight,//可视化区域宽度
  },
  mutations: {
    screenWidth(state,width){
      state.screenWidth = width
    },
    screenHeight(state,height){
      state.screenWidth = height
    },
  },
  actions: {
  },
  modules: {
  }
})
