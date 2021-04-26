(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"4d7F":function(e,t,i){e.exports={default:i("aW7e"),__esModule:!0}},"4vOA":function(e,t,i){"use strict";i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return s}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"site-set-box"},[i("Card",{attrs:{header:"站点名称："}},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的名称"}},[i("el-input",{attrs:{placeholder:"站点名称"},model:{value:e.siteName,callback:function(t){e.siteName=t},expression:"siteName"}})],1)],1),e._v(" "),i("Card",{attrs:{header:"站点介绍："}},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的介绍"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:4},placeholder:"站点介绍"},model:{value:e.siteIntroduction,callback:function(t){e.siteIntroduction=t},expression:"siteIntroduction"}})],1)],1),e._v(" "),i("Card",{attrs:{header:"站点keywords："}},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的keywords"}},[i("el-input",{attrs:{placeholder:"站点keywords"},model:{value:e.siteKeywords,callback:function(t){e.siteKeywords=t},expression:"siteKeywords"}})],1)],1),e._v(" "),i("Card",{attrs:{header:"站点首页标题："}},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的首页标题"}},[i("el-input",{attrs:{placeholder:"站点首页标题"},model:{value:e.siteTitle,callback:function(t){e.siteTitle=t},expression:"siteTitle"}})],1)],1),e._v(" "),i("Card",{attrs:{header:"上传图片："}},[i("CardRow",{staticClass:"box"},[i("div",{staticClass:"avatar-box"},e._l(e.numberimg,(function(t,a){return i("div",{key:a,staticClass:"avatar-somer-box"},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"","http-request":function(t){e.uploaderLogo(t,a)},"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload},on:{change:e.handleFile}},[t.imageUrl?i("div",{staticClass:"avatar"},[i("img",{staticClass:"avatar-LogoImage",style:{width:"140px"},attrs:{src:t.imageUrl,alt:t.text,title:t.text}})]):i("i",{staticClass:"el-icon-circle-plus-outline"}),e._v(" "),i("p",{staticClass:"avatar-logo"},[e._v(e._s(t.text))]),e._v(" "),i("p",{staticClass:"avatar-pm"},[e._v(e._s(t.textrule))]),e._v(" "),i("p",{staticClass:"avatar-pm"},[e._v("大小：小于5M")])]),e._v(" "),i("el-button",{staticClass:"avatar-btn",attrs:{type:"text"},on:{click:function(t){e.deleteImage(t,a)}}},[e._v("删除")])],1)})),0)])],1),e._v(" "),i("Card",{attrs:{header:"站长："}},[i("CardRow",{attrs:{description:"填写站长的用户id"}},[i("el-input",{attrs:{placeholder:"站长",type:"number"},model:{value:e.siteMasterId,callback:function(t){e.siteMasterId=t},expression:"siteMasterId"}})],1)],1),e._v(" "),i("Card",{staticClass:"card-radio-con",attrs:{header:"站点模式："}},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的运行模式"}},[i("el-radio",{attrs:{label:"1"},on:{change:function(t){return e.radioChange("public")}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("公开模式")]),e._v(" "),i("el-radio",{attrs:{label:"2",disabled:e.disabled},on:{change:function(t){return e.radioChange("pay")}},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("付费模式")])],1)],1),e._v(" "),i("el-collapse-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:"2"===e.radio,expression:"radio === '2'"}]},[i("Card",{attrs:{header:"加入价格（元）："}},[i("CardRow",{attrs:{description:"付费模式下，付费成为站点默认角色，需支付的金额"}},[i("el-input",{attrs:{placeholder:"加入价格",type:"number"},model:{value:e.sitePrice,callback:function(t){e.sitePrice=t},expression:"sitePrice"}})],1)],1),e._v(" "),i("Card",{attrs:{header:"到期时间："}},[i("CardRow",{attrs:{description:"付费模式下，付费成为站点默认角色，可维持的时间，不填或为0时不限制"}},[e._v("\n          加入起\n          "),i("el-input",{staticClass:"elinput",staticStyle:{height:"36PX",width:"80PX"},attrs:{clearable:"",placeholder:"天数",type:"number"},model:{value:e.siteExpire,callback:function(t){e.siteExpire=t},expression:"siteExpire"}}),e._v("天后\n        ")],1)],1)],1)]),e._v(" "),i("Card",{attrs:{header:"金额分成比例："}},[i("CardRow",{attrs:{description:"主题打赏、付费等的分成比例设置，两者加起来必须为10，不填时默认为作者10、平台0"}},[i("div",{staticClass:"proportion-box"},[i("span",[e._v("作者")]),e._v(" "),i("el-input",{attrs:{size:"small",type:"number"},nativeOn:{"!blur":function(t){return e.onblurFun(t)}},model:{value:e.siteAuthorScale,callback:function(t){e.siteAuthorScale=t},expression:"siteAuthorScale"}})],1),e._v(" "),i("div",{staticClass:"proportion-box"},[i("span",[e._v("平台(站长)")]),e._v(" "),i("el-input",{attrs:{size:"small",type:"number"},nativeOn:{"!blur":function(t){return e.onblurFun(t)}},model:{value:e.siteMasterScale,callback:function(t){e.siteMasterScale=t},expression:"siteMasterScale"}})],1)])],1),e._v(" "),i("Card",{attrs:{header:"网站备案信息："}},[i("div",{staticClass:"record-top"},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的 ICP 备案编号"}},[i("el-input",{model:{value:e.siteRecord,callback:function(t){e.siteRecord=t},expression:"siteRecord"}})],1)],1)]),e._v(" "),i("Card",{attrs:{header:"公安备案信息："}},[i("div",{staticClass:"record-bottom"},[i("CardRow",{attrs:{description:"你的Discuz! Q 站点的 公安备案编号"}},[i("el-input",{model:{value:e.recodeNumber,callback:function(t){e.recodeNumber=t},expression:"recodeNumber"}})],1)],1)]),e._v(" "),i("Card",{attrs:{header:"第三方统计："}},[i("CardRow",{attrs:{description:"你的Discuz! Q 网站的第三方统计代码（禁止使用含有document.write的统计代码）"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:4}},model:{value:e.siteStat,callback:function(t){e.siteStat=t},expression:"siteStat"}})],1)],1),e._v(" "),i("Card",{staticClass:"card-radio-con",attrs:{header:"站点开关："}},[i("CardRow",{attrs:{description:"站点当前开放的可访问的端，勾选则代表开启"}},[i("el-checkbox-group",{on:{change:e.closeListChange},model:{value:e.closeSelectList,callback:function(t){e.closeSelectList=t},expression:"closeSelectList"}},e._l(e.closeList,(function(t){return i("el-checkbox",{key:t.key,attrs:{label:t.key}},[e._v("\n          "+e._s(t.desc)+"\n        ")])})),1)],1)],1),e._v(" "),i("el-collapse-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:e.changeCloseList,expression:"changeCloseList"}]},[i("Card",{attrs:{header:""}},[i("CardRow",{attrs:{description:"未开启且被访问时的提示信息"}},[i("el-input",{model:{value:e.siteCloseMsg,callback:function(t){e.siteCloseMsg=t},expression:"siteCloseMsg"}})],1)],1)],1)]),e._v(" "),i("Card",{staticClass:"footer-btn"},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.siteSetPost}},[e._v("提交")])],1)],1)},s=[]},"8gHz":function(e,t,i){var a=i("5K7Z"),s=i("eaoh"),r=i("UWiX")("species");e.exports=function(e,t){var i,n=a(e).constructor;return void 0===n||null==(i=a(n)[r])?t:s(i)}},EXMj:function(e,t){e.exports=function(e,t,i,a){if(!(e instanceof t)||void 0!==a&&a in e)throw TypeError(i+": incorrect invocation!");return e}},"JMW+":function(e,t,i){"use strict";var a,s,r,n,o=i("uOPS"),c=i("5T2Y"),l=i("2GTP"),u=i("QMMT"),d=i("Y7ZC"),h=i("93I4"),f=i("eaoh"),m=i("EXMj"),p=i("oioR"),v=i("8gHz"),g=i("QXhf").set,_=i("q6LJ")(),b=i("ZW5q"),x=i("RDmV"),w=i("vBP9"),y=i("zXhZ"),C=c.TypeError,k=c.process,S=k&&k.versions,M=S&&S.v8||"",P=c.Promise,R="process"==u(k),I=function(){},T=s=b.f,L=!!function(){try{var e=P.resolve(1),t=(e.constructor={})[i("UWiX")("species")]=function(e){e(I,I)};return(R||"function"==typeof PromiseRejectionEvent)&&e.then(I)instanceof t&&0!==M.indexOf("6.6")&&-1===w.indexOf("Chrome/66")}catch(e){}}(),U=function(e){var t;return!(!h(e)||"function"!=typeof(t=e.then))&&t},z=function(e,t){if(!e._n){e._n=!0;var i=e._c;_((function(){for(var a=e._v,s=1==e._s,r=0,n=function(t){var i,r,n,o=s?t.ok:t.fail,c=t.resolve,l=t.reject,u=t.domain;try{o?(s||(2==e._h&&N(e),e._h=1),!0===o?i=a:(u&&u.enter(),i=o(a),u&&(u.exit(),n=!0)),i===t.promise?l(C("Promise-chain cycle")):(r=U(i))?r.call(i,c,l):c(i)):l(a)}catch(e){u&&!n&&u.exit(),l(e)}};i.length>r;)n(i[r++]);e._c=[],e._n=!1,t&&!e._h&&E(e)}))}},E=function(e){g.call(c,(function(){var t,i,a,s=e._v,r=W(e);if(r&&(t=x((function(){R?k.emit("unhandledRejection",s,e):(i=c.onunhandledrejection)?i({promise:e,reason:s}):(a=c.console)&&a.error&&a.error("Unhandled promise rejection",s)})),e._h=R||W(e)?2:1),e._a=void 0,r&&t.e)throw t.v}))},W=function(e){return 1!==e._h&&0===(e._a||e._c).length},N=function(e){g.call(c,(function(){var t;R?k.emit("rejectionHandled",e):(t=c.onrejectionhandled)&&t({promise:e,reason:e._v})}))},j=function(e){var t=this;t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),z(t,!0))},F=function(e){var t,i=this;if(!i._d){i._d=!0,i=i._w||i;try{if(i===e)throw C("Promise can't be resolved itself");(t=U(e))?_((function(){var a={_w:i,_d:!1};try{t.call(e,l(F,a,1),l(j,a,1))}catch(e){j.call(a,e)}})):(i._v=e,i._s=1,z(i,!1))}catch(e){j.call({_w:i,_d:!1},e)}}};L||(P=function(e){m(this,P,"Promise","_h"),f(e),a.call(this);try{e(l(F,this,1),l(j,this,1))}catch(e){j.call(this,e)}},(a=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=i("XJU/")(P.prototype,{then:function(e,t){var i=T(v(this,P));return i.ok="function"!=typeof e||e,i.fail="function"==typeof t&&t,i.domain=R?k.domain:void 0,this._c.push(i),this._a&&this._a.push(i),this._s&&z(this,!1),i.promise},catch:function(e){return this.then(void 0,e)}}),r=function(){var e=new a;this.promise=e,this.resolve=l(F,e,1),this.reject=l(j,e,1)},b.f=T=function(e){return e===P||e===n?new r(e):s(e)}),d(d.G+d.W+d.F*!L,{Promise:P}),i("RfKB")(P,"Promise"),i("TJWN")("Promise"),n=i("WEpk").Promise,d(d.S+d.F*!L,"Promise",{reject:function(e){var t=T(this);return(0,t.reject)(e),t.promise}}),d(d.S+d.F*(o||!L),"Promise",{resolve:function(e){return y(o&&this===n?P:this,e)}}),d(d.S+d.F*!(L&&i("TuGD")((function(e){P.all(e).catch(I)}))),"Promise",{all:function(e){var t=this,i=T(t),a=i.resolve,s=i.reject,r=x((function(){var i=[],r=0,n=1;p(e,!1,(function(e){var o=r++,c=!1;i.push(void 0),n++,t.resolve(e).then((function(e){c||(c=!0,i[o]=e,--n||a(i))}),s)})),--n||a(i)}));return r.e&&s(r.v),i.promise},race:function(e){var t=this,i=T(t),a=i.reject,s=x((function(){p(e,!1,(function(e){t.resolve(e).then(i.resolve,a)}))}));return s.e&&a(s.v),i.promise}})},MCSJ:function(e,t){e.exports=function(e,t,i){var a=void 0===i;switch(t.length){case 0:return a?e():e.call(i);case 1:return a?e(t[0]):e.call(i,t[0]);case 2:return a?e(t[0],t[1]):e.call(i,t[0],t[1]);case 3:return a?e(t[0],t[1],t[2]):e.call(i,t[0],t[1],t[2]);case 4:return a?e(t[0],t[1],t[2],t[3]):e.call(i,t[0],t[1],t[2],t[3])}return e.apply(i,t)}},PBE1:function(e,t,i){"use strict";var a=i("Y7ZC"),s=i("WEpk"),r=i("5T2Y"),n=i("8gHz"),o=i("zXhZ");a(a.P+a.R,"Promise",{finally:function(e){var t=n(this,s.Promise||r.Promise),i="function"==typeof e;return this.then(i?function(i){return o(t,e()).then((function(){return i}))}:e,i?function(i){return o(t,e()).then((function(){throw i}))}:e)}})},PUmH:function(e,t,i){"use strict";i.r(t);var a=i("4vOA"),s=i("xoSE");for(var r in s)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(r);i("z1HU");var n=i("KHd+"),o=Object(n.a)(s.default,a.a,a.b,!1,null,null,null);t.default=o.exports},"Q/yX":function(e,t,i){"use strict";var a=i("Y7ZC"),s=i("ZW5q"),r=i("RDmV");a(a.S,"Promise",{try:function(e){var t=s.f(this),i=r(e);return(i.e?t.reject:t.resolve)(i.v),t.promise}})},QXhf:function(e,t,i){var a,s,r,n=i("2GTP"),o=i("MCSJ"),c=i("MvwC"),l=i("Hsns"),u=i("5T2Y"),d=u.process,h=u.setImmediate,f=u.clearImmediate,m=u.MessageChannel,p=u.Dispatch,v=0,g={},_=function(){var e=+this;if(g.hasOwnProperty(e)){var t=g[e];delete g[e],t()}},b=function(e){_.call(e.data)};h&&f||(h=function(e){for(var t=[],i=1;arguments.length>i;)t.push(arguments[i++]);return g[++v]=function(){o("function"==typeof e?e:Function(e),t)},a(v),v},f=function(e){delete g[e]},"process"==i("a0xu")(d)?a=function(e){d.nextTick(n(_,e,1))}:p&&p.now?a=function(e){p.now(n(_,e,1))}:m?(r=(s=new m).port2,s.port1.onmessage=b,a=n(r.postMessage,r,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(a=function(e){u.postMessage(e+"","*")},u.addEventListener("message",b,!1)):a="onreadystatechange"in l("script")?function(e){c.appendChild(l("script")).onreadystatechange=function(){c.removeChild(this),_.call(e)}}:function(e){setTimeout(n(_,e,1),0)}),e.exports={set:h,clear:f}},RDmV:function(e,t){e.exports=function(e){try{return{e:!1,v:e()}}catch(e){return{e:!0,v:e}}}},TJWN:function(e,t,i){"use strict";var a=i("5T2Y"),s=i("WEpk"),r=i("2faE"),n=i("jmDH"),o=i("UWiX")("species");e.exports=function(e){var t="function"==typeof s[e]?s[e]:a[e];n&&t&&!t[o]&&r.f(t,o,{configurable:!0,get:function(){return this}})}},"XJU/":function(e,t,i){var a=i("NegM");e.exports=function(e,t,i){for(var s in t)i&&e[s]?e[s]=t[s]:a(e,s,t[s]);return e}},ZW5q:function(e,t,i){"use strict";var a=i("eaoh");function s(e){var t,i;this.promise=new e((function(e,a){if(void 0!==t||void 0!==i)throw TypeError("Bad Promise constructor");t=e,i=a})),this.resolve=a(t),this.reject=a(i)}e.exports.f=function(e){return new s(e)}},ZbQc:function(e,t,i){},aW7e:function(e,t,i){i("wgeU"),i("FlQf"),i("bBy9"),i("JMW+"),i("PBE1"),i("Q/yX"),e.exports=i("WEpk").Promise},bTJB:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(i("QbLZ"));i("lpfh");var s=r(i("vx/2"));function r(e){return e&&e.__esModule?e:{default:e}}t.default=(0,a.default)({name:"site-set-view"},s.default)},oioR:function(e,t,i){var a=i("2GTP"),s=i("sNwI"),r=i("NwJ3"),n=i("5K7Z"),o=i("tEej"),c=i("fNZA"),l={},u={};(t=e.exports=function(e,t,i,d,h){var f,m,p,v,g=h?function(){return e}:c(e),_=a(i,d,t?2:1),b=0;if("function"!=typeof g)throw TypeError(e+" is not iterable!");if(r(g)){for(f=o(e.length);f>b;b++)if((v=t?_(n(m=e[b])[0],m[1]):_(e[b]))===l||v===u)return v}else for(p=g.call(e);!(m=p.next()).done;)if((v=s(p,_,m.value,t))===l||v===u)return v}).BREAK=l,t.RETURN=u},q6LJ:function(e,t,i){var a=i("5T2Y"),s=i("QXhf").set,r=a.MutationObserver||a.WebKitMutationObserver,n=a.process,o=a.Promise,c="process"==i("a0xu")(n);e.exports=function(){var e,t,i,l=function(){var a,s;for(c&&(a=n.domain)&&a.exit();e;){s=e.fn,e=e.next;try{s()}catch(a){throw e?i():t=void 0,a}}t=void 0,a&&a.enter()};if(c)i=function(){n.nextTick(l)};else if(!r||a.navigator&&a.navigator.standalone)if(o&&o.resolve){var u=o.resolve(void 0);i=function(){u.then(l)}}else i=function(){s.call(a,l)};else{var d=!0,h=document.createTextNode("");new r(l).observe(h,{characterData:!0}),i=function(){h.data=d=!d}}return function(a){var s={fn:a,next:void 0};t&&(t.next=s),e||(e=s,i()),t=s}}},vBP9:function(e,t,i){var a=i("5T2Y").navigator;e.exports=a&&a.userAgent||""},"vx/2":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(i("4d7F")),s=n(i("4gYi")),r=n(i("pNQN"));function n(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{closeList:[],closeSelectList:[],radio:"1",loading:!0,fullscreenLoading:!1,siteTheme:1,siteName:"",siteIntroduction:"",siteKeywords:"",siteTitle:"",siteMode:"1",sitePrice:"",siteExpire:"",siteAuthorScale:"",siteMasterScale:"",siteClose:"1",siteLogoFile:[],siteMasterId:"",siteRecord:"",recodeNumber:"",siteStat:"",siteCloseMsg:"",dialogImageUrl:"",dialogVisible:!1,fileList:[],deleBtn:!1,disabled:!0,numberimg:[{imageUrl:"",imgWidht:0,imgHeight:0,text:"站点LOGO",textrule:"尺寸：438px*88px"},{imageUrl:"",imgWidht:0,imgHeight:0,text:"首页头部LOGO",textrule:"尺寸：438px*88px"},{imageUrl:"",imgWidht:0,imgHeight:0,text:"首页头部背景",textrule:"尺寸：750px*400px"},{imageUrl:"",imgWidht:0,imgHeight:0,text:"站点ICON",textrule:"尺寸：120px*120px"}]}},created:function(){this.loadStatus()},computed:{changeCloseList:function(){return this.closeSelectList.length!=this.closeList.length}},methods:{loadStatus:function(){var e=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):(0==t.readdata._data.paycenter.wxpay_close?e.disabled=!0:e.disabled=!1,e.siteTheme=t.readdata._data.set_site.site_skin,e.numberimg[0].textrule=1===e.siteTheme?"尺寸：438px*88px":"尺寸：300px*100px",e.siteName=t.readdata._data.set_site.site_name,e.siteIntroduction=t.readdata._data.set_site.site_introduction,e.siteKeywords=t.readdata._data.set_site.site_keywords,e.siteTitle=t.readdata._data.set_site.site_title,e.siteMode=t.readdata._data.set_site.site_mode,e.numberimg[0].imageUrl=t.readdata._data.set_site.site_logo,e.numberimg[1].imageUrl=t.readdata._data.set_site.site_header_logo,e.numberimg[2].imageUrl=t.readdata._data.set_site.site_background_image,e.numberimg[3].imageUrl=t.readdata._data.set_site.site_favicon,"pay"==e.siteMode?e.radio="2":e.radio="1",e.sitePrice=t.readdata._data.set_site.site_price,e.siteExpire=t.readdata._data.set_site.site_expire,e.siteAuthorScale=t.readdata._data.set_site.site_author_scale,e.siteMasterScale=t.readdata._data.set_site.site_master_scale,e.siteRecord=t.readdata._data.set_site.site_record,e.recodeNumber=t.readdata._data.set_site.site_record_code,e.siteStat=t.readdata._data.set_site.site_stat,t.readdata._data.set_site.site_author&&t.readdata._data.set_site.site_author.id&&(e.siteMasterId=t.readdata._data.set_site.site_author.id),e.closeList=t.readdata._data.set_site.site_manage||[],e.closeSelectList=e.closeList.reduce((function(e,t){return t.value&&e.push(t.key),e}),[]),e.siteCloseMsg=t.readdata._data.set_site.site_close_msg,0==t.readdata._data.paycenter.wxpay_close?e.disabled=!0:e.disabled=!1,e.getScaleImgSize(e.numberimg[0].imageUrl,{width:140,height:140}).then((function(t){e.numberimg[0].imgWidht=t.width,e.numberimg[0].imgHeight=t.height})),e.getScaleImgSize(e.numberimg[1].imageUrl,{width:140,height:140}).then((function(t){e.numberimg[1].imgWidht=t.width,e.numberimg[1].imgHeight=t.height})),e.getScaleImgSize(e.numberimg[2].imageUrl,{width:140,height:140}).then((function(t){e.numberimg[2].imgWidht=t.width,e.numberimg[2].imgHeight=t.height})),e.getScaleImgSize(e.numberimg[3].imageUrl,{width:140,height:140}).then((function(t){e.numberimg[3].imgWidht=t.width,e.numberimg[3].imgHeight=t.height})))})).catch((function(e){}))},deleteImage:function(e,t,i){var a=this,s="";switch(t){case 0:s="logo";break;case 1:s="header_logo";break;case 2:s="background_image";break;case 3:s="favicon";break;default:this.$message.error("未知类型")}this.numberimg[t].imageUrl="",this.appFetch({url:"logo",method:"delete",data:{type:s}}).then((function(e){e.errors?a.$message.error(e.errors[0].code):a.$message("删除成功")})).catch((function(e){}))},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},radioChange:function(e){this.siteMode=e},radioChangeClose:function(e){this.siteClose="1"==e},closeListChange:function(e){this.closeSelectList=e.slice()},handleAvatarSuccess:function(e,t){},handleFile:function(){},getScaleImgSize:function(e,t){var i=this;if(""!==e)return new a.default((function(a,s){i.getImageSize(e).then((function(e){var i=e.height/e.width;i>t.height/t.width?a({width:t.height/i,height:t.height}):a({width:t.width,height:t.width*i})})).catch((function(e){}))}))},getImageSize:function(e){var t=document.createElement("img");return new a.default((function(i,a){t.onload=function(e){i({width:t.naturalWidth,height:t.naturalHeight})},t.src=e,t.onerror=a}))},beforeAvatarUpload:function(e){var t="image/jpeg"==e.type||"image/png"==e.type||"image/gif"==e.type||"image/ico"==e.type||"image/vnd.microsoft.icon"==e.type||"image/x-icon"==e.type,i=e.size/1024/1024<2;return t?i?t&&i:(this.$message.warning("上传头像图片大小不能超过 2MB!"),i):(this.$message.warning("上传头像图片只能是 JPG/PNG/GIF/ICO 格式!"),t)},uploaderLogo:function(e,t){var i=this,a="";switch(t){case 0:a="logo";break;case 1:a="header_logo";break;case 2:a="background_image";break;case 3:a="favicon";break;default:this.$message.error("未知类型")}var s=new FormData;s.append("logo",e.file),s.append("type",a),this.appFetch({url:"logo",method:"post",data:s}).then((function(e){e.errors?i.$message.error(e.errors[0].code):(i.numberimg[t].imageUrl=e.readdata._data.default.logo,i.getScaleImgSize(i.numberimg[t].imageUrl,{width:140,height:140}).then((function(e){i.numberimg[t].imgWidht=e.width,i.numberimg[t].imgHeight=e.height})),i.$message({message:"上传成功",type:"success"}))})).catch((function(e){}))},siteSetPost:function(){var e=this,t=this.closeList.map((function(t){return t.value=-1!=e.closeSelectList.indexOf(t.key),t})),i=[{key:"site_name",value:this.siteName?this.siteName:"",tag:"default"},{key:"site_introduction",value:this.siteIntroduction?this.siteIntroduction:"",tag:"default"},{key:"site_keywords",value:this.siteKeywords?this.siteKeywords:"",tag:"default"},{key:"site_title",value:this.siteTitle?this.siteTitle:"",tag:"default"},{key:"site_author",value:this.siteMasterId,tag:"default"},{key:"site_mode",value:this.siteMode,tag:"default"},{key:"site_price",value:this.sitePrice,tag:"default"},{key:"site_expire",value:this.siteExpire,tag:"default"},{key:"site_author_scale",value:this.siteAuthorScale,tag:"default"},{key:"site_master_scale",value:this.siteMasterScale,tag:"default"},{key:"site_record",value:this.siteRecord,tag:"default"},{key:"site_record_code",value:this.recodeNumber,tag:"default"},{key:"site_stat",value:this.siteStat,tag:"default"},{key:"site_manage",value:t,tag:"default"},{key:"site_close_msg",value:this.siteCloseMsg,tag:"default"}];this.appFetch({url:"settings_post_v3",method:"post",data:{data:i},apiType:"v3"}).then((function(t){t.errors?t.errors[0].detail?e.$message.error(t.errors[0].code+"\n"+t.errors[0].detail[0]):e.$message.error(t.errors[0].code):e.$message({message:"提交成功",type:"success"})})).catch((function(e){}))},onblurFun:function(){null!=this.siteAuthorScale&&""!=this.siteAuthorScale||(this.siteAuthorScale=0),null!=this.siteMasterScale&&""!=this.siteMasterScale||(this.siteMasterScale=0),10!=parseFloat(this.siteAuthorScale)+parseFloat(this.siteMasterScale)&&this.$message({message:"分成比例相加必须为10",type:"error"})}},components:{Card:s.default,CardRow:r.default}}},xoSE:function(e,t,i){"use strict";i.r(t);var a=i("bTJB"),s=i.n(a);for(var r in a)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(r);t.default=s.a},z1HU:function(e,t,i){"use strict";i("ZbQc")},zXhZ:function(e,t,i){var a=i("5K7Z"),s=i("93I4"),r=i("ZW5q");e.exports=function(e,t){if(a(e),s(t)&&t.constructor===e)return t;var i=r.f(e);return(0,i.resolve)(t),i.promise}}}]);