import axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import ElementUI, {Loading} from 'element-ui';

Vue.use(VueAxios, axios);

//axios配置和处理
axios.defaults.baseUrl = '/';//项目的基础url
axios.defaults.headers.common['Authorization'] = "";//请求token信息配置，配置了axios默认请求头Authorization字段为“”
axios.defaults.headers.post['Content-Type'] = 'application/x-ww-form-urlencoded';//请求type设置
axios.defaults.timeout = 10000;//默认请求超时时间为10秒，超过即超时

let loading;//定义loading变量
let needLoadingRequestCount = 0//记录需要请求的个数，当为0时代表后续没有要请求的东西了，

/* 请求加载完成之前显示loading是没有做的，后期可以研究一下*/

//使用Element loading-start 方法
function startLoading(){
    loading = Loading.service({
        lock: true,
        text: '请稍等...',
        background: 'rgba(0,0,0,0.2)'
    })
}

//使用Element loading-close方法
function endLoading() { 
    loading.close()
}

//展示页面loading, 并计算请求数
export function showFullScreenLoading(){
    if(needLoadingRequestCount === 0){
        startLoading()
    }
    needLoadingRequestCount++
}

//隐藏页面的loading, 并计算请求数
export function tryHideFullScreenLoading(){
    if(needLoadingRequestCount <= 0){
        return needLoadingRequestCount--;
    }
    if(needLoadingRequestCount === 0){
        endLoading();
    }
}

//添加请求拦截器, 定义请求之前处理的事情
axios.interceptors.request.use(function (config){
    //发送请求之前处理
    // config.headers.common['Authorization'] = localStorage.getItem('Authorization');//判断token在前台session中是否存在
    /* config.loading && showFullScreenLoading(); */
    //当加载完成之后，删除loading
    delete config.loading;
    //拦截之后需要给他return一下，还回去config
    return config;
}, function (error){
    //对请求错误做处理
    return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (config){
    /* tryHideFullScreenLoading(); */
    console.log(response);
    console.log(window.location);
    if(response && (response.status == 200)){
        //处理异常
        if(response.data.exceptionMes){
            ElementUI.MessageBox({
                type: 'info',
                title: response.data.exceptionMes,
                message: response.data.debugMes
            });
        }
    }
    //未登录或者请求被拒绝
    if(response.data.code == 401||response.data.code == 403){
        let status = false;
        let array = window.location.pathname.split('/');
        for(let i=0;i<array.length;i++){
            //如果是注册页面，那么不进行路由跳转到登录
            if(array[i] == 'userRegister'){
                status = true;
                continue
            }
            if(!status){
                window.location.href = window.location.origin + '/changjing/loginShoe';
                return false;
            }
        }
        if(response.headers["content-type"] == "text/html"){
            window.location.href = response.request.responseURL
        } else{
            return response.data;
        }
    }
    return response;
}, function(error){
    //对响应错误处理
    if(error.response && error.response.status == 401){

    }
    return Promise.reject(error.response.data);
})
Vue.prototype.$axios = axios;//定义调用方式