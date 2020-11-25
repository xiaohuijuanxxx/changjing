import Vue from 'vue'
import sjsc from './sjsc/sjscAll'
import SSOloginApi from './SSOloginApi';//登录


const api = {
    sjsc,
    SSOloginApi,
}
export default api

Vue.prototype.$api = api