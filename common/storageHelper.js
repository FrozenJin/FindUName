//获取缓存 语言
export function GetStorageLang(){
	let lang = ''
	try {
		lang = uni.getStorageSync('storage_i18n')
	} catch (e) {
		
	}
	lang = lang ? lang : 'zh'
	return lang
}