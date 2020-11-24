import Vue from 'vue'

Vue.prototype.$api = api
import sjsc from './sjsc/sjscAll'
const api = {
    sjsc,
}
export default api