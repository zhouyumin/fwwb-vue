<template class="main">
  <el-empty description="暂无数据，快去参加工作吧!" v-show="!archive">
    <el-button type="primary">生成授权码</el-button>
  </el-empty>
  <div  v-show="archive">
    <div class="text-center">
      <h1
        class="primary title"
        style="display: inline-block; font-size: 28px; margin-bottom: 0"
      >
        就职经历
      </h1>
    </div>
    <el-collapse>

      <div class="archive">
      <el-timeline>
        <el-timeline-item
          v-for="item in archive"
          :timestamp="item.hireDate"
          :key="item"
          placement="top"
        >
          <el-card shadow="hover" class="">
            <h4>就职于 {{ item.company.name }}</h4>
            <p>就职时间： {{ item.hireDate }} ----- {{ item.departureDate }}</p>

            <el-collapse-item style="text-align: left" :title="title" @click="change()">
              <el-tag style="height: auto;margin-left:100px;">
                奖惩情况：{{item.bonusPenalty}}
                <br>
                就职部门：{{item.bonusPenalty}}
                <br>
                所任职位：{{item.bonusPenalty}}
                <br>
                出勤情况：{{item.attendance}}
                <br>
                整体评价：{{item.comment}}
                <br>
                <el-tag style="background-color:#fff;height:auto;width: 600px">
                <el-form-item>
                    等级
                    <el-rate v-model="item.rate"
                             disabled
                             show-score
                             text-color="#ff9900"
                    />

                </el-form-item>
                <!--可更改-->
                <el-form-item >

                    团队能力
                  <el-rate v-model="item.teamAbility"
                           disabled
                           text-color="#ff9900"
                           show-score
                           class="left-star"
                  />

                </el-form-item>
                <!--可更改-->
                <el-form-item>
                  表现
                  <el-rate v-model="item.performance"
                           disabled
                           show-score
                           text-color="#ff9900"
                           class="left-star"
                           />
                </el-form-item>
                <!--可更改-->
                <el-form-item>
                  态度
                  <el-rate v-model="item.attitude"
                           disabled
                           show-score
                           text-color="#ff9900"
                           class="left-star"
                           />
                </el-form-item>
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
export default {
  name: 'index',
  data() {
    return {
      archive: null,
      title: "点击查看详情"
    }
  },
  methods:{
    change(){
      if (this.title!=""){
        this.title=""
      }else{
        this.title="点击查看详情"
      }
    }
  },
  created() {
    get_archive().then((res) => {
      this.archive = res.data.data
    })
  },
  updated() {
  },
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
  position: relative;
  top: 16px;
  left: 0;
  font-size: 26px;
  color: #c0c4cc;
  width: 150px;
  /*pointer-events: none;*/
  z-index: 999;
}
</style>
