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
				:maxlength="200"
			></textarea>
			
			<view class="input-footer">
				<text class="word-count">{{ prompt.length }}/200</text>
				<button class="generate-btn" @click="generateIdeas">激发创意</button>
			</view>
		</view>
		
		<view class="result-area" v-if="ideas.length > 0">
			<view class="idea-list">
				<view class="idea-item" v-for="(idea, index) in ideas" :key="index">
					<text class="idea-index">{{ index + 1 }}</text>
					<text class="idea-content">{{ idea }}</text>
				</view>
			</view>
			<view class="action-buttons">
				<button class="action-btn" @click="saveIdeas">保存创意</button>
				<button class="action-btn" @click="regenerateIdeas">重新生成</button>
			</view>
		</view>
		
		<view class="loading" v-if="isLoading">
			<text>正在激发创意，请稍候...</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			types: [
				{ label: '产品创意', value: 'product' },
				{ label: '营销创意', value: 'marketing' },
				{ label: '内容创意', value: 'content' },
				{ label: '活动创意', value: 'event' }
			],
			selectedType: 'product',
			prompt: '',
			ideas: [],
			isLoading: false
		}
	},
	computed: {
		placeholder() {
			const placeholders = {
				product: '请输入产品类型和目标用户，例如：面向年轻人的智能家居产品',
				marketing: '请输入营销目标和产品特点，例如：推广一款环保产品',
				content: '请输入内容主题和风格，例如：制作一个关于旅行的视频',
				event: '请输入活动类型和目的，例如：举办一场产品发布会'
			};
			return placeholders[this.selectedType];
		}
	},
	methods: {
		generateIdeas() {
			if (!this.prompt.trim()) {
				uni.showToast({
					title: '请输入创意要求',
					icon: 'none'
				});
				return;
			}
			
			this.isLoading = true;
			
			// 模拟生成创意
			setTimeout(() => {
				this.ideas = [
					'创意一：这是一个模拟生成的创意',
					'创意二：实际项目中需要调用AI接口',
					'创意三：这里会显示具体的创意内容',
					'创意四：每个创意都会经过AI优化',
					'创意五：可以根据需求调整创意数量'
				];
				this.isLoading = false;
			}, 2000);
		},
		
		saveIdeas() {
			uni.showToast({
				title: '创意已保存',
				icon: 'success'
			});
		},
		
		regenerateIdeas() {
			this.generateIdeas();
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

.idea-list {
	margin-bottom: 15px;
}

.idea-item {
	display: flex;
	align-items: flex-start;
	margin-bottom: 15px;
	padding: 10px;
	background-color: #f9f9f9;
	border-radius: 8px;
}

.idea-index {
	width: 24px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	background-color: #1296db;
	color: #fff;
	border-radius: 12px;
	margin-right: 10px;
	font-size: 12px;
}

.idea-content {
	flex: 1;
	font-size: 14px;
	color: #333;
	line-height: 1.5;
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