export const paopao = {
	data() {
		
	},
	onReady: function () {
	  setInterval(()=>{
	    this._addPaoPao()
	  },1000/150)
	  setInterval(()=>{
	    this._draw()
	  },1000/160)
	  return
	},
	methods:{
		_addPaoPao(){ // 添加泡泡
			if(this.paopaoArr.length>150){
				return
			}
		  let pos = {
		    x:Math.random()*this.windowWidth,
		    y:this.windowHeight+Math.random()*100
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
		  let ctx = uni.createCanvasContext('firstCanvas')
		  ctx.clearRect(0,0,this.windowWidth,this.windowHeight)
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
			// console.log(this.paopaoArr.length)
		  ctx.draw()
		}
	}
}