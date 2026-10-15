// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化云开发环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 使用当前云环境
})

// 获取数据库引用
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { action, data } = event
  
  // 检查用户是否存在
  const checkUser = async () => {
    const user = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()
    
    if (user.data.length === 0) {
      return null
    }
    
    return user.data[0]
  }
  
  try {
    // 根据不同的action执行不同的操作
    switch (action) {
      case 'getInfo': {
        // 获取用户信息
        const user = await checkUser()
        if (!user) {
          return {
            code: -1,
            message: '用户不存在'
          }
        }
        
        return {
          code: 0,
          message: '获取成功',
          data: user
        }
      }
      
      case 'updateInfo': {
        // 更新用户信息
        const user = await checkUser()
        if (!user) {
          return {
            code: -1,
            message: '用户不存在'
          }
        }
        
        // 更新用户信息
        await db.collection('users').where({
          openid: wxContext.OPENID
        }).update({
          data: {
            ...data,
            updateTime: db.serverDate()
          }
        })
        
        return {
          code: 0,
          message: '更新成功'
        }
      }
      
      case 'updateAvatar': {
        // 更新用户头像
        const user = await checkUser()
        if (!user) {
          return {
            code: -1,
            message: '用户不存在'
          }
        }
        
        // 更新用户头像
        await db.collection('users').where({
          openid: wxContext.OPENID
        }).update({
          data: {
            avatarUrl: data.avatarUrl,
            updateTime: db.serverDate()
          }
        })
        
        return {
          code: 0,
          message: '头像更新成功'
        }
      }
      
      default:
        return {
          code: -1,
          message: '未知操作'
        }
    }
  } catch (error) {
    console.error('用户操作失败:', error)
    return {
      code: -1,
      message: '操作失败: ' + error.message,
      error
    }
  }
}