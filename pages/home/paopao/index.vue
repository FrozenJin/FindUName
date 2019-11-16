<template>
	<canvas style="width: 100%; height: 100%;position: absolute;top: 0;left: 0;z-index:-1;" canvas-id="firstCanvas"></canvas>
</template>

<script>
	//使用组件好像不行。有空了再看
	let { windowHeight, windowWidth } = wx.getSystemInfoSync()
	export default {
		data() {
			return {
				 paopaoArr:[] ,//气泡
			}
		},
		onReady: function () {
		  setInterval(()=>{
		    this._addPaoPao()
		  },1000/50)
		  setInterval(()=>{
				// console.log(this.paopaoArr.length)
		    this._draw()
		  },1000/60)
		  return
		},
		methods:{
			_addPaoPao(){ // 添加泡泡
			  let pos = {
			    x:Math.random()*windowWidth,
			    y:windowHeight+Math.random()*100
			  }
			  let alpha = 0.1+Math.random()*0.2;
			  let scale = 0.1+Math.random()*0.3;
			  let speed = Math.random();
			  this.paopaoArr.push({
			    pos,
			    alpha,
			    scale,
			    speed,
			    red:255,
			    green:255,
			    blue:255
			  })
			},
			_draw(){
			  let ctx = wx.createCanvasContext('firstCanvas')
			  ctx.clearRect(0,0,windowWidth,windowHeight)
			  this.paopaoArr = this.paopaoArr.filter(paopao=>{
			    return paopao.pos.y > 0 && paopao.alpha > 0
			  })//去除无效泡泡
			  this.paopaoArr.forEach(paopao=>{
			    paopao.pos.y -= paopao.speed;
			    paopao.alpha -= 0.0005;
			    if(paopao.alpha > 0){
			      ctx.save()
			      ctx.beginPath()
			      ctx.setFillStyle(`rgba(${paopao.red},${paopao.green},${paopao.blue},${paopao.alpha})`)
			      ctx.arc(paopao.pos.x, paopao.pos.y, paopao.scale*20, 0, 2*Math.PI)
			      ctx.fill()
			    }
			  })
			  ctx.draw()
			}
		}
	}
</script>

<style>
</style>
