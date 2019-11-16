<template>
	<view>
		<!-- 分享内容 -->
		<view class="cu-bar margin-top bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>{{i18n_pages.share.content}}
			</view>
		</view>
		<view class="padding flex flex-wrap justify-between align-center bg-white">
			<textarea 
					class="textarea" 
					v-model="shareText" 
					@focus="focusTextarea()"
					@confirm="checkTextarea()" 
					@blur="checkTextarea()" />
		</view>		
		<!-- 分享图片 -->
		<!-- <view class="cu-bar margin-top bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>{{i18n_pages.share.img}}
			</view>
		</view>
		<view class="padding flex flex-wrap justify-between align-center bg-white">
			<view class="uni-uploader__input-box" v-if="!image" @tap="chooseImage"></view> 
			<image class="uni-uploader__img" v-if="image" :src="image"></image>
			<image class="uni-uploader__img" :src="image"></image>
		</view> -->
		<!-- 按钮 -->
		<view class="action">
			<!-- <button class="cu-btn block bg-blue margin-tb-sm lg" @click="share">
				<text class="cuIcon-share"></text> {{i18n_pages.share.share}}
			</button> -->
			<!-- <text this.isChecked = 'fail'></text> -->
			<button class="cu-btn block bg-blue margin-tb-sm lg" id="share" open-type="share" :disabled="!canShare">
				<text class="cuIcon-share"></text> {{i18n_pages.share.share}}
			</button>
		</view>
		
	</view>
</template>

<script>
	import { stringFormat, throttle } from 'common/index'
	export default {
		data() {
			return {
				shareText: '',
				image: 'cloud://finduname-s9wdm.6669-finduname-s9wdm-1259413430/logo/logo.png',
				shareType:1,
				providerList: [],
				checkState : 'ok'
			}
		},
		// watch: {
		// 	shareText(newValue, oldValue) {
		// 		this.checkState = 'ing'
		// 		this.test()
		// 	}
		// },
		computed:{
			canShare(){
				return this.checkState==="ok"
			}
		},
		onShareAppMessage:function() {
			// console.log("onShareAppMessage")
			// this.msgSecCheck("完2347全dfji试3726测asad感3847知qwez到").then(res=>{
			// 	let title = "欢迎体验 name名"
			// 	if(res){
			// 		title = this.shareText
			// 	}
			// 	return {
			// 		title,
			// 		path: '/pages/home/index',
			// 		imageUrl:this.image ? this.image : 'cloud://finduname-s9wdm.6669-finduname-s9wdm-1259413430/logo/logo.png'
			// 	}
			// })
			return {
				title: this.shareText,
				path: '/pages/home/index',
				imageUrl:'cloud://finduname-s9wdm.6669-finduname-s9wdm-1259413430/logo/logo.png'
			}
		},
		onLoad: function (option) {
			this.shareText = stringFormat(this.i18n_pages.share.shareText,option.name)
		},
		methods: {
			focusTextarea(){//当聚焦到文字内容
				console.log("focusTextarea")
				this.checkState = 'ing'
			},
			checkTextarea:async function(){//完成后的检查文字内容
				let isOk = await this.msgSecCheck(this.shareText)
				console.log(`isOk this.shareText : ${isOk} ${this.shareText}`)
				if(isOk){//合法
					this.checkState = 'ok'
				}else{
					this.checkState = 'fail'
				}
				// let token = await this.getAccessToken()
				// let that = this
				// wx.request({
				//   url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
				//   data: {
				//    content:this.shareText
				//   },
				//   method:'post',
				//   success (res) {
				// 		console.log(res)
				//     that.shareText = res.data.errcode
				//   }
				// })
			},
			// test:throttle(async function(){
			// 	let isOk = await this.msgSecCheck(this.shareText)
			// 	console.log(`isOk this.shareText : ${isOk} ${this.shareText}`)
			// 	if(isOk){//合法
			// 		this.checkState = 'ok'
			// 	}else{
			// 		this.checkState = 'fail'
			// 	}
			// },2000),
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					sizeType: ['compressed', 'original'],
					success: (res) => {
						this.image = res.tempFilePaths[0];
					}
				})
			},
			compress(){//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				let img = this.image;
				return new Promise((res) => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
						entry.file((file) => {// 可通过entry对象操作图片 
							console.log('getFile:' + JSON.stringify(file));
							if(file.size > 20480) {// 压缩后size 大于20Kb
								plus.zip.compressImage({
									src: img,
									dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
									width: '10%',
									height: '10%',
									quality: 1,
									overwrite: true
								}, (event) => {
									console.log('success zip****' + event.size);
									let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
									res(newImg);
								}, function(error) {
									uni.showModal({
										content:'分享图片太大,需要请重新选择图片!',
										showCancel:false
									})
								});
							}
						});
					}, (e) => {
						console.log('Resolve file URL failed: ' + e.message);
						uni.showModal({
							content:'分享图片太大,需要请重新选择图片!',
							showCancel:false
						})
					});
				})
			}
		}
	}
</script>
<style>
</style>
