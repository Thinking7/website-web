import request from './request'

export function fetchList(query) {
  return request({
    url: '/news/list',
    method: 'get',
    params: query
  })
}

export function findDetail(query) {
  return request({
    url: '/news/detail',
    method: 'get',
    params: query
  })
}

export function fetchGroupList(query) {
  return request({
    url: '/news/group',
    method: 'get',
    params: query
  })
}
