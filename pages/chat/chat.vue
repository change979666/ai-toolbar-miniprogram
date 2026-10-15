<template>
	<view class="container">
		<view class="chat-container">
			<scroll-view 
				class="message-list" 
				scroll-y="true" 
				:scroll-top="scrollTop"
				:scroll-with-animation="true"
				@scrolltoupper="loadMoreMessages"
				ref="messageList"
			>
				<view class="loading-more" v-if="isLoadingMore">
					<text>加载更多消息...</text>
				</view>
				
				<view class="message-item" v-for="(item, index) in messages" :key="index">
					<view class="message-avatar" v-if="item.type === 'ai'">
						<image src="/static/ai-avatar.svg" mode="aspectFit"></image>
					</view>
					<view :class="['message-content', item.type === 'user' ? 'user-message' : 'ai-message']">
						<text>{{ item.content }}</text>
					</view>
					<view class="message-avatar user-avatar" v-if="item.type === 'user'">
						<image :src="userAvatar || '/static/user-avatar.svg'" mode="aspectFit"></image>
					</view>
				</view>
				
				<view class="typing-indicator" v-if="isLoading">
					<view class="typing-dot"></view>
					<view class="typing-dot"></view>
					<view class="typing-dot"></view>
				</view>
			</scroll-view>
			
			<view class="api-key-notice" v-if="!hasApiKey">
				<text>请先设置DeepSeek API密钥</text>
				<button class="set-api-btn" @click="showApiKeyDialog">设置API密钥</button>
			</view>
			
			<view class="input-area">
				<input 
					class="input-box" 
					type="text" 
					v-model="inputMessage" 
					placeholder="请输入您的问题"
					@confirm="sendMessage"
					:disabled="isLoading || !hasApiKey"
				/>
				<button 
					:class="['send-btn', (isLoading || !inputMessage.trim() || !hasApiKey) ? 'send-btn-disabled' : '']" 
					@click="sendMessage"
					:disabled="isLoading || !inputMessage.trim() || !hasApiKey"
				>
					{{ isLoading ? '请稍候' : '发送' }}
				</button>
			</view>
		</view>
		
		<!-- API密钥设置弹窗 -->
		<uni-popup ref="apiKeyPopup" type="dialog">
			<uni-popup-dialog
				title="设置DeepSeek API密钥"
				:before-close="true"
				@confirm="saveApiKey"
				@close="cancelApiKey"
			>
				<input 
					class="api-key-input" 
					v-model="apiKeyInput" 
					placeholder="请输入DeepSeek API密钥"
					password
				/>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import deepseekApi from '@/utils/deepseekApi.js';

export default {
	data() {
		return {
			messages: [
				{
					type: 'ai',
					content: '你好！我是基于DeepSeek的AI助手，有什么可以帮你的吗？'
				}
			],
			inputMessage: '',
			isLoading: false,
			scrollTop: 0,
			isLoadingMore: false,
			apiKeyInput: '',
			hasApiKey: false,
			userAvatar: ''
		}
	},
	onLoad() {
		// 检查是否已设置API密钥
		this.checkApiKey();
		
		// 获取用户头像
		this.getUserInfo();
	},
	onReady() {
		// 初始滚动到底部
		this.$nextTick(() => {
			this.scrollToBottom();
		});
	},
	methods: {
		// 发送消息
		async sendMessage() {
			if (!this.inputMessage.trim() || this.isLoading || !this.hasApiKey) return;
			
			const userMessage = this.inputMessage;
			
			// 添加用户消息
			this.messages.push({
				type: 'user',
				content: userMessage
			});
			
			// 清空输入框
			this.inputMessage = '';
			
			// 滚动到底部
			this.$nextTick(() => {
				this.scrollToBottom();
			});
			
			// 设置加载状态
			this.isLoading = true;
			
			try {
				// 准备消息历史记录
				const messageHistory = this.formatMessagesForAPI();
				
				// 调用DeepSeek API
				const response = await deepseekApi.sendChatRequest(messageHistory);
				
				// 处理API响应
				if (response && response.choices && response.choices.length > 0) {
					const aiMessage = response.choices[0].message.content;
					
					// 添加AI回复
					this.messages.push({
						type: 'ai',
						content: aiMessage
					});
					
					// 保存聊天记录
					this.saveChatHistory();
				} else {
					throw new Error('API返回的响应格式不正确');
				}
			} catch (error) {
				console.error('发送消息失败:', error);
				
				// 显示错误消息
				this.messages.push({
					type: 'ai',
					content: `抱歉，发生了错误: ${error.message || '未知错误'}`
				});
			} finally {
				// 取消加载状态
				this.isLoading = false;
				
				// 滚动到底部
				this.$nextTick(() => {
					this.scrollToBottom();
				});
			}
		},
		
		// 格式化消息历史记录为API所需格式
		formatMessagesForAPI() {
			// 添加系统消息作为第一条消息（可选）
			const systemMessage = {
				role: 'system',
				content: '你是一个由DeepSeek开发的AI助手，你的任务是提供有用、安全和诚实的回答。'
			};
			
			// 将消息历史记录转换为API所需格式
			const userMessages = this.messages.map(msg => ({
				role: msg.type === 'user' ? 'user' : 'assistant',
				content: msg.content
			}));
			
			// 将系统消息添加到消息历史记录的开头
			return [systemMessage, ...userMessages];
		},
		
		// 滚动到底部
		scrollToBottom() {
			// 获取消息列表的高度
			const query = uni.createSelectorQuery().in(this);
			query.select('.message-list').boundingClientRect(data => {
				if (data) {
					this.scrollTop = data.height * 2; // 设置一个足够大的值确保滚动到底部
				}
			}).exec();
		},
		
		// 加载更多历史消息
		loadMoreMessages() {
			// 这里可以实现加载更多历史消息的逻辑
			// 目前只是一个占位函数
			this.isLoadingMore = true;
			
			setTimeout(() => {
				this.isLoadingMore = false;
			}, 1000);
		},
		
		// 保存聊天历史记录
		saveChatHistory() {
			try {
				// 只保存最近的20条消息
				const recentMessages = this.messages.slice(-20);
				uni.setStorageSync('chat_history', JSON.stringify(recentMessages));
			} catch (e) {
				console.error('保存聊天记录失败:', e);
			}
		},
		
		// 加载聊天历史记录
		loadChatHistory() {
			try {
				const history = uni.getStorageSync('chat_history');
				if (history) {
					this.messages = JSON.parse(history);
				}
			} catch (e) {
				console.error('加载聊天记录失败:', e);
			}
		},
		
		// 检查API密钥
		checkApiKey() {
			this.hasApiKey = deepseekApi.hasApiKey();
			if (!this.hasApiKey) {
				// 如果没有API密钥，显示设置弹窗
				this.$nextTick(() => {
					this.showApiKeyDialog();
				});
			}
		},
		
		// 显示API密钥设置弹窗
		showApiKeyDialog() {
			this.apiKeyInput = deepseekApi.getApiKey();
			this.$refs.apiKeyPopup.open();
		},
		
		// 保存API密钥
		saveApiKey() {
			if (this.apiKeyInput.trim()) {
				deepseekApi.saveApiKey(this.apiKeyInput.trim());
				this.hasApiKey = true;
				uni.showToast({
					title: 'API密钥已保存',
					icon: 'success'
				});
			} else {
				uni.showToast({
					title: 'API密钥不能为空',
					icon: 'none'
				});
			}
		},
		
		// 取消API密钥设置
		cancelApiKey() {
			this.apiKeyInput = '';
		},
		
		// 获取用户信息
		getUserInfo() {
			try {
				const userInfo = uni.getStorageSync('userInfo');
				if (userInfo) {
					const parsedInfo = JSON.parse(userInfo);
					this.userAvatar = parsedInfo.avatarUrl || '';
				}
			} catch (e) {
				console.error('获取用户信息失败:', e);
			}
		}
	}
}
</script>

