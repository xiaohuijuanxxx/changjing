<template>
  <div> 
    <div>自定义控制拖拽和停靠</div>
    <draggable v-model="arr1" filter=".forbid"  animation="500"  :move="onMove">
        <div :class="item.id==1?'item forbid':'item'" v-for="item in arr1" :key="item.id">{{item.name}}</div>
    </draggable> 
    <div>{{msg}}</div>
  </div>
</template>
<script>
//导入draggable组件
import draggable from 'vuedraggable'
export default {
  //注册draggable组件
  components: {
    draggable,
  },
  props: {
    msg: [Boolean, String]
  },
  data() {
    return {  
      //定义要被拖拽对象的数组
      arr1:[
            { id: 1, name: 'www.itxst.com（不允许停靠）' },
            { id: 2, name: 'www.jd.com' },
            { id: 3, name: 'www.baidu.com' },
            { id: 5, name: 'www.google.com' },
            { id: 4, name: 'www.taobao.com（不允许拖拽）' }
        ] 
    };
  },
  methods: { 
    //move回调方法
    onMove(e,originalEvent){ 
      //不允许停靠
      if (e.relatedContext.element.id == 1) return false;
      //不允许拖拽
      if (e.draggedContext.element.id == 4) return false;
      return true;
    },  
  },
};
</script>
<style scoped>
  /*定义要拖拽元素的样式*/
      .item {
          padding: 6px 12px;
          margin: 0px 10px 0px 10px;
          border: solid 1px #eee;
          background-color: #f1f1f1;
          text-align: left;
      }
      .item + .item {
          border-top: none;
          margin-top: 6px;
      }

      .item:hover {
          background-color: #fdfdfd;
          cursor: move;
      }
</style>