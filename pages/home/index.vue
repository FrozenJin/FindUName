<template>
	<view class="gender">
    <canvas style="width: 100%; height: 100%;position: absolute;top: 0;left: 0;z-index:-1;" canvas-id="firstCanvas"></canvas>
   <img class='background' src="/static/images/bg/title.png"  />
    <view class="img-content">
      <view class="imgDiv boy" >
         <img src="/static/images/bg/boy.png" class="img" @click="goToSelectFeature('boy')"/>
      	 <view class="text color1" >{{i18n_pages.home.boy}}</view>
      </view>
      <view class="imgDiv girl" >
         <img src="/static/images/bg/girl.png" class="img" @click="goToSelectFeature('girl')" />
      	 <view class="text color2" style="animation-delay: 1.5s;">{{i18n_pages.home.girl}}</view>
      </view>
    </view>
  </view>
</template>

<script>
	import SimpleCanvas from 'simple-canvas-posters'
	import { paopao } from './paopao/paopaoMixin.js'
	let { windowHeight, windowWidth } = wx.getSystemInfoSync()
	let ctx = {} ;
	const db = wx.cloud.database()
	const userInfoSet = db.collection('UserInfo')
	const userCountSet = db.collection('UserCount')
	let paopaoArr = []
	export default {
		// mixins:[paopao],
		data() {
			return {
				 paopaoArr:[] ,//气泡
				 windowHeight,
				 windowWidth,
				 isAdding:false,
				 isDrawing:false
			}
		},
		async onShow(){
			//确保有openId 才走后续逻辑
			if(!this.openId){
				await this.getOpenId()
			}
			this.getUserNameChance()
		},
		onReady:async function () {
			ctx = uni.createCanvasContext('firstCanvas')
		  setInterval(()=>{
		    this._addPaoPao()
		  },1000/50)
		  setInterval(()=>{
		    this._draw()
		  },1000/60)
			// this.drawCanvas()
			// let isOk = await this.msgSecCheck("")
			// if(isOk){//合法
			// 	console.log("合法")
			// }else{
			// 	console.log("no合法")
			// }
		},
		methods:{
			_addPaoPao(){ // 添加泡泡
				if(this.isAdding || this.paopaoArr.length > 220){//正在添加
					return
				}
				this.isAdding = true //添加开始
			  let pos = {
			    x:Math.random()*windowWidth,
			    y:windowHeight+Math.random()*100
			  }
			  let alpha = 0.1+Math.random()*0.2;
			  let scale = 0.1+Math.random()*0.3;
			  let speed = Math.random();
				
				// this.paopaoArr.push({
				this.paopaoArr.push({	
					pos,
					alpha,
					scale,
					speed,
					red:255,
					green:255,
					blue:255
				})
				this.isAdding = false //添加结束
			},
			_draw(){ //画泡泡
			  // ctx.clearRect(0,0,windowWidth,windowHeight)
				// console.log(`${windowWidth};${windowHeight}`)
				//320;456
			  // this.paopaoArr = this.paopaoArr.filter(paopao=>{
			  //   return paopao.pos.y > 0 && paopao.alpha > 0
			  // })//去除无效泡泡
				
				if(this.isDrawing){//正在画
					return
				}
				this.isDrawing = true
				this.paopaoArr = this.paopaoArr.filter(paopao=>{
				  return paopao.pos.y > 0 && paopao.alpha > 0
				})//去除无效泡泡
			  // this.paopaoArr.forEach(paopao=>{
				this.paopaoArr.forEach(paopao=>{	
			    paopao.pos.y -= paopao.speed;
			    paopao.alpha -= 0.0005;
			    if(paopao.alpha > 0 
							&& (paopao.pos.x < windowWidth && paopao.pos.x > 0) 
							&& (paopao.pos.y < windowHeight && paopao.pos.y > 0 )){
			      // ctx.save()
			      ctx.beginPath()
			      ctx.arc(paopao.pos.x, paopao.pos.y, paopao.scale*20, 0, 2*Math.PI)
						ctx.setFillStyle(`rgba(${paopao.red},${paopao.green},${paopao.blue},${paopao.alpha})`)
						ctx.fill()
					}
			  })
			  ctx.draw()
				this.isDrawing = false //画结束
			},
			goToSelectFeature(type){//到选特性页面
				this.$store.dispatch("setSelectGender", type)
				this.navigateTo('/pages/home/selectFeature/index')
			},
			getUserNameChance(){//获取用户还可以命名的次数
				// console.log('openid:',this.openId)
				userCountSet.where({}).get()
				.then(res=>{
					//次数不够
					if(res.data[0] && res.data[0].count<3){
						this.$store.dispatch("setCanGenName", true)
					}
					//初始化
					!res.data[0] && this.initUserNameChance()
				})
			},
			initUserNameChance(){//init 用户命名次数
				this.$store.dispatch("setCanGenName", true)
				let data =  {
					count:0 ,
					openId : this.openId,
					isShared:false
				}
				userCountSet.add({data})
				.then(res => {
				})
			},
			drawCanvas(){//画海报测试
				const canvas = new SimpleCanvas({
				  scale: 1,
				  canvasId: 'firstCanvas'
				});
				canvas
				  .createArtboard({
				    id: 'share',
				    backgroundColor: '#eee',
				    width: 375,
				    height: 600
				  })
				  .drawCircleImage({
				    id: 'avatar',
				    path:
				      'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqML1IepKLibmc8XmO9pUKRh41ghjMZ8Kl3aQgmxwibC9PTRngUicicthczHGO6icyWgCYKPztcKa1NsOA/132',
				    left: 10,
				    top: 10,
				    d: 60
				  })
				  .drawWrapText({
				    id: 'nickname',
				    fontSize: 16,
				    text: `超级大魔王~`,
				    // 位置参照
				    referLayer: {
				      id: 'avatar',
				      left: 12,
				      top: -(canvas.avatar.height / 2 + 8)
				    }
				  })
					.drawWrapText({
					  id: 'text',
					  fontSize: 16,
					  text: `1111111111111122222222222222222222222222222222222222222222222222222222222222222222222222222222222222`,
					  left: 10,
					  top: 20+canvas.avatar.height,
					  d: 60
					})
					.drawWrapText({
					  id: 'text2',
					  fontSize: 16,
					  text: `hello`,
						left: 10,
					  referLayer: {
					    id: 'text'
					  }
					})
				  .draw();
			}
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.gender{
	  position: relative;
	  z-index: 1000;
	  height: 100%;
	  background-color: rgba(248, 131, 121, 1);
	  .background {
	    width: 100%;
	    padding: 0 80rpx;
	    margin-bottom: 200rpx;
	    height: 300rpx;
	    box-sizing: border-box;
	    background-size:100% 100%;
	    z-index: 1;
	  }
		box-sizing: border-box;
		height: 100%;
		overflow: hidden;
	  position: relative;
	  .img-content{
	    display: flex;
	    text-align: center;
	    .color1{
				text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px rgb(119,157,202), 0 0 25px rgb(119,157,202), 0 0 30px rgb(119,157,202), 0 0 50px rgb(119,157,202), 0 0 80px rgb(119,157,202), 0 0 100px rgb(119,157,202), 0 0 150px rgb(119,157,202);
	    }
	    .color2{
				text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px rgb(244,175,196), 0 0 25px rgb(244,175,196), 0 0 30px rgb(244,175,196), 0 0 50px rgb(244,175,196), 0 0 80px rgb(244,175,196), 0 0 100px rgb(244,175,196), 0 0 150px rgb(244,175,196);
	    }
	    .text{
	      color: darkblue;
	      font-weight: 600;
	    }
	    .imgDiv{
	      width: 50%;
	      height: 350rpx;
	      .img{
	        height: 80%;
	        width: 80%;
	      }
	    }
	  }
	}
	.arktitle {
	    // font-weight: bold;
	    // background: linear-gradient(to right, red, blue);
	    color: transparent;
	    animation: blink 3s linear infinite;
	
	}
	@keyframes blink{
	  0%{opacity: 1;}
	  50%{opacity: 0.5;}
	  100%{opacity: 1;}
	}
</style>
