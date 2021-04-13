<template>
  <div class="region" v-loading="loading">
    <el-card shadow="hover" class="card">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            placeholder="姓名"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="idNumber">
          <el-input
            v-model="form.idNumber"
            placeholder="身份证号"
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input
            v-model="form.tel"
            placeholder="手机号码"
            prefix-icon="el-icon-phone"
          ></el-input>
        </el-form-item>
        <el-form-item required>
          <el-col :span="11">
            <el-form-item prop="hireDate" style="width: 221.4px">
              <el-date-picker
                type="date"
                placeholder="选择聘用时间"
                v-model="form.hireDate"
                style="width: 100%"
                @change="setDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="title">
          <el-input
            v-model="form.title"
            placeholder="所任职位"
            prefix-icon="el-icon-collection-tag"
          ></el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input
            v-model="form.department"
            placeholder="所在部门"
            prefix-icon="el-icon-folder-opened"
          ></el-input>
        </el-form-item>
        <el-form-item class="text-center">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { add_archive } from '/src/api/archive.js'
import { checkIdNumber, checkTel } from '/src/utils/validator.js'
import moment from 'moment'
export default {
  data() {
    return {
      form: {
        name: '',
        idNumber: '',
        tel: '',
        hireDate: '',
        department: '',
        title: '',
      },
      loading: false,
      rules: {
        title: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        department: [
          { required: true, message: '请输入所在部门', trigger: 'blur' },
        ],
        name: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        idNumber: [
          { required: true, validator: checkIdNumber, trigger: 'blur' },
        ],
        tel: [{ required: true, validator: checkTel, trigger: 'blur' }],
        hireDate: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.form)
          add_archive(this.form)
            .then((res) => {
              this.loading = false
              this.$message.success(res.data.msg)
              this.$refs[formName].resetFields()
            })
            .catch((err) => {
              this.loading = false
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    setDate(val) {
      console.log(val)
      val = moment(val).format('YYYY-MM-DD HH:mm:ss')
      this.form.hireDate = val
    },
  },
  mounted() {},
}
</script>
<style scoped>
.region {
  width: 100%;
  height: 100%;
  display: flex;
}
.card {
  width: 500px;
  margin: auto;
}
.text-center button {
  margin: auto 30px;
}
</style>
