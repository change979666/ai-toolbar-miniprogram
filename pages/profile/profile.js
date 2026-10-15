/**
 * 个人中心页面逻辑
 * 处理用户信息展示和设置项操作
 */

const defaultAvatarUrl = '/images/morentouxiang.jpg'

Page({
  /**
   * 页面的初始数据
   * @property {Object} userInfo - 用户信息对象
   * @property {Object} settings - 设置项状态对象
   */
  data: {
    // 用户信息
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickname: '游客',
      description: '欢迎使用AI灵感工具栏',
      phoneNumber: '',
      region: ''
    },
    // 设置项状态
    settings: {
      phone: '',
      wechat: '',
      darkMode: false,
      notification: true
    },
    avatarUrl: defaultAvatarUrl,
    nickName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取用户信息和设置项状态
   */
  onLoad: function(options) {
    console.log('页面加载完成')
    // 检查基础库版本
    const version = wx.getSystemInfoSync().SDKVersion
    console.log('当前基础库版本:', version)
    if (this.compareVersion(version, '2.21.2') < 0) {
      wx.showToast({
        title: '请升级微信版本',
        icon: 'none'
      })
    }
    // 获取本地存储的用户信息
    const userInfo = wx.getStorageSync('userInfo') || this.data.userInfo;
    this.setData({ userInfo });
  },

  /**
   * 比较版本号
   * @param {String} v1 - 版本号1
   * @param {String} v2 - 版本号2
   * @return {Number} 比较结果
   */
  compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)
    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])
      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  },

  /**
   * 处理头像选择
   * @param {Object} e - 事件对象
   */
  onChooseAvatar(e) {
    console.log('选择头像事件触发', e)
    if (!e.detail) {
      console.error('获取头像失败：事件对象中没有detail')
      wx.showToast({
        title: '获取头像失败',
        icon: 'none'
      })
      return
    }
    
    const { avatarUrl } = e.detail 
    if (avatarUrl) {
      this.setData({
        avatarUrl,
        'userInfo.avatarUrl': avatarUrl
      })
      console.log('头像更新成功', avatarUrl)
      wx.showToast({
        title: '头像更新成功',
        icon: 'success'
      })
    } else {
      console.error('获取头像失败：avatarUrl为空')
      wx.showToast({
        title: '获取头像失败',
        icon: 'none'
      })
    }
  },

  /**
   * 处理昵称输入
   * @param {Object} e - 事件对象
   */
  onInputNickname(e) {
    console.log('昵称输入事件触发', e)
    const nickName = e.detail.value
    if (nickName) {
      this.setData({
        nickName,
        'userInfo.nickname': nickName
      })
      console.log('昵称更新成功', nickName)
    }
  },

  /**
   * 获取手机号
   * @param {Object} e - 事件对象
   */
  getPhoneNumber(e) {
    console.log('获取手机号事件触发', e)
    
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      console.log('获取手机号成功', e.detail)
      
      // 这里需要将 code 发送到后端，后端调用微信接口获取手机号
      // 示例代码：
      wx.request({
        url: '你的后端接口地址',
        method: 'POST',
        data: {
          code: e.detail.code
        },
        success: (res) => {
          if (res.data.success) {
            // 更新手机号显示
            this.setData({
              'userInfo.phoneNumber': res.data.phoneNumber || '已绑定'
            })
            // 保存到本地存储
            wx.setStorageSync('userInfo', this.data.userInfo)
            
            wx.showToast({
              title: '手机号绑定成功',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: res.data.message || '绑定失败',
              icon: 'none'
            })
          }
        },
        fail: (err) => {
          console.error('请求失败', err)
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'none'
          })
        }
      })
    } else {
      console.error('获取手机号失败', e.detail)
      // 处理各种错误情况
      if (e.detail.errno === 1400001) {
        wx.showToast({
          title: '该功能使用次数已达上限',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '获取手机号失败',
          icon: 'none'
        })
      }
    }
  },

  /**
   * 更新用户信息到本地存储
   * @param {Object} info - 要更新的信息
   */
  updateUserInfo(info) {
    const userInfo = { ...this.data.userInfo, ...info };
    wx.setStorageSync('userInfo', userInfo);
  },

  /**
   * 开关切换事件处理函数
   * @param {Object} e - 事件对象
   */
  onSwitchChange: function(e) {
    const type = e.currentTarget.dataset.type;
    const value = e.detail.value;
    console.log(`${type} switched to ${value}`);
    // TODO: 处理开关状态变化
  },

  /**
   * 设置项点击事件处理函数
   * @param {Object} e - 事件对象
   */
  onSettingTap: function(e) {
    const type = e.currentTarget.dataset.type;
    // TODO: 处理设置项点击
    console.log(`${type} clicked`);
  },

  /**
   * 退出登录处理函数
   * 显示确认对话框并处理退出操作
   */
  onLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          // TODO: 执行退出操作
        }
      }
    });
  },

  /**
   * 选择地区
   */
  chooseLocation() {
    // 先检查用户是否授权了位置信息
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          // 如果未授权，先获取授权
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              // 授权成功后调用选择位置
              this.startChooseLocation();
            },
            fail: () => {
              wx.showModal({
                title: '提示',
                content: '需要您授权位置信息以获取天气信息，是否去设置？',
                success: (res) => {
                  if (res.confirm) {
                    wx.openSetting();
                  }
                }
              });
            }
          });
        } else {
          // 已经授权，直接调用选择位置
          this.startChooseLocation();
        }
      }
    });
  },

  /**
   * 开始选择位置
   */
  startChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        const region = res.address + res.name;
        this.setData({
          'userInfo.region': region
        });
        
        // 保存位置信息到本地存储
        const locationInfo = {
          latitude: res.latitude,
          longitude: res.longitude,
          address: region,
          name: res.name,
          updateTime: new Date().getTime()
        };
        
        wx.setStorageSync('location', locationInfo);
        this.updateUserInfo({ region });

        wx.showToast({
          title: '位置已更新',
          icon: 'success'
        });
      },
      fail: (err) => {
        console.error('选择位置失败：', err);
        wx.showToast({
          title: '选择位置失败',
          icon: 'error'
        });
      }
    });
  },

  /**
   * 处理关于我们点击事件
   */
  handleAboutTap() {
    console.log('点击关于我们')
    wx.navigateTo({
      url: '/pages/about/about',
      success: () => {
        console.log('跳转到关于我们页面成功')
      },
      fail: (err) => {
        console.error('跳转到关于我们页面失败', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 处理关于我们2点击事件
   */
  handleAboutTap2() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  /**
   * 处理联系客服
   */
  onContactService() {
    const serviceWechat = 'disturd0me' // 客服微信号
    wx.setClipboardData({
      data: serviceWechat,
      success: () => {
        wx.showToast({
          title: '已复制客服微信，请自行搜索添加',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (err) => {
        console.error('复制失败', err)
        wx.showToast({
          title: '复制失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 处理用户协议
   */
  onUserAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/agreement'
    })
  }
}) 