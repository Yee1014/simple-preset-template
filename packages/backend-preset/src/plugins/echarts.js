/**
 * echarts
 * @author  Yee
 * @date    2020/4/8
 * @desc    引入vue-echart
 * @link    https://echarts.apache.org/zh/index.html
 */
import Vue from 'vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/polar'

Vue.component('v-chart', ECharts)
