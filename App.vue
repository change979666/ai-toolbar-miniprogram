<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			// 初始化微信云开发环境
			wx.cloud.init({
				env: 'cloud1-0gfcoo6q66e56d5c', // 用户提供的环境ID
				traceUser: true // 记录用户访问
			})
			
			// 检查云函数调用权限
			this.checkCloudFunction()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async checkCloudFunction() {
				try {
					const res = await wx.cloud.callFunction({
						name: 'wx-login',
						data: { action: 'check' }
					})
					console.log('云函数调用成功:', res)
				} catch (err) {
					console.error('云函数调用失败:', err)
					uni.showToast({
						title: '云服务初始化失败',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>