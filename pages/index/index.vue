<template>
	<view class="container">
		<view class="header">
			<text class="title">AI灵感工具栏</text>
			<text class="subtitle">让创意更简单</text>
		</view>
		
		<view class="tools-grid">
			<view 
				class="tool-item" 
				v-for="(item, index) in tools" 
				:key="index"
				@click="navigateTo(item.path)"
				:class="['tool-item-' + index]"
			>
				<view class="tool-icon">
					<text class="icon-text">{{ item.icon }}</text>
				</view>
				<view class="tool-info">
					<text class="tool-name">{{ item.name }}</text>
					<text class="tool-desc">{{ item.desc }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tools: [
				{
					name: 'AI对话',
					desc: '智能对话助手',
					path: 'chat',
					icon: '💬'
				},
				{
					name: '图片生成',
					desc: 'AI绘画创作',
					path: 'image',
					icon: '🎨'
				},
				{
					name: '文案创作',
					desc: '智能文案生成',
					path: 'copy',
					icon: '✍️'
				},
				{
					name: '创意激发',
					desc: '灵感激发助手',
					path: 'idea',
					icon: '💡'
				}
			]
		}
	},
	methods: {
		navigateTo(path) {
			uni.navigateTo({
				url: `/pages/${path}/${path}`
			})
		}
	}
}
</script>

<style>
.container {
	padding: 20px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	background-color: #f8f8f8;
}

.header {
	text-align: center;
	margin-bottom: 30px;
	margin-top: 60px; /* 增加顶部间距 */
	width: 100%;
}

.title {
	font-size: 28px;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8px;
}

.subtitle {
	font-size: 16px;
	color: #666;
	display: block;
}

.title {
	font-size: 28px;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 8px;
}

.subtitle {
	font-size: 16px;
	color: #666;
	display: block;
}

.tools-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
}

.tool-item {
	width: calc(50% - 10px);
	margin-bottom: 20px;
}

.tool-item {
	background-color: #fff;
	border-radius: 16px;
	padding: 20px;
	display: flex;
	align-items: center;
	box-shadow: 0 4px 12px rgba(0,0,0,0.05);
	transition: all 0.3s ease;
}

.tool-item:active {
	transform: scale(0.98);
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tool-icon {
	width: 50px;
	height: 50px;
	background: linear-gradient(135deg, #1296db, #1aadff);
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 15px;
}

.icon-text {
	font-size: 24px;
}

.tool-info {
	flex: 1;
}

.tool-name {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	display: block;
	margin-bottom: 4px;
}

.tool-desc {
	font-size: 14px;
	color: #666;
	display: block;
}

/* 动画效果 */
.tool-item-0 {
	animation: fadeInUp 0.5s ease;
}

.tool-item-1 {
	animation: fadeInUp 0.5s ease 0.1s;
}

.tool-item-2 {
	animation: fadeInUp 0.5s ease 0.2s;
}

.tool-item-3 {
	animation: fadeInUp 0.5s ease 0.3s;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 响应式设计 */
@media screen and (max-width: 375px) {
	.container {
		padding: 20px 15px;
	}
	
	.tools-grid {
		gap: 15px;
	}
	
	.tool-item {
		padding: 15px;
	}
	
	.tool-icon {
		width: 40px;
		height: 40px;
	}
	
	.icon-text {
		font-size: 20px;
	}
	
	.tool-name {
		font-size: 16px;
	}
	
	.tool-desc {
		font-size: 12px;
	}
}
</style> 