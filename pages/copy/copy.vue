<template>
	<view class="container">
		<view class="input-area">
			<view class="type-selector">
				<view 
					class="type-item" 
					:class="{ active: selectedType === item.value }"
					v-for="item in types" 
					:key="item.value"
					@click="selectedType = item.value"
				>
					{{ item.label }}
				</view>
			</view>
			
			<textarea 
				class="prompt-input" 
				v-model="prompt" 
				:placeholder="placeholder"
				:maxlength="500"
			></textarea>
			
			<view class="input-footer">
				<text class="word-count">{{ prompt.length }}/500</text>
				<button class="generate-btn" @click="generateCopy">生成文案</button>
			</view>
		</view>
		
		<view class="result-area" v-if="generatedCopy">
			<view class="result-content">
				<text>{{ generatedCopy }}</text>
			</view>
			<view class="action-buttons">
				<button class="action-btn" @click="copyText">复制文案</button>
				<button class="action-btn" @click="regenerateCopy">重新生成</button>
			</view>
		</view>
		
		<view class="loading" v-if="isLoading">
			<text>正在生成文案，请稍候...</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			types: [
				{ label: '广告文案', value: 'ad' },
				{ label: '产品描述', value: 'product' },
				{ label: '社交媒体', value: 'social' },
				{ label: '邮件营销', value: 'email' }
			],
			selectedType: 'ad',
			prompt: '',
			generatedCopy: '',
			isLoading: false
		}
	},
	computed: {
		placeholder() {
			const placeholders = {
				ad: '请输入产品特点和目标受众，例如：一款面向年轻人的智能手表',
				product: '请输入产品名称和主要功能，例如：一款智能扫地机器人',
				social: '请输入想要表达的内容和风格，例如：一条关于新店开业的微博',
				email: '请输入邮件主题和主要内容，例如：一封产品促销邮件'
			};
			return placeholders[this.selectedType];
		}
	},
	methods: {
		generateCopy() {
			if (!this.prompt.trim()) {
				uni.showToast({
					title: '请输入文案要求',
					icon: 'none'
				});
				return;
			}
			
			this.isLoading = true;
			
			// 模拟生成文案
			setTimeout(() => {
				this.generatedCopy = '这是一个模拟生成的文案。实际项目中需要调用AI接口。';
				this.isLoading = false;
			}, 2000);
		},
		
		copyText() {
			uni.setClipboardData({
				data: this.generatedCopy,
				success: () => {
					uni.showToast({
						title: '复制成功',
						icon: 'success'
					});
				}
			});
		},
		
		regenerateCopy() {
			this.generateCopy();
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

.type-selector {
	display: flex;
	margin-bottom: 15px;
}

.type-item {
	flex: 1;
	text-align: center;
	padding: 8px 0;
	font-size: 14px;
	color: #666;
	border-bottom: 2px solid #f5f5f5;
}

.type-item.active {
	color: #1296db;
	border-bottom-color: #1296db;
}

.prompt-input {
	width: 100%;
	height: 120px;
	font-size: 14px;
	line-height: 1.5;
	margin-bottom: 10px;
}

.input-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
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

.result-content {
	padding: 15px;
	background-color: #f9f9f9;
	border-radius: 8px;
	margin-bottom: 15px;
}

.result-content text {
	font-size: 14px;
	line-height: 1.5;
	color: #333;
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