import request from './request'

export function fetchList(query) {
  return request({
    url: '/nav/list',
    method: 'get',
    params: query
  })
}

