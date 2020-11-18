/* 封装addRoutes中传入的参数，随机路由 */
'use strict'
export default function(param){
    //如果没有传过来名称则定义一个随机名称、floor函数： 找到小于参数的最大整数
    let tabName = param.tabName || "vue"+Math.floor(Math.random() * 10000);
    let tabNamber = param.tabNumber || "vue"+Math.floor(Math.random() * 10000);
    let components = {
        extends: param.components,
        name: tabNamber
    }
}