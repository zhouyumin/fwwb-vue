import request from '../utils/request.js'
import qs from 'qs'

//登入
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/login',
    data: qs.stringify(data),
  })
}

//注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/register',
    data: qs.stringify(data),
  })
}

//注册
export const logout = (data) => {
  return request({
    method: 'POST',
    url: '/logout',
  })
}
// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/userInfo',
  })
}
