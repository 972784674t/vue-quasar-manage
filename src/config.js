import Vue from 'vue'

// 浏览器 title
Vue.prototype.$title = ' | Vue Quasar'

// 侧边栏风格
Vue.prototype.$SildeBar = 'hHh lpR fFf' // 风格二：lHh lpR fFf

// axiois 中请求基地址，如果需要请在 axios/fetchData.js 中打开
Vue.prototype.$baseURL = ''

// 请求超时时间
Vue.prototype.$timeOut = 8000

// 组件最大缓存数
Vue.prototype.$Max_KeepAlive = 10

// 侧边栏底部文字
Vue.prototype.$buttonList = [
  { text: 'Vue', URL: 'https://cn.vuejs.org/' },
  { text: 'Quasar', URL: 'http://www.quasarchs.com/' },
  { text: 'Github', URL: 'https://github.com/972784674t/vue-quasar-manage' },
  { text: 'Gitee', URL: 'https://gitee.com/incimo/vue-quasar-manage' },
  { text: '捐赠', URL: '/cimo' },
  { text: '关于作者', URL: '/cimo' }
]

export default Vue
