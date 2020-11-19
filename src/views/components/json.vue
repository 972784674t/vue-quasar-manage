<template>
  <base-content>
    <div class="base-markdown-content">
      <h5>菜单数据结构</h5>
      <p>使用递归实现，支持无限扩展，也可以去components/menu/ 自定义菜单</p>
      <p>json 组件 ： <a href="https://zhaoxuhui1122.github.io/vue-json-view/">vue-json-view</a></p>
      <json-view theme="one-dark" :data="menuList"/>
    </div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
import jsonView from 'vue-json-views'

export default {
  name: 'json',
  components: {
    BaseContent,
    jsonView
  },
  data () {
    return {
      mavonValue: '',
      menuList: [
        {
          icon: 'inbox',
          label: '菜单1',
          children: [
            {
              icon: 'perm_identity',
              label: '菜单1-1',
              path: '/about'
            },
            {
              icon: 'delete',
              label: '菜单1-2',
              children: [
                {
                  icon: 'settings',
                  label: '菜单2-1',
                  path: '/noty'
                }
              ]
            }
          ]
        },
        {
          isItemLabel: true,
          Label_text: 'item-label '
        },
        {
          icon: 'feedback',
          label: '菜单数据结构',
          path: '/test',
          hidden: false
        }
      ],
      buttonList: [
        { text: '关于我们' },
        { text: 'Press' },
        { text: 'Copyright' },
        { text: '联系我们' },
        { text: 'Creators' },
        { text: '广告' },
        { text: '开发者' }
      ]
    }
  }
}
</script>
