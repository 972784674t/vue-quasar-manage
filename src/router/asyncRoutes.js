import layout from '../components/Layout/layout'

/**
 * 需要授权访问的路由
 */
const asyncRoutesChildren = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('../views/home/home')
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
        name: 'getting-started',
        meta: {
          roles: ['admin', 'editor'],
          title: '基础配置',
          icon: 'tune',
          keepAlive: true
        },
        component: () => import('../views/router/getting-started')
      },
      {
        path: 'router-config',
        name: 'router-config',
        meta: {
          roles: ['admin', 'editor'],
          title: '路由配置',
          icon: 'multiple_stop',
          keepAlive: true
        },
        component: () => import('../views/router/router-config')
      },
      {
        path: 'my-menu',
        name: 'my-menu',
        meta: {
          roles: ['admin', 'test'],
          title: '关于菜单',
          icon: 'menu',
          keepAlive: true
        },
        component: () => import('../views/router/my-menu')
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
        path: 'VolumeOptimization',
        name: 'VolumeOptimization',
        meta: {
          roles: ['admin', 'editor'],
          title: '体积优化',
          icon: 'miscellaneous_services',
          keepAlive: true
        },
        component: () => import('../views/optimization/VolumeOptimization')
      },
      {
        path: 'renderOptimization',
        name: 'renderOptimization',
        meta: {
          roles: ['admin', 'editor'],
          title: '渲染性能优化',
          icon: 'flip',
          keepAlive: true
        },
        component: () => import('../views/optimization/renderOptimization')
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
        name: 'keep-alive-doc',
        meta: {
          roles: ['admin', 'editor'],
          title: 'keep-alive 缓存',
          icon: 'select_all',
          keepAlive: true
        },
        component: () => import('../views/components/keep-alive-doc')
      },
      {
        path: 'scrollDemo',
        name: 'scrollDemo',
        meta: {
          roles: ['admin', 'editor'],
          title: '滚动区域',
          icon: 'swap_vert',
          keepAlive: true
        },
        component: () => import('../views/components/scrollDemo')
      },
      {
        path: 'tagViewDemo',
        name: 'tagViewDemo',
        meta: {
          roles: ['admin', 'editor'],
          title: 'tagView',
          icon: 'exit_to_app',
          keepAlive: true
        },
        component: () => import('../views/components/tagViewDemo')
      },
      {
        path: 'breadcrumbsDemo',
        name: 'breadcrumbsDemo',
        meta: {
          roles: ['admin', 'editor'],
          title: '面包屑',
          icon: 'clear_all',
          keepAlive: true,
          isHidden: false
        },
        component: () => import('../views/components/breadCrumbsDemo')
      },
      {
        path: 'icon',
        name: 'icon',
        meta: {
          roles: ['admin', 'editor'],
          title: 'icon 集合',
          icon: 'grain',
          keepAlive: true
        },
        component: () => import('../views/components/icon')
      },
      {
        path: 'loading-bar',
        name: 'loading-bar',
        meta: {
          roles: ['admin', 'test'],
          title: 'loading-bar',
          icon: 'rotate_right',
          keepAlive: true
        },
        component: () => import('../views/components/loading-bar')
      },
      {
        path: 'markdown',
        name: 'markdown',
        meta: {
          roles: ['admin', 'test'],
          title: 'markdown',
          icon: 'edit_road',
          keepAlive: true
        },
        component: () => import('../views/components/markdown')
      },
      {
        path: 'json',
        name: 'json',
        meta: {
          roles: ['admin', 'test'],
          title: 'json',
          icon: 'settings_ethernet',
          keepAlive: true
        },
        component: () => import('../views/components/json')
      }
    ]
  },
  {
    path: '/axios',
    name: 'axios',
    meta: {
      roles: ['admin', 'editor'],
      title: 'axios',
      icon: 'http',
      keepAlive: true
    },
    component: () => import('../views/axios/axios.vue')
  },
  {
    path: '/menu-1',
    name: 'menu-1',
    meta: {
      roles: ['admin', 'test'],
      title: '三级菜单',
      icon: 'filter_3'
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
            name: 'menu-3',
            meta: {
              roles: ['admin', 'test'],
              title: '菜单 1-2',
              icon: 'filter_1',
              keepAlive: true
            },
            component: () => import('../views/components/menu-3.vue')
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
    name: 'my-lottie',
    meta: {
      roles: ['admin', 'editor'],
      title: 'lottie 动效',
      itemLabel: 'MY SHARE',
      icon: 'videocam',
      keepAlive: true
    },
    component: () => import('../views/lottie/lottie')
  },
  {
    path: '/tableDetail',
    name: 'tableDetail',
    meta: {
      roles: ['admin', 'editor'],
      title: 'Treats 详情',
      icon: 'blur_linear',
      isHidden: true
    },
    component: () => import('../views/home/tableDetail')
  },
  {
    path: '/cimo',
    name: 'cimo',
    meta: {
      roles: ['admin', 'editor'],
      title: '关于作者',
      icon: 'fab fa-studiovinari',
      isHidden: true
    },
    component: () => import('../views/components/cimo')
  },
  {
    path: '*', // 此处需置于最底部
    redirect: '/NoFound404',
    meta: {
      roles: ['admin', 'test'],
      isHidden: true
    }
  }
]

const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import('../views/index'),
    meta: {
      // index 应该是所有的用户都可以访问
      roles: ['admin', 'editor', 'test']
    },
    children: asyncRoutesChildren
  }
]

export default asyncRoutes
