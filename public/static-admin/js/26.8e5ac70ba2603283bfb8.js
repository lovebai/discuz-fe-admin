(window.webpackJsonp=window.webpackJsonp||[]).push([[26,9],{"0Y4v":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"table-no-list"}},"5shi":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(a("QbLZ"));a("gtKr");var n=i(a("u8Dz"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(0,s.default)({name:"cont-arrange-view"},n.default)},"7qpD":function(e,t,a){"use strict";a.r(t);var s=a("INw2"),n=a("EFx4");for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);a("hc7x");var r=a("KHd+"),o=Object(r.a)(n.default,s.a,s.b,!1,null,"7d149013",null);t.default=o.exports},Dt3C:function(e,t,a){"use strict";a.r(t);var s=a("qxrf"),n=a("aoOm");for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);var r=a("KHd+"),o=Object(r.a)(n.default,s.a,s.b,!1,null,null,null);t.default=o.exports},EFx4:function(e,t,a){"use strict";a.r(t);var s=a("0Y4v"),n=a.n(s);for(var i in s)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(i);t.default=n.a},INw2:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return n}));var s=function(){var e=this.$createElement;this._self._c;return this._m(0)},n=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"table-no-list"},[t("p",[this._v("暂无数据")])])}]},Iq5f:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return n}));var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cont-review-box"},[a("div",{staticClass:"cont-review-header"},[a("div",{staticClass:"cont-review-header__lf"},[a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("用户名：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"搜索用户名",clearable:""},model:{value:e.searchUserName,callback:function(t){e.searchUserName=t},expression:"searchUserName"}})],1),e._v(" "),a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("每页显示：")]),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择每页显示"},model:{value:e.pageSelect,callback:function(t){e.pageSelect=t},expression:"pageSelect"}},e._l(e.pageOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),e._v(" "),a("div",{staticClass:"cont-review-header__rt"},[a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("内容包含：")]),e._v(" "),a("el-input",{staticClass:"content-contains-input",attrs:{size:"medium",clearable:"",placeholder:"搜索关键词"},model:{value:e.keyWords,callback:function(t){e.keyWords=t},expression:"keyWords"}}),e._v(" "),a("el-checkbox",{model:{value:e.showSensitiveWords,callback:function(t){e.showSensitiveWords=t},expression:"showSensitiveWords"}},[e._v("显示敏感词")])],1),e._v(" "),a("div",{staticClass:"cont-review-header__rt-search"},[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("搜索范围：")]),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择审核状态",clearable:""},model:{value:e.searchReviewSelect,callback:function(t){e.searchReviewSelect=t},expression:"searchReviewSelect"}},e._l(e.searchReview,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("el-cascader",{attrs:{clearable:"",options:e.categoriesList,props:{expandTrigger:"hover",checkStrictly:!0}},on:{change:e.handleChange},model:{value:e.categoriesListSelect,callback:function(t){e.categoriesListSelect=t},expression:"categoriesListSelect"}}),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择搜索时间",clearable:""},on:{change:e.searchTimeChange},model:{value:e.searchTimeSelect,callback:function(t){e.searchTimeSelect=t},expression:"searchTimeSelect"}},e._l(e.searchTime,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.themeSearch}},[e._v("搜索")])],1)])]),e._v(" "),a("div",{staticClass:"cont-review-table"},[e._l(e.themeList,(function(t,s){return a("ContArrange",{key:t.threadId,attrs:{author:t.user?t.user.nickname:"该用户被删除",theme:t.categoryName,prply:t.likeReward.postCount,browse:t.viewCount,last:t.lastPostedUser?t.lastPostedUser.lastNickname:"该用户被删除",finalPost:e.formatDate(t.updatedAt),userId:t.user?t.userId:"该用户被删除"}},[a("div",{staticClass:"cont-review-table__side",attrs:{slot:"side"},slot:"side"},[a("el-radio-group",{on:{change:function(t){return e.radioChange(t,s)}},model:{value:e.submitForm[s].radio,callback:function(t){e.$set(e.submitForm[s],"radio",t)},expression:"submitForm[index].radio"}},[a("el-radio",{attrs:{label:0,disabled:e.contentIndexes(t.content,"video")}},[e._v("通过")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("删除")]),e._v(" "),2!==t.isApproved?a("el-radio",{attrs:{label:2,disabled:2===t.isApproved}},[e._v("忽略")]):e._e()],1)],1),e._v(" "),t.title?a("a",{staticClass:"cont-review-table__long-text",attrs:{slot:"longText",href:"/thread/"+t.threadId},slot:"longText"},[e._v("\n        "+e._s(t.title)+"\n        "),a("span",{staticClass:"iconfont",class:parseInt(t.price)>0?"iconmoney":"iconchangwen"})]):e._e(),e._v(" "),a("div",{staticClass:"cont-review-table__main",attrs:{slot:"main"},slot:"main"},[a("div",{staticClass:"cont-review-table__main-box"},[a("a",{staticClass:"cont-review-table__main__cont-text",style:{display:e.contentIndexes(t.content,"videos")?"inline":"block"},attrs:{href:"/thread/"+t.threadId,target:"_blank"},domProps:{innerHTML:e._s(e.$xss(e.filterContent(t.content.text)))}})]),e._v(" "),e.contentIndexes(t.content,"videos")?a("span",{staticClass:"iconfont iconvideo"}):e._e(),e._v(" "),e.contentIndexes(t.content,"images")?a("div",{staticClass:"cont-review-table__main__cont-imgs"},e._l(e.contentIndexes(t.content,"images"),(function(s,n){return a("p",{key:n,staticClass:"cont-review-table__main__cont-imgs-p"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.thumbUrl,expression:"item.thumbUrl"}],attrs:{alt:s.fileName},on:{click:function(a){e.imgShowClick(e.contentIndexes(t.content,"images"),n)}}})])})),0):e._e(),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.contentIndexes(t.content,"attachments"),expression:"contentIndexes(items.content, 'attachments')"}],staticClass:"cont-review-table__main__cont-annex"},[a("span",[e._v("附件：")]),e._v(" "),e._l(e.contentIndexes(t.content,"attachments"),(function(t,s){return a("p",{key:s},[a("a",{attrs:{href:t.url,target:"_blank"}},[e._v(e._s(t.fileName))])])}))],2),e._v(" "),e.contentIndexes(t.content,"vote")?a("div",{staticClass:"cont-manage-theme__table-main__cont-vote"},[a("p",[e._v(e._s(e.contentIndexes(t.content,"vote")[0].voteTitle))]),e._v(" "),a("div",e._l(e.contentIndexes(t.content,"vote")[0].subitems,(function(t,s){return a("p",{key:s},[e._v(e._s(s+1)+".  "+e._s(e.$xss(t.content)))])})),0)]):e._e(),e._v(" "),e.contentIndexes(t.content,"audio")?a("div",[a("audio",{ref:"audioPlear",refInFor:!0,staticClass:"cont-manage-theme__table-main__audio",attrs:{controls:"",src:e.contentIndexes(t.content,"audio").mediaUrl}})]):e._e(),e._v(" "),e.contentIndexes(t.content,"iframe")?a("div",[a("div",{domProps:{innerHTML:e._s(e.contentIndexes(t.content,"iframe").content)}})]):e._e()]),e._v(" "),a("div",{staticClass:"cont-review-table__footer",attrs:{slot:"footer"},slot:"footer"},[e.contentIndexes(t.content,"videos")?a("div",{staticClass:"cont-review-table__footer__lf"},[e.contentIndexes(t.content,"video")?a("el-button",{class:{graybtn:e.contentIndexes(t.content,"video")},attrs:{type:"text"},on:{click:e.sun}},[e._v("通过")]):a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(1,t.categoryId,t.threadId,s)}}},[e._v("通过")]),e._v(" "),a("i"),e._v(" "),a("el-popover",{ref:"popover-"+s,refInFor:!0,attrs:{width:"100",placement:"top"}},[a("p",[e._v("确定删除该项吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10PX 0 0 0"}},[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.closeDelet("popover-"+s)}}},[e._v("\n                取消\n              ")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.singleOperationSubmit(2,t.categoryId,t.threadId,s),e.closeDelet("popover-"+s)}}},[e._v("确定")])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v("删除")])],1),e._v(" "),a("i"),e._v(" "),2!==t.isApproved?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(3,t.categoryId,t.threadId,s)}}},[e._v("忽略")]):e._e()],1):a("div",{staticClass:"cont-review-table__footer__lf"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(1,t.categoryId,t.threadId,s)}}},[e._v("通过")]),e._v(" "),a("i"),e._v(" "),a("el-popover",{ref:"popover-"+s,refInFor:!0,attrs:{width:"100",placement:"top"}},[a("p",[e._v("确定删除该项吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10PX 0 0 0"}},[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.closeDelet("popover-"+s)}}},[e._v("\n                取消\n              ")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.singleOperationSubmit(2,t.categoryId,t.threadId,s),e.closeDelet("popover-"+s)}}},[e._v("确定")])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v("删除")])],1),e._v(" "),a("i"),e._v(" "),2!==t.isApproved?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(3,t.categoryId,t.threadId,s)}}},[e._v("忽略")]):e._e()],1),e._v(" "),a("div",{staticClass:"cont-review-table__footer__rt"},[a("span",[e._v("操作理由：")]),e._v(" "),a("el-input",{attrs:{size:"medium",clearable:""},model:{value:e.submitForm[s].message,callback:function(t){e.$set(e.submitForm[s],"message",t)},expression:"submitForm[index].message"}}),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择操作理由"},on:{change:function(t){return e.reasonForOperationChange(t,s)}},model:{value:e.submitForm[s].Select,callback:function(t){e.$set(e.submitForm[s],"Select",t)},expression:"submitForm[index].Select"}},e._l(e.reasonForOperation,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("div",{staticClass:"cont-review-table__footer__bottom"},[e.contentIndexes(t.content,"videoStatus")?a("el-button",{staticClass:"transcoding_status",attrs:{type:"text"}},[e._v("转码中")]):e._e(),e._v(" "),e.contentIndexes(t.content,"videoStatusTwo")?a("el-button",{staticClass:"transcoding_status",attrs:{type:"text"}},[e._v("转码失败")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.viewClick(t.threadId)}}},[e._v("查看")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.editClick(t.threadId,"编辑")}}},[e._v("编辑")])],1)])])})),e._v(" "),e.showViewer?a("el-image-viewer",{attrs:{"on-close":e.closeViewer,"url-list":e.url}}):e._e(),e._v(" "),a("tableNoList",{directives:[{name:"show",rawName:"v-show",value:e.themeList.length<1,expression:"themeList.length < 1"}]}),e._v(" "),e.pageCount>1?a("Page",{attrs:{"current-page":e.currentPaga,"page-size":e.pageSelect,total:e.total},on:{"current-change":e.handleCurrentChange}}):e._e()],2),e._v(" "),a("div",{staticClass:"cont-review-footer footer-btn"},[a("el-button",{attrs:{size:"small",type:"primary",loading:e.subLoading},on:{click:e.submitClick}},[e._v("提交")]),e._v(" "),a("el-button",{attrs:{type:"text",loading:1===e.btnLoading},on:{click:function(t){return e.allOperationsSubmit(1)}}},[e._v("全部通过")]),e._v(" "),a("el-popover",{attrs:{width:"100",placement:"top"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("p",[e._v("确定删除该项吗？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10PX 0 0 0"}},[a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){e.visible=!1}}},[e._v("\n                取消\n              ")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.allOperationsSubmit(2),e.visible=!1}}},[e._v("确定")])],1),e._v(" "),a("el-button",{attrs:{slot:"reference",type:"text",loading:2===e.btnLoading},slot:"reference"},[e._v("全部删除")])],1),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ignoreStatus,expression:"ignoreStatus"}],attrs:{type:"text",loading:3===e.btnLoading},on:{click:function(t){return e.allOperationsSubmit(3)}}},[e._v("全部忽略")])],1)])},n=[]},Kvoi:function(e,t,a){},LhYQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=d(a("/f1G")),n=d(a("4gYi")),i=d(a("Dt3C")),r=d(a("rWG0")),o=d(a("7qpD")),l=d(a("VVfg")),c=d(a("CKnL")),u=d(a("6NK7"));function d(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{searchUserName:"",keyWords:"",showSensitiveWords:!1,pageOptions:[{value:10,label:"每页显示10条"},{value:20,label:"每页显示20条"},{value:30,label:"每页显示30条"}],pageSelect:10,searchReview:[{value:0,label:"未审核"},{value:2,label:"已忽略"}],searchReviewSelect:0,categoriesList:[{label:"所有分类",value:0}],categoriesListSelect:[0],searchTime:[{value:1,label:"全部"},{value:2,label:"最近一周"},{value:3,label:"最近一个月"},{value:4,label:"最近三个月"}],searchTimeSelect:1,relativeTime:["",""],submitForm:[],reasonForOperation:[{value:"无",label:"无"},{value:"广告/SPAM",label:"广告/SPAM"},{value:"恶意灌水",label:"恶意灌水"},{value:"违规内容",label:"违规内容"},{value:"文不对题",label:"文不对题"},{value:"重复发帖",label:"重复发帖"},{value:"我很赞同",label:"我很赞同"},{value:"精品文章",label:"精品文章"},{value:"原创内容",label:"原创内容"},{value:"其他",label:"其他"}],reasonForOperationSelect:1,appleAll:!1,themeList:[],currentPaga:1,total:0,pageCount:1,ignoreStatus:!0,showViewer:!1,url:[],subLoading:!1,btnLoading:0,visible:!1}},methods:{closeDelet:function(e){this.$refs[e][0].doClose()},imgShowClick:function(e,t){var a=this;this.url=[];var s=[];e.forEach((function(e){s.push(e.url)})),this.url.push(s[t]),s.forEach((function(e,s){s>t&&a.url.push(e)})),s.forEach((function(e,s){s<t&&a.url.push(e)})),this.showViewer=!0},closeViewer:function(){this.showViewer=!1},reasonForOperationChange:function(e,t){this.submitForm[t].message=e},handleCurrentChange:function(e){document.getElementsByClassName("index-main-con__main")[0].scrollTop=0,this.isIndeterminate=!1,this.checkAll=!1,this.currentPaga=e,this.getThemeList(e)},themeSearch:function(){this.ignoreStatus=2!==this.searchReviewSelect,this.currentPaga=1,this.getThemeList()},searchTimeChange:function(e){var t=new Date,a=new Date;switch(this.relativeTime=[],e){case 1:this.relativeTime.push("","");break;case 2:a.setTime(a.getTime()-6048e5),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;case 3:a.setTime(a.getTime()-2592e6),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;case 4:a.setTime(a.getTime()-7776e6),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;default:this.$message.error("搜索日期选择错误，请重新选择！或 刷新页面（F5）")}},submitClick:function(){this.subLoading=!0;var e=[],t=[],a=[];this.submitForm.forEach((function(s,n){0===s.radio?e.push({id:s.id,isApproved:1}):1===s.radio?a.push({id:s.id,isDeleted:!0}):2===s.radio&&t.push({id:s.id,isApproved:2})})),e.length>=1&&this.patchThreadsBatch(e),a.length>=1&&this.patchThreadsBatch(a),t.length>=1&&this.patchThreadsBatch(t)},radioChange:function(e,t){switch(e){case 0:this.submitForm[t].isApproved=1;break;case 1:this.submitForm[t].isDeleted=!0;break;case 2:this.submitForm[t].isApproved=2}},allOperationsSubmit:function(e){this.btnLoading=e;var t=[];switch(e){case 1:this.submitForm.forEach((function(e,a){t.push({id:e.id,isApproved:1})}));break;case 2:this.submitForm.forEach((function(e,a){t.push({id:e.id,isDeleted:!0})}));break;case 3:this.submitForm.forEach((function(e,a){t.push({id:e.id,isApproved:2})}))}this.patchThreadsBatch(t)},singleOperationSubmit:function(e,t,a,s){var n=[{id:Number(a)}];switch(e){case 1:n[0].isApproved=1,n[0].message=this.submitForm[s].message,this.patchThreads(n,a);break;case 2:n[0].isDeleted=!0,n[0].message=this.submitForm[s].message,this.patchThreads(n,a);break;case 3:n[0].isApproved=2,n[0].message=this.submitForm[s].message,this.patchThreads(n,a)}},viewClick:function(e){var t=this.$router.resolve({path:"/thread/"+e});window.open(t.href,"_blank")},editClick:function(e,t){var a=this.$router.resolve({path:"/thread/post?id="+e});window.open(a.href,"_blank")},formatDate:function(e){return this.$dayjs(e).format("YYYY-MM-DD HH:mm")},getThemeList:function(e){var t=this;this.appFetch({url:"thread_get_v3",method:"get",data:{page:e,perPage:this.pageSelect,isApproved:this.searchReviewSelect,nickname:this.searchUserName,isDeleted:"no",q:this.keyWords,createdAtBegin:this.relativeTime[1],createdAtEnd:this.relativeTime[0],categoryId:this.categoriesListSelect[this.categoriesListSelect.length-1],highlight:this.showSensitiveWords?"yes":"no",sort:"-created_at"}}).then((function(e){if(e.errors)t.$message.error(e.errors[0].code);else{if(0!==e.Code)return void t.$message.error(e.Message);t.themeList=[],t.submitForm=[],t.themeList=e.Data.pageData,t.total=e.Data.totalCount,t.pageCount=e.Data.totalPage,t.themeList.forEach((function(e,a){t.submitForm.push({Select:"无",radio:"",type:1,id:e.threadId,isApproved:0,isDeleted:!1,message:""})}))}})).catch((function(e){}))},getCategories:function(){var e=this;this.appFetch({url:"categories_get_v3",method:"get",data:{}}).then((function(t){if(t.errors)e.$message.error(t.errors[0].code);else{if(0!==t.Code)return void e.$message.error(t.Message);t.Data.forEach((function(t,a){if(t.children.length){var s=[];t.children.forEach((function(e){s.push({label:e.name,value:e.searchIds})})),e.categoriesList.push({label:t.name,value:t.searchIds,children:s})}else e.categoriesList.push({label:t.name,value:t.searchIds})}))}})).catch((function(e){}))},patchThreadsBatch:function(e){var t=this;this.appFetch({url:"submit_review_post_v3",method:"post",data:{type:1,data:e}}).then((function(e){if(t.subLoading=!1,t.btnLoading=0,e.errors)t.$message.error(e.errors[0].code);else{if(0!==e.Code)return void t.$message.error(e.Message);t.getThemeList(Number(l.default.getLItem("currentPag"))||1),t.$message({message:"操作成功",type:"success"})}})).catch((function(e){}))},patchThreads:function(e,t){var a=this;this.appFetch({url:"submit_review_post_v3",method:"post",data:{type:1,data:e}}).then((function(e){if(a.subLoading=!1,a.btnLoading=0,e.errors)a.$message.error(e.errors[0].code);else{if(0!==e.Code)return void a.$message.error(e.Message);a.getThemeList(Number(l.default.getLItem("currentPag"))||1),a.$message({message:"操作成功",type:"success"})}})).catch((function(e){}))},getCreated:function(e){e?this.getThemeList(1):this.getThemeList(Number(l.default.getLItem("currentPag"))||1)},contentIndexes:function(e,t){return u.default.dataTypeJudgment(e,t)},filterContent:function(e){var t=l.default.getLItem("Emoji");return u.default.convertEmoticon(e,t)},imagesIndexes:function(e){var t=[],a=(0,s.default)(e.indexes||{});return a.length>0&&"101"===a[0].tomId&&(t=a[0].body),t},videoIndexes:function(e){return(0,s.default)(e.indexes||{})[0].body.isApproved},typeIndexes:function(e){return(0,s.default)(e.indexes||{})[0].tomId}},created:function(){this.getCategories()},beforeRouteEnter:function(e,t,a){a((function(a){e.name!==t.name&&null!==t.name?a.getCreated(!0):a.getCreated(!1)}))},components:{Card:n.default,ContArrange:i.default,Page:r.default,tableNoList:o.default,ElImageViewer:c.default}}},Oi5V:function(e,t,a){"use strict";a.r(t);var s=a("Iq5f"),n=a("fHKr");for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);var r=a("KHd+"),o=Object(r.a)(n.default,s.a,s.b,!1,null,null,null);t.default=o.exports},aoOm:function(e,t,a){"use strict";a.r(t);var s=a("5shi"),n=a.n(s);for(var i in s)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(i);t.default=n.a},ddPL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(a("QbLZ"));a("lL+3");var n=i(a("LhYQ"));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(0,s.default)({name:"cont-review-view"},n.default)},fHKr:function(e,t,a){"use strict";a.r(t);var s=a("ddPL"),n=a.n(s);for(var i in s)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(i);t.default=n.a},gtKr:function(e,t,a){},hc7x:function(e,t,a){"use strict";a("Kvoi")},qxrf:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return n}));var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cont-arrange-box"},[a("div",{staticClass:"cont-arrange-main"},[a("div",{staticClass:"cont-arrange__lf-side"},[e._t("side")],2),e._v(" "),a("main",{staticClass:"cont-arrange__rt-main"},[a("div",{staticClass:"cont-arrange__rt-main-header"},[a("div",{staticClass:"cont-arrange__rt-main-header__release"},[e.$attrs.author?a("p",{ref:"userName",staticClass:"cont-arrange-p"},[a("a",{staticStyle:{color:"#333333"},attrs:{href:"/user/"+e.$attrs.userId,target:"_blank"}},[e._v("\n              "+e._s(e.$attrs.author)+"\n            ")])]):e._e(),e._v(" "),e.$attrs.replyBy?a("p",{ref:"userName",staticClass:"cont-arrange-p"},[a("a",{staticStyle:{color:"#333333"},attrs:{href:"/user/"+e.$attrs.userId,target:"_blank"}},[e._v("\n              "+e._s(e.$attrs.replyBy)+"\n            ")])]):e._e(),e._v(" "),e.$attrs.establish?a("p",{ref:"userName",staticClass:"cont-arrange-p"},[a("a",{staticStyle:{color:"#333333"},attrs:{href:"/user/"+e.$attrs.userId,target:"_blank"}},[e._v("\n              "+e._s(e.$attrs.establish)+"\n            ")])]):e._e(),e._v(" "),e.$attrs.author?a("p",{staticClass:"cont-arrange-span"},[e._v("发布于")]):e._e(),e._v(" "),e.$attrs.establish?a("p",{staticClass:"cont-arrange-span"},[e._v("创建于")]):e._e(),e._v(" "),e.$attrs.replyBy?a("p",{staticClass:"cont-arrange-span"},[e._v("回复主题")]):e._e(),e._v(" "),e.$attrs.time?a("p",{staticClass:"cont-arrange-title"},[e._v(e._s(e.$attrs.time))]):e._e(),e._v(" "),e.$attrs.theme?a("p",{staticClass:"cont-arrange-title"},[e._v(e._s(e.$attrs.theme))]):e._e(),e._v(" "),e.$attrs.themeName?a("p",{ref:"themeName",class:e.$attrs.themeName?"themeName":""},[e._v("\n            "+e._s(e.$attrs.themeName)+"\n            "),e.$attrs.titleIcon?a("span",{staticClass:"iconfont cont-arrange__rt-main-header__release-title-icon",class:e.$attrs.titleIcon}):e._e()]):e._e()]),e._v(" "),e.$attrs.prply>=0&&e.$attrs.browse>=0?a("div",{staticClass:"cont-arrange__rt-main-header__reply-view rt-box"},[a("span",[e._v("回复/查看：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.prply)+"/"+e._s(e.$attrs.browse))])]):e._e(),e._v(" "),e.$attrs.last?a("div",{staticClass:"cont-arrange__rt-main-header__last-reply rt-box"},[a("span",[e._v("最后回复：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.last))])]):e._e(),e._v(" "),e.$attrs.ip?a("div",{staticClass:" rt-box"},[a("span",[e._v("IP：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.ip))])]):e._e(),e._v(" "),e.$attrs.releaseTime?a("div",{staticClass:"cont-arrange__rt-main-header__release-time rt-box"},[a("span",[e._v("发布时间：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.releaseTime))])]):e._e(),e._v(" "),e.$attrs.finalPost?a("div",{staticClass:"cont-arrange__rt-main-header__release-time rt-box"},[a("span",[e._v("更新时间：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.finalPost))])]):e._e(),e._v(" "),e.$attrs.deleTime?a("div",{staticClass:" rt-box"},[a("span",[e._v("删除时间：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.deleTime))])]):e._e(),e._v(" "),e.$attrs.numbertopic>=0?a("div",{staticClass:"cont-arrange__rt-main-header__release-time rt-box"},[a("span",[e._v("主题数：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.numbertopic))])]):e._e(),e._v(" "),e.$attrs.heatNumber>=0?a("div",{staticClass:"cont-arrange__rt-main-header__release-time rt-box"},[a("span",[e._v("热度数：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.heatNumber))])]):e._e(),e._v(" "),e.$attrs.type?a("div",{staticClass:"cont-arrange__rt-main-header__release-time rt-box"},[a("span",[e._v("类型：")]),e._v(" "),a("span",[e._v(e._s(e.$attrs.type))])]):e._e(),e._v(" "),e._t("header")],2),e._v(" "),e.$slots.longText?a("div",{staticClass:"cont-arrange__rt-main-long-text"},[e._t("longText")],2):e._e(),e._v(" "),a("div",{ref:"contMain",staticClass:"cont-arrange__rt-main-box",style:{height:e.showContStatus?e.mainHeight+30+"px":e.mainHeight>78?"78PX":""}},[e._t("main")],2),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.mainHeight>78,expression:"mainHeight > 78"}],ref:"contControl",staticClass:"cont-block-control",class:e.showBottomStatus?"is-bottom-out":"",on:{click:e.showCont}},[a("p",[a("span",{staticClass:"iconfont icondown-menu",class:e.showContStatus?"show-down":""}),e._v("\n          "+e._s(e.showContStatus?"收起详情":"展开详情")+"\n        ")])]),e._v(" "),e.$slots.footer?a("div",{staticClass:"cont-arrange__rt-main-footer"},[e._t("footer")],2):e._e()])])])},n=[]},u8Dz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{showContStatus:!1,showBottomStatus:!1,mainHeight:0,windowWidth:0,themeNameLeft:70,themeNameStyle:{left:"70",width:"calc(100% - "}}},props:{},methods:{showCont:function(){this.mainHeight=this.$slots.main[0].elm.offsetHeight,this.showContStatus=!this.showContStatus;var e=this.$slots.main[0].elm.getBoundingClientRect().width;this.$slots.main[0].elm.offsetHeight+this.$slots.main[0].elm.getBoundingClientRect().top>window.innerHeight&&(this.showBottomStatus=!0,this.$refs.contControl.style.width=e+40+"PX"),this.showContStatus||(this.showBottomStatus=!1,this.$refs.contControl.style.width="100%")},handleScroll:function(){this.$refs.contControl&&(this.$refs.contControl.style.width=this.$slots.main[0].elm.getBoundingClientRect().width+40+"PX"),this.$slots.main[0].elm.offsetHeight+this.$slots.main[0].elm.getBoundingClientRect().top<window.innerHeight?this.showBottomStatus=!1:this.showContStatus&&(this.showBottomStatus=!0)},browserSize:function(){if(this.$refs.contControl){var e=this.$slots.main[0].elm.getBoundingClientRect(),t=e.width,a=e.top,s=this.$refs.contControl.style;this.showContStatus?(this.$slots.main[0].elm.offsetHeight+a>window.innerHeight?s.width=t+40+"PX":s.width="100%",this.$refs.contMain.style.height=this.$slots.main[0].elm.offsetHeight+30+"PX"):s.width="100%"}},removeScrollHandler:function(){window.removeEventListener("scroll",this.handleScroll,!0),window.removeEventListener("resize",this.browserSize,!0)},themeStyle:function(){this.themeNameStyle.left="70",this.themeNameStyle.width="calc(100% - ",this.themeNameStyle.left=70+this.$refs.userName.clientWidth+"px",this.themeNameStyle.width=this.themeNameStyle.width+(100+this.$refs.userName.clientWidth)+"px)"}},mounted:function(){this.mainHeight=this.$slots.main[0].elm.offsetHeight,window.addEventListener("scroll",this.handleScroll,!0),window.addEventListener("resize",this.browserSize,!0),this.windowWidth=window.innerWidth,this.themeStyle()},beforeDestroy:function(){this.removeScrollHandler()}}}}]);