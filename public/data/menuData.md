## Menu 菜单
```sh
components
|-Menu
  |-BaseMenu.vue                    # 菜单入口
  |-BaseMenuItem.vue                # 菜单元素
```
- 底部外链接的定义在```config.js```里
:::tip
如果你想使用外部链接，请确保链接是以 ```http```或```https``` 开头的
:::
菜单的生成依据是路由中的元信息，因此不需要在另外写菜单，定义好路由元信息即可：
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
    isOpen: true,                     // [非必须] 菜单是否默认展开，默认为否
    keepAlive: true,                  // [非必须] 组件是否缓存，默认为否
    isHidden: false                   // [非必须] 是否在菜单中显示，默认为 false
  },
  component: layout,         // 如果此路由是菜单的展开项，请引入layout布局
  children:[{...}]  
} 
```
在```BaseMenu.vue```菜单入口中，实现了两个功能 

-  主菜单显示
- 菜单底部额外链接的实现

在主菜单实现时，需要传入三个参数
```html
 <base-menu-item 
   :my-router="menuList"     // 存储在 Vuex 中的授权路由
   :init-level="0"           // 菜单子元素头部缩进等级
   :bg-color="bgColor"       // 菜单子元素背景色
   :bg-color-level="1"       // 菜单子元素背景色深度，菜单层数越深，背景色越深
   :duration="150"           // 菜单项展开速度 ms 
 />
 
<script>
import MyQMenuItem from './BaseMenuItem'
export default {
  name: 'base-menu',
  components: { BaseMenuItem},
  data () {
    return {
      // 存储在 Vuex 中的授权菜单
      menuList: this.$store.getters.getRoutes[0].children,
      bgColor: 'bg-grey',
    }
  }
  ...
}
</script>
```
### 如何自定义菜单背景色
1、修改侧滑区域背景色
在```index.vue```中
```html
<!-- 侧滑菜单 -->
<q-drawer v-model="leftDrawerOpen"
   show-if-above
   content-class="bg-white"  <!-- 默认为白色 -->
   :width="240">
   <base-menu/>
</q-drawer>
```
2、修改菜单元素样式
在```css```中添加
```css
.bg-menu-item-1{
  /* 颜色 1*/
}
.bg-menu-item-2{
  /* 颜色 2*/
}
.bg-menu-item-3{
  /* 颜色 3*/
}
```
修改背景色入口参数
```js
<script>
import MyQMenuItem from './BaseMenuItem'
export default {
  name: 'base-menu',
  components: { BaseMenuItem},
  data () {
    return {
      ...
      bgColor: 'bg-menu-item',
    }
  }
  ...
}
</script>
```
想做其他深入修改请看源码 [Menu](https://github.com/972784674t/vue-quasar-manage/tree/master/src/components/Menu)
