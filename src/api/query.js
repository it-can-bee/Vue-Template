import request from '@/utils/back_end_request'

export function fetchTransactions(params) {
  return request({
    url: '/get_transactions',
    method: 'get',
    params
  })
}
