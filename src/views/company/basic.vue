<template>
  <el-main
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-row>
      <el-col :span="8">
        <el-card>
          <div class="countIcon">
            <i class="el-icon-s-custom icon"></i>
          </div>
          <div :span="3" class="countRight">
            <div class="countHead">历史总人数</div>
            <div class="countData">
              {{ employeeCount }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="zaizhiIcon">
            <i class="el-icon-s-claim icon1 icon"></i>
          </div>
          <div class="countRight">
            <div class="countHead">在职人数</div>
            <div class="countData">
              {{ zaizhiCount }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card>
          <div class="departIcon">
            <i class="el-icon-s-release icon2 icon"></i>
          </div>
          <div class="countRight">
            <div class="countHead">离职人数</div>
            <div class="countData">
              {{ departCount }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 18px">
      <el-col :span="6">
        <el-card>
          <div id="sexChart" class="squareChart"></div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="1">
        <el-card>
          <div id="eduChart" class="squareChart"></div>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card>
          <div id="starChart" class="rectChart-s"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 18px">
      <el-col :span="8">
        <el-card>
          <div id="jobChart" class="rectChart"></div>
        </el-card>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-card>
          <div id="departChart" class="rectChart"></div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { getWeight, initChart, getValue, num } from '/src/utils/pubMethod.js'
import { get_company_archive } from '../../api/archive'

export default {
  name: 'basic',
  data() {
    return {
      archive: {},
      activeName: 'first',
      employeeCount: 0, //员工总数
      departCount: 0,
      zaizhiCount: 0,
      sex: [],
      test: [],
      employee: [],
      loading: true,
      //图表数据
      sexChartData: {
        tooltip: {
          show: true, // 是否显示提示,true/false,默认true
          trigger: 'item', // 触发类型, item/axis/none
          backgroundColor: 'rgba(0,0,0,.5)', // 提示框背景
          borderWidth: 1, // 提示框边框大小
          padding: 10, // 提示框内边距
          borderColor: '#ff0000', // 提示框边框颜色
          formatter: '{a} <br/>{b}: {c} ({d}%)', // 提示格式，支持回调函数
          textStyle: {
            color: '#0DB9DF', // 提示文字样式
            fontStyle: 'normal', // 提示文字风格，normal,italic,oblique
            fontWeight: 'normal', // 提示文字粗细， normal,bold,bolder,lighter,100~900
            fontFamily: 'sans-serif', //提示文字字体， 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
            fontSize: 14, //字体大小
            lineHeight: 28, //字体行高
            rich: {
              a: {
                lineHeight: 28, // 没有设置则继承textStyle的 `lineHeight`，
              },
            },
          },
        },
        legend: {
          left: 'center',
        },
        series: [
          {
            name: '男女比例',
            type: 'pie',
            radius: '70%',
            data: [],
            color: [
              // "#5ab1ef",
              '#5ab1ef',
              '#ffb980',
              // "#c8b2f4",
              // "#40c9c6",
              // "#36a3f7",
              // "#f4516c",
            ],
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold',
              },
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      eduChartData: {
        tooltip: {
          trigger: 'item',
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { text: '博士',min: 0 },
            { text: '硕士',min: 0 },
            { text: '本科',min: 0 },
            { text: '专科' ,min: 0},
            { text: '高中' ,min: 0},
            { text: '初中' ,min: 0},
          ],
          radius: 90,
          center: ['47%', '50%'],
        },
        series: [
          {
            name: '职员学历情况',
            type: 'radar',
            areaStyle: {
              normal: {
                color: '#5ab1ef',
              },
              emphasis: {
                color: '#32dadd',
              },
            },
            itemStyle: {
              normal: {
                color: '#5ab1ef',
              },
              emphasis: {
                color: '#32dadd',
              },
            },
            data: [
              {
                value: [32, 43, 63, 67, 92, 35],
              },
            ],
          },
        ],

      },
      ChartData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          show: true, // 是否显示提示,true/false,默认true
          // trigger: "item",// 触发类型, item/axis/none
          backgroundColor: 'rgba(0,0,0,.5)', // 提示框背景
          borderWidth: 1, // 提示框边框大小
          padding: 10, // 提示框内边距
          borderColor: '#ff0000', // 提示框边框颜色
          textStyle: {
            color: '#0DB9DF', // 提示文字样式
            fontStyle: 'normal', // 提示文字风格，normal,italic,oblique
            fontWeight: 'normal', // 提示文字粗细， normal,bold,bolder,lighter,100~900
            fontFamily: 'sans-serif', //提示文字字体， 'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
            fontSize: 14, //字体大小
            lineHeight: 28, //字体行高
            rich: {
              a: {
                lineHeight: 28, // 没有设置则继承textStyle的 `lineHeight`，
              },
            },
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        // legend: {
        //   left: 'center'
        // },
        xAxis: [
          {
            type: 'category',
            data: [],
            // axisTick: {
            //   alignWithLabel: true
            // }
          },
        ],
        yAxis: [
          {
            minInterval: 1,
            type: 'value',
          },
        ],
        series: [
          {
            name: '共有',
            type: 'bar',
            barWidth: '60%',
            data: [],
            color: [
              '#5ab1ef',
              '#32dadd',
              '#ffb980',
              '#c8b2f4',
              '#40c9c6',
              '#36a3f7',
              '#f4516c',
            ],
          },
        ],
      },
      starData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ['综合评价', '团队能力', '表现情况', '工作态度'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['很差', '差', '合格', '良好', '优秀'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            minInterval: 1,

          },
        ],
        series: [
          {
            name: '综合评价',
            type: 'bar',

            emphasis: {
              focus: 'series',
            },
            data: [320, 332, 301, 334, 390],
          },
          {
            name: '团队能力',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: [120, 132, 101, 134, 90],
          },
          {
            name: '表现情况',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: [220, 182, 191, 234, 290],
          },
          {
            name: '工作态度',
            type: 'bar',
            emphasis: {
              focus: 'series',
            },
            data: [150, 232, 201, 154, 190],
          },
        ],
      },
    }
  },
  methods: {
    //获取全部员工数据
    getData() {
      let a = this.archive
      this.employeeCount = a.length
      //离职人数
      let b = 0
      for (let item of a) {
        if (item.departureDate !== null) {
          b = b + 1
        }
      }
      this.departCount = b
      this.zaizhiCount = this.employeeCount - this.departCount
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
      this.eduChartData.series[0].data[0].value = []
      let getEdu_a = []
      getValue(this.archive, this.test, 'employee')
      getWeight(this.test, getEdu_a, 'education')
      this.test = []
      let edu = ['博士', '硕士', '本科', '专科', '高中', '初中']
      for (let i = 0; i < 6; i++) {
        for (let item of getEdu_a) {
          if (item['name'] === edu[i]) {
            this.test[i] = item['value']
          }
        }
      }
      for (let i = 0; i < 6; i++) {
        if (this.test[i]===undefined){
          this.eduChartData.series[0].data[0].value.push(0)

        }else{
          this.eduChartData.series[0].data[0].value.push(this.test[i])
        }
      }
      console.log(this.eduChartData.series[0].data[0])
      initChart('eduChart', this.eduChartData)
    },
    getJob() {
      this.test = []
      this.ChartData.xAxis[0].data = []
      this.ChartData.series[0].data = []
      getWeight(this.archive, this.test, 'title')
      for (let i in this.test) {
        this.ChartData.xAxis[0].data.push(this.test[i]['name'])
        this.ChartData.series[0].data.push(this.test[i]['value'])
      }
      this.ChartData.series[0].color = [
        '#5ab1ef',
        '#32dadd',
        '#ffb980',
        '#c8b2f4',
        '#40c9c6',
        '#36a3f7',
        '#f4516c',
      ]
      initChart('jobChart', this.ChartData)
    },
    getDepart() {
      this.test = []
      this.ChartData.xAxis[0].data = []
      this.ChartData.series[0].data = []
      getWeight(this.archive, this.test, 'department')
      for (let i in this.test) {
        this.ChartData.xAxis[0].data.push(this.test[i]['name'])
        this.ChartData.series[0].data.push(this.test[i]['value'])
      }
      this.ChartData.series[0].color = [
        '#c8b2f4',
        '#f4516c',
        '#36a3f7',
        '#32dadd',
        '#ffb980',
        '#40c9c6',
        ,
      ]
      initChart('departChart', this.ChartData)
    },
    getStar() {
      this.test = []
      getWeight(this.archive, this.test, 'rate')
      this.test = num(this.test, 5)
      this.starData.series[0].data = this.test

      this.test = []
      getWeight(this.archive, this.test, 'teamAbility')
      this.test = num(this.test, 5)
      this.starData.series[1].data = this.test

      this.test = []
      getWeight(this.archive, this.test, 'performance')
      this.test = num(this.test, 5)
      this.starData.series[2].data = this.test

      this.test = []
      getWeight(this.archive, this.test, 'attitude')
      this.test = num(this.test, 5)
      this.starData.series[3].data = this.test
      initChart('starChart', this.starData)
    },
  },
  activated() {
    // 如果存在store，不存在重新请求
    if (this.$store.getters.Archive.length!==undefined){
      this.archive = this.$store.getters.Archive
      this.getData()
      this.loading = false
    }else {
      get_company_archive().then(res=>{
        this.$store.commit('setArchive', res.data.data)
        this.archive =  this.$store.getters.Archive
        this.getData()
        this.loading = false
      },err=>{})
    }


  }
}
</script>

<style scoped lang="less">
.rectChart {
  height: 280px;
}

.squareChart {
  width: 280px;
  height: 280px;
}

.rectChart-s {
  width: 500px;
  height: 280px;
}
.countHead {
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  font-weight: 700;
}
.countIcon {
  transition: all 0.7s linear 0s;
  float: left;
  margin-bottom: 20px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  .icon {
    color: #40c9c6;
  }
}
.countIcon:hover {
  transition: all 0.7s linear 0s;
  background-color: #40c9c6;
  .icon {
    color: #fff;
  }
}

.departIcon {
  transition: all 0.7s linear 0s;
  float: left;
  margin-bottom: 20px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  .icon2 {
    color: #f4516c;
  }
}
.departIcon:hover {
  transition: all 0.7s linear 0s;
  background-color: #f4516c;
  .icon2 {
    color: #fff;
  }
}

.zaizhiIcon {
  transition: all 0.7s linear 0s;
  float: left;
  margin-bottom: 20px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  .icon1 {
    color: #36a3f7;
  }
}
.zaizhiIcon:hover {
  transition: all 0.7s linear 0s;
  background-color: #36a3f7;
  .icon1 {
    color: #fff;
  }
}

.icon {
  font-size: 60px;
  margin-top: 6px;
  margin-left: 10px;
}
.countData {
  font-weight: 700;
  color: #666;
}

.countRight {
  margin-top: 20px;
  width: 100px;
  float: left;
  text-align: center;
}
</style>
