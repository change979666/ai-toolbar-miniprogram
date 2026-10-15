<template>
	<view class="container">
		<scroll-view scroll-y="true" class="about-scroll">
			<view class="about-container">
				<view class="about-content">
					<view class="about-title">关于AI灵感工具栏</view>
					<view class="about-text">AI灵感工具栏是一款集成多种AI创意工具的小程序，旨在帮助用户激发创意灵感、提高工作效率。我们致力于为用户提供最优质的AI创意服务体验。</view>

					<view class="section">
						<view class="section-title">备案信息</view>
						<view class="section-content">
							<view class="info-item">
								<text class="info-label">备案号：</text>
								<text class="info-value">豫ICP备2025114160号-1X</text>
							</view>
							<view class="info-item">
								<text class="info-desc">本小程序已通过国家互联网信息办公室备案，是合法合规的AI应用服务。</text>
							</view>
						</view>
					</view>

					<view class="feature-title">主要功能</view>
					<view class="feature-list">
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">AI文案创作：快速生成各类文案</text>
						</view>
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">图片生成：将创意转化为图像</text>
						</view>
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">创意助手：提供创意建议和方案</text>
						</view>
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">灵感激发：突破思维局限</text>
						</view>
					</view>

					<view class="feature-title">产品优势</view>
					<view class="feature-list">
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">智能高效：采用最新AI技术，提供快速响应</text>
						</view>
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">简单易用：界面直观，操作便捷</text>
						</view>
						<view class="feature-item">
							<text class="feature-dot">•</text>
							<text class="feature-text">持续更新：定期推出新功能和优化</text>
						</view>
					</view>

					<view class="feature-title">使用说明</view>
					<view class="about-text">
						1. 首次使用需要授权登录，以便保存您的创作内容。<br/>
						2. 在工具页面选择需要使用的功能模块。<br/>
						3. 根据提示输入相关内容，等待AI处理。<br/>
						4. 可以保存、分享或继续优化生成的内容。
					</view>

					<view class="feature-title">更新日志</view>
					<view class="update-list">
						<view class="update-item">
							<view class="update-version">V1.0.0 (2024-01-01)</view>
							<view class="update-content">- 首次发布</view>
							<view class="update-content">- 支持基础AI创作功能</view>
							<view class="update-content">- 优化用户界面交互</view>
						</view>
						<view class="update-item">
							<view class="update-version">V1.1.0 (2024-02-01)</view>
							<view class="update-content">- 新增图片生成功能</view>
							<view class="update-content">- 优化响应速度</view>
							<view class="update-content">- 修复已知问题</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>

<style>
.container {
	padding: 0;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.about-scroll {
	height: 100vh;
}

.about-container {
	padding: 20px;
}

.about-content {
	background-color: #fff;
	border-radius: 16px;
	padding: 20px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.about-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 15px;
}

.about-text {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
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
	background-color: #f8f8f8;
	border-radius: 8px;
	padding: 15px;
}

.info-item {
	margin-bottom: 10px;
}

.info-label {
	font-size: 14px;
	color: #666;
}

.info-value {
	font-size: 14px;
	color: #333;
	font-weight: 500;
}

.info-desc {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}

.feature-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin: 20px 0 10px;
}

.feature-list {
	margin-bottom: 20px;
}

.feature-item {
	display: flex;
	align-items: flex-start;
	margin-bottom: 8px;
}

.feature-dot {
	color: #4a90e2;
	margin-right: 8px;
	font-size: 16px;
}

.feature-text {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
}

.update-list {
	margin-bottom: 20px;
}

.update-item {
	margin-bottom: 15px;
}

.update-version {
	font-size: 14px;
	font-weight: bold;
	color: #333;
	margin-bottom: 8px;
}

.update-content {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
	margin-bottom: 4px;
}
</style> 