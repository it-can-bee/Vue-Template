import request from '@/utils/back_end_request'

export function getAccountList(params) {
  return request({
    url: '/token_search',
    method: 'get',
    params
  })
}
