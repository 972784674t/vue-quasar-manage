## Axios：在 VUE 实例中封装了一个全局请求工具类 fetchData

[[toc]]

位置```(axios/fetchData.js)```，支持 FormData 方式发送数据
```js
import _axios from '../axios/axios_config'
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
    auth: query.auth || { access_token: sessionStorage.getItem('access_token') },
    data: query.data || '' // 请求体数据 （仅仅post可用）
  })
}

// 注入 Vue 原型
Vue.prototype.$fetchData = fetchData

export default Vue
```

### 如何使用
### 1、get 方法
```js
// 定义想要的方法
 getMsg () {
   // 定义请求体
   const query = {
     url: '/data/markdownData.md',
     responseType: 'text',
     method: 'get',
     params: {
       p1: 'a',
       p2: 'b'
     }
   }
   this.$fetchData(query).then(res => {
     console.log(res.data)
   }).catch(error => {
     console.log(error)
   })
}
```
### 2、post 方法
```js
// 定义想要的方法
 getMsg () {
   // 定义请求体
   const query = {
     url: '/data/markdownData.md',
     responseType: 'text',
     data: {
       p1: 'a',
       p2: 'b'
     }
   }
   this.$fetchData(query).then(res => {
     console.log(res.data)
   }).catch(error => {
     console.log(error)
   })
}
```
### 3、使用 FormData 方式发送数据

::: tip
当 type: 'FormData' 时，data 中的数据将会转为 FormData 形式
:::

```js
// 定义想要的方法
 getMsg () {
   // 定义请求体
   const query = {
     url: '/data/markdownData.md',
     responseType: 'text',
     method: 'post',
     type: 'FORM-DATA',
     data: {
       p1: 'a',
       p2: 'b'
     }
   }
   this.$fetchData(query).then(res => {
     console.log(res.data)
   }).catch(error => {
     console.log(error)
   })
}
```
### axios 的初始化 ```axios/axios-conifg.js```

```js
import Axios from 'axios'
import Vue from 'vue'
import { Notify } from 'quasar'

/**
 * axios 初始化
 * @type {AxiosInstance}
 */

const axios = Axios.create({
  baseURL: Vue.prototype.$baseURL, // 请求基地址
  timeout: Vue.prototype.$timeOut // 超时时间
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token')
    if (token && config.type) {
      config.headers.Authorization = 'Bearer ' + token
      switch (config.type) {
        case 'FORM-DATA':
          config.transformRequest = [data => { return 'args=' + JSON.stringify(data) }]
          break
        default:
          config.headers = {
            'Content-Type': 'application/json'
          }
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const defaultNotify = {
      message: '未知错误',
      icon: 'warning',
      color: 'warning',
      position: 'top',
      timeout: 1500
    }
    switch (error.response.status) {
      case 403:
        defaultNotify.message = '拒绝访问(403)'
        Notify.create(defaultNotify)
        break
      case 404:
        defaultNotify.message = '资源不存在(404)'
        Notify.create(defaultNotify)
        break
      case 408:
        defaultNotify.message = '请求超时(404)'
        Notify.create(defaultNotify)
        break
      case 500:
        defaultNotify.message = '服务器错误(500)'
        Notify.create(defaultNotify)
        break
      case 501:
        defaultNotify.message = '服务未实现(501)'
        Notify.create(defaultNotify)
        break
      case 502:
        defaultNotify.message = '网络错误(502)'
        Notify.create(defaultNotify)
        break
      case 503:
        defaultNotify.message = '服务不可用(503)'
        Notify.create(defaultNotify)
        break
      case 504:
        defaultNotify.message = '网络超时(504)'
        Notify.create(defaultNotify)
        break
      case 505:
        defaultNotify.message = 'HTTP版本不受支持(505)'
        Notify.create(defaultNotify)
        break
    }
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      defaultNotify.message = '网络异常'
      Notify.create(defaultNotify)
    }
    return Promise.reject(error)
  }
)

export default axios
```
