(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"75kZ":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return s}));var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"report-manage-box"},[a("div",{staticClass:"report-manage-header"},[a("div",{staticClass:"report-manage-header__section"},[a("span",{staticClass:"report-manage-header__section-title"},[e._v("举报人：")]),e._v(" "),a("el-input",{attrs:{size:"medium",clearable:""},model:{value:e.searchData.userName,callback:function(t){e.$set(e.searchData,"userName",t)},expression:"searchData.userName"}})],1),e._v(" "),a("div",{staticClass:"report-manage-header__section"},[a("span",{staticClass:"report-manage-header__section-title"},[e._v("举报类型：")]),e._v(" "),a("el-select",{attrs:{clearable:"",size:"medium"},model:{value:e.searchData.reportType,callback:function(t){e.$set(e.searchData,"reportType",t)},expression:"searchData.reportType"}},e._l(e.reportTypeData,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("div",{staticClass:"report-manage-header__section"},[a("span",{staticClass:"report-manage-header__section-title time-title"},[e._v("举报时间范围：")]),e._v(" "),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",type:"daterange",align:"right","unlink-panels":"",size:"medium","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.searchData.reportTime,callback:function(t){e.$set(e.searchData,"reportTime",t)},expression:"searchData.reportTime"}})],1),e._v(" "),a("div",{staticClass:"report-manage-header__section"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.searchClick}},[e._v("搜索")])],1)]),e._v(" "),a("div",{staticClass:"report-manage-content"},[a("div",{staticClass:"report-manage-content__header"},[e._v("举报列表")]),e._v(" "),e._l(e.reportList,(function(t,r){return a("ContArrange",{key:t.report.id,staticClass:"report-manage-content__table",attrs:{establish:t.user.userName?t.user.userName:"该用户被删除",userId:t.user.pid?t.user.pid:"该用户被删除",time:e.formatDate(t.report.createdAt),type:e.getType(t.report.type)}},[a("div",{staticClass:"report-manage-content__table-side",attrs:{slot:"side"},slot:"side"},[a("el-radio-group",{on:{change:function(t){return e.radioChange(t,r)}},model:{value:e.submitForm[r].radio,callback:function(t){e.$set(e.submitForm[r],"radio",t)},expression:"submitForm[index].radio"}},[a("el-radio",{attrs:{label:0}},[e._v("删除")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("已处理")])],1)],1),e._v(" "),a("div",{staticClass:"report-manage-content__table-main",attrs:{slot:"main"},slot:"main"},[a("p",[e._v("\n\t\t\t\t\t\t页面地址：\n\t\t\t\t\t\t"),a("a",{staticStyle:{color:"#3E4043"},attrs:{href:e.getUrl(t.user.pid,t.report.threadId,t.report.postId).href,target:"_blank"}},[e._v("\n\t\t\t\t\t\t\t"+e._s(e.getUrl(t.user.pid,t.report.threadId,t.report.postId).url)+"\n\t\t\t\t\t\t")])]),e._v(" "),a("p",[e._v("举报时间："+e._s(e.formatDate(t.report.updatedAt)))]),e._v(" "),a("p",[e._v("举报理由：")]),e._v(" "),a("p",[e._v(e._s(t.report.reason))])]),e._v(" "),a("div",{staticClass:"report-manage-content__table-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-popover",{ref:"popover-"+r,refInFor:!0,attrs:{width:"100",placement:"top"}},[a("p",[e._v("确定删除该项吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10PX 0 0 0"}},[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.closeDelet("popover-"+r)}}},[e._v("\n                  取消\n                ")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.operationsSubmit("delete",1,t.report.id),e.closeDelet("popover-"+r)}}},[e._v("确定")])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v("删除")])],1),e._v(" "),a("i"),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.operationsSubmit("handle",1,t.report.id)}}},[e._v("标记已处理")])],1)])})),e._v(" "),a("tableNoList",{directives:[{name:"show",rawName:"v-show",value:e.reportList.length<1,expression:"reportList.length < 1"}]}),e._v(" "),e.pageData.pageCount>1?a("Page",{attrs:{"current-page":e.pageData.pageNumber,"page-size":e.pageData.pageSize,total:e.pageData.pageTotal},on:{"current-change":e.handleCurrentChange}}):e._e()],2),e._v(" "),a("div",{staticClass:"report-manage-footer"},[a("el-button",{attrs:{size:"small",type:"primary",loading:e.subLoading},on:{click:e.submitClick}},[e._v("提交")]),e._v(" "),a("el-popover",{attrs:{width:"100",placement:"top"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("p",[e._v("确定删除该项吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10PX 0 0 0"}},[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){e.visible=!1}}},[e._v("\n                  取消\n                ")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.operationsSubmit("delete",2),e.visible=!1}}},[e._v("确定")])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v("全部删除")])],1),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.operationsSubmit("handle",2)}}},[e._v("全部标记已处理")])],1)])},s=[]},"9kjX":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(a("Dt3C")),s=o(a("rWG0")),i=o(a("7qpD")),n=o(a("VVfg"));function o(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{searchData:{userName:"",reportType:null,reportTime:["",""],status:0},reportTypeData:[{name:"主题",id:1},{name:"评论/回复",id:2}],reportListAll:[],reportList:[],submitForm:[],pageData:{pageSize:10,pageCount:1,pageNumber:1,pageTotal:0},subLoading:!1,visible:!1}},methods:{closeDelet:function(e){this.$refs[e][0].doClose()},radioChange:function(e,t){switch(e){case 0:this.submitForm[t].type=0;break;case 1:this.submitForm[t].type=1}},formatDate:function(e){return this.$dayjs(e).format("YYYY-MM-DD HH:mm")},getType:function(e){return 0===e?"个人主页":1===e?"主题":2===e?"评论/回复":void 0},getUrl:function(e,t,a){var r="";return{href:r=0===a?0===t?"/user/"+e:"/thread/"+t:"/thread/comment/"+a+"?threadId="+t,url:window.origin+r}},searchClick:function(){this.searchData.reportTime=null==this.searchData.reportTime?["",""]:this.searchData.reportTime,this.searchData.reportType=""===this.searchData.reportType?null:this.searchData.reportType,this.pageData.pageNumber=1,this.getReportList(1)},getReportList:function(e){var t=this,a=this.searchData;this.appFetch({url:"reports_get_v3",method:"get",data:{"filter[username]":a.userName,"filter[status]":0,"filter[type]":a.reportType,"filter[startTime]":a.reportTime[0],"filter[endTime]":a.reportTime[1],page:e,perPage:this.pageData.pageSize}}).then((function(e){if(e.errors)t.$message.error(e.errors[0].code);else{if(0!==e.Code)return void t.$message.error(e.Message);var a=e.Data;t.reportList=a.pageData||[],t.pageData.pageTotal=a.totalCount,t.pageData.pageCount=a.totalPage,t.reportListAll=[],t.submitForm=[],t.reportList.forEach((function(e){t.reportListAll.push(e.report.id),t.submitForm.push({radio:"",id:e.report.id,type:null})}))}}))},handleCurrentChange:function(e){this.pageData.pageNumber=e,this.getReportList(e)},operationsSubmit:function(e,t,a){var r=[];if("delete"===e)switch(t){case 1:this.deleteOperation(a);break;case 2:this.deleteOperation(this.reportListAll.toString())}else{switch(t){case 1:r=[{id:a,status:1}];break;case 2:this.reportListAll.forEach((function(e){r.push({id:e,status:1})}))}this.HandledOperation(r)}},deleteOperation:function(e){var t=this,a=this;this.appFetch({url:"reports_delete_v3",method:"post",data:{ids:e}}).then((function(e){0===e.Code?(a.subLoading=!1,a.$message({message:"删除成功",type:"success"}),a.getReportList(Number(n.default.getLItem("pageNumber"))||1)):t.$message.error(e.Message)}))},HandledOperation:function(e){var t=this;this.appFetch({url:"reports_update_v3",method:"post",data:{data:e}}).then((function(e){0===e.Code?(t.subLoading=!1,t.$message({message:"操作成功",type:"success"}),t.getReportList(Number(n.default.getLItem("pageNumber"))||1)):t.$message.error(e.Message)}))},submitClick:function(){if(this.submitForm.some((function(e){return 0===e.type||(1===e.type||void 0)}))){this.subLoading=!0;var e=[],t=[];this.submitForm.forEach((function(a){0===a.type&&e.push(a.id),1===a.type&&t.push({id:a.id,status:1})})),e.length>0&&this.deleteOperation(e.join(",")),t.length>0&&this.HandledOperation(t)}else this.$message({showClose:!0,message:"操作举报列表为空，请选择举报信息",type:"warning"})},getCreated:function(e){e?this.getReportList(1):this.getReportList(Number(n.default.getLItem("pageNumber"))||1)}},created:function(){this.getUrl()},beforeRouteEnter:function(e,t,a){a((function(a){e.name!==t.name&&null!==t.name?a.getCreated(!0):a.getCreated(!1)}))},components:{ContArrange:r.default,Page:s.default,tableNoList:i.default}}},AZdf:function(e,t,a){"use strict";a.r(t);var r=a("75kZ"),s=a("nVfn");for(var i in s)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(i);var n=a("KHd+"),o=Object(n.a)(s.default,r.a,r.b,!1,null,null,null);t.default=o.exports},"KHd+":function(e,t,a){"use strict";function r(e,t,a,r,s,i,n,o){var l,p="function"==typeof e?e.options:e;if(t&&(p.render=t,p.staticRenderFns=a,p._compiled=!0),r&&(p.functional=!0),i&&(p._scopeId="data-v-"+i),n?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),s&&s.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(n)},p._ssrRegister=l):s&&(l=o?function(){s.call(this,(p.functional?this.parent:this).$root.$options.shadowRoot)}:s),l)if(p.functional){p._injectStyles=l;var u=p.render;p.render=function(e,t){return l.call(t),u(e,t)}}else{var c=p.beforeCreate;p.beforeCreate=c?[].concat(c,l):[l]}return{exports:e,options:p}}a.d(t,"a",(function(){return r}))},"P/Re":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(a("QbLZ"));a("lL+3");var s=i(a("9kjX"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(0,r.default)({name:"report-manage-view"},s.default)},nVfn:function(e,t,a){"use strict";a.r(t);var r=a("P/Re"),s=a.n(r);for(var i in r)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return r[e]}))}(i);t.default=s.a}}]);