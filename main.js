import Vue from 'vue'
import App from './App'

import i18n from '@/lang' // 国际化
Vue.prototype._i18n = i18n  

import store from './store/index' // store
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	i18n,  
  ...App
})
app.$mount()

//mixin 一些基础使用(多语言.)
Vue.mixin({
	computed: {  
		openId(){
		  return this.$store.getters.openId
		},
		i18n_pages () {  
			return this.$t('pages')  
		}  
	},
	methods:{
		setNavigationBarTitle(){//设置页面头内容
			var pages = getCurrentPages()
			var page = pages[pages.length - 1]
			var route = page.route
			let value = route.split('/')[1]
			let title = this.i18n_pages.navigationBarTitle[value]
			title && uni.setNavigationBarTitle({
					title
			})
			// title && uni.setNavigationBarColor({
			//     frontColor: '#ffffff',
			//     backgroundColor: '#ff0000',
			//     animation: {
			//         duration: 400,
			//         timingFunc: 'easeIn'
			//     }
			// })
			//uni.showNavigationBarLoading()
		},
		setTabBarItem(){	//设置底tab内容
			this.i18n_pages.tabBarItem.forEach((text,index)=>{
				uni.setTabBarItem({
					index,
					text,
				})
			})
		},
		navigateTo(url){	//导航到
			uni.navigateTo({
			    url
			})
		},
		async getOpenId(){//获取openId
			await wx.cloud.callFunction({ 
				  name: 'login'
			}).then(res => {
					this.$store.dispatch("setOpenId", res.result.openid)
			})
		},
		async getAccessToken(){//获取access_token
			let token = ''
			await wx.cloud.callFunction({
				  name: 'token',
					data: {}
			}).then(res => {
				// console.log(res)
				token = res.result
			})
			return token
		},
		async msgSecCheck(msg){//检查文字的合法性
			if(msg === '') return true
			let token = await this.getAccessToken()
			let result = ''
			await wx.cloud.callFunction({
				  name: 'msgSecCheck',
					data: {
						token,
						msg
					}
			}).then(res => {
					console.log(res)
					result = res.result
			})
			
			if(result.errcode === 0){//合法
				return true
			}else{
				return false
			} 
			
			// console.log(token)
			// let result = ''
			// await uni.request({
			// 	url:`https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
			// 	data:{
			// 		content:msg
			// 	},
			// 	method:'POST'
			// }).then(data => {//data为一个数组，数组第一项为错误信息，第二项为返回数据
			// 	var [error, res]  = data;
			// 	// console.log(res.data);
			// 	result = res.data
			// })
				
				// wx.request({
				//   url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
				//   data: {
				//    content:msg
				//   },
				//   method:'post',
				//   success (res) {
				//    this.shareText = res.data
				//   }
				// })
			// if(result.errcode === 0){//合法
			// 	return true
			// }else{
			// 	return false
			// }
		}
	},
	onShow(){
		//每个页面的onshow还会再走
		this.setNavigationBarTitle()
		//获取openid
		if(!this.openId){
			this.getOpenId()
		}
	},
	watch: {
		'_i18n.locale': {
			handler(){
				this.setTabBarItem()
			},
			immediate: true
		}
	}
})