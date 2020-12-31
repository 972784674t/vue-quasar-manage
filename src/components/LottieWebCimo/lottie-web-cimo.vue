<template>
  <div ref="lottieBox"></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'lottie-web-cimo',
  data () {
    return {
      lottie: {}
    }
  },
  props: ['animationData', 'path', 'loop', 'animationSpeed'],
  methods: {

    stop: function () {
      this.lottie.stop()
    },

    play: function () {
      this.lottie.play()
    },

    pause: function () {
      this.lottie.pause()
    },

    onSpeedChange: function () {
      this.lottie.setSpeed(this.animationSpeed)
    },

    isLottieFinish: function () {
      // this.lottie.removeEventListener('data_ready', this.isLottieFinish)
      this.$emit('isLottieFinish', true)
    },

    initLottie: function () {
      this.lottie = lottie.loadAnimation({
        container: this.$refs.lottieBox,
        renderer: 'svg',
        loop: this.loop || true,
        animationData: this.animationData,
        // 如果需要用到路径请求，请使用 path ，lottie 如果 animationData 为空 ，则自动选择 path
        path: this.path
      })

      this.lottie.addEventListener('data_ready', this.isLottieFinish, { once: true })
    }

  },
  mounted () {
    this.initLottie()
  },
  beforeDestroy () {
    this.lottie.destroy()
    this.lottie = null
  },
  watch: {
    animationSpeed: function (n, o) {
      this.onSpeedChange()
    }
  }
}
</script>
