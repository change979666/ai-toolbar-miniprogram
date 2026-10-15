<template>
	<view class="uni-popup" :class="[popupstyle]" v-if="showPopup">
		<view class="uni-popup__mask" @click="close"></view>
		<view class="uni-popup__wrapper" :class="[type]">
			<view class="uni-popup__wrapper-box">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopup',
		props: {
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
			type: {
				type: String,
				default: 'center'
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				showPopup: false,
				popupstyle: ''
			}
		},
		watch: {
			showPopup(val) {
				if (val) {
					this.open()
				} else {
					this.close()
				}
			}
		},
		created() {
			this.popupstyle = this.animation ? 'uni-popup-animation' : ''
		},
		methods: {
			open() {
				this.showPopup = true
			},
			close() {
				this.showPopup = false
			}
		}
	}
</script>

<style lang="scss">
	.uni-popup {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.uni-popup__wrapper {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.uni-popup__wrapper-box {
		position: relative;
		background-color: #fff;
		border-radius: 12px;
		overflow: hidden;
	}

	.uni-popup-animation {
		.uni-popup__wrapper {
			transition: all 0.3s;
		}
	}
</style> 