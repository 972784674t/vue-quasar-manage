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
    title: '路由和权限',               // 导航 title
    icon: 'blur_on',                  // [非必须] 导航 icon
    itemLabel: 'MY SHARE',            // [非必须] 需要显示在该导航前的 label
    isOpen: true,                     // [非必须] 导航是否默认展开，默认为 false
    keepAlive: true,                  // [非必须] 组件是否缓存，默认为 false
    isHidden: false                   // [非必须] 是否在导航中显示，默认为 false
  },
  component: layout,         // 如果此路由是菜单的展开项，请引入 layout 布局
  children:[{...}]
}
```
在```BaseMenu.vue```菜单入口中，实现了两个功能

-  主菜单显示
- 菜单底部额外链接的实现

在侧滑菜单实现时，需要传入三个参数 , 颜色列表均参考自 [Quasar 颜色列表](http://www.quasarchs.com/style/color-palette/#%E9%A2%9C%E8%89%B2%E5%88%97%E8%A1%A8)
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
### 如何自定义菜单背景色，颜色参考[Quasar 颜色列表](http://www.quasarchs.com/style/color-palette/#%E9%A2%9C%E8%89%B2%E5%88%97%E8%A1%A8)
1、修改侧滑区域背景色
在```layout/MainLayout.vue```中
```html
<!-- 侧滑菜单 -->
<q-drawer v-model="leftDrawerOpen"
   show-if-above
   content-class="bg-white"  <!-- 默认为白色 -->
   :width="240">
   <base-menu/>
</q-drawer>
```
2、如果需要，添加自定义修改菜单元素样式
在```css```中添加
```css
.bg-menu-item-1{
  /* 颜色 1 ： 当菜单深度为 1 时显示*/
}
.bg-menu-item-2{
  /* 颜色 2 ： 当菜单深度为 2 时显示*/
}
.bg-menu-item-3{
  /* 颜色 3 ： 当菜单深度为 3 时显示*/
}
```
修改背景色入口参数，应用自定义颜色
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
### 修改```BaseMenuItem.vue```中的元素激活样式
```css
<style lang="sass">

  /* item 颜色 */
  $ITEM_COLOR: #2c3e50

  /* item 激活时颜色 */
  $ACTIVE_COLOR: #1976d2
  $ACTIVE_BACKGROUND: rgba(25, 118, 210, 0.0618)

  .base-menu-item
    color: $ITEM_COLOR !important

  /* item 被激活时父菜单的样式 */
  .baseRootItemActive
    color: $ACTIVE_COLOR !important

  /* item 被激活时的样式 */
  .baseItemActive
    color: $ACTIVE_COLOR !important
    background: $ACTIVE_BACKGROUND
    transition: all .618s
    &:after
      content: ''
      position: absolute
      width: 3px
      height: 100%
      background: $ACTIVE_COLOR !important
      top: -0.5px
      right: 0px

</style>
```
想做其他深入修改请看源码 [Menu](https://github.com/972784674t/vue-quasar-manage/tree/master/src/components/Menu)
