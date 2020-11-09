<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
  export default {
    name:'App',
    components: {

    },
    data(){
      return {
        timer:null,

      }
    },
    mounted () {
      window.onresize = () =>{
        clearTimeout(this.timer);
        this.timer = setTimeout( ()=>{
          this.$store.commit('screenWidth',  document.documentElement.clientWidth);
          this.$store.commit('screenHeight',  document.documentElement.clientHeight);
        },100)
      }
    }
  }
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

/* /deep/ .el-dialog__header {
    text-align: center;
} */

html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
}

/* /deep/ .mainDialog .el-dialog__body {
    padding: 0px !important;
} */

</style>
