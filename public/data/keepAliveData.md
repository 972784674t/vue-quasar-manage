## keepAlive
:::tip
- 缓存上限在```config.js```中设置为10，如超出上限则使用LRU的策略置换缓存数据（没错就是计算机内存管理中的LRU）
- 缓存不建议过多，内存很容易爆，如果需要大量缓存，建议引入```redis```或者浏览器自带的```storage```来处理缓存
- 默认不缓存首页，如果需要请在```store/mutations.js```的```SET_KEEPALIVELIST```方法中根据自身需求修改(有示例代码)
:::
缓存展示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201111011711627.gif#pic_center)

使用 &lt;keep-alive> 实现缓存目前主流的有两种方法
### 方法一：
1. 在路由元信息中添加缓存标识：
```js
{
  path: 'json',
  name: 'json',
  meta: {
    ...
    keepAlive: true
    ...
  },
  component: () => import('../views/components/json')
},
```
2. 使用 v-if 判断是否缓存
```html
<keep-alive>
   <router-view v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>
```
这种方法是比较早版本时使用的方法，当时```<keep-alive>```还没有```include```属性。这个方法虽然方便，但是会带来很多bug，比如无法使用```<transition>```、缓存了不必要的，用来实现嵌套路由操作的```<router-view>```布局组件等。

然鹅，我有强迫症，不能接受没有动效 (￣(00)￣)　

### 因此这里重点讲方法二（正在使用的）：
1.将路由元信息中包含```keepAlive: true```的路由记录下来，并将该路由的name属性为维护在使用```vuex```中的一个```keepAliveList: []```里。

:::tip
首先我们需要知道```keep-alive```是根据``include``中的值来匹配当前路由```name```属性和对应路由页面组件的```name```属性，来判断这个路由中的组件是否需要缓存。

因此为了确保```keep-alive```正确执行，配置路由时的```name```属性必须和对应路由页面组件的```name```属性相同
:::

像这样：
```js
// 在路由配置中
...
{
  path: '/cimo',
  name: 'cimo',   // 这两处相同
  component: () => import('../views/components/cimo')
},
...

// 在 cimo 组件中
export default {
  name: 'cimo',   // 这两处相同
  ...
}
```


2.使用```<keep-alive>```的```include```属性，来实现动态的组件缓存。

先说一下``include``属性，它的值可以是：字符串，正则表达式，数组

我们只需要将```keepAliveList: []```里保存的需要缓存的路由组件```name```数组传入```include```即可

因此使用起来就像这样
```html
<keep-alive :include="keepAliveList">
  <router-view :key="key"/>
</keep-alive>

<script>
export default {
  name: 'index',
  data () {
    return {
      keepAliveList: this.$store.getters.getKeepAliveList,
    }
  },
  computed: {
    // 获取缓存列表
    getKeepAliveList () {
      return this.$store.getters.getKeepAliveList
    },
    key () {
      return this.$route.path
    }
  },
  watch: {
    getKeepAliveList (n, o) {
      this.keepAliveList = n
    }
  }
}
</script>
```

### ==但是==：
如果遇到嵌套的```<router-view>```或者嵌套路由（这是很常见的操作），这个时候后面几层```<router-view>```中的组件缓存会出问题

比如我有下面的三层结构：
```js
 {
    path: '/menu-1',
    name: 'menu-1',
    // 布局文件 ，用来实现多层嵌套的 组件访问，对于多层次的路由访问来说，这是必须的
    component: layout,    
    children: [
      {
        path: 'menu-2',
        name: 'menu-2',
        component: layout,
        children: [
        {
          path: 'menu-3',
          name: 'menu-3',
          meta: {
            keepAlive: true
        },
        component: () => import('../views/components/menu-3.vue')
        }
      ]
    }
  ]
}
```
文件内容 ```layout.vue```
```html
<template>
   <router-view/>
</template>

<script>
export default {
  name: 'layout'
}
</script>
```
我想要访问```menu-3```，在路由之中可视化可以这么看 ( layout 写错了，淦 )：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109150551344.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)
我们可以发现，```keep-alive```只缓存到第一层，也就是```<layout/>```这个组件，而这个组件只是一个```<router-view/>```组件，这明显不是我们想要的。

我们需要把```<layout/>```这个无用的组件从```<keep-alive> <router-view/> <keep-alive/>```之中提出，
换句话说是将```<menu-3/>```提升到```<keep-alive>```能缓存的那一层，像这样
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109151428816.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)

### 如何解决？
需要把嵌套的```<router-view>```拍平

也就是在路由守卫中添加一个将无用的 layout 布局过消除的方法：
```js
router.beforeEach((to, from, next) => {
  ...
  handleKeepAlive(to)
  ...
}

/**
 * 递归处理多余的 layout : <router-view>，
 * 让需要访问的组件保持在第一层 index : <router-view> 之下
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
```
### 没有进行 layout 移除时
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117142004976.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)

### layout 移除之后
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201117142124868.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)

接下来就可以愉快的缓存多层次的组件了
