## breadcrumbs 面包屑
```sh
components
|-Breadcrumbs
   |-Breadcrumbs.vue                # Breadcrumb 源文件
   |-BreadcrumbsUtils.js            # 设置 Breadcrumbs 工具类
```
面包屑的路径信息是在路由守卫中通过```to.matched```属性过滤而来。

但为了实现```<keep-alive>```缓存，需要将```to.matched```做了拍平处理（详见 ```<keep-alive>缓存```说明）,此时```to.matched```被拍平之后失去了父组件的路由元信息，这样在实现面包屑功能时无法做到如

组件说明    /    面包屑
```（父路由）```/```（子路由）```

的地址展示。

因此在进行路由拍平之前，需要保存```to.matched```，因此在Vuex中维护了一个```breadcrumbs:[]```，用来记录当前页面的路径信息。

并且在每次路由守卫中更新这个```breadcrumbs:[]```就能保证当前页面的路径能正常显示。

关键代码
```js
router.beforeEach((to, from, next) => {
  ...
  setBreadcrumbs(to.matched)
  ...
}）

## BreadcrumbsUtils.js
/**
 * 获取 matched 中的路径 title，并生成面包屑
 * @param matched to.matched[]
 */
export function setBreadcrumbs (matched) {
  const tb = []
  for (let i = 0; i < matched.length; i++) {
    tb.push(matched[i].meta)
  }
  store.commit('SET_BREADCRUMBS', tb)
}
```

### 动画效果
动画效果使用的是 ```<transition-group>```

 ```<transition-group>```和 ```<transition>```的区别就是：
 - ```<transition>```中只能有一个元素，```<transition>```使用动画控制这个唯一元素的消失与出现
 - ```<transition-group>```中可以有多个元素，通常是通过```v-for```生成的元素
  ```<transition-group>```控制着每一个子元素的消失与出现，但是```<transition-group>```有一定局限，被控制的元素会被```<transition-group>```自动生成的```<span>```或```<ul>```标签包裹，这样会对css样式产生一定的影响。


关于```<transition-group>```和 ```<transition>```标签的使用并不难，使用关键帧和过度态来理解它或很容易，详情请看[VUE：进入/离开 & 列表过渡](https://cn.vuejs.org/v2/guide/transitions.html)

动画定义如下：
```assets/scss/transitions.scss```
```css
.breadcrumb-enter {
  opacity: 0;
  transform: translateX(30px);
}

.breadcrumb-enter-active {
  transition: all .5s;
}

.breadcrumb-enter-to {
  opacity: 1;
}

.breadcrumb-leave {
  opacity: 1;
  transform: translateX(0px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active{
  transition: all .5s;
  position: absolute;
  width: 500px;
}

.breadcrumb-leave-to{
  opacity: 0;
  transform: translateX(30px);
}

```
