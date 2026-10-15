<template>
	<view class="container">
		<view class="header-bg"></view>
		<view class="user-card">
			<view class="avatar-wrapper" @click="showAvatarSelector">
				<image class="avatar" :src="userInfo.avatarUrl || defaultAvatar"></image>
			</view>
			<form @submit="onSubmit">
				<input 
					type="nickname" 
					class="nickname-input" 
					placeholder="请输入昵称"
					:value="userInfo.nickName"
					@blur="onNicknameBlur"
					@input="onNicknameInput"
					@change="onNicknameBlur"
				/>
			</form>
			<view class="user-desc">
				<text v-if="!userInfo.nickName">请设置账号密码 后续会出APP 数据互通</text>
				<text v-else class="tip-text">请完善账户设置，绑定手机号</text>
			</view>
		</view>
		
		<view class="menu-list">
			<view class="menu-group">
				<view class="menu-item" @click="navigateTo('security')">
					<view class="menu-icon account"></view>
					<text class="menu-title">账号ID</text>
					<text class="menu-value" :style="{ marginTop: userInfo.nickName ? '50px' : '30px' }">{{ userInfo.userId }}</text>
				</view>
				<view class="menu-item" @click="showAccountSettings">
					<view class="menu-icon settings"></view>
					<text class="menu-title">账号设置</text>
					<text class="menu-arrow">></text>
				</view>
			</view>
			
			<view class="menu-group">
				<view class="menu-item" @click="navigateTo('about')">
					<view class="menu-icon about"></view>
					<text class="menu-title">关于我们</text>
					<text class="menu-arrow">></text>
				</view>
				<view class="menu-item" @click="navigateTo('agreement')">
					<view class="menu-icon agreement"></view>
					<text class="menu-title">用户协议</text>
					<text class="menu-arrow">></text>
				</view>
				<view class="menu-item" @click="copyWechat">
					<view class="menu-icon service"></view>
					<text class="menu-title">联系客服</text>
					<text class="menu-value">点击复制客服微信号</text>
				</view>
				<view class="menu-item" @click="showSwitchAccount">
					<view class="menu-icon switch"></view>
					<text class="menu-title">切换账号</text>
					<text class="menu-arrow">></text>
				</view>
			</view>
		</view>

		<!-- 账号设置弹窗 -->
		<view class="popup-mask" v-if="showPopup" @click="closeAccountSettings">
			<view class="popup-content" @click.stop>
				<view class="popup-title">完善信息 方便后续数据互通</view>
				<view class="popup-form">
					<view class="form-item">
						<text class="form-label">账号ID</text>
						<input 
							type="text" 
							:value="userInfo.userId" 
							class="form-input" 
							disabled
						/>
					</view>
					<view class="form-item">
						<text class="form-label">昵称</text>
						<input 
							type="text" 
							v-model="userInfo.nickName" 
							placeholder="请输入昵称" 
							class="form-input" 
						/>
					</view>
					<view class="form-item">
						<text class="form-label">设置密码</text>
						<input 
							type="password" 
							v-model="accountForm.password" 
							placeholder="请输入密码" 
							class="form-input" 
							@input="validatePassword"
						/>
					</view>
					<view class="form-item">
						<text class="form-label">确认密码</text>
						<input 
							type="password" 
							v-model="accountForm.confirmPassword" 
							placeholder="请再次输入密码" 
							class="form-input" 
							@input="validatePassword"
						/>
						<text class="error-tip" v-if="passwordError">{{ passwordError }}</text>
					</view>
					<view class="form-item">
						<text class="form-label">手机号码</text>
						<input 
							type="number" 
							v-model="accountForm.phone" 
							placeholder="请输入手机号" 
							class="form-input" 
							maxlength="11" 
							@input="validatePhone"
						/>
						<text class="error-tip" v-if="phoneError">{{ phoneError }}</text>
					</view>
				</view>
				<view class="popup-buttons">
					<button class="popup-btn cancel" @click="closeAccountSettings">取消</button>
					<button class="popup-btn confirm" @click="saveAccountSettings">保存</button>
				</view>
			</view>
		</view>

		<!-- 切换账号弹窗 -->
		<view class="popup-mask" v-if="showSwitchAccountPopup" @click="closeSwitchAccount">
			<view class="popup-content" @click.stop>
				<view class="popup-title">切换账号</view>
				<view class="popup-form">
					<view class="form-item">
						<text class="form-label">账号</text>
						<input type="text" v-model="switchAccountForm.account" placeholder="请输入手机号或用户ID" class="form-input" />
					</view>
					<view class="form-item">
						<text class="form-label">密码</text>
						<input type="password" v-model="switchAccountForm.password" placeholder="请输入密码" class="form-input" />
					</view>
				</view>
				<view class="popup-buttons">
					<button class="popup-btn cancel" @click="closeSwitchAccount">取消</button>
					<button class="popup-btn confirm" @click="switchAccount">确认</button>
				</view>
			</view>
		</view>

		<!-- 头像选择弹窗 -->
		<view class="popup-mask" v-if="showAvatarPopup" @click="closeAvatarSelector">
			<view class="popup-content avatar-selector" @click.stop>
				<view class="popup-title">选择头像</view>
				<view class="avatar-list">
					<view 
						class="avatar-item" 
						v-for="(avatar, index) in avatarList" 
						:key="index"
						@click="selectAvatar(avatar)"
					>
						<image class="avatar-preview" :src="avatar"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				avatarUrl: '',
				nickName: '',
				userId: this.generateUserId()
			},
			defaultAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
			avatarList: [],
			accountForm: {
				password: '',
				confirmPassword: '',
				phone: ''
			},
			switchAccountForm: {
				account: '',
				password: ''
			},
			showPopup: false,
			showSwitchAccountPopup: false,
			showAvatarPopup: false,
			passwordError: '',
			phoneError: ''
		}
	},
	async onLoad() {
		// 获取系统信息
		const systemInfo = wx.getAppBaseInfo()
		console.log('系统信息:', systemInfo)
		
		// 获取设备信息
		const deviceInfo = wx.getDeviceInfo()
		console.log('设备信息:', deviceInfo)
		
		// 获取窗口信息
		const windowInfo = wx.getWindowInfo()
		console.log('窗口信息:', windowInfo)
		
		// 检查是否支持头像昵称填写
		if (wx.canIUse('button.open-type.chooseAvatar')) {
			console.log('支持头像昵称填写')
		} else {
			console.log('不支持头像昵称填写')
		}
		
		// 检查用户信息授权状态
		this.checkAuthStatus()
		
		// 获取默认头像列表
		try {
			const result = await uniCloud.callFunction({
				name: 'user-profile',
				data: {
					action: 'getDefaultAvatars'
				}
			});
			
			if (result.result.code === 0) {
				this.avatarList = result.result.data;
				// 设置默认头像
				this.userInfo.avatarUrl = this.avatarList[0];
			}
		} catch (error) {
			console.error('获取头像列表失败:', error);
		}
	},
	methods: {
		generateUserId() {
			// 生成6位数字ID
			const random = Math.floor(Math.random() * 900000 + 100000)
			return random.toString()
		},
		checkAuthStatus() {
			wx.getSetting({
				success: (res) => {
					if (res.authSetting['scope.userInfo']) {
						console.log('已授权用户信息')
					} else {
						console.log('未授权用户信息')
						// 如果未授权，引导用户授权
						uni.showModal({
							title: '提示',
							content: '需要您授权才能使用头像功能',
							success: (res) => {
								if (res.confirm) {
									wx.openSetting({
										success: (res) => {
											console.log('打开设置页面成功', res)
										}
									})
								}
							}
						})
					}
				}
			})
		},
		showAvatarSelector() {
			this.showAvatarPopup = true;
		},
		closeAvatarSelector() {
			this.showAvatarPopup = false;
		},
		async selectAvatar(avatarUrl) {
			try {
				// 先更新本地显示
				this.userInfo.avatarUrl = avatarUrl;
				
				// 调用云函数更新头像
				const result = await uniCloud.callFunction({
					name: 'user-profile',
					data: {
						action: 'updateProfile',
						userId: this.userInfo.userId,
						avatarUrl: avatarUrl
					}
				});
				
				if (result.result.code === 0) {
					this.closeAvatarSelector();
					uni.showToast({
						title: '头像更新成功',
						icon: 'success'
					});
				} else {
					// 如果更新失败，恢复原来的头像
					this.userInfo.avatarUrl = this.defaultAvatar;
					uni.showToast({
						title: result.result.message || '头像更新失败',
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('更新头像失败:', error);
				// 发生错误时恢复默认头像
				this.userInfo.avatarUrl = this.defaultAvatar;
				uni.showToast({
					title: '更新头像失败',
					icon: 'none'
				});
			}
		},
		async onNicknameInput(e) {
			console.log('昵称输入事件:', e)
			if (e.detail && e.detail.value) {
				this.userInfo.nickName = e.detail.value
				// 不立即保存到数据库，等待用户完成账号设置
			}
		},
		async onNicknameBlur(e) {
			console.log('昵称失焦事件:', e)
			if (e.detail && e.detail.value) {
				this.userInfo.nickName = e.detail.value
				// 昵称输入完成后，自动弹出账号设置弹窗
				this.showAccountSettings()
			}
		},
		showAccountSettings() {
			this.showPopup = true
		},
		closeAccountSettings() {
			this.showPopup = false
			// 取消时，清空昵称
			this.userInfo.nickName = ''
			// 重置表单
			this.accountForm = {
				password: '',
				confirmPassword: '',
				phone: ''
			}
			this.passwordError = ''
			this.phoneError = ''
		},
		validatePassword() {
			if (!this.accountForm.password) {
				this.passwordError = '请输入密码';
				return false;
			}
			
			if (this.accountForm.password.length < 6) {
				this.passwordError = '密码长度不能小于6位';
				return false;
			}
			
			if (this.accountForm.password !== this.accountForm.confirmPassword) {
				this.passwordError = '两次输入的密码不一致';
				return false;
			}
			
			this.passwordError = '';
			return true;
		},
		validatePhone() {
			if (!this.accountForm.phone) {
				this.phoneError = '请输入手机号';
				return false;
			}
			
			if (!/^1[3-9]\d{9}$/.test(this.accountForm.phone)) {
				this.phoneError = '请输入正确的手机号';
				return false;
			}
			
			this.phoneError = '';
			return true;
		},
		async saveAccountSettings() {
			// 验证密码
			if (!this.validatePassword()) {
				return;
			}
			
			// 验证手机号
			if (!this.validatePhone()) {
				return;
			}
			
			try {
				// 保存用户信息到数据库
				const result = await uniCloud.callFunction({
					name: 'user-profile',
					data: {
						action: 'updateProfile',
						userId: this.userInfo.userId,
						nickName: this.userInfo.nickName,
						password: this.accountForm.password,
						phone: this.accountForm.phone,
						avatarUrl: this.userInfo.avatarUrl
					}
				});
				
				if (result.result.code === 0) {
					// 保存到本地存储
					uni.setStorageSync('userInfo', this.userInfo);
					
					uni.showToast({
						title: '保存成功',
						icon: 'success'
					});
					this.closeAccountSettings();
				} else {
					uni.showToast({
						title: result.result.message,
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('保存用户信息失败:', error);
				uni.showToast({
					title: '保存失败',
					icon: 'none'
				});
			}
		},
		navigateTo(path) {
			uni.navigateTo({
				url: `/pages/${path}/${path}`
			})
		},
		copyWechat() {
			uni.setClipboardData({
				data: 'disturd0me',
				success: () => {
					uni.showToast({
						title: '已复制客服微信号',
						icon: 'none',
						duration: 2000
					})
				}
			})
		},
		showSwitchAccount() {
			this.showSwitchAccountPopup = true
		},
		closeSwitchAccount() {
			this.showSwitchAccountPopup = false
			this.switchAccountForm = {
				account: '',
				password: ''
			}
		},
		async switchAccount() {
			if (!this.switchAccountForm.account || !this.switchAccountForm.password) {
				uni.showToast({
					title: '请填写完整信息',
					icon: 'none'
				});
				return;
			}

			try {
				const result = await uniCloud.callFunction({
					name: 'user-profile',
					data: {
						action: 'switchAccount',
						account: this.switchAccountForm.account,
						password: this.switchAccountForm.password
					}
				});

				if (result.result.code === 0) {
					// 更新本地用户信息
					this.userInfo = result.result.data;
					// 保存到本地存储
					uni.setStorageSync('userInfo', this.userInfo);
					
					uni.showToast({
						title: '切换成功',
						icon: 'success'
					});
					this.closeSwitchAccount();
				} else {
					uni.showToast({
						title: result.result.message,
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('切换账号失败:', error);
				uni.showToast({
					title: '切换账号失败',
					icon: 'none'
				});
			}
		}
	}
}
</script>

<style>
.container {
	padding: 0;
	background-color: #f8f8f8;
	min-height: 100vh;
	position: relative;
}

.header-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 208px;
	background: linear-gradient(135deg, #4a90e2, #5c6bc0);
	z-index: 0;
}

.user-card {
	position: relative;
	background-color: #fff;
	border-radius: 16px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px;
	margin-top: 2px;
	box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	z-index: 1;
}

.avatar-wrapper {
	padding: 0;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	overflow: hidden;
	background: none;
	border: 3px solid #fff;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.avatar-wrapper::after {
	border: none;
}

.avatar {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.nickname-input {
	width: 200px;
	height: 40px;
	text-align: center;
	margin-top: 20px;
	font-size: 18px;
	color: #333;
	font-weight: 500;
}

.user-desc {
	text-align: center;
	margin-top: 10px;
	font-size: 14px;
	color: #666;
}

.tip-text {
	color: #4a90e2;
}

.menu-list {
	margin: 20px;
	z-index: 1;
}

.menu-group {
	background-color: #fff;
	border-radius: 16px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
	margin-bottom: 20px;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 15px 20px;
	border-bottom: 1px solid #f5f5f5;
}

.menu-item:last-child {
	border-bottom: none;
}

.menu-icon {
	width: 24px;
	height: 24px;
	margin-right: 12px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
}

.menu-icon.account {
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a90e2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>');
}

.menu-icon.settings {
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a90e2"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>');
}

.menu-icon.about {
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a90e2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>');
}

.menu-icon.agreement {
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a90e2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>');
}

.menu-icon.service {
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a90e2"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg>');
}

.menu-icon.switch {
	background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234a90e2"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>');
}

.menu-title {
	flex: 1;
	font-size: 16px;
	color: #333;
}

.menu-arrow {
	font-size: 16px;
	color: #999;
}

.menu-value {
	font-size: 16px;
	color: #999;
}

.submit-btn {
	display: none;
}

.user-info {
	background-color: #fff;
	padding: 20px;
	border-radius: 12px;
	margin-bottom: 20px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.user-id {
	font-size: 14px;
	color: #999;
	margin-top: 30px;
	text-align: center;
}

.popup-mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 999;
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	align-items: center;
	justify-content: center;
}

.popup-content {
	background-color: #fff;
	border-radius: 12px;
	padding: 20px;
	width: 80vw;
}

.popup-title {
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	margin-bottom: 20px;
}

.popup-form {
	margin-bottom: 20px;
}

.form-item {
	margin-bottom: 15px;
}

.form-label {
	font-size: 14px;
	color: #333;
	margin-bottom: 5px;
	display: block;
}

.form-input {
	width: 100%;
	height: 40px;
	border: 1px solid #ddd;
	border-radius: 6px;
	padding: 0 10px;
	font-size: 14px;
}

.popup-buttons {
	display: flex;
	justify-content: space-between;
}

.popup-btn {
	flex: 1;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border-radius: 6px;
	font-size: 14px;
	margin: 0 10px;
}

.popup-btn.cancel {
	background-color: #f5f5f5;
	color: #666;
}

.popup-btn.confirm {
	background-color: #4a90e2;
	color: #fff;
}

.avatar-selector {
	max-height: 80vh;
	overflow-y: auto;
}

.avatar-list {
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
}

.avatar-item {
	width: 80px;
	height: 80px;
	margin: 10px;
	border-radius: 50%;
	overflow: hidden;
	border: 2px solid transparent;
}

.avatar-item:active {
	border-color: #4a90e2;
}

.avatar-preview {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.error-tip {
	font-size: 12px;
	color: #ff4d4f;
	margin-top: 4px;
	display: block;
}

.form-input.error {
	border-color: #ff4d4f;
}
</style> 