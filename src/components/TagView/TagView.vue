<template>

  <div class="row" :style="{margin:(!$q.screen.gt.sm?'':'0px 15px 0px 15px')}">

    <q-tabs
      align="left"
      active-color="primary"
      class="bg-white col-12"
      dense
      swipeable
      inline-label
      indicator-color="transparent"
      :outside-arrows="$q.platform.is.electron?true:false"
      :breakpoint="0"
    >
      <q-route-tab
        class="tagView"
        to="/"
        no-caps
        content-class="tagView-q-router-tab"
        :style="isWeChart?' line-height: normal':''"
      >
        <template slot="default">
          <q-icon size="1.3rem" name="home"/>
          <div class="line-limit-length" style="margin: 0px 5px 0px 5px;">主页</div>
        </template>
      </q-route-tab>

      <template v-for="(v,i) in tagView">

        <q-route-tab
          class="tagView"
          :key="v.fullPath + i"
          :to="v.fullPath"
          no-caps
          content-class="tagView-q-router-tab"
          :style="isWeChart?' line-height: normal':''"
        >
          <template slot="default">
            <q-icon size="1.3rem" v-if="v.icon" :name="v.icon"/>
            <div class="line-limit-length">{{ v.title }}</div>
            <q-icon class="tagView-remove-icon" style="display: inline-flex" name="close"
                    @click.prevent.stop="removeAtagView(i)"/>
            <q-menu
              touch-position
              context-menu
            >
              <q-list dense>
                <q-item clickable v-close-popup>
                  <q-item-section @click="removeOthersTagView(i)">
                    关闭其他
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="removeRightTagView(i)">
                    关闭右侧
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="removeLeftTagView(i)">
                    关闭左侧
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section @click="removeAllTagView">
                    关闭所有
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </template>

        </q-route-tab>

      </template>

    </q-tabs>

  </div>

</template>

<script>

export default {
  name: 'TagView',
  data () {
    return {
      tagView: this.$store.getters.getTagView
    }
  },
  computed: {

    getTagView () {
      return this.$store.getters.getTagView
    },

    /**
     * 如果是微信浏览器，则添加 line-height: normal 样式
     * @returns {boolean}
     */
    isWeChart () {
      return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
    }

  },
  watch: {
    getTagView (n, o) {
      this.tagView = n
      this.$store.commit('SET_KEEPALIVE_LIST', this.tagView)
      window.sessionStorage.setItem('tagView', JSON.stringify(this.tagView))
    }
  },
  methods: {

    removeAllTagView () {
      this.$store.commit('REMOVE_TAG_VIEW')
    },

    removeAtagView (i) {
      this.$store.commit('REMOVE_TAG_VIEW', i)
    },

    removeLeftTagView (i) {
      this.$store.commit('REMOVE_TAG_VIEW', { side: 'left', index: i })
    },

    removeRightTagView (i) {
      this.$store.commit('REMOVE_TAG_VIEW', { side: 'right', index: i })
    },

    removeOthersTagView (i) {
      this.$store.commit('REMOVE_TAG_VIEW', { side: 'others', index: i })
    }

  }
}
</script>
<style lang="sass">

  /* 重置 quasar 内部 tab 样式 */
  .tagView-q-router-tab
    min-width: 40px !important

</style>
<style lang="css" scoped>

  .tagView {
    margin: 1.5px 3px 0 3px;
    min-height: 20px;
    padding: 0 8px;
    background: white;
    transition: all .5s;
    border-radius: 0;
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tagView-remove-icon {
    font-size: 1.0rem;
    border-radius: .2rem;
    opacity: 0.58;
    transition: all .3s;
  }

  .tagView-remove-icon:hover {
    opacity: 1;
  }

  .line-limit-length {
    margin: 0px 5px 0px 7px;
    overflow: hidden;
    max-width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>
