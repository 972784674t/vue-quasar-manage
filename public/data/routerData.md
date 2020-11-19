## 路由配置
路由配置参照了很多 vue-element-admin 中的设置信息，并且作者大神还制作了[手摸手教你撸后台系列](https://blog.csdn.net/qq_41912398/article/details/109231418) 的教程可供参考，确实对我有很大的帮助。

[[toc]]
## 路由数据结构
:::tip
由于路由的```meta```中的信息是生成菜单的依据，所以```meta```中的信息尤为重要
:::
```js
import layout from '../components/layout/layout'
...

{
  path: '/about-router',              // 路由路径
  name: 'about-router',               // 路由名称
  meta: {
    roles: ['admin', 'editor'],       // 能访问此路由的权限
    title: '路由和权限',               // 菜单 title
    icon: 'blur_on',                  // 菜单 icon
    itemLabel: 'MY SHARE',            // [非必须] 需要显示在该菜单前的 label
    isOpen: true,                     // [非必须] 菜单是否默认展开，默认为 false
    keepAlive: true,                  // [非必须] 组件是否缓存，默认为 false
    isHidden: false                   // [非必须] 是否在菜单中显示，默认为 false
  },
  component: layout,         // 如果此路由是菜单的展开项，请引入 layout 布局
  children:[{...}]  
} 
```
## ```router```文件夹说明：
```sh
router
├─ asyncRoutes.js                 # 权限路由
├─ constantRoutes.js              # 公共路由
├─ index.js                       # 路由主文件
├─ permission.js                  # 路由守卫和权限控制
└─ permissionUtils.js             # 权限控制工具类
```
其中 ```constantRoutes.js``` 维护了一个无需权限即可访问的公共路由，如：登录界面、404界面、500界面等。

因此，在项目没有被登录时，在路由主文件```index.js```中只挂载了```constantRoutes.js```这个公共路由：
```js
import constantRoutes from './constantRoutes'

// 重置路由方法，退出登录或变更权限时使用
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
```
而```asyncRoutes.js```则维护的是需要权限才能访问的路由，因此```asyncRoutes.js```中的路由是在项目运行时，根据当前用户权限以及```asyncRoutes.js```中定义的用户权限生成一个新的被授权了的路由```accessRoutes```，之后再使用```router.addRoutes(accessRoutes)```动态添加上去的。
## 如何鉴权？
:::tip
需要明确的是：鉴权应该发生在每一次路由跳转中，而不是仅仅在登录界面，同时也可以保证在F5刷新时，能回到当前界面。
:::
常用的鉴权和分配路由有两种方式：
- 1.根据用户的权限，去服务端请求相对应的路由(json格式)，之后将请求来的路由通过特定的工具类生成vue-router可用的路由格式并使用```addRoutes()```添加到VUE项目中。

- 2.在项目中配置好进入此路由需要的权限，通过与用户权限的对比，生成新的路由并使用```addRoutes()```添加到VUE项目中。

本项目使用的是第二种方法：

1、首先在路由守卫中判断是否有```token```，没有则跳转到登录界面
2、有token说明已经登录，并继续判断用户是否有权限，没有的话就去请求权限
3、如果用户有权限则去看看```store```中是否存有```accessRoutes```路由信息，如果有则放行进入对应的路由界面
4、如果没有```accessRoutes```路由信息，则根据用户权限去匹配```asyncRoutes.js```中的权限信息，生成```accessRoutes```并存储在```store```中，同时使用```addRoutes(accessRoutes)```将这些路由添加到VUE项目中。
5、每次路由跳转时，路由守卫都会执行上述操作

代码请看```router/permission.js```

对于路由守卫中```next()```、```next({ path: '/home' })```和```next({ ...to, replace: true })```的使用当时踩了不少坑。感兴趣的同学可以看一下我这篇文章：[VUE 路由守卫 next() / next({ ...to, replace: true }) / next(‘/‘) 说明](https://blog.csdn.net/qq_41912398/article/details/109231418)

### 用户权限和路由权限的匹配并生成```accessRoutes```路由的方法
:::tip
工具类在```permissionUtils.js```中，可以尝试着用分治的思路理解它
:::
```js
import store from '../store'

/**
 * 构造符合权限的路由，将不符合权限的路由过滤
 * @param router 未过滤的路由 因为最外层有一层用来做布局的 {index} 路由，所以传的是 index[0].children
 * @param t 暂存变量
 * @returns t 过滤后的路由
 */
function constructionRouters (router, t) {
  // 根据存储在 store 中的用户权限，进行一次过滤
  t = router.filter(item => { return item.meta.roles.indexOf(store.getters.getRole) !== -1 })
  for (const i in t) {
    // 如果有 chilren 就继续过滤 chilren
    if (t[i].children) {
      t[i].children = constructionRouters(t[i].children)
    }
  }
  return t
}

export default constructionRouters
```
### stroe 中保存 accessionRouter 的方法
:::tip
需要使用深拷贝才能保证原来的```asyncRoutes.js```不被影响
:::
```js
import asyncRoutes from '../router/asyncRoutes'
import constructionRouters from '../router/permissionUtils'
import deepClone from '../utils/clone-utils'
...

const mutations = {

  // 设置用户类型，并设置对应的路由
  SET_ROLES_AND_ROUTES: (state, payload) => {
    state.role = payload
    // 深拷贝
    const accessRoutes = deepClone(asyncRoutes)
    accessRoutes[0].children = constructionRouters(accessRoutes[0].children)
    state.routes = accessRoutes
  },
  ...

}
```
