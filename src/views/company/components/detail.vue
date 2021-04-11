<template>
  <el-table
      :data="archive.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="filterTable">
    <!--头像-->
    <el-table-column
        align="center"
        width="100px"
        label="  ">
      <template #default="scope">
        <img class="head-portrait" :src=" scope.row.photo"/>
      </template>
    </el-table-column>
    <!--姓名-->
    <el-table-column
        label="姓名"
        prop="name"
        align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p class="employee-name">姓名: {{ scope.row.employee.name }}</p>
            <p>住址: {{ scope.row.employee.address }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.employee.name }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <!--性别-->
    <el-table-column
        label="性别"
        prop="employee.sex"
        align="center"
        :filters="sexFilter"
        :filter-method="filterHandler"
        sortable
        width="150px">

    </el-table-column>
    <!--职位--><!--width="220px"-->
    <el-table-column
        label="职位"
        prop="title"
        align="center"
        :filters="jobFilter"
        :filter-method="filterHandler"
        width="250px"
        sortable
    >
    </el-table-column>
    <!--学历-->
    <el-table-column
        label="学历"
        prop="employee.education"
        align="center"
        width="220px"
        :filters="eduFilter"
        :filter-method="filterHandler"
        sortable>
    </el-table-column>
    <!--操作-->
    <el-table-column
        align="center">
      <!--搜索框-->
      <template #header>
        <el-input
            v-model="search"
            size="mini"
            placeholder="输入姓名进行搜索"/>
      </template>
      <!--【查看】按钮-->
      <template #default="scope">
        <el-button
            size="mini"
            @click="employeeDetail(scope.$index, scope.row)"
        >
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--详细信息-->
  <el-dialog
      v-model="dialogVisible"
      width="33%"
      :close-on-click-modal=false
      :before-close="handleClose"
  >
    <el-form ref="form" :model="employeeInfo" label-width="80px">
      <el-form-item label="姓名">
        <span class="ml10">
          {{ employeeInfo.employee.name }}
        </span>


        <!--        <el-input v-model="employeeInfo.employee.name" ></el-input>-->
      </el-form-item>
      <el-form-item label="性别">
        <span class="ml10">
          {{ employeeInfo.employee.sex }}
        </span>
        <!--        <el-input v-model="" :readonly="true"></el-input>-->
      </el-form-item>
      <el-form-item label="手机号码">
        <span class="ml10">
          {{ employeeInfo.employee.tel }}
      </span>
        <!--        <el-input v-model="" :readonly="true"></el-input>-->
      </el-form-item>
      <el-form-item label="身份证号">
        <span class="ml10">
          {{ employeeInfo.employee.idNumber }}
        </span>
<!--        <el-input v-model="employeeInfo.employee.idNumber"></el-input>-->
      </el-form-item>
      <el-form-item label="家庭住址">
        <span class="ml10">{{ employeeInfo.employee.address }}</span>
        <!--        <el-input v-model="employeeInfo.employee.address" :readonly="true"></el-input>-->
      </el-form-item>
      <!--可更改-->
      <el-form-item label="职位">
        <el-input v-model="employeeInfo.title"></el-input>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="出勤">
        <el-input v-model="employeeInfo.attendance"></el-input>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="部门">
        <el-input v-model="employeeInfo.department"></el-input>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="雇佣日期">
        <el-date-picker
            v-model="employeeInfo.hireDate"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="离职日期">
        <el-date-picker
            v-model="employeeInfo.departureDate"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="综合等级">
        <el-rate v-model="employeeInfo.rate"
                 allow-half
                 show-score
                 text-color="#ff9900"
                 class="left-star"
                 score-template="{value}"/>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="团队能力">
        <el-rate v-model="employeeInfo.teamAbility"
                 allow-half
                 show-score
                 text-color="#ff9900"
                 class="left-star"
                 score-template="{value}"/>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="表现情况">
        <el-rate v-model="employeeInfo.performance"
                 allow-half
                 show-score
                 text-color="#ff9900"
                 class="left-star"
                 score-template="{value}"/>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="工作态度">
        <el-rate v-model="employeeInfo.attitude"
                 allow-half
                 show-score
                 text-color="#ff9900"
                 class="left-star"
                 score-template="{value}"/>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="奖惩信息">
        <el-input type="textarea" v-model="employeeInfo.bonusPenalty"></el-input>
      </el-form-item>
      <el-form-item label="一般评价">
        <el-input type="textarea" v-model="employeeInfo.general_comment"></el-input>
      </el-form-item>
      <!--可更改-->
      <el-form-item label="整体评价">
        <el-input type="textarea" v-model="employeeInfo.comment"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handlerChange" disabled="{{employeeInfo.departureDate}}"
      >修改</el-button>
    </span>
    </template>
  </el-dialog>
