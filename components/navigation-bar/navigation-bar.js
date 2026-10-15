Component({
  properties: {
    title: {
      type: String,
      value: 'AI灵感工具栏'
    },
    showBack: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    // 返回上一页
    goBack() {
      if (this.properties.showBack) {
        wx.navigateBack({
          delta: 1
        });
      }
    }
  }
}) 