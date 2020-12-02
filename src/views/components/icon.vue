<template>
  <base-content>
    <div>
      <q-tabs
        v-model="tab"
        dense
        align="left"
        :breakpoint="0"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        narrow-indicator
      >
        <q-tab name="material Icons" label="material design 图标集"/>
        <q-tab name="fontawesome-v5" label="fontawesome-v5 图标集"/>
        <q-tab name="htu" label="如何使用图标集合中的图标"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="material Icons">

          <template v-for="(v,k,i) in materialIcons">
            <q-icon
              class="myIcon tag-read"
              :name="v"
              :key="k"
              @click="copy(materialIcons_key[i])"
            >
              <q-tooltip>
                {{materialIcons_key[i]}}
              </q-tooltip>
            </q-icon>
          </template>

        </q-tab-panel>

        <q-tab-panel name="fontawesome-v5">
          <template v-for="(v,k,i) in fontawesome">
            <q-icon class="myIcon tag-read" :name="v" :key="k" @click="copy(fontawesome_key[i])">
              <q-tooltip>
                {{fontawesome_key[i]}}
              </q-tooltip>
            </q-icon>
          </template>

        </q-tab-panel>

        <q-tab-panel name="htu">
          <div class="base-markdown-content">
            <template>
              <v-md-editor :value="content" mode="preview"></v-md-editor>
            </template>
          </div>
        </q-tab-panel>

      </q-tab-panels>

    </div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
import * as materialIconsSet from '@quasar/extras/material-icons'
import * as fontawesomeSet from '@quasar/extras/fontawesome-v5'
import { underscore, hyphen, snake } from 'name-styles'
import { copyToClipboard } from 'quasar'

export default {
  name: 'icon',
  components: { BaseContent },
  data () {
    return {
      tab: 'material Icons',
      materialIcons: [],
      materialIcons_key: [],
      fontawesome: [],
      fontawesome_key: [],
      content: ''
    }
  },
  created () {
    this.initMaterial()
    this.initFontawesome()
    this.getMsg()
  },
  methods: {

    // materialIcons图标集合初始化
    initMaterial () {
      // 获取materialIcons图标集合
      this.materialIcons = materialIconsSet
      const tMis = Object.keys(materialIconsSet)
      // 获取图标materialIcons下划线格式命名集合
      for (const j in tMis) {
        this.materialIcons_key.push(snake(underscore(tMis[j]).replace(/(mat)/g, '')))
      }
    },

    // fontawesome图标集合初始化
    initFontawesome () {
      this.fontawesome = fontawesomeSet
      const tMis = Object.keys(fontawesomeSet)
      for (const j in tMis) {
        this.fontawesome_key.push(hyphen(tMis[j]).replace(/-/, ' fa-'))
      }
    },

    // 复制成功
    copy (e) {
      copyToClipboard(e).then(() => {
        this.$q.notify({
          message: '成功复制到剪切板',
          color: 'green',
          position: 'top',
          timeout: 1500
        })
      }).catch(() => {
        // 不支持复制
        this.$q.notify({
          message: '复制到剪切板失败',
          color: 'warming',
          position: 'top',
          timeout: 1500
        })
      })
    },

    getMsg () {
      const query = {
        url: this.$PUBLIC_PATH + 'data/iconData.md',
        method: 'get',
        responseType: 'text'
      }
      this.$fetchData(query).then(res => {
        this.content = res.data
      })
    }

  }
}
</script>
<style lang="css" scoped>
  .myIcon {
    padding: 15px;
    height: 35px;
    width: 35px;
    color: #363F45;
  }

  .myIcon:hover {
    background: #EDECEC;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }
</style>
