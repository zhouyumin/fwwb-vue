<template>
  <div class="container full-screen flex">
    <el-card class="card" shadow="hover">
      <div class="head primary text-center">
        <h2>{{ identity == 'Company' ? '企业' : '个人' }}认证</h2>
      </div>
      <el-form
        :model="employee"
        ref="employee"
        :rules="employee_rule"
        style="margin-top: 20px"
        v-show="identity == 'Employee'"
      >
        <el-form-item prop="name">
          <el-input v-model="employee.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-select
            v-model="employee.sex"
            placeholder="请选择性别"
            style="width: 100%"
          >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="idNumber">
          <el-input
            v-model="employee.idNumber"
            placeholder="身份证号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="employee.tel" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="education">
          <el-input
            v-model="employee.education"
            placeholder="教育背景"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="company"
        ref="company"
        style="margin-top: 20px"
        v-show="identity == 'Company'"
        :rules="company_rule"
      >
        <el-form-item prop="name">
          <el-input v-model="company.name" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input v-model="company.tel" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input v-model="company.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item prop="business_number">
          <el-input
            v-model="company.business_number"
            placeholder="工商号"
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        :loading="registerLoading"
        @click="onSubmit"
        style="width: 100%"
        >提交</el-button
      >
    </el-card>
  </div>
</template>

<script>
import { author_employee } from '/src/api/employee.js'
import { author_company } from '/src/api/company.js'
export default {
  name: '',
  components: {},
  data() {
    return {
      identity: this.$route.params.identity,
      employee: {
        name: '',
        sex: '',
        idNumber: '',
        tel: '',
        education: '',
      },
      company: {
        name: '',
        tel: '',
        address: '',
        business_number: '',
      },
      employee_rule: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        idNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
        ],
        tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        education: [{ required: true, message: '请输入学历', trigger: 'blur' }],
      },
      company_rule: {
        name: [{ required: true, message: '请输入企业名称', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        business_number: [
          { required: true, message: '请输入工商号', trigger: 'blur' },
        ],
      },
      registerLoading: false,
    }
  },
  methods: {
    onSubmit() {
      if (this.identity == 'Company') {
        this.$refs.company.validate((valid) => {
          if (valid) {
            this.submit(this.company, this.identity)
          }
        })
      } else if (this.identity == 'Employee') {
        this.$refs.employee.validate((valid) => {
          if (valid) {
            this.submit(this.employee, this.identity)
          }
        })
      }
    },
    submit(data, identity) {
      let authorization
      if (identity == 'Employee') {
        authorization = author_employee
      } else if (identity == 'Company') {
        authorization = author_company
      }
      this.registerLoading = true
      authorization(data).then((res) => {
        this.registerLoading = false
        this.$message.success(res.data.msg)
        this.$router.replace({
          name: 'home',
        })
      })
    },
  },
}
</script>

<style scoped>
.container {
  background: url(/img/bg.jpg);
  background-size: cover;
  flex-direction: column;
  align-items: center;
}
.head {
  letter-spacing: 4px;
}
.card {
  width: 450px;
  margin: auto;
}
</style>
