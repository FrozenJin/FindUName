<template>
  <view class="home" :style="{'background-color':bgColor}">
    <!-- <img class='background' src="/static/images/bg/title.png"  /> -->
		<view class="box">
			<!-- 描述 -->
      <view class="title" style="font-weight: 600;">
				{{i18n_pages.selectFeature.desc}}
			</view>
			<!-- 特性 -->
			<view class="featrue">
				<van-col
					 v-for="(item,index) in features"
					 :key="index"
					 custom-class="col"
					 span="6">
					<view class="imgContent" @click="clickFeature(index)" >
						 <img :src=" '/static/images/featrue/'+item.text+ '.png'" class="img" />
						 <view class="selected" v-if="item.selected"></view>
					</view>
					<view class="text" :style="{'color' : item.selected ? '#fff':'#000'}">
						 {{ _getFeatureText(item) }}
					</view>
				</van-col>
			</view>
			<!-- 开始按钮 -->
			<view class="btn">
				<!-- <button class="cu-btn text-blue shadow round" @click="go()">
					{{i18n_pages.selectFeature.go}}
				</button> -->
				<button class="cu-btn round line-purple shadow" @click="go()">
					{{i18n_pages.selectFeature.go}}
				</button>
			</view>
		
		</view>
		
		
		<!-- 提示没有机会了 -->
		<view class="cu-modal" :class="noChanceModal?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="padding-xl">
					{{i18n_pages.selectFeature.noChance}}
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn round line-purple shadow margin-left" @tap="hideModal">{{i18n_pages.button.comfirm}}</button>
					</view>
				</view>
			</view>
		</view>
		
  </view>
</template>

<script>
const db = wx.cloud.database()
const userInfoSet = db.collection('UserInfo')
const userCountSet = db.collection('UserCount')
const allName = db.collection('AllName')
const _ = db.command
// import name from '@/static/json/nameLang.js'
// var name = require('@/static/json/nameLang.js')  
import {formatTime} from '@/common'
import {features} from './features.js' 
export default {
	onShow(){
		// allName.where({
		// 	gender:'girl',
		// 	characteristics: /(?=.*Achiever)(?=.*Problem-solver)(?=.*Wise)^.*$/i    ///\b(Achiever|Problem-solver)\b/i
		// }).get().then(res=>{
		// 	console.log(res)
		// })
		
	},
  data () {
    return {
			gender:'男',
			noChanceModal:false,
			name:[],
			luckyNames:[],
      features 
		}
  },
	computed: {
		bgColor() {
			if(this.$store.getters.selectGender == 'boy'){
				return 'rgba(119,157,202,.3)'
			}else{
				return 'rgba(244,175,196,.5)'
			}
		},
		selectFeature(){//选中的特性
			let selectFeature = this.features.filter(i => {
			  return i.selected
			}).map(i => {
			  return i.text
			})
			return selectFeature
		}
	},
	methods:{
		_getFeatureText(feature){//获取特性的显示内容（中 英）
			let text = feature['text_' + this._i18n.locale]
			return text
		},
		clickFeature(index){
			let selectedItems = this.features.filter(item=>{
				return item.selected
			})
			//最多三个
			if(this.features[index].selected == false && selectedItems.length == 3){
				return
			}
			//选中
			this.features[index].selected = !this.features[index].selected
		},
		go:async function(){ // 根据选择的特性 生成名字
			//'o-O3q4hB8pbAWheizqubEkNxp5CE',
			let freeList = ['o-O3q4oSsg2fZoAVU_uAXtE9umvs','o-O3q4iciNyL-gcNxCqSyIXmKrIw','o-O3q4ifYFiqPjcQAF6fp6KHN4JI'] // 可以无限生成name的白名单
			if(!freeList.includes(this.$store.getters.openId)){
				if(!this.$store.getters.canGenName){
					this.noChanceModal = true
					return
				}
			}
			//选中的特性
			if(this.selectFeature.length == 0){
				return
			}
			//幸运名 3个
			// let luckyName = this.getName().filter((name,index)=>{
			// 	return index <= 2
			// })
      let luckyName = await this._getThreeName()
			// console.log(luckyName)
			let data = {
        openId : this.$store.getters.openId,
				createTime : formatTime(new Date()),
				selectFeature : this.selectFeature,
				selectGender : this.$store.getters.selectGender,
				luckyName
			}

      Promise.all([this._addCount(),this._addName(data)])
      .then(res=>{
        uni.hideLoading()
        uni.switchTab({
          url: "/pages/history/index"
        })
      })
		},
    _addCount(){ //添加用户的命名次数
      userCountSet.where({
        _openid: this.$store.getters.openId
      })
      .get()
      .then(res => {
        //890198e15d541d60143a4e1603aa90b5
        let {count , isShared , _id} = res.data[0]

        userCountSet
        .doc(_id)
        .update({
          data: {
            count:count +1
          }
        }).then()
      })
    },
    _addName(data){ //添加用户的命名
      userInfoSet.add({
        data
      })
    },
		_getName_old(){ //获取名字
		  let names = []
		  if (this.$store.getters.selectGender == "boy"){
		    names = this.name.boys
		  }else{
		    names = this.name.girls
		  }

		  let selectedFeature = this.features.filter(i => {
		    return i.selected
		  }).map(i => {
		    return i.text
		  })

		  names = names.filter(item=>{
		    let res = true

		    // let curFeatures = Array.isArray(item.characteristics) ? item.characteristics : item.characteristics.split(',')
		    // curFeatures.forEach((f,index) => {
		    //   curFeatures[index] = f.trim()
		    // })
		    // let allIn = selectedFeature.some(i=>{
		    //   return !curFeatures.includes(i)
		    // })
		    // if (allIn) {
		    //   res = false
		    // }

        res = selectedFeature.some(i=>{
          // console.log(item.Characteristics)
          return item.characteristics && item.characteristics.toLowerCase().indexOf(i.toLowerCase()) >= 0
        })

		    return res
		  })

		  // names.forEach(i=>{
		  //   let arr = i.characteristics.split(',')
		  //   arr.forEach((f, index) => {
		  //     arr[index] = f.trim()
		  //   })
		  //   i.characteristicsArr = arr
		  // })
		  names.sort((a, b)=>{
		    return Math.random() > .5 ? -1 : 1;
		  })
		  // console.log(names)
		  return names
		},
		_getName:async function(features) {//获取名字
			const $ = db.command.aggregate
			//拼接 模糊匹配 STR
			let regexp = ''
			// this.selectFeature.forEach(it=>{
			// 	regexp += `(?=.*${it})`
			// })
			features.forEach(it=>{
				regexp += `(?=.*${it})`
			})
			regexp += '^.*$'
			
			let result = await allName.aggregate()
				.match({
					gender : this.$store.getters.selectGender, // 性别
					characteristics:db.RegExp({ // 模糊匹配特性
						regexp,
						options: 'i',
					}) 
					///(?=.*Achiever)(?=.*Problem-solver)(?=.*Wise)^.*$/i
				})
				.sample({
					size: 3
				})
				.end()
			
			//没有数据的特殊处理
			let list = result.list
			return list
		},
		//不管什么情况获取3个名字
		_getThreeName:async function(){
			let firstGetedNames = await this._getName(this.selectFeature) //第一个获取的
			// console.log(`firstGetedNames:{firstGetedNames}`)
			if(firstGetedNames.length < 3){
				let funcArr = []
				features.forEach(f=>{
					funcArr.push(this._getName([f]))
				})
				//同步执行多个promise
				await Promise.all(funcArr).then(res=>{
					//结果 乱序下
					let secendGetNames = Array.from(new Set(res.flat(Infinity))).sort((a, b)=>{
						return Math.random() > .5 ? -1 : 1;
					})
					//补足3个结果
					secendGetNames.forEach(i=>{
						//是否已经有同名
						let hasNameFunc = function () {
							return firstGetedNames.some(it=>{
								return it.name === i.name
							})
						}
						if(firstGetedNames.length<3 && !hasNameFunc()){
							firstGetedNames.push(i)
						}
						// console.log(`firstGetedNames2:{firstGetedNames}`)
					})
				})
			}
			// console.log(`firstGetedNames3:{firstGetedNames}`)
			return firstGetedNames
		},
		hideModal(){//隐藏模态框
			this.noChanceModal = false
		}
	}
}
</script>
<style lang="less">
	page{
		height: 100%;
	}

