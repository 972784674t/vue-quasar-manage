import Vue from 'vue'

import ECharts from 'vue-echarts'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import _echarts from 'echarts'

// 注册 ECharts
Vue.component('v-chart', ECharts)
Vue.prototype.$echarts = _echarts

export default Vue
