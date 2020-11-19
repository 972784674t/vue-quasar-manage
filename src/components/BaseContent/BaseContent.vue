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
      pathTemp: ''
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
    const t = window.sessionStorage.getItem(this.$route.path)
    if (t) {
      const toPosition = JSON.parse(t)
      this.ScrollToPosition(toPosition.listScrollTop)
    }
  },

  deactivated () {
    // 将 token 和当前 path 做成 key，记录滚动位置
    window.sessionStorage.setItem(this.pathTemp, JSON.stringify({ listScrollTop: this.getPosition() }))
  },

  activated () {
    this.pathTemp = this.$route.path
    // 将 token 和当前 path 做成 key，记录滚动位置
    const t = window.sessionStorage.getItem(this.$route.path)
    if (t) {
      const toPosition = JSON.parse(t)
      this.ScrollToPosition(toPosition.listScrollTop)
    }
  },

  destroyed () {
    sessionStorage.removeItem(window.sessionStorage.getItem(this.$route.path))
  }

}
</script>
