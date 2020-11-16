const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave:false,//关闭eslint
    configureWebpack: {
      resolve: {
        alias: {//起别名
            'assets':resolve('src/assets'),
            'components':resolve('src/components'),
            'router':resolve('src/router'),
            'axios':resolve('src/axios'),
            'store':resolve('src/store'),
            'views':resolve('src/views'),//不能写成‘@/views’
        }
      }
    },
  }