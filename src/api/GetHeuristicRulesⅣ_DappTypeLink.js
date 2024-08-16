import request from '@/utils/back_end_request'

export function getAccountDappList(params) {
  return request({
    url: '/dapp_search',
    method: 'get',
    params
  })
}
