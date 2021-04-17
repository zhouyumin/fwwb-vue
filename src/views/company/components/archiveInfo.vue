<template>
  <!--  {{info}}<br>-->
  <!--  {{archive}}-->
  <div class="info">
    <el-row>
      <el-col :span="6">
        <div class="base-info-left">
          <img src="/img/user.jpg" class="image" alt="" />
          <el-tooltip content="综合评价" placement="bottom" effect="light">
            <el-rate
              v-model="star"
              disabled
              show-score
              text-color="#ff9900"
              class="left-star"
              score-template="{value}"
            />
          </el-tooltip>
        </div>
      </el-col>
      <el-col :span="5" class="info-form">
        <div class="base-info-right">
          <el-form label-position="right" label-width="80px">
            <el-form-item label="姓名：">
              {{ info.employee.name }}
            </el-form-item>
            <el-form-item label="性别：">
              {{ info.employee.sex }}
            </el-form-item>
            <el-form-item label="年龄：">
              {{ age }}
            </el-form-item>
            <el-form-item label="学历：">
              {{ info.employee.education }}
            </el-form-item>
            <el-form-item label="地址：">
              {{ info.employee.address }}
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="9" class="info-form">
        <div id="starChart" class="rectChart-s"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="0.5"></el-col>
      <el-col :span="14">
        <div class="archive-info">
          <el-collapse v-model="active">
            <div class="archive">
              <el-timeline>
                <el-timeline-item
                  v-for="item in archive"
                  :timestamp="item.hireDate"
                  :key="item"
                  placement="top"
                  type="success"
                >
                  <el-card>
                    <h4>就职于 {{ item.company.name }}</h4>
                    <p>
                      就职时间：
                      {{ myMoment(item.hireDate).format('YYYY年 MM月 DD日') }}
                      -----
                      {{
                        item.departureDate == null
                          ? '至今'
                          : myMoment(item.departureDate).format(
                              'YYYY年 MM月 DD日'
                            )
                      }}
                    </p>

                    <el-collapse-item style="text-align: left">
                      <el-tag style="height: auto; margin-left: 100px">
                        就职部门：{{ item.department }}
                        <br />
                        所任职位：{{ item.title }}
                        <br />
                        奖惩情况：{{ item.bonusPenalty }}
                        <br />
                        整体评价：{{ item.comment }}
                        <br />
                        <el-tag
                          style="
                            background-color: #fff;
                            height: auto;
                            width: 600px;
                            margin-bottom: 20px;
                          "
                        >
                          <el-form>
                            <el-form-item>
                              综合等级
                              <el-rate
                                v-model="item.rate"
                                disabled
                                show-score
                                text-color="#ff9900"
                              />
                            </el-form-item>
                            <!--可更改-->
                            <el-form-item>
                              团队能力
                              <el-rate
                                v-model="item.teamAbility"
                                disabled
                                text-color="#ff9900"
                                show-score
                              />
                            </el-form-item>
                            <!--可更改-->
                            <el-form-item>
                              表现情况
                              <el-rate
                                v-model="item.performance"
                                disabled
                                show-score
                                text-color="#ff9900"
                              />
                            </el-form-item>
                            <el-form-item>
                              出勤情况
                              <el-rate
                                v-model="item.attendance"
                                disabled
                                show-score
                                text-color="#ff9900"
                              />
                            </el-form-item>
                            <!--可更改-->
                            <el-form-item>
                              工作态度
                              <el-rate
                                v-model="item.attitude"
                                disabled
                                show-score
                                text-color="#ff9900"
                              />
                            </el-form-item>
                          </el-form>
                        </el-tag>
                      </el-tag>
                    </el-collapse-item>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-collapse>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { initChart } from '/src/utils/pubMethod.js'
import moment from 'moment'
export default {
  name: 'archiveInfo',
  props: ['allInfo'],
  data() {
    return {
      info: {},
      archive: [],
      active: 0,
      star: 3,
      starData: {
        tooltip: {
          trigger: 'item',
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { text: '综合等级', min: 0 },
            { text: '团队能力', min: 0 },
            { text: '表现情况', min: 0 },
            { text: '工作态度', min: 0 },
            { text: '出勤情况', min: 0 },
          ],
          radius: 90,
          center: ['47%', '50%'],
        },
        series: [
          {
            name: '职员学历情况',
            type: 'radar',
            areaStyle: {
              color: '#32dadd',
            },
            itemStyle: {
              color: '#32dadd',
            },
            data: [
              {
                value: [32, 43, 63, 67, 62],
              },
            ],
          },
        ],
      },
    }
  },
  computed: {
    age: function () {
      let str = String(this.info.employee.idNumber)
      let year = new Date().getFullYear() - parseInt(str.slice(6, 10))
      return year
    },
  },
  methods: {
    myMoment(val) {
      return moment(val)
    },
    getChart() {
      const list = [
        'rate',
        'teamAbility',
        'performance',
        'attitude',
        'attendance',
      ]
      let res = [0, 0, 0, 0, 0]
      for (const i in this.archive) {
        for (const index in list) {
          let num = this.archive[i][list[index]]
          res[index] += num == null ? 5 : num
        }
      }
      for (const i in res) {
        res[i] /= this.archive.length
      }
      this.star = res[0]
      this.starData.series[0].data[0]['value'] = res
      this.ini()
    },
    ini() {
      initChart('starChart', this.starData)
    },
  },
  created() {
    this.info = this.allInfo[0]
    this.archive = this.allInfo[1]
  },
  mounted() {
    this.getChart()
  },
}
</script>

<style scoped>
.info {
  padding: 30px 50px 0 30px;
  background-color: #fff;
  border: solid 1px #c0c4cc;
  min-width: 1000px;
}

.base-info-left {
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  flex: 2;
}

.image {
  margin-left: 20px;
  margin-right: 20px;
  max-height: 280px;
  min-height: 250px;
  display: flex;
  border: double #766464 5px;
  border-radius: 10px;
  box-shadow: 3px 3px 2px 2px rgba(0, 0, 0, 0.5);
}

.left-star {
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.base-info-right {
  flex: 5;
}

.info-form {
  padding-bottom: 30px;
  color: #7f7f7f;
  background-color: rgba(182, 255, 245, 0.1);
  padding: 20px 0 20px 20px;
  margin-left: 50px;
  font-size: 14px;
}
.rectChart-s {
  width: 350px;
  height: 280px;
}

.info-item-l {
  width: 300px;
  height: 50px;
}
.archive {
  width: 900px;
  margin: 30px 0 0 50px;
}
.info-item-s {
  width: 200px;
  height: 50px;
}

.archive-info {
  margin-top: 20px;
  min-width: 1000px;
  max-width: 1200px;
  min-height: 200px;
  display: flex;
  margin-left: 50px;
}
</style>
