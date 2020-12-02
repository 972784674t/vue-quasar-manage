<template>
  <base-content>
    <div class="base-markdown-content">
      <q-skeleton type="text" height="150px" v-if="!isLottieF"/>
      <lottie-web-cimo
        ref="lottie_web"
        :path="defaultOptions.path"
        :loop="defaultOptions.loop"
        :animation-speed="defaultOptions.animationSpeed"
        @isLottieFinish="handleLottieFinish"
      />
      <div class="row justify-center" style="margin-left: 10px;margin-right: 10px">
        <q-badge color="secondary" class="justify-start">
          Speed: {{ defaultOptions.animationSpeed }}
        </q-badge>
        <q-slider
          v-model="defaultOptions.animationSpeed"
          :min="0"
          :max="3"
          :step="0.5"
          color="purple"
          label
        />
        <q-btn-group>
          <q-btn color="accent" icon="play_arrow" @click="play">
            <q-tooltip>播放</q-tooltip>
          </q-btn>
          <q-btn color="accent" icon="pause" @click="pause">
            <q-tooltip>暂停</q-tooltip>
          </q-btn>
          <q-btn color="accent" icon="stop" @click="stop">
            <q-tooltip>停止</q-tooltip>
          </q-btn>
        </q-btn-group>
      </div>
      <v-md-editor :value="content" mode="preview"/>
    </div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
import LottieWebCimo from '../../components/LottieWebCimo/lottie-web-cimo'

export default {
  name: 'my-lottie',
  components: {
    LottieWebCimo,
    BaseContent
  },
  data () {
    return {
      defaultOptions: {
        path: 'https://assets1.lottiefiles.com/packages/lf20_gzl797gs.json',
        loop: true,
        animationSpeed: 1
      },
      anim: {},
      content: '',
      test: {},
      isLottieF: false
    }
  },
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

    handleLottieFinish (e) {
      this.isLottieF = e
    },

    getMsg () {
      const query = {
        url: this.$PUBLIC_PATH + 'data/lottieData.md',
        method: 'get',
        responseType: 'text'
      }
      this.$fetchData(query).then(res => {
        this.content = res.data
      }).catch(error => {
        console.log(error)
      })
    }
  },

  mounted () {
    this.getMsg()
  }
}
</script>
