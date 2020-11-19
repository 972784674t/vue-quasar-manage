import _Vue from 'vue'
import router from './index'
import LoadingBar from '../components/LoadingBar/LoadingBar'
import store from '../store/index'
import constantRoutes from './constantRoutes'
import { addTagView, setTagView } from '../components/TagView/tagViewUtils'
import { setBreadcrumbs } from '../components/Breadcrumbs/breadcrumbsUtils'

router.beforeEach((to, from, next) => {
  // 成功登录后处理
  handleTagViewAndBreadcrumbsAndKeepAlive(to)
  // 模拟获取 token
  const token = sessionStorage.getItem('access_token')
  const userRole = sessionStorage.getItem('user_role')
  // 存在 token 说明已经登录
  if (token) {
    // 登录过就不能访问登录界面
    if (to.path === '/login') {
      next({ path: '/' })
    }
    // 存在用户权限，并且路由不为空则放行
    if (userRole && store.getters.getRoutes.length) {
      next()
    } else {
      // 模拟不存在用户权限时，获取用户权限
      const userRole = sessionStorage.getItem('user_role')
      // 并根据权限设置对应的路由
      store.commit('SET_ROLES_AND_ROUTES', userRole)
      router.addRoutes(store.getters.getRoutes)
      // 如果 addRoutes 并未完成，路由守卫会再执行一次
      next({ ...to, replace: true })
    }
  } else {
    if (to.path !== '/logon') {
      next({ path: '/logon' })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  // 使用多个 stop() 来保证 LoadingBar 在动态添加路由后正确关闭
  LoadingBar.stop()
  LoadingBar.stop()
})

export default router

/**
 * 处理 tagView 和 面包屑
 * @param to
 */
function handleTagViewAndBreadcrumbsAndKeepAlive (to) {
  if (to.name != null) {
    document.title = to.meta.title + _Vue.prototype.$title
    LoadingBar.start()
    // 判断要添加的 to 是否是公共路由
    for (let i = 0; i < constantRoutes.length; i++) {
      if (constantRoutes[i].path === to.path) {
        return
      }
    }
    // 判断是否为刷新操作，如果是刷新操作则从 sessionStorage 获取保存的 tagView 信息
    let tagViewOnSS = []
    JSON.parse(window.sessionStorage.getItem('tagView')) === null ? window.sessionStorage.setItem('tagView', '[]') : tagViewOnSS = JSON.parse(window.sessionStorage.getItem('tagView'))
    if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
      setTagView(tagViewOnSS)
      store.commit('SET_KEEPALIVELIST', tagViewOnSS)
    } else {
      addTagView(to)
    }
    setBreadcrumbs(to.matched)
    handleKeepAlive(to)
  }
}

/**
 * 处理多余的 layout : router-view，让当前组件保持在第一层 index : router-view 之下
 * @param to
 */
function handleKeepAlive (to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'layout') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}
