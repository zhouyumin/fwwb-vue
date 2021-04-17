<template class="main">
  <el-empty description="暂无数据!" v-show="archive.length < 1"> </el-empty>
  <div v-show="archive">
    <div class="text-center">
      <h1 class="primary title">就职经历</h1>
    </div>
    <el-collapse>
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
                    : myMoment(item.departureDate).format('YYYY年 MM月 DD日')
                }}
              </p>

              <el-collapse-item style="text-align: left">
                <el-tag style="height: auto; margin-left: 100px">
                  奖惩情况：{{ item.bonusPenalty }}
                  <br />
                  就职部门：{{ item.department }}
                  <br />
                  所任职位：{{ item.title }}
                  <br />
                  出勤情况：{{ item.attendance }}
                  <br />
                  整体评价：{{ item.comment }}
                  <br />
                  <el-tag
                    style="background-color: #fff; height: auto; width: 600px"
                  >
                    <el-form>
                      <el-form-item>
                        等级
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
                          class="left-star"
                        />
                      </el-form-item>
                      <!--可更改-->
                      <el-form-item>
                        表现
                        <el-rate
                          v-model="item.performance"
                          disabled
                          show-score
                          text-color="#ff9900"
                          class="left-star"
                        />
                      </el-form-item>
                      <!--可更改-->
                      <el-form-item>
                        态度
                        <el-rate
                          v-model="item.attitude"
                          disabled
                          show-score
                          text-color="#ff9900"
                          class="left-star"
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
</template>

<script>
import { get_archive } from '/src/api/archive.js'
import moment from 'moment'
export default {
  name: 'index',
  data() {
    return {
      archive: [],
    }
  },
  methods: {
    myMoment(val) {
      return moment(val)
    },
  },
  created() {
    this.archive = this.$store.getters.Archive
    if (JSON.stringify(this.archive) == '{}') {
      get_archive()
        .then((res) => {
          const data = res.data.data
          this.$store.commit('setArchive', data)
        })
        .then(() => {
          this.archive = this.$store.getters.Archive
        })
        .catch((err) => {
          this.$message.error('网络错误')
        })
    }
  },
  updated() {},
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #f7f8ff !important;
}
.archive {
  width: 900px;
  margin: 30px 0 0 50px;
}
.title {
  font-size: 26px;
  width: 150px;
  margin-bottom: 28px;
  display: inline-block;
  font-size: 28px;
}
</style>
