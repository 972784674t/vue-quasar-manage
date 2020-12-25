<template>

  <div class="row" :style="{margin:(!$q.screen.gt.sm?'':'0px 15px 0px 15px')}">

    <q-tabs
      id="tagView-shadow"
      align="left"
      swipeable
      class="bg-white text-grey col-12"
      :breakpoint="0"
    >

      <router-link to="/" style="text-decoration: none">
        <q-chip
          v-ripple
          icon="home"
          :text-color="'/' === $route.path?'primary':''"
          square
          class="tagView relative-position">
          主页
        </q-chip>
      </router-link>

      <template v-for="(v,i) in tagView">
<!--        <transition name="tag-view" mode="out-in" :key="v.path">-->
          <router-link :to="v.fullPath" style="text-decoration: none" :key="v.fullPath">
            <q-chip
              v-ripple
              :icon="v.icon"
              icon-remove="close"
              :text-color="v.fullPath === $route.path?'primary':''"
              removable
              class="tagView relative-position"
              @remove="$store.commit('REMOVE_TAG_VIEW',i)"
            >
              <div class="line-limit-length">{{ v.title }}</div>
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
            </q-chip>
          </router-link>
<!--        </transition>-->
      </template>
    </q-tabs>

  </div>

</template>

<script>

export default {
  name: 'tagView',
  data () {
    return {
      tagView: this.$store.getters.getTagView,
      isRemovable: false
    }
  },
  methods: {
    removeAllTagView () {
      this.$store.commit('REMOVE_TAG_VIEW')
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
  },
  computed: {
    getTagView () {
      return this.$store.getters.getTagView
    }
  },
  watch: {
    getTagView (newVal, oldVal) {
      this.tagView = newVal
      this.$store.commit('SET_KEEPALIVELIST', this.tagView)
      window.sessionStorage.setItem('tagView', JSON.stringify(this.tagView))
    }
  }
}
</script>
<style lang="css" scoped>

  .tagView {
    margin-bottom: -1px;
    background: white;
    transition: all .5s;
    border-radius: 0px;
  }

  .tagView:hover {
    background: #eeeeee;
  }

  .line-limit-length {
    overflow: hidden;
    max-width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>
