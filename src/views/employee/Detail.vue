<template>
  <div class="Info">
    <div class="Info-left">
      <div class="Info-left-top">
        <el-row>
          <el-col :span="18" :offset="3">
            <el-card class="img-card" shadow="hover">
              <img src="/img/user.jpg" class="image" />
            </el-card>
          </el-col>
          <el-col :span="24">
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
          </el-col>
        </el-row>
      </div>
      <div class="Info-left-bottom">
        <el-row>
          <el-col :span="23" :offset="1">
            <div id="user-img" class="user-img"></div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="Info-right">
      <div class="Info-right-top">
        <div class="Info-right-header">
          <div class="changeInfo">
            <i @click="reAuthor" class="el-icon-edit-outline">修改认证信息 </i>
          </div>
        </div>
        <el-divider></el-divider>
        <el-form label-position="right" label-width="80px" class="info-form">
          <el-row style="width: 100%">
            <el-col :span="7">
              <el-form-item label="姓名:">
                {{ employee.name }}
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="性别:">
                {{ employee.sex }}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="手机号码:">
                {{ employee.tel }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="width: 100%">
            <el-col :span="7">
              <el-form-item label="年龄:">
                {{ age }}
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="学历:">
                {{ employee.education }}
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="身份证号:">
                {{ employee.idNumber }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="width: 100%">
            <el-form-item label="籍贯:">
              {{ employee.address }}
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { Msg, initChart } from '/src/utils/pubMethod.js'
import { getUserProfile } from '/src/api/user.js'
import { get_archive } from '/src/api/archive.js'
export default {
  data() {
    return {
      employee: {},
      archive: [],
      star: 3,
      option: {
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
                value: [0, 0, 0, 0, 0],
              },
            ],
          },
        ],
      },
    }
  },
  computed: {
    age: function () {
      let str = String(this.employee.idNumber)
      let year = new Date().getFullYear() - parseInt(str.slice(6, 10))
      return year
    },
  },
  methods: {
    //个人信息发生变化修改认证
    reAuthor() {
      this.$router.push('/authorization/Employee')
    },
    setChart() {
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
      this.option.series[0].data[0]['value'] = res
      initChart('user-img', this.option)
    },
  },
  created() {
    this.employee = this.$store.getters.Employee
    if (JSON.stringify(this.employee) == '{}') {
      getUserProfile()
        .then((res) => {
          const data = res.data.data
          this.$store.commit('setEmployee', data)
        })
        .then(() => {
          this.employee = this.$store.getters.Employee
        })
        .catch((err) => {
          this.$message.error('网络错误')
        })
    }
    this.archive = this.$store.getters.Archive
    if (JSON.stringify(this.archive) == '{}') {
      get_archive()
        .then((res) => {
          const data = res.data.data
          this.$store.commit('setArchive', data)
        })
        .then(() => {
          this.archive = this.$store.getters.Archive
          this.setChart()
        })
        .catch((err) => {
          this.$message.error('网络错误')
        })
    }
  },
  mounted() {},
}
</script>

<style>
.Info {
  margin-top: 10px;
  display: flex;
  min-width: 400px;
  min-height: 400px;
}

.Info-left {
  min-width: 200px;
  background-color: #fff;
  margin-left: 10px;
  flex: 1;
  /*background-color: #e9eef3;*/
}

.Info-left-top {
  height: 300px;
}

.img-card {
  margin-top: 20px;
  padding: 2px;
  border-radius: 2px;
  background-color: rgba(140, 197, 255, 0.4);
}

.image {
  width: 100%;
  display: block;
  max-height: 230px;
  min-height: 180px;
}

.left-star {
  text-align: center;
  margin-top: 20px;
}
#user-img {
  margin: auto;
  padding-top: 16px;
  width: 320px;
  height: 320px;
}

.Info-left-bottom {
  height: 300px;
}

.Info-right {
  min-width: 700px;
  margin-left: 20px;
  flex: 3;
}

.Info-right-top {
  min-width: 700px;
  background-color: #fff;
  padding: 20px;
  min-height: 300px;
  max-height: 400px;
}

.Info-right-header {
  height: 10px;
}

.changeInfo {
  color: #3a8ee6;
  /*font-weight: bold;*/
  /*color: #7F7F7F;*/
  cursor: pointer;
  float: right;
}

.changeInfo:hover {
  font-weight: bold;
  color: #0d81ec;
}

.info-form {
  display: flex;
  /*max-width: 800px;*/
  min-height: 230px;
  color: #7f7f7f;
  margin-top: 20px;
  margin-left: 50px;
  font-size: 14px;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
}

.el-form-item__content {
  height: auto;
  max-height: 120px;
  overflow: hidden;
}

.el-form-item__label {
  font-weight: bolder;
}

.Info-right-bottom {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  min-height: 300px;
}

.el-textarea__inner {
  height: 100px;
}
</style>
