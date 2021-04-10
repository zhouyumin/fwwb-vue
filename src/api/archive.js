import request from '../utils/request.js'
import * as qs from "qs";
import da from "element-plus/packages/locale/lang/da";

/***
 * 添加档案
 * @param data
 * @returns {AxiosPromise}
 */
export const add_archive = (data) => {
  return request({
    method: 'post',
    url: '/add_archive',
    data: data,
  })
}

export const get_archive = () => {
  return request({
    method: 'get',
    url: 'get_archive',
  })
}

/***
 * 获取公司全部档案
 * @param data
 * @returns {AxiosPromise}
 */
export const get_company_archive = (data) => {
  return request({
    method: 'get',
    url: '/get_company_archive',
    data: qs.stringify(data)
  })
}

/***
 *调取档案
 * @param data 授权码
 * @returns { }
 */
export const fetch_archive = (data) => {
  return request({
    method: 'get',
    url: '/fetch_archive',
    params : data
  })
}

/***
 * 更新档案
 * @param data
 * @returns {AxiosPromise}
 */
export const update_archive = (data) => {
  return request({
    method: 'post',
    url: '/update_archive',
    data : data
  })
}
