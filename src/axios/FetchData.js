import _axios from './AxiosConfig'
import Vue from 'vue'

/**
 * 自定义通用 axios 封装类
 * @param query 请求体
 * @returns {*}
 * @author ths
 */

const fetchData = query => {
  return _axios({
    url: query.url, // 请求地址
    method: query.method || 'POST', // 请求方式，默认为 POST
    params: query.params, // 请求参数
    responseType: query.responseType || 'json', // 响应类型，默认为json
    auth: query.auth || { username: localStorage.getItem('access_token') },
    data: query.data || '', // 请求体数据 （仅仅post可用）
    type: query.type // 自定义请求类型，请看 axios-config.js
  })
}

Vue.prototype.$fetchData = fetchData

export default Vue
