<template>
  <el-skeleton :rows="12" :loading="!employeeDetail(info)" />
  <div v-if="employeeDetail(info)" class="info">
    <div class="base-info">
      <div class="base-info-left">
        <img src="/img/user.jpg" class="image" alt="" />
        <el-tooltip content="综合评价" placement="bottom" effect="light">
          <el-rate
            v-model="info.star"
            disabled
            show-score
            text-color="#ff9900"
            class="left-star"
            score-template="{value}"
          />
        </el-tooltip>
      </div>
      <div class="base-info-right">
        <el-form label-position="right" label-width="80px" class="info-form">
          <el-form-item class="info-item-s" label="姓名:">
            {{ info.employee.name }}
          </el-form-item>
          <el-form-item class="info-item-s" label="性别:">
            {{ info.employee.sex }}
          </el-form-item>
          <el-form-item class="info-item-s" label="年龄:">
            {{ age }}
          </el-form-item>
          <el-form-item class="info-item-s" label="学历:">
            {{ info.employee.education }}
          </el-form-item>
          <el-form-item class="info-item-l" label="籍贯:">
            {{ info.employee.address }}
          </el-form-item>
          <el-form-item class="info-item-xl" label="自我介绍:">
            <!--            {{ employeeInfo.introduce }}-->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--    <div class="archive-info">-->
    <!--      <div class="time-line">-->
    <!--        <el-timeline>-->
    <!--          <el-timeline-item-->
    <!--              v-for="(activity, index) in activities"-->
    <!--              :key="index"-->
    <!--              :timestamp="activity.hire_data">-->
    <!--            {{ activity.company }}-->
    <!--          </el-timeline-item>-->
    <!--        </el-timeline>-->
    <!--      </div>-->
    <!--      <div class="archive-detail">-->
    <!--        <el-collapse>-->
    <!--          <el-collapse-item v-for="(activity, index) in activities"-->
    <!--                            :key="index"-->
    <!--                            :title=activity.company-->
    <!--                            :name=index>-->
    <!--            <div>{{activity.content}}</div>-->
    <!--          </el-collapse-item>-->
    <!--        </el-collapse>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
// import {getInfo,myArchive} from '/src/api/employee/employee.js'
export default {
  name: 'archiveInfo',
  data() {
    return {
      loading: true,
      activities: [],
    }
  },
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    age: function () {
      let str = String(this.info.employee.idNumber)
      let year = new Date().getFullYear() - parseInt(str.slice(6, 10))
      return year
    },
  },
  methods: {
    employeeDetail(info) {
      if (!info.uid) {
        return 0
      } else {
        return 1
      }
    },
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

.base-info {
  display: flex;
  min-width: 1000px;
  max-width: 1200px;
  min-height: 300px;
  max-height: 330px;
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
  min-width: 700px;
  min-height: 230px;
  padding-bottom: 30px;
  color: #7f7f7f;
  background-color: rgba(182, 255, 245, 0.1);
  padding: 20px 0 20px 20px;
  margin-top: 20px;
  margin-left: 50px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
}

.info-item-l {
  width: 300px;
  height: 50px;
}

.info-item-s {
  width: 200px;
  height: 50px;
}

.info-item-xl {
  width: 600px;
  height: 100px;
}

.archive-info {
  min-width: 1000px;
  max-width: 1200px;
  min-height: 200px;
  display: flex;
}

.time-line {
  flex: 2;
  min-width: 280px;
  max-width: 300px;
  min-height: 200px;
  margin: 30px 0 0 30px;
  padding: 20px 0 0 30px;
}

.archive-detail {
  flex: 7;
  min-width: 600px;
  min-height: 200px;
  margin: 60px;
}
</style>
