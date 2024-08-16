import request from '@/utils/back_end_request'

export function GetTransCompute(params) {
  return request({
    url: '/data_compute',
    method: 'get',
    params
  })
}
