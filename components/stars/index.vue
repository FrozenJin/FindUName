<template>
	<!-- 流星 -->
	<view class='space'>
		<view class="stars ">
			<view class="star "></view>
			<view class="star pink "></view>
			<view class="star blue "></view>
			<view class="star yellow "></view>
	  </view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.space {
		 position: absolute;
		 top: 0;
		 left: 0;
		}
		.planet {
		    width: 150rpx;
		    height: 150rpx;
		    border-radius: 50%;
		    background: #333;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    margin: -75rpx 0 0 -75rpx;
		    overflow: hidden;
		    z-index: 2;
		}
		.planet_shadow {
		    position: absolute;
		    border-radius: 50%;
		    height: 100%;
		    width: 100%;
		    top: -40%;
		    right: -10%;
		    border: 35rpx solid rgba(0, 0, 0, .15);
		}
		.star {
		    display: block;
		    width: 5rpx;
		    height: 5rpx;
		    border-radius: 50%;
		    background: #FFF;
		    top: 100rpx;
		    left: 400rpx;
		    position: relative;
		    transform-origin: 100% 0;
		    animation: star-ani 6s infinite ease-out;
		    box-shadow: 0 0 5rpx 5rpx rgba(255, 255, 255, .3);
		    opacity: 0;
		    z-index: 2;
		}
		.star:after {
		    content: '';
		    display: block;
		    top: 0rpx;
		    left: 4rpx;
		    border: 0rpx solid #fff;
		    border-width: 0rpx 90rpx 2rpx 90rpx;
		    border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		    transform: rotate(-45deg) translate3d(1rpx, 3rpx, 0);
		    box-shadow: 0 0 1rpx 0 rgba(255, 255, 255, .1);
		    transform-origin: 0% 100%;
		    animation: shooting-ani 3s infinite ease-out;
		}
		.pink {
		    top: 30rpx;
		    left: 395rpx;
		    background: #ff5a99;
		    animation-delay: 5s;
		    -webkit-animation-delay: 5s;
		    -moz-animation-delay: 5s;
		}
		.pink:after {
		    border-color: transparent transparent transparent #ff5a99;
		    animation-delay: 5s;
		    -webkit-animation-delay: 5s;
		    -moz-animation-delay: 5s;
		}
		.blue {
		    top: 35rpx;
		    left: 432rpx;
		    background: cyan;
		    animation-delay: 7s;
		    -webkit-animation-delay: 7s;
		    -moz-animation-delay: 7s;
		}
		.blue:after {
		    /* border-color: transpareanimation-delay: 12s; */
		    -webkit-animation-delay: 7s;
		    -moz-animation-delay: 7s;
		    animation-delay: 7s;
		}
		.yellow {
		    top: 50rpx;
		    left: 600rpx;
		    background: ffcd5c;//#
		    animation-delay: 5.8s;
		}
		.yellow:after {
		    border-color: transparent transparent transparent #ffcd5c;
		    animation-delay: 5.8s;
		}
		@keyframes star-ani {
		    0% {
		        opacity: 0;
		        transform: scale(0) rotate(0) translate3d(0, 0, 0);
		        -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		        -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
		    }
		    50% {
		        opacity: 1;
		        transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		        -webkit-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		        -moz-transform: scale(1) rotate(0) translate3d(-200rpx, 200rpx, 0);
		    }
		    100% {
		        opacity: 0;
		        transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		        -webkit-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		        -moz-transform: scale(1) rotate(0) translate3d(-300rpx, 300rpx, 0);
		    }
		}
	
</style>
