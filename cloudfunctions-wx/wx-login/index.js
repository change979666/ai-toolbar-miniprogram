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
  
  try {
    // 查询用户是否已存在
    const userCollection = db.collection('users')
    const user = await userCollection.where({
      openid: wxContext.OPENID
    }).get()
    
    if (user.data.length === 0) {
      // 用户不存在，创建新用户
      const result = await userCollection.add({
        data: {
          openid: wxContext.OPENID,
          unionid: wxContext.UNIONID || '',
          appid: wxContext.APPID,
          nickName: event.nickName || '',
          avatarUrl: event.avatarUrl || '',
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })
      
      return {
        code: 0,
        message: '用户创建成功',
        data: {
          openid: wxContext.OPENID,
          isNew: true
        }
      }
    } else {
      // 用户已存在，更新用户信息
      if (event.nickName || event.avatarUrl) {
        await userCollection.where({
          openid: wxContext.OPENID
        }).update({
          data: {
            nickName: event.nickName || user.data[0].nickName,
            avatarUrl: event.avatarUrl || user.data[0].avatarUrl,
            updateTime: db.serverDate()
          }
        })
      }
      
      return {
        code: 0,
        message: '登录成功',
        data: {
          openid: wxContext.OPENID,
          isNew: false,
          userInfo: user.data[0]
        }
      }
    }
  } catch (error) {
    console.error('登录失败:', error)
    return {
      code: -1,
      message: '登录失败: ' + error.message,
      error
    }
  }
}