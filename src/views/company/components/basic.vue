<template>
  <el-main
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading">
    <el-row :gutter="10" class="w1000">
      <el-card :span="5" class="ml10">
        {{ employeeCount }}
        <div>总员工人数</div>
      </el-card>
    </el-row>
    <el-row :gutter="10" class="w1000 mt20">
      <el-col :span="7" >
        <el-card>
          <div id="eduChart" class="squareChart"></div>
        </el-card>
      </el-col>
      <el-col :span="7" class="ml10">
        <el-card>
          <div id="sexChart" class="squareChart"></div>

        </el-card>
      </el-col>
      <el-col :span="9" class="ml10">
        <el-card>
          <div id="starChart" class="rectChart-s"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="w1000 mt50">
     <el-col :span="11">
       <el-card>
         <div id="jobChart" class="rectChart"></div>
       </el-card>
     </el-col>
    <el-col :span="11" class="ml40">
      <el-card>
        <div id="departChart" class="rectChart"></div>
      </el-card>
    </el-col>
  </el-row>>

  </el-main>
</template>

<script>
import {getWeight, initChart, getValue,num} from '/src/utils/pubMethod.js'

export default {
  name: "basic",
  props: {
    archive: {
      required: true
    }
  },
  data() {
    return {
      activeName: 'first',
      employeeCount: 0,    //员工总数
      sex: [],
      test: [],
      employee: [],
      loading: true,
      //图表数据
      sexChartData: {
        tooltip: {
          show: true,// 是否显示提示,true/false,默认true
          trigger: "item",// 触发类型, item/axis/none
          backgroundColor: 'rgba(0,0,0,.5)',// 提示框背景
          borderWidth: 1, // 提示框边框大小
          padding: 10,// 提示框内边距
          borderColor: '#ff0000',// 提示框边框颜色
          formatter: "{a} <br/>{b}: {c} ({d}%)",// 提示格式，支持回调函数
          textStyle: {
            color: '#0DB9DF', // 提示文字样式
            fontStyle: 'normal', // 提示文字风格，normal,italic,oblique
            fontWeight: 'normal', // 提示文字粗细， normal,bold,bolder,lighter,100~900
            fontFamily: 'sans-serif', //提示文字字体， 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
            fontSize: 14, //字体大小
            lineHeight: 28, //字体行高
            rich: {
              a: {
                lineHeight: 28 // 没有设置则继承textStyle的 `lineHeight`，
              }
            }
          }
        },
        series: [
          {
            name: '男女比例',
            type: 'pie',
            radius: '70%',
            data: [],
            color: [
              // "#5ab1ef",
              "#32dadd",
              "#ffb980",
              // "#c8b2f4",
              // "#40c9c6",
              // "#36a3f7",
              // "#f4516c",

            ],
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      eduChartData: {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '男女比例',
            type: 'pie',
            radius: '70%',
            color: [
              "#5ab1ef",
              "#32dadd",
              "#ffb980",
              "#c8b2f4",
              "#40c9c6",
              "#36a3f7",
              "#f4516c",
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold'
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            data: []
          }
        ]
      },
      ChartData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {

            minInterval: 1,
            type: 'value'
          }
        ],
        series: [
          {
            name: '共有',
            type: 'bar',
            barWidth: '60%',
            data: [],
            color: [
              "#5ab1ef",
              "#32dadd",
              "#ffb980",
              "#c8b2f4",
              "#40c9c6",
              "#36a3f7",
              "#f4516c",
            ],
          }
        ]
      },
      starData:{
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['综合评价', '团队能力', '表现情况', '工作态度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['很差', '差', '合格', '良好', '优秀']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '综合评价',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
          },
          {
            name: '团队能力',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90]
          },
          {
            name: '表现情况',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
          },
          {
            name: '工作态度',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
          }
        ]
      }
    }
  },
  methods: {
    //获取全部员工数据
    getData() {
      //获取全部数据并进行处理操作
      let a = this.archive
      this.employeeCount = a.length
      this.getJob()
      this.getSex()
      this.getEdu()
      this.getDepart()
      this.getStar()
    },
    //性别比例
    getSex() {
      this.test = []
      this.sexChartData.series[0].data = []
      getValue(this.archive, this.test, 'employee')
      getWeight(this.test, this.sexChartData.series[0].data, 'sex')
      //初始化图表
      initChart('sexChart', this.sexChartData)
    },
    //教育程度比例
    getEdu() {
      this.test = []
      this.eduChartData.series[0].data = []
      getValue(this.archive, this.test, 'employee')
      getWeight(this.test, this.eduChartData.series[0].data, 'education')
      //初始化图表
      initChart('eduChart', this.eduChartData)
    },
    getJob() {
      this.test = []
      this.ChartData.xAxis[0].data = []
      getWeight(this.archive, this.test, 'title')
      for (let i in this.test) {
        this.ChartData.xAxis[0].data.push(this.test[i]['name'])
        this.ChartData.series[0].data.push(this.test[i]['value'])
      }
      initChart('jobChart', this.ChartData)
    },
    getDepart() {
      this.test = []
      this.ChartData.xAxis[0].data = []
      getWeight(this.archive, this.test, 'department')
      for (let i in this.test) {
        this.ChartData.xAxis[0].data.push(this.test[i]['name'])
        this.ChartData.series[0].data.push(this.test[i]['value'])
      }
      initChart('departChart', this.ChartData)
    },
    getStar() {
      this.test = []
      getWeight(this.archive, this.test, 'rate')
      this.test = num(this.test)
      this.starData.series[0].data=this.test

      this.test = []
      getWeight(this.archive, this.test, 'teamAbility')
      this.test = num(this.test)
      this.starData.series[1].data=this.test

      this.test = []
      getWeight(this.archive, this.test, 'performance')
      this.test = num(this.test)
      this.starData.series[2].data=this.test

      this.test = []
      getWeight(this.archive, this.test, 'attitude')
      this.test = num(this.test)
      this.starData.series[3].data=this.test
      initChart('starChart', this.starData)
    }
  },
  updated() {
    this.getData()
    this.loading = false
  }
}
</script>

<style scoped>

.w1000 {
  min-width: 1100px;
}

.rectChart {
  width: 500px;
  height: 300px;
}

.squareChart {
  width: 300px;
  height: 300px;
}

.rectChart-s {
  width: 400px;
  height: 300px;
}
.mt50{
  margin-top: 50px;
}
.mt20{
  margin-top: 20px;
}
.ml10{
  margin-left: 10px;
}
.ml40{
  margin-left: 20px;
}
</style>