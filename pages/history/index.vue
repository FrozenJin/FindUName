<template>
  <div class="history">
    <div :key="index" v-for="(oneSelect,index) in luckyNames" >
      <div :key="index2" v-for="(item,index2) in oneSelect.luckyName" >
        <div class="nameCard" @click="goOneName(item)">
					<!-- 左边 名 -->
          <div class="left">
            <div class="circle"
              :style="{backgroundColor: oneSelect.selectGender === 'boy' ?'rgba(119,157,202,1)':'rgba(244,175,196,1)'}">
              {{item.name}}
            </div>
          </div>
          <div class="right">
						<!-- 发音 & 分享 -->
            <div class="pronunciation van-ellipsis" @click.stop="read(item.name)">
              <span style="color:#7d7e80">[</span>
                {{item.pronunciation}}
              <span style="color:#7d7e80">]</span>
							<!-- 发音 -->
							<text class="cuIcon-notification text-blue margin-left-sm"></text>
							<!-- 分享 -->
							<!-- <text class="cuIcon-share text-blue padding-sm" @click.stop="shareLink(item.name)"></text> -->
            </div>
						<!-- 描述 最多2行-->
            <div class="desc van-multi-ellipsis--l2">{{getLangByKey(item,"meaning")}}</div>
						<!-- 排名 -->
            <div class="rank"> 
							<img src="/static/images/ranking.png" class="img" /> 
							<text>{{getRank(item.ranked)}}</text>
						</div>
						<!-- 右箭头 -->
            <div class="go-icon">
                <img src="/static/images/go.png">
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
const db = wx.cloud.database()
const userInfoSet = db.collection('UserInfo')

import { hisMixin } from '@/pages/history/mixin'
export default {
	mixins:[hisMixin],
  data () {
    return {
      luckyName : [] ,
      luckyNames : []
		}
  },
  computed:{
    openId(){
      return this.$store.getters.openId
    }
  },
  onShow(){
    wx.showLoading({
      title: '加载中...',
    })
    userInfoSet.where({ _openid: this.$store.getters.openId}).get().then(res=>{
      this.luckyNames = res.data
      wx.hideLoading()
      // this.luckyName = res.data[0].luckyName
    })
  },
	methods:{
    goOneName(item){ // 跳转到一个名字的详细内容
      this.$store.dispatch("setOneName", item)
			this.navigateTo('/pages/history/oneName/index')
    },
		shareLink(name){
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
  background-color:#efefef;
}
</style>
<style scoped lang="less">
.history{
  height: 100%;
  width:100%;
  // overflow: hidden;
  padding: 10rpx;

  box-sizing: border-box;
  .nameCard{
    display: flex;
    width:100%;
    height: 250rpx;
    .left{
      position:relative;
      width: 160rpx;
      .circle{
        position: absolute;
        right: 0;
        top:50%;
        transform: translateY(-50%);
        width: 160rpx;
        height: 160rpx;
        // margin-top:30rpx;
        box-sizing: border-box;
        background-color: #1989fa;
        /* border: 2px solid #1989fa; */
        border-radius: 50%;
        text-align: center;
        line-height: 160rpx;
        color: white;
        font-size: 30rpx;
        font-weight: 600;
      }
    }
    .right{
      position:relative;
      padding: 0 10px 0 10px;
      min-width:0;
      -webkit-flex:1;
      flex:1;
      position: relative;
      .pronunciation{
        margin-top: 30rpx;
        font-size: 30rpx;
      }
      .desc{
        margin: 10rpx 0 0 0;
        font-size: 25rpx;
        color:#7d7e80;
        /* line-height: 10px; */
      }
      .rank{
        font-size: 28rpx;
        color:#7d7e80;
        // padding: 25rpx 0;
				display:flex;
      	// line-height:center;
      	img{
      		height: 36rpx;
      		width: 36rpx;
      		vertical-align:middle;
      		transform: translateY(0rpx);
      		margin-right: 10rpx;
      	}
      }
      .go-icon{
        position: absolute;
        right: 0;
        top:50%;
        transform: translateY(-50%);
        img{
          height: 50rpx;
          width:50rpx;
        }
      }
    }
  }
  .opendId{
    font-size: 20rpx;
    padding: 20rpx;
    text-align: center;
  }
}
</style>
