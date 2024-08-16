import request from '@/utils/back_end_request'

export function getIndirectTransferAccount(params) {
  return request({
    url: '/GetHeuristicRulesⅠ_IndirectTransfer',
    method: 'get',
    params
  })
}