</template>
<script>
import {update_archive} from '/src/api/archive.js'

import {getObj, Msg, getValue} from '/src/utils/pubMethod'
import moment from "moment";

export default {
  name: "detail",
  props: {
    archive: {
      required: true
    }
  },
  data() {
    return {
      search: '',
      loading: true,
      eduFilter: [],
      jobFilter: [],
      sexFilter: [],
      employeeInfo: {},
      dialogVisible: false,
      data: {}
    };
  },
  methods: {
    /*获取数据*/
    getData() {
      let employee = []
      this.sexFilter = []
      this.jobFilter = []
      this.eduFilter = []
      getValue(this.archive, employee, 'employee')
      getObj('education', this.eduFilter, employee)
      getObj('title', this.jobFilter, this.archive)
      getObj('sex', this.sexFilter, employee)
    },
    /*【查看】点击事件*/
    employeeDetail(index, row) {
      this.employeeInfo = {}
      this.employeeInfo = JSON.parse(JSON.stringify(row));
      /*---转圈加载--*/
      this.dialogVisible = true
    },
    /*过滤器方法*/
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    /*修改按钮二次确认*/
    handlerChange(done) {
      this.$confirm('确认修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(_ => {
        /*表单的验证*/
        this.$refs.form.validate((valid) => {
          if (valid) {
            /*进行数据修改,并获取响应*/
            this.data["attendance"] = this.employeeInfo["attendance"]
            this.data["attitude"] = this.employeeInfo["attitude"]
            this.data["bonusPenalty"] = this.employeeInfo["bonusPenalty"]
            this.data["comment"] = this.employeeInfo["comment"]

            this.data["department"] = this.employeeInfo["department"]
            this.data.departureDate = moment(this.employeeInfo["departureDate"]).format(
                'YYYY-MM-DD HH:mm:ss'
            )
            this.data.hireDate = moment(this.employeeInfo["hireDate"]).format(
                'YYYY-MM-DD HH:mm:ss'
            )
            this.data["idNumber"] = this.employeeInfo["employee"]["idNumber"]
            this.data["name"] = this.employeeInfo["employee"]["name"]
            this.data["performance"] = this.employeeInfo["performance"]
            this.data["rate"] = this.employeeInfo["rate"]
            this.data["teamAbility"] = this.employeeInfo["teamAbility"]
            this.data["title"] = this.employeeInfo["title"]

            this.updateArchive(this.data)
            Msg(this.$message, 'success', '修改成功')
          }
        })
        // done();
      }).catch(_ => {
        Msg(this.$message, 'warning', '修改失败')
      });
    },
    updateArchive(param) {
      console.log(param)
      update_archive(param).then(res => {
        console.log(res)
      }, err => {
        console.log(err)
        Msg(this.$message, 'warning', '修改失败')
      })
    },
    /*详情信息关闭二次确认*/
    handleClose(done) {
      this.dialogVisible = false
    }
  },
  updated() {
    this.getData()
    this.loading = false
  }
}
</script>

<style scoped>
.head-portrait {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.goTop {
  height: 100vh;
  overflow-x: hidden;
}

.employee-name {
}

.ml50 {
  padding-left: 150px;
}

.ml10 {
  margin-left: 10px;
}

.cancel {
  background-color: #fff;
}

.el-message-box {
  width: 500px;
}

.form {
  width: 200px;
  height: 200px;
  background-color: red;
}
</style>