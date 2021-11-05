(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{"/AAO":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return n}));var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"withdrawal-setting-box"},[a("Card",{attrs:{header:"提现间隔时间（天）"}},[a("CardRow",{attrs:{description:"用户每次提现需间隔的时间，单位为天，0或不填则不限制"}},[a("el-input",{attrs:{clearable:"",type:"number"},model:{value:t.withdrawalInterval,callback:function(e){t.withdrawalInterval=e},expression:"withdrawalInterval"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"提现手续费率（范围为：0-1。例如百分之三就填写：0.03）"}},[a("CardRow",{attrs:{description:"用户每次提现平台收取的手续费，0或不填则不收取手续费"}},[a("el-input",{attrs:{clearable:"",type:"number"},model:{value:t.withdrawalFee,callback:function(e){t.withdrawalFee=e},expression:"withdrawalFee"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"单次提现最小金额（元）"}},[a("CardRow",{attrs:{description:"用户每次提现的最小金额（微信支付要求最低不能少于1元）"}},[a("el-input",{attrs:{clearable:"",type:"number"},nativeOn:{"!blur":function(e){return t.onblurFun.apply(null,arguments)}},model:{value:t.minAmount,callback:function(e){t.minAmount=e},expression:"minAmount"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"单次提现最大金额（元）"}},[a("CardRow",{attrs:{description:"用户每次提现的最大金额"}},[a("el-input",{attrs:{clearable:"",type:"number"},model:{value:t.maxAmount,callback:function(e){t.maxAmount=e},expression:"maxAmount"}})],1)],1),t._v(" "),a("Card",{attrs:{header:"每日提现总金额上限（元）"}},[a("CardRow",{attrs:{description:"所有用户提现的每日上限总金额"}},[a("el-input",{attrs:{clearable:"",type:"number"},model:{value:t.amountCap,callback:function(e){t.amountCap=e},expression:"amountCap"}})],1)],1),t._v(" "),a("Card",{staticClass:"footer-btn"},[a("el-button",{attrs:{type:"primary",loading:t.subLoading,size:"medium"},on:{click:t.submitClick}},[t._v("提交")])],1)],1)},n=[]},RNFI:function(t,e,a){"use strict";a.r(e);var r=a("mwUm"),n=a.n(r);for(var s in r)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(s);e.default=n.a},mwUm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(a("QbLZ"));a("z99J");var n=s(a("sPLB"));function s(t){return t&&t.__esModule?t:{default:t}}e.default=(0,r.default)({name:"withdrawal-setting-view"},n.default)},sPLB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=s(a("4gYi")),n=s(a("pNQN"));function s(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{withdrawalInterval:"",withdrawalFee:"",minAmount:"",maxAmount:"",amountCap:"",subLoading:!1}},methods:{submitClick:function(){this.minAmount<1?this.$message.error("提现最小金额不能少于1元"):(this.subLoading=!0,this.postWithdrawalSettings())},onblurFun:function(){this.minAmount<1&&(this.$message("提现最小金额不能少于1元"),this.minAmount="1")},postWithdrawalSettings:function(){var t=this;this.appFetch({url:"settings_post_v3",method:"post",data:{data:[{key:"cash_interval_time",value:this.withdrawalInterval,tag:"cash"},{key:"cash_rate",value:this.withdrawalFee,tag:"cash"},{key:"cash_min_sum",value:this.minAmount,tag:"cash"},{key:"cash_max_sum",value:this.maxAmount,tag:"cash"},{key:"cash_sum_limit",value:this.amountCap,tag:"cash"}]}}).then((function(e){if(t.subLoading=!1,e.errors)t.$message.error(e.errors[0].code);else{if(0!==e.Code)return void t.$message.error(e.Message);t.$message({message:"提交成功",type:"success"}),t.getForum()}})).catch((function(e){t.$message.error("操作失败！")}))},getForum:function(){var t=this;this.appFetch({url:"forum_get_v3",method:"get",data:{}}).then((function(e){if(e.errors)t.$message.error(e.errors[0].code);else{if(0!==e.Code)return void t.$message.error(e.Message);var a=e.Data.setCash;t.withdrawalInterval=a.cashIntervalTime,t.withdrawalFee=a.cashRate,t.minAmount=a.cashMinSum,t.maxAmount=a.cashMaxSum,t.amountCap=a.cashSumLimit}})).catch((function(e){t.$message.error("初始化失败！请重新刷新页面（F5）")}))}},created:function(){this.getForum()},components:{Card:r.default,CardRow:n.default}}},vIWR:function(t,e,a){"use strict";a.r(e);var r=a("/AAO"),n=a("RNFI");for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);var i=a("KHd+"),u=Object(i.a)(n.default,r.a,r.b,!1,null,null,null);e.default=u.exports}}]);