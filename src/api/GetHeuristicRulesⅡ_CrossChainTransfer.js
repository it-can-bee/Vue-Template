import request from '@/utils/back_end_request'

export function getCrossChainTransferAccount(params) {
  return request({
    url: '/GetHeuristicRulesⅡ_CrossChainTransfer',
    method: 'get',
    params
  })
}
