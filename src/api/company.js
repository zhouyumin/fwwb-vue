import request from '../utils/request.js'

export const author_company = (data) => {
  return request({
    method: 'post',
    url: '/author_company',
    data,
  })
}
