<template>
	<view class="container">
		<view class="agreement-content">
			<view class="title">用户协议</view>
			<view class="section">
				<view class="section-title">1. 服务说明</view>
				<view class="section-content">
					AI灵感工具栏是一款提供AI创意工具服务的应用。我们致力于为用户提供优质的AI服务，包括但不限于AI对话、图片生成、文案创作等功能。
				</view>
			</view>
			
			<view class="section">
				<view class="section-title">2. 用户责任</view>
				<view class="section-content">
					<view>2.1 用户应遵守相关法律法规，不得利用本服务从事违法违规活动。</view>
					<view>2.2 用户应妥善保管账号信息，对账号下的所有行为负责。</view>
					<view>2.3 用户应尊重知识产权，不得侵犯他人合法权益。</view>
				</view>
			</view>
			
			<view class="section">
				<view class="section-title">3. 隐私保护</view>
				<view class="section-content">
					<view>3.1 我们重视用户隐私，将严格保护用户个人信息。</view>
					<view>3.2 未经用户同意，我们不会向第三方提供用户信息。</view>
					<view>3.3 用户有权查看、修改、删除个人信息。</view>
				</view>
			</view>
			
			<view class="section">
				<view class="section-title">4. 免责声明</view>
				<view class="section-content">
					<view>4.1 我们不对AI生成内容的准确性、完整性负责。</view>
					<view>4.2 因不可抗力导致的服务中断，我们不承担责任。</view>
					<view>4.3 用户应自行承担使用本服务可能产生的风险。</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		}
	}
}
</script>

<style>
.container {
	padding: 20px;
}

.agreement-content {
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
}

.title {
	font-size: 20px;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 20px;
}

.section {
	margin-bottom: 20px;
}

.section-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 10px;
}

.section-content {
	font-size: 14px;
	color: #666;
	line-height: 1.5;
}

.section-content view {
	margin-bottom: 8px;
}
</style> 