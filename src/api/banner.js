import request from './request'

export function fetchBanner(query) {
  return request({
    url: '/banner/list',
    method: 'get',
    params: query
  })
}

