(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{SnC3:function(e,t,r){"use strict";r.r(t);var a=r("VX+z"),i=r.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(o);t.default=i.a},"VX+z":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(r("QbLZ"));r("lpfh");var i=o(r("s9FF"));function o(e){return e&&e.__esModule?e:{default:e}}t.default=(0,a.default)({name:"worth-mentioning-config-view"},i.default)},dY5s:function(e,t,r){"use strict";r.r(t);var a=r("mh4A"),i=r("SnC3");for(var o in i)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return i[e]}))}(o);var p=r("KHd+"),s=Object(p.a)(i.default,a.a,a.b,!1,null,null,null);t.default=s.exports},mh4A:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return i}));var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"worth-mentioning-config-h5-box"},[r("Card",{attrs:{header:e.typeCopywriting[e.type].title}}),e._v(" "),r("Card",{attrs:{header:"APPID："}},[r("CardRow",{attrs:{description:e.typeCopywriting[e.type].appIdDescription},scopedSlots:e._u([{key:"tail",fn:function(){return[r("a",{staticStyle:{"margin-left":"15px"},attrs:{href:e.typeCopywriting[e.type].url,target:"_blank"}},[e._v("未申请？点此申请")])]},proxy:!0}])},[r("el-input",{model:{value:e.appId,callback:function(t){e.appId=t},expression:"appId"}})],1)],1),e._v(" "),r("Card",{attrs:{header:"App secret："}},[r("CardRow",{attrs:{description:e.typeCopywriting[e.type].appSecretDescription}},[r("el-input",{model:{value:e.appSecret,callback:function(t){e.appSecret=t},expression:"appSecret"}})],1)],1),e._v(" "),"wx_miniprogram"===e.type?r("Card",{attrs:{header:"开启小程序视频功能："}},[r("CardRow",{attrs:{description:"开启后，在小程序前台将展示视频内容，并且可进行视频内容的发布。开启前，请务必确保您的小程序已有相应的视频播放类目的权限。具体类目权限请"},scopedSlots:e._u([{key:"tail",fn:function(){return[r("a",{attrs:{href:e.typeCopywriting[e.type].url,target:"_blank"}},[e._v("点此查看")])]},proxy:!0}],null,!1,961249041)},[r("el-switch",{attrs:{"active-color":"#336699","inactive-color":"#bbbbbb"},model:{value:e.closeVideo,callback:function(t){e.closeVideo=t},expression:"closeVideo"}})],1)],1):e._e(),e._v(" "),r("Card",{staticClass:"footer-btn"},[r("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.submitConfiguration}},[e._v("提交")])],1)],1)},i=[]},s9FF:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o(r("4gYi")),i=o(r("pNQN"));function o(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{loginStatus:"default",appId:"",appSecret:"",type:"",prefix:"",closeVideo:!1,typeCopywriting:{wx_offiaccount:{title:"公众号配置",appIdDescription:"填写申请公众号后，你获得的APPID ",appSecretDescription:"填写申请公众号后，你获得的App secret",serverUrl:"服务器地址URL",appToken:"填写长度为3-32字符，必须为英文或数字的字符。或",encodingAESKey:"消息加密密钥由43位字符组成，可随机修改，字符范围为A-Z，a-z，0-9。或",url:"https://mp.weixin.qq.com/"},wx_miniprogram:{title:"小程序配置",appIdDescription:"填写申请小程序后，你获得的APPID ",appSecretDescription:"填写申请小程序后，你获得的App secret",closeVideo:"开启后，在小程序前台将展示视频内容，并且可进行视频内容的发布。开启前，请务必确保您的小程序已有相应的视频播放类目的权限。具体类目权限请 点此查看",url:"https://developers.weixin.qq.com/miniprogram/product/material/"},wx_oplatform:{title:"PC端微信扫码登录",appIdDescription:"填写申请PC端微信扫码后，你获得的APPID ",appSecretDescription:"填写申请PC端微信扫码后，你获得的App secret",url:"https://open.weixin.qq.com/"}},serverUrl:"",appToken:"",encodingAESKey:""}},created:function(){var e=this.$route.query.type;this.type=e,this.loadStatus()},methods:{loadStatus:function(){var e=this;this.appFetch({url:"forum_get_v3",method:"get",data:{}}).then((function(t){if(t.errors)e.$message.error(t.errors[0].code);else{if(0!==t.Code)return void e.$message.error(t.Message);e.getPrefix(e.type,t)}})).catch((function(e){}))},submitConfiguration:function(){var e=this,t=[];t=[{key:this.prefix+"app_id",value:this.appId,tag:this.type},{key:this.prefix+"app_secret",value:this.appSecret,tag:this.type},{key:this.prefix+"video",value:this.closeVideo,tag:"wx_miniprogram"}],"wx_offiaccount"===this.type&&t.push({key:"oplatform_url",value:this.serverUrl,tag:"wx_oplatform"},{key:"oplatform_app_token",value:this.appToken,tag:"wx_oplatform"},{key:"oplatform_app_aes_key",value:this.encodingAESKey,tag:"wx_oplatform"}),this.appFetch({url:"settings_post_v3",method:"post",data:{data:t}}).then((function(t){if(t.errors)e.$message.error(t.errors[0].code);else{if(0!==t.Code)return void e.$message.error(t.Message);e.$message({message:"提交成功",type:"success"})}}))},getPrefix:function(e,t){var r=t.Data;switch(e){case"wx_offiaccount":this.prefix="offiaccount_",this.appId=r.passport.offiaccountAppId,this.appSecret=r.passport.offiaccountAppSecret,this.serverUrl=r.passport.oplatformUrl,this.appToken=r.passport.oplatformAppToken,this.encodingAESKey=r.passport.oplatformAppAesKey;break;case"wx_miniprogram":this.prefix="miniprogram_",this.appId=r.passport.miniprogramAppId,this.appSecret=r.passport.miniprogramAppSecret,this.closeVideo=r.setSite.miniprogramVideo;break;case"wx_oplatform":this.prefix="oplatform_",this.appId=r.passport.oplatformAppId,this.appSecret=r.passport.oplatformAppSecret}},randomClick:function(e){if("token"===e)this.appToken=Math.random(Date.parse(new Date)).toString(35).substr(2);else if("aes"===e){for(var t="",r=0;r<5;r++)t+=Math.random(Date.parse(new Date)).toString(35).substr(2);this.encodingAESKey=t.slice(0,43)}}},components:{Card:a.default,CardRow:i.default}}}}]);