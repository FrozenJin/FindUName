(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/history/share/index"],{"173e":function(e,n,t){"use strict";t.r(n);var o=t("fa43"),s=t("9e7f");for(var a in s)"default"!==a&&function(e){t.d(n,e,function(){return s[e]})}(a);var i=t("2877"),r=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,null,null);n["default"]=r.exports},"27b6":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("db83"),s={data:function(){return{shareText:"",image:"",shareType:1,providerList:[]}},onShareAppMessage:function(){return console.log("onShareAppMessage"),{title:this.shareText?this.shareText:"欢迎体验 name名",path:"/pages/home/index",imageUrl:this.image?this.image:"cloud://finduname-s9wdm.6669-finduname-s9wdm-1259413430/logo/logo.png"}},onLoad:function(e){this.shareText=(0,o.stringFormat)(this.i18n_pages.share.shareText,e.name)},methods:{chooseImage:function(){var n=this;e.chooseImage({count:1,sourceType:["album","camera"],sizeType:["compressed","original"],success:function(e){n.image=e.tempFilePaths[0]}})},compress:function(){console.log("开始压缩");var n=this.image;return new Promise(function(t){var o=plus.io.convertAbsoluteFileSystem(n.replace("file://",""));console.log("after"+o),plus.io.resolveLocalFileSystemURL(o,function(o){o.file(function(o){console.log("getFile:"+JSON.stringify(o)),o.size>20480&&plus.zip.compressImage({src:n,dst:n.replace(".jpg","2222.jpg").replace(".JPG","2222.JPG"),width:"10%",height:"10%",quality:1,overwrite:!0},function(e){console.log("success zip****"+e.size);var o=n.replace(".jpg","2222.jpg").replace(".JPG","2222.JPG");t(o)},function(n){e.showModal({content:"分享图片太大,需要请重新选择图片!",showCancel:!1})})})},function(n){console.log("Resolve file URL failed: "+n.message),e.showModal({content:"分享图片太大,需要请重新选择图片!",showCancel:!1})})})}}};n.default=s}).call(this,t("543d")["default"])},"7bcd":function(e,n,t){"use strict";(function(e){t("005e"),t("921b");o(t("66fd"));var n=o(t("173e"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"9e7f":function(e,n,t){"use strict";t.r(n);var o=t("27b6"),s=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,function(){return o[e]})}(a);n["default"]=s.a},fa43:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},s=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return s})}},[["7bcd","common/runtime","common/vendor"]]]);