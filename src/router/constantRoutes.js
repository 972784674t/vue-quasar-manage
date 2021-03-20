/**
 * 公共路由
 */
const constantRoutes = [
  {
    path: '/logon',
    name: 'Logon.vue',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/logon/Logon.vue')
  },
  {
    path: '/NoFound404',
    name: 'NoFound404',
    meta: {
      title: '404',
      icon: 'sentiment_dissatisfied',
      isHidden: true
    },
    component: () => import('@/components/404/NoFound404')
  }
]

export default constantRoutes
