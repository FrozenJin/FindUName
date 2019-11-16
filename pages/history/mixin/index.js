export const hisMixin = {
	methods:{
		//获取排行
		getRank(item){ 
		  return item && item.split(' ')[0].replace("#","")
			// return item && item.replace("#","")
		},
		//根据key获取item多语言value
		getLangByKey(item,key){
			//多语言的key
			let langKey = this._i18n.locale === 'en' ? key : key + '_' + this._i18n.locale
			let val = item[langKey] ? item[langKey] : item[key]
			return val
		},
		//单词发音触发函数
		read: function(name) {
			const innerAudioContext = wx.createInnerAudioContext()
			innerAudioContext.autoplay = true
			innerAudioContext.src = `cloud://finduname-s9wdm.6669-finduname-s9wdm/wordMp3/${name}.mp3`
			innerAudioContext.onPlay(() => {
			})
			innerAudioContext.onError((res) => {
			})
		},
	}
}