<style lang="scss">
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f8f8f8;
}

.chat-container {
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
}

.message-list {
	flex: 1;
	margin-bottom: 20px;
}

.message-item {
	margin-bottom: 20px;
	display: flex;
	align-items: flex-start;
}

.message-avatar {
	width: 36px;
	height: 36px;
	border-radius: 18px;
	overflow: hidden;
	margin-right: 10px;
	
	image {
		width: 100%;
		height: 100%;
	}
	
	&.user-avatar {
		margin-right: 0;
		margin-left: 10px;
	}
}

.message-content {
	max-width: 70%;
	padding: 12px 16px;
	border-radius: 18px;
	font-size: 15px;
	line-height: 1.5;
	position: relative;
	word-break: break-word;
}

.user-message {
	background-color: #1296db;
	color: #fff;
	margin-left: auto;
	border-bottom-right-radius: 4px;
}

.ai-message {
	background-color: #fff;
	color: #333;
	margin-right: auto;
	border-bottom-left-radius: 4px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.input-area {
	display: flex;
	align-items: center;
	background-color: #fff;
	padding: 12px;
	border-radius: 24px;
	box-shadow: 0 2px 12px rgba(0,0,0,0.1);
	margin-bottom: 10px;
}

.input-box {
	flex: 1;
	height: 44px;
	padding: 0 15px;
	font-size: 15px;
}

.send-btn {
	min-width: 70px;
	height: 44px;
	line-height: 44px;
	text-align: center;
	background-color: #1296db;
	color: #fff;
	font-size: 15px;
	border-radius: 22px;
	margin-left: 10px;
	transition: all 0.3s;
	
	&-disabled {
		background-color: #cccccc;
		opacity: 0.7;
	}
}

.typing-indicator {
	display: flex;
	align-items: center;
	padding: 12px 16px;
	background-color: #fff;
	border-radius: 18px;
	width: fit-content;
	margin-bottom: 20px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.typing-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #1296db;
	margin: 0 2px;
	animation: typing 1.5s infinite ease-in-out;
	
	&:nth-child(1) {
		animation-delay: 0s;
	}
	
	&:nth-child(2) {
		animation-delay: 0.2s;
	}
	
	&:nth-child(3) {
		animation-delay: 0.4s;
	}
}

@keyframes typing {
	0%, 60%, 100% {
		transform: translateY(0);
		opacity: 0.6;
	}
	30% {
		transform: translateY(-6px);
		opacity: 1;
	}
}

.loading-more {
	text-align: center;
	padding: 10px 0;
	color: #999;
	font-size: 14px;
}

.api-key-notice {
	background-color: #fff9e6;
	padding: 15px;
	border-radius: 10px;
	margin-bottom: 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	text {
		color: #e6a23c;
		margin-bottom: 10px;
	}
}

.set-api-btn {
	background-color: #e6a23c;
	color: #fff;
	font-size: 14px;
	padding: 6px 12px;
	border-radius: 4px;
}

.api-key-input {
	width: 100%;
	height: 40px;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	padding: 0 15px;
	margin: 10px 0;
}
</style> 