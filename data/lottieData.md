## Lottie 
Lottie 是能将 json 格式的动画文件，渲染成为能在前端显示的工具。

而这些 json 格式的动画文件通常来自于 After Effects 渲染的动画特效。设计师们在 After Effects 上完成动画后，通过 After Effects 上的 Bodymovin 插件就能把动画生成为json格式。

Lottie 的动效常用在动态图标，开屏展示等需要用户交互体验比较高的地方。

同时它还提供了 js/android/ios 等不同环境的开发工具包，在不同的环境下都能愉快的使用动效
### Github 仓库
- [lottie-web](https://github.com/airbnb/lottie-web)
- [lottie-ios](https://github.com/airbnb/lottie-ios)
- [lottie-android](https://github.com/airbnb/lottie-android)
### 如何使用
- 在```package.json```中添加依赖
```js
"devDependencies": {
 ...
 // 请尽量使用原始的，网络上封装的质量不太好（踩坑了）
 "lottie-web": "^5.7.3"   
}

// 在控制台中安装到本项目
npm install  // or cnpm i
```
### 我根据自身的需求封装一个 lottie 组件

:::tip
尽量使用 path 导入动画文件，这样做能减小不必要的体积，而且能避免 lottie 重复执行动画
:::
```html
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

      this.lottie.addEventListener('data_ready', this.isLottieFinish)
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
```
### 如何使用
```html
<lottie-web-cimo
  ref="lottie_web"
  :path="defaultOptions.path"
  :loop="defaultOptions.loop"
  :animation-speed="defaultOptions.animationSpeed"
  @isLottieFinish="handleLottieFinish"
  />

<script>
import LottieWebCimo from '../../components/lottie-web-cimo/lottie-web-cimo'

export default {
  ...
  components: { LottieWebCimo },
  data () {
    return {
      defaultOptions: {
        path: 'https://assets1.lottiefiles.com/packages/lf20_gzl797gs.json',
        loop: true,
        animationSpeed: 1
      }
    }
  },
  // 定义方法
  methods: {
    play () {
      this.$refs.lottie_web.play()
    },
    stop () {
      this.$refs.lottie_web.stop()
    },
    pause () {
      this.$refs.lottie_web.pause()
    },
    handleLottieFinish (isFinish) {
      // 事件处理
    }
  }
}
</script>
```
