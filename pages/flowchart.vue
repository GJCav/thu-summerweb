<template>
<div class="container">
  <h1>流量使用统计表</h1>
  <NuxtLink to="/success">返回</NuxtLink>
  <div ref="chartDomRef" class="chart"></div>
</div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

const chartDomRef = ref(null);

const profile = useUserProfile()
let myChart: echarts.ECharts | null = null;
let intervalId = null;
const interval = 500;
let data = [];
const dataLen = 30;

onMounted(async () => {
  await fetchUserProfile()
  if(!profile.value.login){
    navigateTo("/")
  }else{
    initChart()
  }
});

onUnmounted(() => {
  myChart.dispose()
  clearInterval(intervalId)
})

function initChart(){
  let chartDom = chartDomRef.value;
  // console.log(chartDom)
  myChart = echarts.init(chartDom);

  let option = {
    title: {},
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        // console.log(params)
        let value = params[0].value
        return durationToString(value[0]) + " - " + bytesToString(value[1]);
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'value',
      name: 'Time',
      min(value) {
        return value.min;
      },
      splitLine: {
        show:false
      },

      axisLabel: {
        formatter(value) {
          return durationToString(value);
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '已用流量',
      min(value) {
        return value.min *0.999;
      },
      splitLine: {
        show: true
      },

      axisLabel: {
        formatter: function (value) {
          return bytesToString(value)
        }
      }
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: data
      }
    ]
  };

  myChart.setOption(option);
  resizeChart();

  intervalId = setInterval(updateChart, interval)
}

function updateChart(){
  fetchFlowUpdate()
    .then((j) => {
      if(data.length >= dataLen){
        data.shift()
      }
      data.push({
        name: j["duration"], // 必须有这一项，不然折线会上下跳动
        value: [j["duration"] as number, j["flow_volume"]]
      })
      myChart.setOption({
      series: [
        {
          data: data
        }
      ]
    });
    }).catch((res) => {
      alert("http error " + res)
    })
}

function resizeChart(){
  if(myChart != null){
    let width = chartDomRef.value.clientWidth;
    let height = width * 0.6;
    myChart.resize({width: width, height: height})
  }
}

window.onresize = resizeChart
</script>


<style>
html, body, #__nuxt{
  height: auto;
}

body {
  background: linear-gradient(180deg, #e6e6e6 0%, #e6e6e6 50%, #dbdbdd 100%);
}
</style>

<style scoped lang="scss">

.container{
  width: 100%;

  box-sizing: border-box;
  padding: 1em 1em 3em 1em;
  
  border-radius: 1em;
  box-shadow: 3px 5px 7px 1px #959595cc;

  background-color: white;

  @media screen and (min-width: 720px) {
    width: 720px;
    margin-left: auto;
    margin-right: auto;
  }
}

.chart{
  width: 100%;
}
</style>