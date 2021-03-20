import _axios from '../axios/AxiosConfig'
import Vue from 'vue'

export function getUserRouter () {
  return _axios({
    url: Vue.prototype.$PUBLIC_PATH + 'data/asyncRouterDemo',
    method: 'get',
    responseType: 'text'
  })
}
