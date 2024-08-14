import { request } from "@/common/request.js";

/**
 * 获取品牌故事列表
 * @param {number} page //页码（从1开始）
 * @param {number} type //博客类型 1:品牌故事 2：推荐商品
 * @returns 
{
  "data": {
    "currentPage": 0, //当前页码
    "list": [
      {
        "createDate": "2019-08-24T14:15:22Z",
        "headImg": "string",
        "informationId": 0,
        "title": "string"
      }
    ],
    "size": 0, //当前页条数
    "totalSize": 0 //总条数
  },
  "msg": "string",
  "status": 0
}

 */
export function getBlogList(page, blogType=1) {
  return request({
    url: "/api/index/getInformationList",
    data: {
      informationType: blogType,
      page,
    },
  });
}


/**
* 获取博客详情
* @param {number} blogId //详情id
* @returns 

{
  "data": {
    "content": "string",
    "createDate": "2019-08-24T14:15:22Z",
    "dataStatus": 0,
    "headImg": "string",
    "informationId": 0,
    "informationStatus": 0,
    "informationType": 0,
    "title": "string",
    "updateDate": "2019-08-24T14:15:22Z",
    "videoUrl": "string"
  },
  "msg": "string",
  "status": 0
}
*/
export function getBlogDetail(blogId) {
  return request({
    url: "/api/index/getInformation",
    data: {
      informationId: blogId,
    },
  });
}

