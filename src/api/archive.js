import request from '../utils/request.js'

export const add_archive = (data) => {
  return request({
    method: 'post',
    url: '/add_archive',
    data,
  })
}

export const get_archive = () => {
  return request({
    method: 'get',
    url: 'get_archive',
  })
}

export const get_company_archive = () => {
  return request({
    method: 'get',
    url: 'get_company_archive',
  })
}
