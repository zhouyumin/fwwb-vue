<template>
  <el-row v-loading="loading" class="main">
    <el-col :span="24" class="main">
      <el-card shadow="hover">
        <el-button
          type="primary"
          style="position: absolute; margin: 0 0 0 900px; z-index: 999"
          @click="dialogVisible2 = true"
          >新增授权码</el-button
        >
        <el-table :data="CodeData" style="margin-left: 36px; margin-top: 36px">
          <el-table-column label="授权码" width="300">
            <template #default="scope">
              <span>{{ scope.row.uid }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开始日期" width="200">
            <template #default="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                moment(scope.row.startDate).format('YYYY-MM-DD')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="失效日期" width="200">
            <template #default="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                moment(scope.row.endDate).format('YYYY-MM-DD')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="mini" @click="handleEdit(scope.$index)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog title="修改授权码" v-model="dialogVisible" width="30%">
    <el-form label-width="80px" :model="row">
      <el-form-item label="授权码">
        <el-input v-model="row.uid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="row.startDate"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="row.endDate"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">修改</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog title="添加授权码" v-model="dialogVisible2" width="30%">
    <el-form label-width="80px" :model="addForm">
      <el-form-item label="开始时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="addForm.startDate"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="addForm.endDate"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="addCode">添加</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import { addAuthorization } from '/src/api/authorization.js'
import { getAuthorization } from '/src/api/authorization.js'
import { updateAuthorization } from '/src/api/authorization.js'
import { delAuthorization } from '/src/api/authorization.js'
export default {
  name: 'index',
  data() {
    return {
      moment,
      CodeData: [],
      loading: false,
      dialogVisible: false,
      dialogVisible2: false,
      addForm: {
        uid: '',
        startDate: '',
        endDate: '',
      },
      index: 0,
      row: {
        uid: '',
        startDate: '',
        endDate: '',
      },
    }
  },
  created() {
    ;(this.loading = true),
      getAuthorization()
        .then((res) => {
          for (let index in res.data.data) {
            this.CodeData.push(res.data.data[index])
          }
          this.loading = false
        })
        .catch(() => {
          this.$message.error('网络错误')
          this.loading = false
        })
  },
  methods: {
    handleEdit(index) {
      this.dialogVisible = true
      this.index = index
      this.row = Object.create(this.CodeData[index])
    },
    update() {
      this.dialogVisible = false
      this.CodeData[this.index] = this.row
      console.log(this.row)
      this.row.uid = this.row.uid
      this.row.startDate = moment(this.row.startDate).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      this.row.endDate = moment(this.row.endDate).format('YYYY-MM-DD HH:mm:ss')
      updateAuthorization(this.row).then((res) => {
        this.$message.success(res.data.msg)
      })
    },
    handleDelete(index) {
      this.$confirm('此操作将永久删除该授权码, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delAuthorization(this.CodeData[index].uid).then((res) => {
            this.$message.success(res.data.msg)
          })
          this.CodeData.splice(index, 1)
        })
        .catch(() => {
          this.$message.info('取消删除')
        })
    },
    addCode() {
      this.addForm.startDate = moment(this.addForm.startDate).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      this.addForm.endDate = moment(this.addForm.endDate).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      addAuthorization(this.addForm).then((res) => {
        this.$message.success(res.data.msg)
        this.addForm.uid = res.data.data
        let data = this.addForm
        this.CodeData.push({
          startDate: data.startDate,
          endDate: data.endDate,
          uid: data.uid,
        })
      })
      this.dialogVisible2 = false
    },
  },
}
</script>

<style scoped>
.main {
  height: 100%;
  background-color: #fff;
}
</style>
