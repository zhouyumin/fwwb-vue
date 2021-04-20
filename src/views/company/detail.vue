<template>
  <el-table
      :data="
      archive
        .filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
        .slice((currentPage - 1) * pagesize, currentPage * pagesize)
    "
      stripe
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="filterTable"
  >
    <!--头像-->
    <el-table-column align="center" width="100px" label="  ">
      <template #default="">
        <img class="head-portrait" src="/img/user.png"/>
      </template>
    </el-table-column>
    <!--姓名-->
    <el-table-column label="姓名" prop="name" align="center" width="120px">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <p class="employee-name">姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.employee.address }}</p>
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
        width="120px"
    >
    </el-table-column>
    <!--职位--><!--width="220px"-->
    <el-table-column
        label="职位"
        prop="title"
        align="center"
        :filters="jobFilter"
        :filter-method="filterHandler"
        width="150px"
        sortable
    >
    </el-table-column>
    <!--学历-->
    <el-table-column
        label="学历"
        prop="education"
        align="center"
        width="180px"
        :filters="eduFilter"
        :filter-method="filterHandler"
        sortable
    >
    </el-table-column>
    <!--入职日期-->
    <el-table-column
        label="入职日期"
        prop="hireDate"
        align="center"
        width="180px"
        sortable
    >
    </el-table-column>
    <!--情况-->
    <el-table-column
        label="在职情况"
        prop="isDepart"
        align="center"
        width="120px"
        :filters="departFilter"
        :filter-method="filterHandler"
        sortable
    >
      <template #default="scope">
        <el-tag :type="scope.row.isDepart == '离职' ? 'danger' : 'success'">
          {{ scope.row.isDepart }}
        </el-tag>
      </template>
    </el-table-column>
    <!--操作-->
    <el-table-column align="center">
      <!--搜索框-->
      <template #header>
        <el-input
            prefix-icon="iconfont iconuser"
            v-model="search"
            size="medium"
            style="width: 60%; margin-right: 5%"
            placeholder="输入姓名进行搜索"
        />
        <el-button
            type="primary"
            size="medium"
            style="width: 35%"
            @click="exportExcel"
        >
          <i class="el-icon-document"></i>
          <span>导出excel</span>
        </el-button>
      </template>
      <!--【查看】按钮-->
      <template #default="scope">
        <el-button
            type="primary"
            size="mini"
            @click="employeeDetail(scope.$index, scope.row, '修改')"
        >
          详情
        </el-button>
        <el-button
            type="danger"
            size="mini"
            :disabled="scope.row.departureDate != null"
            @click="employeeDepart(scope.$index, scope.row)"
        >
          离职
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div
      style="
      text-align: center;
      background-color: #fff;
      padding-top: 20px;
      padding-bottom: 20px;
    "
  >
    <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="archive.length"
        @current-change="current_change"
    >
    </el-pagination>
  </div>

  <!--详细信息-->
  <el-dialog
      v-model="dialogVisible"
      width="45%"
      :close-on-click-modal="false"
      :before-close="handleClose"
      top="20px"
  >
    <el-form ref="form" :model="employeeInfo" label-width="100px">
      <el-row style="height: 50px">
        <el-col :span="10">
          <el-form-item label="姓名：">
            <span class="ml10">
              {{ employeeInfo.employee.name }}
            </span>

            <!--        <el-input v-model="employeeInfo.employee.name" ></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <el-form-item
              label="离职日期："
              v-if="employeeInfo.departureDate !== null"
          >
            <span class="ml10">{{ employeeInfo.departureDate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 50px">
        <el-col :span="10">
          <el-form-item label="性别：">
            <span class="ml10">
              {{ employeeInfo.employee.sex }}
            </span>
            <!--        <el-input v-model="" :readonly="true"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <el-form-item label="入职日期：">
            <span class="ml10">{{ hireDate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 50px">
        <el-col :span="10">
          <el-form-item label="手机号码：">
            <span class="ml10">
              {{ employeeInfo.employee.tel }}
            </span>
            <!--        <el-input v-model="" :readonly="true"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <el-form-item label="综合等级：">
            <el-rate
                v-model="employeeInfo.rate"
                show-score
                text-color="#ff9900"
                class="left-star"
                score-template="{value}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 50px">
        <el-col :span="11">
          <el-form-item label="身份证号：">
            <span class="ml10">
              {{ employeeInfo.employee.idNumber }}
            </span>
            <!--        <el-input v-model="employeeInfo.employee.idNumber"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="团队能力：">
            <el-rate
                v-model="employeeInfo.teamAbility"
                show-score
                text-color="#ff9900"
                class="left-star"
                score-template="{value}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 50px">
        <el-col :span="10">
          <el-form-item label="家庭住址：">
            <span class="ml10">{{ employeeInfo.employee.address }}</span>
            <!--        <el-input v-model="employeeInfo.employee.address" :readonly="true"></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <el-form-item label="表现情况：">
            <el-rate
                v-model="employeeInfo.performance"
                show-score
                text-color="#ff9900"
                class="left-star"
                score-template="{value}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 60px">
        <el-col :span="10">
          <el-form-item label="职位：">
            <el-input v-model="employeeInfo.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <el-form-item label="工作态度：">
            <el-rate
                v-model="employeeInfo.attitude"
                show-score
                text-color="#ff9900"
                class="left-star"
                score-template="{value}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="height: 60px">
        <el-col :span="10">
          <el-form-item label="部门：">
            <el-input v-model="employeeInfo.department"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
          <el-form-item label="出勤：">
            <el-rate
                v-model="employeeInfo.attendance"
                show-score
                text-color="#ff9900"
                class="left-star"
                score-template="{value}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="奖惩信息：">
            <el-input
                type="textarea"
                v-model="employeeInfo.bonusPenalty"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="整体评价：">
            <el-input type="textarea" v-model="employeeInfo.comment"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--可更改-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
            :type="button_content == '离职' ? 'danger' : 'primary'"
            @click="onSubmit(button_content)"
            :disabled="employeeInfo.departureDate != null"
        >{{ button_content }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import {get_company_archive, update_archive} from '/src/api/archive.js'

import {getObj, Msg, getValue} from '/src/utils/pubMethod'
import moment from 'moment'

export default {
  name: 'detail',
  data() {
    return {
      index: 0,
      archive: [],
      search: '',
      loading: true,
      currentPage: 1,
      pagesize: 12,
      eduFilter: [],
      jobFilter: [],
      sexFilter: [],
      departFilter: [
        {text: '离职', value: '离职'},
        {text: '在职', value: '在职'},
      ],
      employeeInfo: {},
      dialogVisible: false,
      form_data: {},
      hireDate: 0,
      button_content: '修改',
      excel: [],
    }
  },
  methods: {
    /*获取数据*/
    getData() {
      this.sexFilter = []
      this.jobFilter = []
      this.eduFilter = []
      for (let item in this.archive) {
        this.archive[item]['name'] = this.archive[item]['employee']['name']
        this.archive[item]['education'] = this.archive[item]['employee'][
            'education'
            ]
        this.archive[item]['sex'] = this.archive[item]['employee']['sex']
        if (this.archive[item]['departureDate'] === null) {
          this.archive[item]['isDepart'] = '在职'
        } else {
          this.archive[item]['isDepart'] = '离职'
        }
        this.archive[item]['hireDate'] = moment(
            this.archive[item]['hireDate']
        ).format('YYYY-MM-DD')
        this.excel.push(JSON.parse(JSON.stringify(this.archive[item])))
      }
      getObj('education', this.eduFilter, this.archive)
      getObj('title', this.jobFilter, this.archive)
      getObj('sex', this.sexFilter, this.archive)
    },
    /*【查看】点击事件*/
    employeeDetail(index, row, button_content) {
      this.button_content = button_content
      this.index = index
      this.employeeInfo = JSON.parse(JSON.stringify(row))
      if (this.employeeInfo.departureDate !== null) {
        this.employeeInfo.departureDate = moment(row.departureDate).format(
            'YYYY年 MM月 DD日'
        )
      }
      this.hireDate = moment(row.hireDate).format('YYYY年 MM月 DD日')
      /*---转圈加载--*/
      this.dialogVisible = true
    },
    employeeDepart(index, row) {
      this.$message.warning('请进行总评')
      this.employeeDetail(index, row, '离职')
    },
    /*过滤器方法*/
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    /*修改按钮二次确认*/
    onSubmit(done) {
      if (done === '离职') {
        this.$confirm('员工离职后将不能修改此档案, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
            .then(() => {
              this.employeeInfo.departureDate = moment(new Date()).format(
                  'YYYY-MM-DD HH:mm:ss'
              )
              this.updateArchive(this.employeeInfo)
            })
            .catch((err) => {
              console.log(err)
              this.$message({
                type: 'info',
                message: '已取消',
              })
            })
      } else {
        this.$confirm('确认修改？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
        }).then(() => {
          this.employeeInfo.departureDate =
              this.employeeInfo.departureDate != null
                  ? moment(this.employeeInfo.departureDate).format(
                  'YYYY-MM-DD HH:mm:ss'
                  )
                  : null
          this.updateArchive(this.employeeInfo)
        })
      }
    },
    updateArchive(data) {
      this.employeeInfo.hireDate = moment(this.employeeInfo.hireDate).format(
          'YYYY-MM-DD HH:mm:ss'
      )
      update_archive(data)
          .then((res) => {
            let item = 0
            for (item in this.archive) {
              if (this.archive[item].employee.idNumber === this.employeeInfo.employee.idNumber) {
                this.index = item
              }
            }
            this.archive[this.index] = JSON.parse(
                JSON.stringify(this.employeeInfo)
            )
            Msg(this.$message, 'success', '操作成功')
          })
          .catch((_) => {
            Msg(this.$message, 'warning', '操作失败')
          })
          .then(() => {
            this.handleClose()
            this.getData()
          })
    },
    /*详情信息关闭二次确认*/
    handleClose() {
      this.dialogVisible = false
    },
    current_change: function (currentPage) {
      this.currentPage = currentPage
    },
    exportExcel() {
      import('/src/utils/Export2Excel.js').then((excel) => {
        const data = []
        const keys = [
          'name',
          'sex',
          'education',
          'title',
          'department',
          'isDepart',
          'hireDate',
          'departureDate',
          'rate',
          'attitude',
          'teamAbility',
          'performance',
          'attendance',
          'bonusPenalty',
          'comment',
        ]
        for (let each in this.excel) {
          let value = []
          for (let key in keys) {
            value.push(this.excel[each][keys[key]])
          }
          data.push(value)
        }
        const tHeader = [
          '姓名',
          '性别',
          '学历',
          '职位',
          '部门',
          '在职情况',
          '入职日期',
          '离职日期',
          '总评',
          '工作态度',
          '团队能力',
          '表现',
          '出勤',
          '奖惩情况',
          '评价',
        ]
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: '档案导出', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
        })
      })
    },
  },
  activated() {
    if (this.$store.getters.Archive.length !== undefined) {
      this.archive = this.$store.getters.Archive
      this.getData()
      this.loading = false
    } else {
      get_company_archive().then(
          (res) => {
            this.$store.commit('setArchive', res.data.data)
            this.archive = this.$store.getters.Archive
            this.getData()
            this.loading = false
          },
          (err) => {
          }
      )
    }
  },
}
</script>

<style scoped>
.head-portrait {
  width: 30px;
  height: 30px;
  border-radius: 15px;
}

.left-star {
  margin-left: 10px;
  margin-top: 10px;
}


.ml10 {
  margin-left: 10px;
}

</style>
