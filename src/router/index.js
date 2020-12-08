import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from './constantRoutes'

Vue.use(VueRouter)

// 解决路由守卫重定向时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 重置路由方法
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

// 定义创建路由方法，方便重置路由时调用
const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export default router