</style>
<style scoped lang="less">
	.home{
    .title{
      font-size: 30rpx;
      // text-shadow:0 0 5px #CCCCCC, 0 0 10px #CCCCCC, 0 0 15px #CCCCCC, 0 0 20px rgb(119,157,202), 0 0 25px rgb(119,157,202), 0 0 30px rgb(119,157,202), 0 0 50px rgb(119,157,202), 0 0 80px rgb(119,157,202), 0 0 100px rgb(119,157,202), 0 0 150px rgb(119,157,202);
      color: #7d7e80;
      text-align: center;
      margin-bottom: 20rpx;
    }
		//background-color:rgba(244,175,196,.3);
		// background-color:rgba(119,157,202,.5);
		height: 100%;
		width:100%;
		overflow: hidden;
    .background {
      width: 100%;
      padding: 0 80rpx;
      margin-bottom: 50rpx;
      height: 300rpx;
      box-sizing: border-box;
      // height: 100%;
      // position:fixed;
      background-size:100% 100%;
      z-index: 1;
    }
		.box{
			// position: absolute;
      margin-top: 160rpx;
			width: 100%;
      height: 100%;
			// top: 36%;
			border-radius: 5px;
			box-sizing: border-box;
			padding: 10px;
			.featrue{
				margin-bottom: 30rpx;
				overflow: hidden;
				.imgContent{
					position:relative;
					margin-top: 10px;
					text-align: center;
					overflow: auto;
					.img {
						width: 50px;
						height: 50px;
						color: #323233;
					}
				  .selected{
						width:5px;
						height:5px;
						line-height:5px;
						font-size:10px;
						color:#fff;
						text-align:center;
						background-color:#f00;
						border-radius:50%;
						position:absolute;
						left: 50%;
						bottom: 5%;
						transform: translateX(-50%);
				  }
				}
				.text {
					text-align: center;
					position:relative;
					font-size: 25rpx;
					padding: 0 0px;
					line-height: 14px;
					// color: #7d7e80;
          font-weight: 600;
				}
			}
			.btn{
				text-align: center;
				// color: white;
			}
		}
	}

</style>
