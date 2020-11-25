const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave:false,//关闭eslint
    //configureWebpack,如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    configureWebpack: {
      plugins:[
        //new webpack.ProvidePlugin 自动加载模块，而不必到处 import 或 require 。
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
        })
      ],
      resolve: {
        alias: {//起别名
            'assets':resolve('src/assets'),
            'components':resolve('src/components'),
            'router':resolve('src/router'),
            /* 'axios':resolve('src/axios'), 这里设置axios别名会引起后续路径*/
            'store':resolve('src/store'),
            'views':resolve('src/views'),//不能写成‘@/views’
        }
      }
    },
  }