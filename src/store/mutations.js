import asyncRoutes from '../router/asyncRoutes'
import constructionRouters from '../router/permissionUtils'
import deepClone from '../utils/CloneUtils'
import router, { resetRouter } from '../router'
import { removeATagView, removeOneSide } from '../components/TagView/TagViewUtils'

const mutations = {

  // 设置用户类型，并根据权限获取授权路由
  SET_ROLES_AND_ROUTES: (state, payload) => {
    state.role = payload
    // 深拷贝
    const accessRoutes = deepClone(asyncRoutes)
    accessRoutes[0].children = constructionRouters(accessRoutes[0].children)
    state.routes = accessRoutes
  },

  // 将动态获取的路由设置到 store 中
  SET_ROLES: (state, payload) => {
    state.routes = payload
  },

  // 退出登录
  LOGOUT: (state, payload) => {
    state.role = ''
    state.routes = []
    state.tagView = []
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('user_role')
    resetRouter()
  },

  // 新增 tagView
  ADD_TAG_VIEW: (state, payload) => {
    const size = state.tagView.length
    // 首次进入或刷新页面时，当前路由不是根路由
    if (!size && payload.fullPath !== '/') {
      state.tagView.push(payload)
      return
    }
    // 为了避免 tagView 重复添加。 构建一个以 fullPath 为标识的数组 t[]
    const t = []
    for (let i = 0; i < size; i++) {
      t.push(state.tagView[i].fullPath)
    }
    if (t.indexOf(payload.fullPath) === -1) {
      state.tagView.push(payload)
    }
  },

  SET_TAG_VIEW: (state, payload) => {
    state.tagView = payload
  },

  /**
   * 移除 tagView
   * case 'undefined' : 移除所有 tagView
   * case 'object' : 移除某一侧 tagView
   * default '要删除元素的下标 i ' : 移除某一个 tagView
   *          如果移除的是第一个 tagView，则跳转到当前的第一个 tagView
   *          如果移除的是最后一个 tagView，则跳转到当前的最后一个 tagView
   * @param state
   * @param payload
   * @constructor
   */
  REMOVE_TAG_VIEW: (state, payload) => {
    switch (typeof payload) {
      case 'undefined':
        state.tagView = []
        window.sessionStorage.setItem('tagView', '[]')
        router.push('/')
        break
      case 'object':
        removeOneSide(state, payload)
        break
      default:
        removeATagView(state, payload)
    }
  },

  // 设置面包屑
  SET_BREADCRUMBS: (state, payload) => {
    state.breadcrumbs = payload
  },

  /**
   * 设置缓存列表
   * @param payload tagView[]
   */
  SET_KEEPALIVE_LIST: (state, payload) => {
    state.keepAliveList = []
    for (let i = 0; i < payload.length; i++) {
      if (payload[i].keepAlive) {
        state.keepAliveList.push(payload[i].name)
      }
    }
    // 如果需要缓存首页，如下方所示，在方法最后 push 对应的路由组件名称即可
    // state.keepAliveList.push('home')
    return state.keepAliveList
  }

}

export default mutations
