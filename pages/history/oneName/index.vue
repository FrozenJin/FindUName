<template>
  <div class="oneName">
    <!-- plan1 -->
    <div class="plan1">
      <div class="title"  @click.stop="read(name.name)">
        <span class="name">{{name.name}}</span> 
        <span class="pronunciation margin-left-sm">[{{name.pronunciation}}] 
					<!-- 发音 -->
					<text class="cuIcon-notification text-blue margin-left-sm"></text>
					<!-- 分享 -->
					<!-- <text class="cuIcon-share text-blue padding-sm" @click.stop="shareLink()"></text> -->
				</span>
        <span class="origin">
					{{getLangByKey(name,"origin")}} 		
				</span>
      </div>
      <div class="feature">
        <span>{{getLangByKey(name,"characteristics")}}</span>
      </div>
			<!-- 排行 -->
      <view class="rank"> 
				<img src="/static/images/ranking.png" class="img" /> 
				<text>{{getRank(name.ranked)}}</text>
			</view>
    </div>
    <!-- plan2 -->
    <div class="plan2" style="margin-top:20rpx;">
        <div class="title">
          {{i18n_pages.oneName.meaning}}
        </div>
        <div class="divLine"></div><!-- 分割线 -->
        <div class="detail">
          {{getLangByKey(name,"meaning")}}
        </div>
    </div>
    <!-- plan3 -->
    <div class="plan2" style="margin-top:20rpx;">
        <div class="title">
         {{i18n_pages.oneName.famous}}
        </div>
        <div class="divLine"></div><!-- 分割线 -->
        <div class="detail"> 
					{{getLangByKey(name,"celebritiesing")}}
        </div>
    </div>
  </div>
</template>

<script>
// import names from '@/static/json/nameLang.js'
const db = wx.cloud.database()
const allNameSet = db.collection('AllName')

import { hisMixin } from '@/pages/history/mixin'
export default {
	mixins:[hisMixin],
  data () {
    return {
      name :{},
    }
  },
  onShow(){
    allNameSet
		.where({name:this.$store.getters.oneName.name})
		.get().then(res=>{
			this.name = res.data[0]
		})
  },
	methods:{
		shareLink(){
			let name = this.$store.getters.oneName.name
			uni.navigateTo({
				url:`/pages/history/share/index?name=${name}`
			})
		}
	}
}
</script>

<style>
page{
  height: 100%;
  width:100%;
  background-color:#eee;
}
</style>
<style scoped lang="less">
.oneName{
  height: 100%;
  width: 100%;
  .plan1{
    padding: 0 30rpx;
    background-color:#fff;
    .title{
      font-size: 35rpx;
      // font-weight: 600;
      padding: 25rpx 0;
      position: relative;
			.name{
				font-weight: 600;
			}
      .pronunciation{
        font-size: 30rpx;
        color:#7d7e80;
      }
      .origin{
         position: absolute;
         right:0;
         top:50%;
         transform: translateY(-50%);
         font-size: 25rpx;
         font-weight: normal;
         color:#999;
      }
    }
    .feature{
      font-size: 30rpx;;
      color:#7d7e80;
    }
    .rank{
      font-size: 30rpx;
      color:#7d7e80;
      padding: 25rpx 0;
			display:flex;
			// line-height:center;
			img{
				height: 45rpx;
				width:45rpx;
				vertical-align:middle;
				transform: translateY(0rpx);
				margin-right: 10rpx;
			}
    }
  }
  .plan2{
    // padding: 0 30rpx;
    background-color:#fff;
    box-sizing: border-box;
    .title{
      font-size: 30rpx;
      padding: 25rpx;
      box-sizing: border-box;
      color: black;
      font-weight: 600;
    }
    .detail{
      padding: 25rpx;
      font-size: 25rpx;
    }
  }
}
.divLine{
  background: #E0E3DA;
  width: 100%;
  height: 5rpx;
}

</style>
