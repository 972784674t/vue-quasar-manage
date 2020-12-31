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
