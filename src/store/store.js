import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,//是否水平折叠收起菜单
    screenWidth: document.documentElement.clientWidth,//可视化区域宽度
    screenHeight: document.documentElement.clientHeight,//可视化区域宽度
    contentHeight: 0,
    //控制首页tab标签内容列表，添加删除都是对list进行修改
    list:[
      /*{  name:"mainPage",
        path:"/",
        tabname:"主页zhuye主页zzzzzzzzzzz", 
        components: MainPage
      },*/
    ],
    //控制当前tab标签的列表，随着点击、关闭更新,通过路由拦截器filter进行更新
    current:{
      /* name: 'mainPage',
      path:"/",
      tabname:"主页zhuye主页zzzzzzzzzzz", */
    },
    //记录tab标签数
    tabCount: 0,
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
    },
    //路由切换的时候添加tab标签
    worktabRoute(state,payload){
      //findIndex返回元素位置，s为list中的元素，依次遍历
      let ind = state.list.findIndex(s=>s.name === payload.to.name);
      if(ind > -1){//如果该tab已经被创建
        state.list.splice(ind, 1, payload.to);
        //新增tab后，将这个tab作为当前tab，即活跃选中状态
        state.current = state.list[ind];
      }else{
        //标签不存在的时候，新建tab
        state.list.push(payload.to);
        state.current = payload.to;
        state.tabCount++;
        //找到新建的tab索引
        ind = state.list.findIndex(s=>s.name === payload.to.name);
      }
      //保证tab标签顺序不变
      state.current.index = ind;
    },
    //点击tab上的×删除tab
    worktabRemove(state,payload){
      //找到要删除的tab的索引，调用splice删除,没删除之前的索引
      let ind = state.list.findIndex(s => s.name === payload);
      if(ind > -1){
        state.list.splice(ind, 1);
        state.tabCount--;
      }
      //删除tab后，将上一个tab作为当前tab，即活跃选中状态
      /* state.current = state.list[ind-1];
      state.current.index = ind-1; */
    },
  },
  actions: {
    worktabRoute({commit},payload){//添加tab页
      commit("worktabRoute",payload);
    },
    worktabRemove({commit},payload){//删除tab页
      commit("worktabRemove",payload);
    }
  },
  modules: {
  }
})
