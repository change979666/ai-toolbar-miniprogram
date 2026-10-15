Page({
  data: {
    prompt: '',
    imageUrl: ''
  },

  /**
   * 输入框内容变化事件
   * @param {Object} e 事件对象
   */
  onInput: function(e) {
    this.setData({
      prompt: e.detail.value
    })
  },

  /**
   * 生成图片
   */
  generateImage: function() {
    const prompt = this.data.prompt.trim()
    if (!prompt) {
      wx.showToast({
        title: '请输入图片描述',
        icon: 'none'
      })
      return
    }

    // 显示加载中
    wx.showLoading({
      title: '生成中...'
    })

    // TODO: 调用AI接口生成图片
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        imageUrl: 'https://example.com/generated-image.jpg' // 替换为实际生成的图片URL
      })
    }, 2000)
  },

  /**
   * 返回工具首页
   */
  handleBack() {
    // 尝试返回上一页
    wx.navigateBack({
      delta: 1,
      fail: (err) => {
        console.log('返回失败，尝试跳转到首页', err)
        // 如果返回失败，直接跳转到首页
        wx.switchTab({
          url: '/pages/index/index',
          fail: (err) => {
            console.error('跳转失败', err)
            wx.showToast({
              title: '跳转失败',
              icon: 'none'
            })
          }
        })
      }
    })
  }
}) 