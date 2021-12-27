<template>
  <div id="app">
      <!-- <router-view/> -->
      <demo1></demo1>
      <!-- <transfer-demo :msg="msg"></transfer-demo> -->

      <!-- <data-pick></data-pick> -->

      <!-- <transition :name="transitionName">
        <router-view></router-view>
      </transition> -->
      <h1>{{msg}}</h1>
      <button @click="changemsg">点击一下</button>
  </div>
</template>

<script>
  // import dataPick from './dataPick.vue'
  import demo1 from './views/demo/demo1.vue'
  import transferDemo from './transferDemo.vue'
  export default {
    name:'App',
    components: {
        transferDemo,
        demo1
    },
    data() {
      return {
          msg:''
      };
    },
    methods: {
        changemsg(){
            this.msg = (Math.random()*10).toFixed(1)
        }
    },
    watch: {
        /* msg: {
            handler: function (newval, old){
                console.log(newval, old);
            },
            handler: function (newval, old){
                console.log('我是第二个');
            }
        } */
        msg: [ 
            function (newval, old){
                console.log(newval, old);
            },
            function (newval, old){
                console.log('我是第二个');
            }
        ]
    },
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

//美化滚动条
::-webkit-scrollbar {
  width: 3px;
  height: 8px;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  opacity: 0.5;
  background-color: #61666d;
  background-clip: padding-box;
  min-height: 18px;
  border-radius: 2em;
}

::-webkit-scrollbar-track {
  width: 6px;
  background-color: #021c41;
  border-radius: 2em;
}
  .slide-left-enter-active {
      animation-name: 'slide-left-in';
      animation-duration: .3s;
  }
  .slide-left-leave-active {
      animation-name: 'slide-left-out';
      animation-duration: .3s;
  }
  .slide-right-enter-active {
      animation-name: 'slide-right-in';
      animation-duration: .3s;
  }
  .slide-right-leave-active {
      animation-name: 'slide-right-out';
      animation-duration: .3s;
  }

  @keyframes slide-left-in {
      0% {
          transform: translate3d(100%, 0, 0);
      }
      100% {
          transform: translate3d(0, 0, 0);
      }
  }

  @keyframes slide-left-out {
      0% {
          transform: translate3d(0, 0, 0);
      }
      100% {
          transform: translate3d(-100%, 0, 0);
      }
  }

  @keyframes slide-right-in{
      0% {
          transform: translate3d(-100%, 0, 0);
      }
      100% {
          transform: translate3d(0, 0, 0);
      }
  }
  @keyframes slide-right-out  {
      0% {
          transform: translate3d(0, 0, 0);
      }
      100% {
          transform: translate3d(100%, 0, 0);
      }
  }

</style>
