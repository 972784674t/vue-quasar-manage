<!--
   动态菜单 item 递归实现
   myRouter ： 菜单列表
   initLevel ： 菜单初始化缩进等级
   bgColorLevel ：菜单背景色
   basePath : 上级菜单
-->
<template>
  <div>

    <template v-for="(item,index) in myRouter">
      <template v-if="item.meta.isHidden !== true">
        <q-item-label v-if="item.meta.itemLabel"
           header
           class="text-weight-bold text-uppercase"
           :key="item.meta.itemLabel">
          {{item.meta.itemLabel}}
        </q-item-label>

        <!-- 没有孩子 -->
        <q-item v-if="!item.children"
           clickable
           v-ripple
           :key="index"
           :exact="item.path === '/'"
           :class="bgColor + '-' + bgColorLevel + ' base-menu-item'"
           :inset-level="initLevel"
           active-class="baseItemActive"
           :to="handleLink(basePath, item.path)"
           @click="externalLink(basePath, item.path)"
        >
          <q-item-section avatar>
            <q-icon :name="item.meta.icon" />
          </q-item-section>
          <q-item-section>
            {{item.meta.title}}
          </q-item-section>
        </q-item>

        <!-- 有孩子 -->
        <q-expansion-item v-else
           :duration="duration"
           :class="$route.fullPath.startsWith(item.path)?
           'baseRootItemActive base-menu-item'+bgColor + '-' + bgColorLevel:
           bgColor + '-' + bgColorLevel+ ' base-menu-item'"
           :default-opened="item.meta.isOpen"
           :header-inset-level="initLevel"
           :key="index"
           :icon="item.meta.icon"
           :label="item.meta.title"
        >

          <!-- 菜单项缩进 + 0.3 ; 背景色深度 + 1 ; 如果上级菜单路径存在，则拼接上级菜单路径 -->
          <base-menu-item
            :my-router="item.children"
            :init-level="initLevel + 0.2"
            :bg-color-level="bgColorLevel + 1"
            :bg-color="bgColor"
            :base-path="basePath === undefined ? item.path : basePath + '/' + item.path"
          />

        </q-expansion-item>
      </template>
    </template>

  </div>
</template>

<script>
export default {
  name: 'base-menu-item',
  props: ['myRouter', 'initLevel', 'bgColor', 'bgColorLevel', 'duration', 'basePath'],
  methods: {

    /**
    * 处理内部链接
    * @param basePath
    * @param itemPath
    */
    handleLink (basePath, itemPath) {
      const link = basePath === undefined ? itemPath : basePath + '/' + itemPath
      if (link.indexOf('http') !== -1) {
        return '#'
      }
      return link
    },

    /**
    * 处理外部链接
    * @param basePath
    * @param itemPath
    * @returns {boolean}
    */
    externalLink (basePath, itemPath) {
      const link = basePath === undefined ? itemPath : basePath + '/' + itemPath
      const i = link.indexOf('http')
      if (i !== -1) {
        const a = document.createElement('a')
        a.setAttribute('href', link.slice(i))
        a.setAttribute('target', '_blank')
        a.click()
        return false
      }
    }

  }
}
</script>
<style lang="sass">

  /* item 颜色 */
  $ITEM_COLOR: #2c3e50

  /* item 激活时颜色 */
  $ACTIVE_COLOR: #1976d2
  $ACTIVE_BACKGROUND: rgba(25, 118, 210, 0.0618)

  .base-menu-item
    color: $ITEM_COLOR !important

  /* item 被激活时父组件的样式 */
  .baseRootItemActive
    color: $ACTIVE_COLOR !important

  /* item 被激活时的样式 */
  .baseItemActive
    color: $ACTIVE_COLOR !important
    background: $ACTIVE_BACKGROUND
    transition: all .618s
    &:after
      content: ''
      position: absolute
      width: 3px
      height: 100%
      background: $ACTIVE_COLOR !important
      top: -0.5px
      right: 0px

</style>
