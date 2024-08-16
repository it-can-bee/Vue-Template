import request from '@/utils/back_end_request'

export function getERC20TransferAccount(params) {
  return request({
    url: '/GetHeuristicRulesⅢ_ERC20TransferLink',
    method: 'get',
    params
  })
}
