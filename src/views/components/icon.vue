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
      <q-tab-panels v-model="tab" animated style="overflow-y:visible">

        <q-tab-panel name="material Icons" id="mdtext">

        </q-tab-panel>

        <q-tab-panel name="fontawesome-v5" id="fatext" ></q-tab-panel>

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
import { copyToClipboard } from 'quasar'
export default {
  name: 'icon_3',
  components: { BaseContent },
  data () {
    return {
      tab: 'material Icons',
      materialIcons_key: [],
      fontawesome_key: [],
      group_md: [],
      group_fa: [],
      timer1: {},
      timer2: {},
      content: ''
    }
  },
  created () {
    this.initMaterial()
    this.getMsg()
    window.copyIcon = this.copy
  },
  methods: {
    // materialIcons 图标集合初始化
    initMaterial () {
      // 获取图标 materialIcons 下划线格式命名集合
      for (const i in materialIconsSet) {
        this.materialIcons_key.push(this.toLowerLine(i))
      }
      this.$nextTick(() => {
        this.RenderMDIcon(0)
      })
    },
    RenderMDIcon (i) {
      if (i >= 1317) {
        cancelAnimationFrame(this.timer1)
      } else {
        const fragment = document.createDocumentFragment()
        for (let j = i; j < i + 1317; j++) {
          const li = document.createElement('li')
          li.innerText = this.materialIcons_key[j]
          li.setAttribute('class', 'myIcon material-icons q-icon notranslate')
          li.setAttribute('onclick', 'window.copyIcon(' + "'" + this.materialIcons_key[j] + "'" + ')')
          fragment.appendChild(li)
        }
        i += 1317
        document.getElementById('mdtext').appendChild(fragment)
        this.timer1 = requestAnimationFrame(() => {
          this.RenderMDIcon(i)
        })
      }
    },
    // fontawesome图标集合初始化
    initFontawesome () {
      // 获取图标 fontawesomeSet 下划线格式命名集合
      for (const i in fontawesomeSet) {
        this.fontawesome_key.push(this.toLowerLine(i))
      }
      this.$nextTick(() => {
        this.RenderFAIcon(0)
      })
    },
    RenderFAIcon (i) {
      if (i > 1601) {
        cancelAnimationFrame(this.timer2)
      } else {
        const fragment = document.createDocumentFragment()
        for (let j = i; j < 1601; j++) {
          const li = document.createElement('li')
          li.setAttribute('class', 'myIcon ' + this.fontawesome_key[j] + ' q-icon notranslate')
          li.setAttribute('onclick', 'window.copyIcon(' + "'" + this.fontawesome_key[j] + "'" + ')')
          fragment.appendChild(li)
        }
        document.getElementById('fatext').appendChild(fragment)
        this.timer2 = requestAnimationFrame(() => {
          this.RenderFAIcon(i + 1601)
        })
      }
    },
    // 驼峰转下划线
    toLowerLine (str) {
      if (str.substr(0, 3) === 'mat') {
        let t = str.replace(/([A-Z]|\d+)/g, (a, l) => `_${l.toLowerCase()}`).substring(4)
        switch (t) {
          case 'crop_32':
            t = 'crop_3_2'
            break
          case 'crop_169':
            t = 'crop_16_9'
            break
          case 'crop_54':
            t = 'crop_5_4'
            break
          case 'crop_75':
            t = 'crop_7_5'
            break
          default:
            break
        }
        return t
      }
      if (str.substr(0, 2) === 'fa') {
        let t = str.replace(/([A-Z])/g, (a, l) => `-${l.toLowerCase()}`).replace(/-/, ' fa-')
        switch (t) {
          case 'fab500px':
            t = 'fab fa-500px'
            break
          case 'fas fa-stopwatch20':
            t = 'fas fa-stopwatch-20'
            break
          case 'fab fa-font-awesome-logo-full':
            t = 'fas fa-stopwatch-20'
            break
          case 'far fa-font-awesome-logo-full':
            t = 'fas fa-stopwatch-20'
            break
          default:
            break
        }
        return t
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
  },
  watch: {
    tab (n, o) {
      if (n === 'material Icons') {
        this.initMaterial()
      }
      if (n === 'fontawesome-v5') {
        this.initFontawesome()
      }
    }
  },
  beforeDestroy () {
    window.copyIcon = null
    clearTimeout(this.timer2)
    clearTimeout(this.timer1)
  }
}
</script>
<style lang="css">
  .myIcon {
    padding: 15px;
    font-size: 35px;
    color: #363F45;
    cursor: pointer;
  }
  .myIcon:hover {
    background: #EDECEC;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }
</style>
