import request from './request'

export function init() {
  return request({
    url: '/contactUs',
    method: 'get'
  })
}
export function contact(data) {
  return request({
    url: '/contact',
    method: 'post',
    data
  })
}

