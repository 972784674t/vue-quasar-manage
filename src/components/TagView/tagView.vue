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
        class="tagView relative-position"
        to="/"
        no-caps
        content-class="tagView-q-router-tab"
      >
        <template slot="default">
          <q-icon size="21px" name="home"/>
          <div class="line-limit-length" style="margin: 0px 5px 0px 5px;">主页</div>
        </template>
      </q-route-tab>

      <template v-for="(v,i) in tagView">

        <q-route-tab
          class="tagView relative-position"
          :key="v.fullPath + i"
          :to="v.fullPath"
          no-caps
          content-class="tagView-q-router-tab"
        >
          <template slot="default">
            <q-icon size="21px" :name="v.icon"/>
            <div class="line-limit-length" style="margin: 0px 5px 0px 5px;">{{ v.title }}</div>
            <q-icon class="tagView-remove-icon" style="display: inline-flex" size="1.2rem" name="close"
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
  name: 'tagView',
  data () {
    return {
      tagView: this.$store.getters.getTagView
    }
  },
  computed: {
    getTagView () {
      return this.$store.getters.getTagView
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
    vertical-align: middle;
    text-align: center;
    margin: 1.5px 3px 0 3px;
    min-height: 20px;
    padding: 0 8px;
    background: white;
    transition: all .5s;
    border-radius: 0;
    height: 31px;
  }

  .tagView:hover {
    background: #eeeeee;
  }

  .tagView-remove-icon {
    opacity: 0.58;
    border-radius: .2rem;
    transition: all .3s;
  }

  .tagView-remove-icon:hover {
    opacity: 1;
  }

  .line-limit-length {
    overflow: hidden;
    max-width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>
