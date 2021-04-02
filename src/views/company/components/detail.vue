<template>
  <el-table
    :data="
      employee.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )
    "
    style="width: 100%"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    ref="filterTable"
  >
    <!--头像-->
    <el-table-column align="center" width="100px" label="  ">
      <template #default="scope">
        <img class="head-portrait" :src="scope.row.photo" />
      </template>
    </el-table-column>
    <!--姓名-->
    <el-table-column label="姓名" prop="name" align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p class="employee-name">姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
          </template>
          <template #reference>
            <div class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <!--性别-->
    <el-table-column
      label="性别"
      prop="sex"
      align="center"
      :filters="sexFilter"
      :filter-method="filterHandler"
      sortable
      width="150px"
    >
    </el-table-column>
    <!--职位--><!--width="220px"-->
    <el-table-column
      label="职位"
      prop="job_state"
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
      prop="education"
      align="center"
      width="220px"
      :filters="eduFilter"
      :filter-method="filterHandler"
      sortable
    >
    </el-table-column>
    <!--操作-->
    <el-table-column align="center">
      <!--搜索框-->
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入姓名进行搜索" />
      </template>
      <!--【查看】按钮-->
      <template #default="scope">
        <el-button size="mini" @click="employeeDetail(scope.$index, scope.row)">
          查看
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!--详细信息-->
  <el-dialog v-model="dialogVisible" width="33%" :before-close="handleClose">
    <el-form ref="form" :model="employeeInfo" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="employeeInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="employeeInfo.sex"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="employeeInfo.tel"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="employeeInfo.id_number"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model="employeeInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="employeeInfo.job_state"></el-input>
      </el-form-item>
      <el-form-item label="工龄">
        <el-input v-model="employeeInfo.education"></el-input>
      </el-form-item>
      <el-form-item label="奖惩信息">
        <el-input type="textarea" v-model="employeeInfo.address"></el-input>
      </el-form-item>
      <el-form-item label="整体评价">
        <el-input type="textarea" v-model="employeeInfo.address"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handlerChange">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {
      employee: [],
      search: '',
      loading: false,
      eduFilter: [],
      jobFilter: [],
      sexFilter: [],
      employeeInfo: {},
      dialogVisible: false,
    }
  },
  methods: {
    /*获取数据*/
    getData() {
      getAllArchive().then((result) => {
        this.employee = result.data.data
        //获取拥有的员工的学历和职位
        getObj('education', this.eduFilter, this.employee)
        getObj('job_state', this.jobFilter, this.employee)
        getObj('sex', this.sexFilter, this.employee)
      })
    },
    /*【查看】点击事件*/
    employeeDetail(index, row) {
      getOneArchive(row.uid).then((result) => {
        this.employeeInfo = result.data.data[0]
      })
      /*---转圈加载--*/
      this.dialogVisible = true
    },
    /*过滤器方法*/
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    /*修改按钮二次确认*/
    handlerChange(done) {
      this.$confirm('确认修改？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
      })
        .then((_) => {
          /*表单的验证*/
          this.$refs.form.validate((valid) => {
            if (valid) {
              /*进行数据修改,并获取响应*/
              changeArchive(this.employeeInfo)
              Msg(this.$message, 'success', '修改成功')
            }
          })
          done()
        })
        .catch((_) => {
          Msg(this.$message, 'warning', '修改失败')
        })
    },
    /*详情信息关闭二次确认*/
    handleClose(done) {
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      })
        .then((_) => {
          this.dialogVisible = false
          done()
        })
        .catch((_) => {
          Msg(this.$message, 'warning', '发生错误')
        })
    },
  },
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

.ml50 {
  padding-left: 150px;
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
