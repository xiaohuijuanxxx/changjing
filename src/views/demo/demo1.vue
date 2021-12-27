<template>
<!-- 将数据写为非响应式的形式，减少资源，优化性能-->
  <div>
      <h1>{{data1}}-template是拿不到的</h1>
      <h1>{{$options.options.data2}}</h1>
      <h1>{{data3}}</h1>
      <button @click="myclick">点击修改</button>
  </div>
</template>

<script>
let data1 = '飞翔影视' //template是拿不到的
export default {
  name:'',
  data () {
    return {

    }
  },
  created(){
      this.data3 = '非响应式数据3'
  },
  options: {
      data2 : '非响应式数据2'
  },
  methods: {
      myclick(){
        this.data1 = '1';
        this.$options.options.data2 = '1';
        this.data3 = '1';
        console.log(this.data1,this.$options.options.data2,this.data3);
      }
  },
  components: {

  }
}
</script>

<style lang='less' scoped>

</style>
