import request from '@/utils/request'

/*
登录日志相关的API请求函数
*/
const api_name = '/admin/system/sysOperLog'

export default {

  /*
  获取日志列表
  */
  getLogList(page,limit) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },

  /*
 获取日志详情
  */
  findSysLoginLogById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: "get"
    })
  }

}