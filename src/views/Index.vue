<template>
  <q-layout :view="viewStyle" class="full-height">

    <!-- 头部 -->
    <q-header class="q-py-xs bg-white text-grey-8" height-hint="48"
       style="box-shadow: rgba(0, 0, 0, 0.1) 0 2px 12px 0; padding-bottom: 2px;">

      <!-- 状态栏 -->
      <q-toolbar style="margin-top: -4px;">
        <q-btn flat dense round
           aria-label="Menu"
           :icon="leftDrawerOpen === true?'menu_open':'menu'"
           @click="leftDrawerOpen = !leftDrawerOpen"/>
        <!-- toolbar - title -->
        <toolbar-title/>
        <!-- 面包屑 -->
        <breadcrumbs v-if="$q.screen.gt.sm"/>
        <q-space/>
        <!-- 右侧元素 -->
        <toolbar-item-right/>
      </q-toolbar>

      <q-separator color="grey-3"/>

      <!-- TAGVIEW -->
      <tag-view/>

    </q-header>

    <!-- 侧滑菜单 -->
    <q-drawer v-model="leftDrawerOpen"
        show-if-above
        content-class="bg-white"
        :width="240">
      <template #default>
        <base-menu/>
      </template>

    </q-drawer>

    <!-- 内容路由 -->
    <q-page-container class="app-main full-height">

      <transition name="fade-transform" mode="out-in">
        <keep-alive :max="Max_keepAlive" :include="keepAliveList">
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </transition>

    </q-page-container>

  </q-layout>
</template>

<script>
import BaseMenu from '../components/Menu/BaseMenu'
import TagView from '../components/TagView/TagView'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ToolbarTitle from '../components/Toolbar/ToolbarTitle'
import ToolbarItemRight from '../components/Toolbar/ToolbarItemRight'

export default {
  name: 'Index',
  components: {
    ToolbarItemRight,
    ToolbarTitle,
    Breadcrumbs,
    TagView,
    BaseMenu
  },
  data () {
    return {
      viewStyle: this.$SildeBar,
      leftDrawerOpen: false,
      Max_keepAlive: this.$Max_KeepAlive,
      keepAliveList: this.$store.getters.getKeepAliveList
    }
  },
  computed: {
    // 获取缓存列表
    getKeepAliveList () {
      return this.$store.getters.getKeepAliveList
    },
    key () {
      return this.$route.fullPath
    }
  },
  watch: {
    getKeepAliveList (n, o) {
      this.keepAliveList = n
    }
  }
}
</script>
