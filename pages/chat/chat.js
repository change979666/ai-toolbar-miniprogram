Page({
  data: {
    inputValue: '',
    messages: []
  },

  /**
   * 输入框内容变化事件
   * @param {Object} e 事件对象
   */
  onInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 发送消息
   */
  sendMessage: function() {
    const message = this.data.inputValue.trim()
    if (!message) return

    // 添加用户消息
    const messages = this.data.messages
    messages.push({
      type: 'user',
      content: message
    })
    this.setData({
      messages,
      inputValue: ''
    })

    // TODO: 调用AI接口获取回复
    setTimeout(() => {
      messages.push({
        type: 'ai',
        content: '这是AI的回复消息'
      })
      this.setData({ messages })
    }, 1000)
  },

  /**
   * 返回工具首页
   */
  handleBack() {
    wx.navigateBack({
      delta: 1,
      fail: (err) => {
        console.error('返回失败', err)
        wx.showToast({
          title: '返回失败',
          icon: 'none'
        })
      }
    })
  }
}) 