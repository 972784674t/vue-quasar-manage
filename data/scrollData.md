## 滚动区域 BaseContent
```sh
components
|-BaseContent 
   |-BaseContent.vue                # BaseContent 源文件
 ```
 ```BaseContent```也是自己封装一个用于内容展示的组件，所有的组件都建议用```BaseContent```作为根节点，主要是为了实现：
 - 特点区域的滚动
 - 组件缓存
 - 界面缩放/滚动自适应
 - 直接点击滚动栏对应位置即可快速定位
- 页面刷新或切换时记录滚动位置（如果页面不被```<keep-alive>```缓存则不会记录）

因为我在百度统计里看到大家对这个组件的比较感兴趣，干脆直接在这里上源码和注释吧
```html
<template>
    <div class="main-content">
      <q-scroll-area
        ref="scrollArea"
        :thumb-style="thumbStyle"
        :visible="false"
        style="height: 100%"
      >
      <slot/>
      </q-scroll-area>
    </div>
</template>

<script>
import { thumbStyle } from './thumbStyle'

export default {
  name: 'BaseContent',
  data () {
    return {
      thumbStyle,
      // 标记当前 BaseContent 所在路由的页面
      BasePath: ''
    }
  },
  props: ['position'],
  methods: {

    // 滚动
    ScrollToPosition (e) {
      this.$refs.scrollArea.setScrollPosition(e, 300)
    },

    // 获取位置，在使用前请做好节流或防抖处理
    getPosition () {
      return this.$refs.scrollArea.getScrollPosition()
    }

  },

  mounted () {
    this.BasePath = this.$route.path

    // 确保每个 BaseContent 有唯一的 BasePath
    Object.freeze(this.BasePath)

    // console.log(`创建：${this.BasePath}`)

    // 如果页面被刷新，则从 sessionStorage 读取当前页面的滚动位置，
    // 可以打开浏览器窗口，看看 sessionStorage 有啥
    const t = window.sessionStorage.getItem(this.$route.path)
    if (t) {
      const toPosition = JSON.parse(t)
      this.ScrollToPosition(toPosition.listScrollTop)
    }
  },

  /**
   * 当组件被 keep-alive 缓存时，切出路由会触发 deactivated 方法
   * 此时 this.BasePath 作为 key ，将滚动位置保存的 sessionStorage 中
   */
  deactivated () {
    // console.log(`切换（from）：${this.BasePath}`)
    window.sessionStorage.setItem(this.BasePath, JSON.stringify({ listScrollTop: this.getPosition() }))
  },

  /**
   * 当组件被 keep-alive 缓存时，切回路由会触发 activated 方法
   * 此时从 sessionStorage 中获取滚动位置
   */
  activated () {
    // console.log(`切换（to）：${this.$route.path}`)
    const t = window.sessionStorage.getItem(this.$route.path)
    if (t) {
      const toPosition = JSON.parse(t)
      this.ScrollToPosition(toPosition.listScrollTop)
    }
  },

  /**
   * 如果组件被关闭，则清除对应的 sessionStorage
   */
  destroyed () {
    // console.log(`销毁：${this.BasePath}`)
    sessionStorage.removeItem(this.BasePath)
  }

}
</script>
<style>
.main-content{
  height: 100%;
  background-color: #fcfcff;
}
</style>
```

:::tip
如果你对滚动位置记录没有要求，或是需求不同，可以把相关代码注释掉，甚至是根据它来自己做一个 ```BaseContent```组件
因为我感觉这个组件太过的针对性，反而对于新手来说不好改
:::
