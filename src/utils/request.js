import axios from 'axios'
import router from '/src/router/index.js'
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: '/api',
})

//请求拦截器
request.interceptors.request.use(
  //所有请求经过这里
  (config) => {
    const authorization = window.localStorage.getItem('authorization')
    //如果有登录用户则统一设置token
    if (authorization) {
      config.headers.Authorization = authorization
    } else {
      router.push('/login')
    }
    return config
  },
  (error) => {
    //请求失败经过这里
    return Promise.reject(error)
  }
)

// 返回拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data
    // 当结果的code是否为200的情况
    if (res.code == '0') {
      return response
    } else {
      // 弹窗异常信息
      ElMessage({
        message: response.data.msg,
        type: 'error',
        duration: 2 * 1000,
      })
      // 直接拒绝往下面返回结果信息
      return Promise.reject(response.data)
    }
  },
  (error) => {
    console.log('err' + error) // for debug
    if (error.response.data) {
      error.message = error.response.data.msg
    }
    // 根据请求状态觉得是否登录或者提示其他
    if (error.response.status === 401) {
      window.localStorage.removeItem('authorization')
      router.push({
        path: '/login',
      })
      error.message = '请重新登录'
    }
    if (error.response.status === 403) {
      error.message = '权限不足，无法访问'
    }
    if (error.response.status === 400) {
      error.message = '请求错误'
    }
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 3 * 1000,
    })
    return Promise.reject(error)
  }
)

export default request
