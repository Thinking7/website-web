import request from './request'

export function getData(query) {
  return request({
    url: '/index',
    method: 'get',
    params: query
  })
}

export function getSEO() {
  return request({
    url: '/seo',
    method: 'get'
  })
}

