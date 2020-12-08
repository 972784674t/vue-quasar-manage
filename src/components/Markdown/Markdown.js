import Vue from 'vue'

import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'

VMdEditor.use(vuepressTheme)
Vue.use(VMdEditor)
