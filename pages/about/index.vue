<template>
	<view class="content">
		<view class="UCenter-bg">
			<!-- 流星 -->
			<stars></stars>
		  <image src="cloud://finduname-s9wdm.6669-finduname-s9wdm/logo/logo.png" class="png" mode="widthFix"></image>
		  <view class="text-xl">
		    <text class="text-df">v1.1.0</text>
		  </view>
		  <!-- <view class="margin-top-sm">
		    <text>By:Frozen</text>
		  </view> -->
		  <image src="https://image.weilanwl.com/gif/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		</view>
		<view class="padding flex text-center text-grey bg-white shadow-warp">
		  <view class="flex flex-sub flex-direction solid-right">
		    <view class="text-xxl text-orange">{{namedCount}}</view>
		    <view class="margin-top-sm">
		      <text class="cuIcon-attentionfill"></text> {{i18n_pages.about.named}}
				</view>
		  </view>
		  <view class="flex flex-sub flex-direction">
		    <view class="text-xxl text-green">{{leaveChance}}</view>
		    <view class="margin-top-sm">
		      <text class="cuIcon-edit"></text> {{i18n_pages.about.chance}}
				</view>
		  </view>
		</view>
		<!-- <view @click="read" id="hello">hello</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-grey sm " @click="linkTo()">玄灰</button>
			<button class="cu-btn bg-red margin-tb-sm " @click="changeLang()">嫣红</button>
		</view> -->
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
			<!-- 关于 -->
		  <view class="cu-item arrow" @click="navigateTo('/pages/about/aboutImg/index')">
		    <view class="cu-item arrow">
		      <view class="content">
		        <!-- <text class="cuIcon-appreciatefill text-red"></text> -->
						<text class="cuIcon-info text-purple"></text>
		        <text class="text-grey">{{i18n_pages.about.about}}</text>
		      </view>
		    </view>
		  </view>
			<!-- 多语言切换 -->
			<view class="cu-item arrow" @click="langModal=true">
			  <view class="cu-item arrow">
			    <view class="content">
			      <text class="cuIcon-edit text-olive"></text>
			      <text class="text-grey">{{i18n_pages.about.language}}</text>
			    </view>
			  </view>
			</view>
			<!-- 显示openId -->
			<view class="cu-item arrow" @click="openIdModal=true">
			  <view class="cu-item arrow">
			    <view class="content">
			      <!-- <text class="cuIcon-appreciatefill text-red"></text> -->
						<text class="cuIcon-lightfill text-cyan"></text>
			      <text class="text-grey">{{i18n_pages.about.showOpenId}}</text>
			    </view>
			  </view>
			</view>
			<!-- 赞赏支持 -->
		 <!-- <view class="cu-item arrow" @click="showQrcode">
		    <view class="content">
		      <text class="cuIcon-appreciatefill text-red"></text>
		      <text class="text-grey">{{i18n_pages.about.support}}</text>
		    </view>
		  </view> -->
		</view>
	
		<!-- 切换语言 模态框 -->
		<view class="cu-modal" :class="langModal?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="langChange">
					<view class="cu-list menu text-left">
						<!-- 中文 -->
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">中文</view>
								<radio 
									class="round" value="zh" 
									:class="lang=='zh'?'checked':''" 
									:checked="lang=='zh'" />
							</label>
						</view>
						<!-- 英文 -->
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">English</view>
								<radio 
									class="round" value="en" 
									:class="lang=='en'?'checked':''" 
									:checked="lang=='en'" />
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		
		<!-- openId 模态框 -->
		<view class="cu-modal" :class="openIdModal?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="padding">{{openId}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import stars from '../../components/stars/index.vue'
	import { GetStorageLang } from '../../common/storageHelper.js'
	const db = wx.cloud.database()
	const userInfoSet = db.collection('UserInfo')
	const userCountSet = db.collection('UserCount')

	export default {
		components: {
			stars
		},
		onShow(){
			//已经命名人数
			userInfoSet.count().then(res=>{
				this.namedCount = res.total
			})
			//剩余命名次数
			userCountSet.where({}).get()
			.then(res=>{
				this.leaveChance = 3-res.data[0].count
			})
		},
		data() {
			return {
				namedCount:'0',//已经命名人数
				leaveChance:'0',//剩余命名次数
				openIdModal: false,
				langModal: false,
				lang: GetStorageLang()
			}
		},
		watch: {
			//多语言切换
			lang(newValue, oldValue) {
				// if(this._i18n.locale != "en"){
				// 	this._i18n.locale = "en"; 
				// 	uni.setStorageSync('storage_i18n', 'en');
				// }else{
				// 	this._i18n.locale = "zh"; 
				// 	uni.setStorageSync('storage_i18n', 'zh');
				// }
				// this.setNavigationBarTitle()
				this._i18n.locale = newValue;
				uni.setStorageSync('storage_i18n', newValue);
				this.setNavigationBarTitle()
			}
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
			//收款二维码
			showQrcode() {
			  wx.previewImage({
			    urls: ['cloud://finduname-s9wdm.6669-finduname-s9wdm/logo/logo.png'],
			    current: 'cloud://finduname-s9wdm.6669-finduname-s9wdm/logo/logo.png' // 当前显示图片的http链接      
			  })
			},
			//隐藏 modal
			hideModal(e) {
				this.openIdModal = false
				this.langModal = false
			},
			//语言切换
			langChange(e) {
				this.lang = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
.UCenter-bg {
	background-image: url(https://surx.oss-cn-beijing.aliyuncs.com/image/sky-stars-constellations-astronomy-preview.jpg);
	// background-color: #EBD4EF ;
	background-size: cover;
	height: 550rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	& text {
		opacity: 0.8;
	}
	
	& image {
		width: 200rpx;
		height: 200rpx;
	}
	& .gif-wave{
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;  
		height: 100rpx;   
	}
}

</style>
