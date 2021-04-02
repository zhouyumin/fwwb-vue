<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="0">
        <el-card shadow="hover">
          <div style="margin: auto; width: 280px">
            <el-image src="/img/user.jpg" fit="fill"></el-image>
          </div>
          <el-tooltip
            content="综合评价"
            placement="bottom"
            effect="light"
            style="margin-top: 16px"
            class="text-center"
          >
            <el-rate
              v-model="rate"
              disabled
              show-score
              text-color="#ff9900"
              class="left-star"
              score-template="{value}"
            />
          </el-tooltip>
          <div id="user-img"></div>
        </el-card>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-card shadow="hover">
          {{ employee }}
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  components: {},
  data() {
    return {
      rate: 4,
      employee: this.$store.getters.Employee,
      option: {
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
            },
          },
          indicator: [
            { name: '销售', max: 100 },
            { name: '管理', max: 100 },
            { name: '技术', max: 100 },
            { name: '客服', max: 100 },
            { name: '研发', max: 100 },
            { name: '市场', max: 100 },
          ],
        },
        series: [
          {
            areaStyle: {
              normal: {
                color: '#67C23A',
              },
              emphasis: {
                color: '#409EFF',
              },
            },
            itemStyle: {
              normal: {
                color: '#409EFF',
              },
            },
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [32, 43, 63, 67, 92, 35],
                name: '预算分配（Allocated Budget）',
              },
            ],
          },
        ],
      },
    }
  },
  mounted() {
    let chart = echarts.init(document.getElementById('user-img'))
    //注入数据
    chart.setOption(this.option)
  },
  methods: {},
}
</script>

<style scoped>
#user-img {
  margin: auto;
  padding-top: 16px;
  width: 300px;
  height: 300px;
}
</style>
