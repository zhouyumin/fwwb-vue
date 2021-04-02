<template>
  <el-main
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <el-row :gutter="10" class="w1000">
      <el-col :span="16" class="w600">
        <el-card>
          <!--          {{test}}-->
          <div id="jobChart" class="jobChart"></div>
        </el-card>
      </el-col>

      <el-col :span="7" class="ml20 w320">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-cont-numb">
                {{ employeeCount }}
              </div>
              <div>总员工人数</div>
            </div>
          </div>
        </el-card>

        <el-card class="sex-chart">
          <div>
            <div style="background-color: #fff">
              <div id="sexChart" class="right-chart1"></div>
            </div>
            <div class="sex-chart-title">员工性别比例</div>
          </div>
        </el-card>
        <el-card class="sex-chart">
          <div>
            <div style="background-color: #fff">
              <div id="eduChart" class="right-chart2"></div>
            </div>
            <div class="sex-chart-title">员工受教育程度</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
// import { getAllArchive } from '@/api/hr/archive.js'
// import { getWeight, initChart } from '@/utils/pubMethod'

export default {
  name: 'basic',
  components: { Map },
  data() {
    return {
      employeeCount: 0, //员工总数
      employee: [],
      sex: [],
      test: [],
      loading: true,
      //图表数据
      sexChartData: {
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '90%',
            data: [],
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
        series: [
          {
            name: '男女比例',
            type: 'pie',
            radius: '70%',
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

            data: [],
          },
        ],
      },
      jobChartData: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
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
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
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
          },
        ],
      },
    }
  },
  methods: {
    //获取全部员工数据
    getData() {
      //获取全部数据并进行处理操作
      getAllArchive().then((result) => {
        this.employee = result.data.data
        this.employeeCount = result.data.data.length
        this.getSex()
        this.getEdu()
        this.getJob()
      })
    },
    //性别比例
    getSex() {
      getWeight(this.employee, this.sexChartData.series[0].data, 'sex')
      //初始化图表
      initChart('sexChart', this.sexChartData)
    },
    //教育程度比例
    getEdu() {
      getWeight(this.employee, this.eduChartData.series[0].data, 'education')
      //初始化图表
      initChart('eduChart', this.eduChartData)
    },
    getJob() {
      getWeight(this.employee, this.test, 'job_state')
      for (let i in this.test) {
        this.jobChartData.xAxis[0].data.push(this.test[i]['name'])
        this.jobChartData.series[0].data.push(this.test[i]['value'])
      }
      // this.jobChartData.series[0].data = []
      // getWeight(this.employee,this.jobChartData.series[0].data,'job_state')
      // for ()
      // this.test = this.jobChartData.series[0].data[0]['name']
      // getObj()
      initChart('jobChart', this.jobChartData)
    },
  },
  mounted() {
    // this.getData()
    this.loading = false
  },
}
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 25px;
}

.grid-cont-center {
  text-align: center;
  flex: 1;
  color: #7f7f7f;
  font-size: 14px;
}

.grid-cont-numb {
  font-size: 20px;
  font-weight: bold;
}

.ml20 {
  margin-left: 20px;
}

.w600 {
  min-width: 600px;
}

.w1000 {
  min-width: 1100px;
}

.w320 {
  min-width: 320px;
}

.sex-chart {
  margin-top: 2px;
}

.sex-chart-title {
  text-align: center;
  font-size: 14px;
  color: #7f7f7f;
  font-weight: bolder;
}

.right-chart1 {
  margin-left: -10px;
  width: 320px;
  height: 180px;
}

.right-chart2 {
  margin-left: -10px;
  width: 320px;
  height: 225px;
}

.grid-cont-chart {
  min-width: 600px;
  height: 100%;
}

.jobChart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 600px;
  min-height: 550px;
}
</style>
