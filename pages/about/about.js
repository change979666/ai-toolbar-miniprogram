Page({
  data: {},
  onLoad: function(options) {
    // 页面加载时执行
  },
  /**
   * @description 处理返回按钮点击事件
   */
  handleBack: function() {
    wx.navigateBack({
      delta: 1,
      fail: function() {
        // 如果返回失败，则跳转到个人中心页面
        wx.switchTab({
          url: '/pages/profile/profile'
        });
      }
    });
  }
}) 