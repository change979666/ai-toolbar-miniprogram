<template>
	<view class="container">
		<view class="input-area">
			<textarea 
				class="prompt-input" 
				v-model="prompt" 
				placeholder="请输入图片描述，例如：一只可爱的猫咪在草地上玩耍"
				:maxlength="200"
			></textarea>
			<view class="input-footer">
				<text class="word-count">{{ prompt.length }}/200</text>
				<button class="generate-btn" @click="generateImage">生成图片</button>
			</view>
		</view>
		
		<view class="result-area" v-if="generatedImage">
			<image :src="generatedImage" mode="aspectFit" class="result-image"></image>
			<view class="action-buttons">
				<button class="action-btn" @click="saveImage">保存图片</button>
				<button class="action-btn" @click="regenerateImage">重新生成</button>
			</view>
		</view>
		
		<view class="loading" v-if="isLoading">
			<text>正在生成图片，请稍候...</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			prompt: '',
			generatedImage: '',
			isLoading: false
		}
	},
	methods: {
		generateImage() {
			if (!this.prompt.trim()) {
				uni.showToast({
					title: '请输入图片描述',
					icon: 'none'
				});
				return;
			}
			
			this.isLoading = true;
			
			// 模拟生成图片
			setTimeout(() => {
				this.generatedImage = 'https://via.placeholder.com/400x400';
				this.isLoading = false;
			}, 2000);
		},
		
		saveImage() {
			uni.showToast({
				title: '图片已保存',
				icon: 'success'
			});
		},
		
		regenerateImage() {
			this.generateImage();
		}
	}
}
</script>

<style>
.container {
	padding: 20px;
}

.input-area {
	background-color: #fff;
	border-radius: 10px;
	padding: 15px;
	margin-bottom: 20px;
}

.prompt-input {
	width: 100%;
	height: 120px;
	font-size: 14px;
	line-height: 1.5;
}

.input-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
}

.word-count {
	font-size: 12px;
	color: #999;
}

.generate-btn {
	background-color: #1296db;
	color: #fff;
	font-size: 14px;
	padding: 0 20px;
	height: 36px;
	line-height: 36px;
	border-radius: 18px;
}

.result-area {
	background-color: #fff;
	border-radius: 10px;
	padding: 15px;
}

.result-image {
	width: 100%;
	height: 300px;
	margin-bottom: 15px;
}

.action-buttons {
	display: flex;
	justify-content: space-around;
}

.action-btn {
	width: 45%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	background-color: #f5f5f5;
	color: #333;
	font-size: 14px;
	border-radius: 20px;
}

.loading {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 16px;
}
</style> 