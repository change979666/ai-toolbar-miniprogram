// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tools: [
      {
        id: 'chat',
        name: 'AI对话',
        desc: '智能对话，解答你的问题',
        icon: '💬',
        path: '/pages/chat/chat'
      },
      {
        id: 'image',
        name: '图片生成',
        desc: 'AI绘画，创造你的艺术',
        icon: '🎨',
        path: '/pages/image/image'
      },
      {
        id: 'copy',
        name: '文案创作',
        desc: '智能文案，激发创意',
        icon: '✍️',
        path: '/pages/copy/copy'
      },
      {
        id: 'idea',
        name: '创意激发',
        desc: '灵感激发，创意无限',
        icon: '💡',
        path: '/pages/idea/idea'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('工具页面加载完成')
  },

  /**
   * 跳转到AI对话页面
   */
  navigateToChat() {
    wx.navigateTo({
      url: '/pages/chat/chat',
      fail: (err) => {
        console.error('跳转失败', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 跳转到图片生成页面
   */
  navigateToImage() {
    wx.navigateTo({
      url: '/pages/image/image',
      fail: (err) => {
        console.error('跳转失败', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 跳转到文案创作页面
   */
  navigateToCopy() {
    wx.navigateTo({
      url: '/pages/copy/copy',
      fail: (err) => {
        console.error('跳转失败', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 跳转到创意激发页面
   */
  navigateToIdea() {
    wx.navigateTo({
      url: '/pages/idea/idea',
      fail: (err) => {
        console.error('跳转失败', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }
})
