<template>
  <div class="mine">
    <swiper class='v115-class-goods-scroll'
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      indicator-active-color="rgba(255,255,255,0.6)"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="item" class="slide-image">
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
	onShow(){
		let ex = this._i18n.locale === 'zh'?'_zh':''
		this.imgUrls.push(`cloud://finduname-s9wdm.6669-finduname-s9wdm/aboutUs/about-us${ex}.jpg`)
		this.imgUrls.push(`cloud://finduname-s9wdm.6669-finduname-s9wdm/aboutUs/about-me${ex}.jpg`)
	},
  data () {
    return {
      imgUrls: [
        // 'cloud://finduname-s9wdm.6669-finduname-s9wdm/aboutUs/about-us_zh.jpg',
        // 'cloud://finduname-s9wdm.6669-finduname-s9wdm/aboutUs/about-me_zh.jpg',
      ],
      indicatorDots: true,
      autoplay: false,
      interval: 5000,
      duration: 1000
    }
  },
  methods:{
  }
}
</script>

<style>
page{
  height: 100%;
  width:100%;
}
swiper {
  display:block;
  height:100%;
}
.v115-class-goods-scroll .wx-swiper-dots.wx-swiper-dots-horizontal{
     margin-bottom: 20rpx;
     /* margin-left: -30rpx; */
}
</style>
<style scoped lang="less">
.mine{
  height: 100%;
  width:100%;
  img{
    height: 100%;
    width:100%;
  }
}
</style>
