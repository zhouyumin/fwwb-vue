<template>
  <div class="register-container full-screen flex">
    <el-card class="card" shadow="hover">
      <div class="register-head primary text-center">
        <h2>小微企业跨组织人才管理系统</h2>
      </div>
      <el-form ref="registerForm" :model="user" :rules="rules" @submit.prevent>
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            placeholder="请输入邮箱"
            prefix-icon="iconfont iconemail"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont iconpassword"
            v-model="user.password"
            type="password"
            placeholder="请输入密码，必须包含大小写字母，长度为6-18"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirm">
          <el-input
            prefix-icon="iconfont iconpassword"
            v-model="user.confirm"
            placeholder="请确认密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="identity" style="margin-bottom: 0px">
          <el-select
            v-model="user.identity"
            placeholder="请选择身份"
            style="width: 100%"
          >
            <template #prefix>
              <i class="iconfont iconuser"></i>
            </template>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="registerLoading"
            @click="onSubmit"
            style="width: 100%; margin-top: 30px"
            >注册</el-button
          >
        </el-form-item>
        <div class="text-center">
          <router-link to="/login" class="primary to_login"
            >已有账号，去登录<i class="el-icon-right"></i
          ></router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { register } from '/src/api/user.js'
export default {
  name: 'register',
  components: {},
  data() {
    const checkConfirm = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      const patten = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/
      if (!patten.test(value)) {
        callback(new Error('密码不符合要求'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '',
        password: '',
        identity: '',
        confirm: '',
      },
      registerLoading: false,
      options: [
        {
          label: '企业注册',
          value: 'Company',
        },
        {
          label: '员工注册',
          value: 'Employee',
        },
      ],
      rules: {
        username: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: 'change' },
        ],
        confirm: [{ validator: checkConfirm, trigger: 'blur' }],
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs.registerForm.validate((valid) => {
        console.log('hover')
        if (valid) {
          this.register()
        }
      })
    },
    register() {
      const user = this.user
      this.registerLoading = true
      register(user)
        .then((res) => {
          if (res.data.code === '-1') {
            this.$message({
              type: 'error',
              message: '此账号已存在',
            })
          } else {
            this.$message({
              type: 'success',
              message: '注册成功',
            })
            this.$router.push({
              name: 'login',
            })
          }
          this.registerLoading = false
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '注册失败',
          })
          this.registerLoading = false
        })
    },
  },
}
</script>

<style scoped>
.register-container {
  background: url(/img/bg.jpg);
  background-size: cover;
  flex-direction: column;
  align-items: center;
}
.register-head {
  height: 57px;
  margin: 20px auto;
  letter-spacing: 4px;
}
.card {
  opacity: 0.9;
  margin: auto;
  width: 500px;
}
.to_login {
  text-decoration: none;
}
</style>
