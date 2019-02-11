import request from './request'

export function initList(query) {
  return request({
    url: '/companyProfile',
    method: 'get',
    params: query
  })
}
