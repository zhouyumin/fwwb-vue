<template>
  <div class="login-container full-screen flex">
    <el-card class="login-card" shadow="hover">
      <div class="login-head primary text-center">
        <h2>小微企业跨组织人才管理系统</h2>
      </div>
      <el-form ref="loginForm" :model="user" :rules="rules" @submit.prevent>
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
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <div class="flex space-between">
            <div>
              <el-checkbox v-model="user.agree"></el-checkbox>
              <a href="#" class="primary" style="margin-left: 8px"
                >我已阅读并同意用户协议和隐私条款
              </a>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="loginLoading"
            @click="onSubmit"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-register text-center">
        <router-link to="/register" class="primary"
          >没有账号？立即注册<i class="el-icon-right"></i
        ></router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { login } from '/src/api/user.js'
export default {
  name: 'login',
  data() {
    const agreeValid = (rule, value, callback) => {
      if (value === false) {
        callback(new Error('请认真阅读同意用户协议和隐私条款'))
      } else {
        callback()
      }
    }
    return {
      user: {
        username: '10086',
        password: '10086',
        agree: false,
      },
      loginLoading: false,
      rules: {
        username: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        agree: [{ validator: agreeValid }],
      },
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    login() {
      const user = this.user
      this.loginLoading = true
      login(user)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '登录成功',
          })
          window.localStorage.setItem(
            'authorization',
            res.headers.authorization
          )
          this.$router.push({
            name: 'home',
          })
          this.loginLoading = false
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: '用户名或密码错误',
          })
          this.loginLoading = false
        })
    },
  },
}
</script>

<style scoped>
.login-container {
  background: url('/img/bg.jpg');
  background-size: cover;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
}

.login-card {
  opacity: 0.9;
  width: 450px;
}

.login-head {
  height: 57px;
  margin: 20px auto;
  letter-spacing: 4px;
}

button {
  width: 100%;
  height: 40px;
  font-size: 18px;
  letter-spacing: 5px;
}

.login-register a {
  text-decoration: none;
}
</style>
