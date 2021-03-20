import layout from '../components/Layout/Layout'

/**
 * 需要授权访问的路由
 */
const asyncRoutesChildren = [
  {
    path: '/',
    name: 'Home',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('@/views/home/Home')
  },
  {
    path: '/start',
    name: 'start',
    meta: {
      roles: ['admin', 'editor'],
      title: '快速起步',
      icon: 'design_services',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'getting-started',
        name: 'GettingStarted',
        meta: {
          roles: ['admin', 'editor'],
          title: '基础配置',
          icon: 'tune',
          keepAlive: true
        },
        component: () => import('@/views/router/GettingStarted')
      },
      {
        path: 'router-config',
        name: 'RouterConfig',
        meta: {
          roles: ['admin', 'editor'],
          title: '路由配置',
          icon: 'multiple_stop',
          keepAlive: true
        },
        component: () => import('@/views/router/RouterConfig')
      },
      {
        path: 'my-menu',
        name: 'MyMenu',
        meta: {
          roles: ['admin', 'test'],
          title: '关于菜单',
          icon: 'menu',
          keepAlive: true
        },
        component: () => import('@/views/router/MyMenu')
      },
      {
        path: 'async-router',
        name: 'AsyncRouter',
        meta: {
          roles: ['admin', 'editor'],
          title: '动态路由',
          icon: 'all_inclusive',
          keepAlive: true
        },
        component: () => import('@/views/router/AsyncRouter')
      },
      {
        path: 'async-router-impl',
        name: 'AsyncRouterImpl',
        meta: {
          roles: ['admin', 'editor'],
          title: '动态路由实现思路',
          keepAlive: true
        },
        component: () => import('@/views/router/AsyncRouterImpl')
      }
    ]
  },
  {
    path: '/optimization',
    name: 'optimization',
    meta: {
      roles: ['admin', 'test'],
      title: '性能优化',
      icon: 'memory'
    },
    component: layout,
    children: [
      {
        path: 'volume-optimization',
        name: 'VolumeOptimization',
        meta: {
          roles: ['admin', 'editor'],
          title: '体积优化',
          icon: 'miscellaneous_services',
          keepAlive: true
        },
        component: () => import('@/views/optimization/VolumeOptimization')
      },
      {
        path: 'render-optimization',
        name: 'RenderOptimization',
        meta: {
          roles: ['admin', 'editor'],
          title: '渲染性能优化',
          icon: 'flip',
          keepAlive: true
        },
        component: () => import('@/views/optimization/RenderOptimization')
      }
    ]
  },
  {
    path: '/component',
    name: 'component',
    component: layout,
    meta: {
      roles: ['admin', 'test'],
      title: '组件说明',
      icon: 'apps',
      isOpen: true,
      isHidden: false
    },
    children: [
      {
        path: 'keep-alive-doc',
        name: 'KeepaliveDoc',
        meta: {
          roles: ['admin', 'editor'],
          title: 'keep-alive 缓存',
          icon: 'select_all',
          keepAlive: true
        },
        component: () => import('@/views/components/KeepaliveDoc')
      },
      {
        path: 'scrollDemo',
        name: 'ScrollDemo',
        meta: {
          roles: ['admin', 'editor'],
          title: '滚动区域',
          icon: 'swap_vert',
          keepAlive: true
        },
        component: () => import('@/views/components/ScrollDemo')
      },
      {
        path: 'tagViewDemo',
        name: 'TagViewDemo',
        meta: {
          roles: ['admin', 'editor'],
          title: 'tagView',
          icon: 'exit_to_app',
          keepAlive: true
        },
        component: () => import('@/views/components/TagViewDemo')
      },
      {
        path: 'breadcrumbsDemo',
        name: 'BreadcrumbsDemo',
        meta: {
          roles: ['admin', 'editor'],
          title: '面包屑',
          icon: 'clear_all',
          keepAlive: true,
          isHidden: false
        },
        component: () => import('@/views/components/BreadcrumbsDemo')
      },
      {
        path: 'icon',
        name: 'Icon',
        meta: {
          roles: ['admin', 'editor'],
          title: 'icon 集合',
          icon: 'grain',
          keepAlive: true
        },
        component: () => import('@/views/components/Icon')
      },
      {
        path: 'loading-bar',
        name: 'LoadingBar',
        meta: {
          roles: ['admin', 'test'],
          title: 'loading-bar',
          icon: 'rotate_right',
          keepAlive: true
        },
        component: () => import('@/views/components/LoadingBar')
      },
      {
        path: 'markdown',
        name: 'Markdown',
        meta: {
          roles: ['admin', 'test'],
          title: 'markdown',
          icon: 'edit_road',
          keepAlive: true
        },
        component: () => import('@/views/components/Markdown')
      },
      {
        path: 'json',
        name: 'Json',
        meta: {
          roles: ['admin', 'test'],
          title: 'json',
          icon: 'settings_ethernet',
          keepAlive: true
        },
        component: () => import('@/views/components/Json')
      }
    ]
  },
  {
    path: '/axios',
    name: 'Axios',
    meta: {
      roles: ['admin', 'editor'],
      title: 'axios',
      icon: 'http',
      keepAlive: true
    },
    component: () => import('@/views/axios/Axios.vue')
  },
  {
    path: '/menu-1',
    name: 'menu-1',
    meta: {
      roles: ['admin'],
      title: '三级菜单',
      icon: 'filter_3',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'menu-2',
        name: 'menu-2',
        meta: {
          roles: ['admin', 'test'],
          title: '菜单 1-1',
          icon: 'filter_2',
          keepAlive: true
        },
        component: layout,
        children: [
          {
            path: 'menu-3',
            name: 'Menu-3',
            meta: {
              roles: ['admin', 'test'],
              title: '菜单 1-2',
              icon: 'filter_1',
              keepAlive: true
            },
            component: () => import('@/views/components/Menu-3.vue')
          }
        ]
      }
    ]
  },
  {
    path: 'http://www.quasarchs.com/vue-components/button',
    name: 'external-link',
    meta: {
      roles: ['admin', 'editor'],
      title: '外部链接/更多组件',
      icon: 'send'
    }
  },
  {
    path: '/my-lottie',
    name: 'Lottie',
    meta: {
      roles: ['admin', 'editor'],
      title: 'lottie 动效',
      itemLabel: 'MY SHARE',
      icon: 'videocam',
      keepAlive: true
    },
    component: () => import('@/views/lottie/Lottie')
  },
  {
    path: '/tableDetail',
    name: 'TableDetail',
    meta: {
      roles: ['admin', 'editor'],
      title: 'Treats 详情',
      icon: 'blur_linear',
      isHidden: true
    },
    component: () => import('@/views/home/TableDetail')
  },
  {
    path: '/cimo',
    name: 'Cimo',
    meta: {
      title: '关于作者',
      icon: 'fab fa-studiovinari',
      isHidden: true
    },
    component: () => import('@/views/components/Cimo')
  },
  {
    path: '*', // 此处需置于最底部
    name: '404',
    redirect: '/NoFound404',
    meta: {
      title: '404',
      icon: 'fab fa-studiovinari',
      isHidden: true
    }
  }
]

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import('@/views/Index'),
    children: asyncRoutesChildren
  }
]

export default asyncRoutes

export { asyncRoutesChildren }
