import request from '../utils/request.js'

export const author_employee = (data) => {
  return request({
    method: 'post',
    url: '/author_employee',
    data,
  })
}
