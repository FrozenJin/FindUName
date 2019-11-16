<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view @click="read" id="hello">hello</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-grey sm ">玄灰</button>
			<button class="cu-btn bg-red margin-tb-sm ">嫣红</button>
		</view>
	</view>
</template>

<script>
	const db = wx.cloud.database()
	const userInfoSet = db.collection('UserInfo')
	const userCountSet = db.collection('UserCount')
	export default {
		onShow(){
			wx.cloud.callFunction({
			  name: 'login',
			  complete: res => {
			  }
			})
		},
		methods:{
			//单词发音触发函数
			read: function(e) {
				const innerAudioContext = wx.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = "cloud://finduname-s9wdm.6669-finduname-s9wdm/wordMp3/邓福如 - 如果有如果.mp3"
				innerAudioContext.onPlay(() => {
				})
				innerAudioContext.onError((res) => {
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
