<template>
  <view class="navigation-bar">
    <view class="navigation-bar-inner">
      <text class="title">{{ title }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'AI灵感工具栏'
    },
    showBack: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation-bar {
  height: 44px;
  background-color: #1296db;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  
  &-inner {
    width: 100%;
    max-width: 750rpx;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  
  .title {
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    flex: 1;
    text-align: center;
  }
}
</style>