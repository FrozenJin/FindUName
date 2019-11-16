<script>
	export default {
		created () {
			if (!wx.cloud) {
			  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			} else {
			  wx.cloud.init({
			    traceUser: true,
			  })
			}
		},
		onLaunch: function() {
			// let name = ()=> require('@/static/json/nameLang.js')
			// console.log(name)
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	
	@import "common/uni.css";
	@import "/wxcomponents/vant/common/index.wxss";
</style>
