## Axios：在 VUE 实例中封装了一个全局请求工具类 fetchData
:::tip
```(axios/FetchData.js)```：封装了```post```和```FormData```的数据发送
:::

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
    data: query.data || '', // 请求体数据 （仅仅post可用）
    type: query.type // 自定义请求类型，请看 AxiosConfig.js
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
     url: '/data/markdownData',
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
:::tip
当 type: 'FORM' 时，```Content-Type``` 会被设置为 ```application/x-www-form-urlencoded```，并使用```qs```库编码数据。这个方法方便后端接受来自 post 请求的参数     

更多信息请看[axios 中文网](http://www.axios-js.com/zh-cn/docs/#%E4%BD%BF%E7%94%A8-application-x-www-form-urlencoded-format)
:::
```js
// 定义想要的方法
 getMsg () {
   // 定义请求体，默认使用 post 方法
   const query = {
     url: '/data/markdownData',
     type: 'FORM',
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
当 type: 'FORM-DATA' 时，data 中的数据将会转为 FormData 形式
:::

```js
// 定义想要的方法
 getMsg () {
   // 定义请求体
   const query = {
     url: '/data/markdownData',
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
import qs from 'qs'

/**
 * axios 初始化
 */
const axios = Axios.create({
  // baseURL: Vue.prototype.$baseURL, // 请求基地址
  timeout: Vue.prototype.$timeOut // 超时时间
})

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('access_token')
    config.headers.Authorization = 'Bearer ' + token
    if (config.type) {
      switch (config.type) {
        case 'FORM-DATA':
          config.transformRequest = [data => { return 'args=' + JSON.stringify(data) }]
          break
        case 'FORM':  // 方便后端接受 post 方法参数
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          config.data = qs.stringify(config.data)
          break
        default:
          break
      }
    }
    console.log(config)
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
    if (error.code === 'ECONNABORTED' || error.message.indexOf('timeout') !== -1 || error.message === 'Network Error') {
      defaultNotify.message = '网络异常'
      Notify.create(defaultNotify)
      return Promise.reject(error)
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
      default:
        break
    }
    return Promise.reject(error)
  }
)

export default axios
```
