import { request } from '@/common/request.js'

//获取cos上传凭证(需要认证token)
export function getCosAuthorKey() {
  return request({
    url: '/api/cos/getCosInfo',
    method: 'POST',
    data: {}
  })
}