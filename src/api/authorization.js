import request from '/src/utils/request.js'

export const addAuthorization = (data) => {
  return request({
    url: '/add_authorization',
    method: 'post',
    data,
  })
}

export const getAuthorization = () => {
  return request({
    url: '/get_authorization',
    method: 'get',
  })
}

export const updateAuthorization = (data) => {
  return request({
    url: '/update_authorization',
    method: 'post',
    data,
  })
}

export const delAuthorization = (data) => {
  return request({
    url: '/del_authorization',
    method: 'delete',
    params: {
      uid: data,
    },
  })
}
