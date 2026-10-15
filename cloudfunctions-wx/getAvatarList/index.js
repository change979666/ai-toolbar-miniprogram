// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化云开发环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 使用当前云环境
})

// 预设头像列表
const AVATAR_LIST = [
  '/static/avatars/avatar1.svg',
  '/static/avatars/avatar2.svg',
  '/static/avatars/avatar3.svg',
  '/static/avatars/avatar4.svg',
  '/static/avatars/avatar5.svg',
  '/static/avatars/avatar6.svg'
]

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return {
      code: 0,
      message: '获取成功',
      data: AVATAR_LIST
    }
  } catch (error) {
    console.error('获取头像列表失败:', error)
    return {
      code: -1,
      message: '获取失败: ' + error.message,
      error
    }
  }
}