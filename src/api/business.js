import request from './request'

export function fetchList(query) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: query
  })
}

export function findDetail(query) {
  return request({
    url: '/goods/detail',
    method: 'get',
    params: query
  })
}

export function fetchCategoryList(query) {
  return request({
    url: '/goods/category',
    method: 'get',
    params: query
  })
}
