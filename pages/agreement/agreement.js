// pages/agreement/agreement.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 处理返回按钮点击事件
   */
  handleBack: function() {
    // 使用switchTab切换到"我的"页面
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  }
}) 