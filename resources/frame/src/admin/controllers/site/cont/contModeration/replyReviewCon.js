/*
* 内容审核-回复审核控制器
* */

import Card from '../../../../view/site/common/card/card';
import ContArrange from '../../../../view/site/common/cont/contArrange';
import Page from '../../../../view/site/common/page/page';
import tableNoList from '../../../../view/site/common/table/tableNoList';
import webDb from 'webDbHelper';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import commonHelper from "../../../../../helpers/commonHelper";


export default {
  data:function () {
    return {
      searchUserName:'',          //用户名
      keyWords:'',                //关键词
      showSensitiveWords:false,   //显示敏感词
      pageOptions: [
        {
          value: 10,
          label: '每页显示10条'
        }, {
          value: 20,
          label: '每页显示20条'
        }, {
          value: 30,
          label: '每页显示30条'
        }
      ],
      pageSelect:10,              //每页显示数选择值选中
      searchReview:[
        {
          value:0,
          label:'未审核'
        },
        {
          value:2,
          label:'已忽略'
        }
      ],
      searchReviewSelect:0,       //审核状态选中
      // categoriesList:[],
      // categoriesListSelect:'',    //搜索分类选中
      categoriesList: [
        {
          label: '所有分类',
          value: 0
        }
      ],
      categoriesListSelect:[0],    //搜索分类选中
      searchTime:[
        {
          value:1,
          label:'全部'
        },
        {
          value:2,
          label:'最近一周'
        },
        {
          value:3,
          label:'最近一个月'
        },
        {
          value:4,
          label:'最近三个月'
        }
      ],
      searchTimeSelect:1,         //搜索时间选中
      relativeTime:['',''],       //搜索相对时间转换

      reasonForOperation:[
        {
          value:'无',
          label:'无'
        },
        {
          value:'广告/SPAM',
          label:'广告/SPAM'
        },
        {
          value:'恶意灌水',
          label:'恶意灌水'
        },
        {
          value:'违规内容',
          label:'违规内容'
        },
        {
          value:'文不对题',
          label:'文不对题'
        },
        {
          value:'重复发帖',
          label:'重复发帖'
        },
        {
          value:'我很赞同',
          label:'我很赞同'
        },
        {
          value:'精品文章',
          label:'精品文章'
        },
        {
          value:'原创内容',
          label:'原创内容'
        },
        {
          value:'其他',
          label:'其他'
        }
      ],
      reasonForOperationSelect:1, //操作理由选中
      appleAll:false,             //应用其他页面
      themeList:[],               //主题列表
      currentPaga: 1,             //当前页数
      total:0,                    //主题列表总条数
      pageCount:1,                //总页数
      ignoreStatus:true,          //全部忽略是否显示
      submitForm:[],              //操作理由表单
      showViewer:false,           //预览图
      url:[],
      subLoading:false,           //提交按钮状态
      btnLoading:0,               //0表示没有loading状态，1：全部通过、2：全部删除、3：全部忽略

      //未审核0，已审核\通过1，已忽略2
    }
  },

  methods:{
    titleIcon(item){
      return commonHelper.titleIcon(item);
    },

    imgShowClick(list,imgIndex){
      this.url = [];
      let urlList = [];

      list.forEach((item)=>{
        urlList.push(item.url)
      });

      this.url.push(urlList[imgIndex]);

      urlList.forEach((item,index)=>{
        if (index > imgIndex){
          this.url.push(item);
        }
      });

      urlList.forEach((item,index)=>{
        if (index < imgIndex){
          this.url.push(item);
        }
      });

      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    },


    handleSelectionChange(val) {
      this.multipleSelection = val;

      if (this.multipleSelection.length >= 1){
        this.deleteStatus = false
      } else {
        this.deleteStatus = true
      }

    },

    reasonForOperationChange(event,index){
      this.submitForm[index].message = event;
    },

    handleCurrentChange(val) {
      document.getElementsByClassName('index-main-con__main')[0].scrollTop = 0;
      webDb.setLItem('currentPag',val);
      this.currentPaga = val;
      // this.isIndeterminate = false;
      // this.checkAll = false;
      this.getPostsList(val);
    },

    postSearch(){
      this.ignoreStatus = this.searchReviewSelect === 2?false:true;
      this.currentPaga = 1;
      this.getPostsList();
    },

    searchTimeChange(val){
      let end = new Date();
      let start = new Date();
      this.relativeTime = [];

      switch (val){
        case 1:
          this.relativeTime.push('','');
          break;
        case 2:
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          this.relativeTime.push(this.formatDate(end),this.formatDate(start));
          break;
        case 3:
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          this.relativeTime.push(this.formatDate(end),this.formatDate(start));
          break;
        case 4:
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          this.relativeTime.push(this.formatDate(end),this.formatDate(start));
          break;
        default:
          this.$message.error('搜索日期选择错误，请重新选择！或 刷新页面（F5）');
      }


    },

    submitClick() {
      // this.subLoading = true;
      // this.patchPostsBatch(this.submitForm);
      this.subLoading = true;
      const recommend = [];
      const cancelrecomend = [];
      const detelethem = [];
      this.submitForm.forEach((value,index) => {
        if (value.radio === 0) {
          recommend.push({
            id: value.id,
            isApproved: 1,
          });
        } else if(value.radio === 1) {
          detelethem.push({
            id: value.id,
            isDeleted: true,
          })
        } else if (value.radio === 2) {
          cancelrecomend.push({
            id: value.id,
            isApproved: 2,
          })
        }
      })
      if(recommend.length >= 1) {
        this.patchPostsBatch(recommend);
      }
      if(detelethem.length >= 1) {
        this.patchPostsBatch(detelethem);
      }
      if(cancelrecomend.length >= 1) {
        this.patchPostsBatch(cancelrecomend);
      }
    },

    radioChange(event,index){
      switch (event){
        case 0:
          this.submitForm[index].isApproved = 1;
          break;
        case 1:
          this.submitForm[index].isDeleted = true;
          break;
        case 2:
          this.submitForm[index].isApproved = 2;
          break;
      }
    },

    allOperationsSubmit(val){
      this.btnLoading = val;
      const submitArr = [];
      switch (val){
        case 1:
          this.submitForm.forEach((item,index)=>{
            submitArr.push({
              id: item.id,
              isApproved: 1,
            })
          });
          break;
        case 2:
          this.submitForm.forEach((item,index)=>{
            submitArr.push({
              id: item.id,
              isDeleted: true,
            })
          });
          break;
        case 3:
          this.submitForm.forEach((item,index)=>{
            submitArr.push({
              id: item.id,
              isApproved: 2,
            })
            // this.submitForm[index].isApproved = 2;
          });
          break;
      }
      this.patchPostsBatch(submitArr);
    },

    singleOperationSubmit(val,categoryId,themeId,index){
      let data = [
         {
          id: Number(themeId)
         }
      ];
      switch (val){
        case 1:
          data[0].isApproved = 1;
          data[0].message = this.submitForm[index].message;
          this.patchPosts(data,themeId);
          break;
        case 2:
          data[0].isDeleted = true;
          data[0].message = this.submitForm[index].message;
          this.patchPosts(data,themeId);
          break;
        case 3:
          data[0].isApproved = 2;
          data[0].message = this.submitForm[index].message;
          this.patchPosts(data,themeId);
          break;
        default:
          //系统错误，请刷新页面
      }
    },

    viewClick(id){
      //查看:/details/140  带id
      //编辑：/reply-to-topic  隐藏传入内容，带id
      //回帖：replyId

      let routeData = this.$router.resolve({
        path: "/thread/" + id,   //id当前是回帖id
      });
      window.open(routeData.href, '_blank');
    },

    editClick(id,replyId){
      let routeData = this.$router.resolve({
        path: `/reply-to-topic/${id}/${replyId}`,query:{edit:'reply'}
      });
      window.open(routeData.href, '_blank');
    },

    /*
    * 格式化日期
    * */
    formatDate(data){
      return this.$dayjs(data).format('YYYY-MM-DD HH:mm')
    },

    /*
    * 请求接口
    * */
    getPostsList(pageNumber){
      this.appFetch({
        url:'posts_get_v3',
        method:'get',
        data:{
          // include: ['user','thread','thread.category','thread.firstPost','images'],
          page:pageNumber,
          perPage:this.pageSelect,
          isDeleted: 'no',
          uickname: this.searchUserName,
          q: this.keyWords,
          isApproved: this.searchReviewSelect,
          createdAtBegin: this.relativeTime[1],
          createdAtEnd: this.relativeTime[0],
          categoryId: this.categoriesListSelect[this.categoriesListSelect.length - 1],
          highlight: this.showSensitiveWords?'yes':'no',
          sort:'-created_at',
        }
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          this.themeList = [];
          this.submitForm = [];
          this.themeList = res.Data.pageData;
          this.total = res.Data.totalCount;
          this.pageCount = res.Data.totalPage;

          this.themeList.forEach((item, index) => {
            this.submitForm.push({
              // message:'',
              Select: '无',
              radio: '',
              type: 2,
              id: item.postId,
              isApproved: 0,
              isDeleted: false,
              message: '',
            })
          });
        }
      }).catch(err=>{
      })

    },
    getCategories(){
      this.appFetch({
        url:'categories_get_v3',
        method:'get',
        data:{}
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          // this.categoriesList = [];
          // res.data.forEach((item, index) => {
          //   this.categoriesList.push({
          //     name: item.attributes.name,
          //     id: item.id
          //   })
          // })
          res.Data.forEach((item, index) => {
            if (item.children.length) {
              const child = []
              item.children.forEach(c => {
                child.push({
                  label: c.name,
                  value: c.searchIds
                })
              })
              this.categoriesList.push({
                label: item.name,
                value: item.searchIds,
                children: child
              })
            } else {
              this.categoriesList.push({
                label: item.name,
                value: item.searchIds
              })
            }
          })
        }
      }).catch(err=>{
      })

    },
    patchPostsBatch(data){
      this.appFetch({
        url:'submit_review_post_v3',
        method:'post',
        data:{
          type: 2,
          data
        }
      }).then(res=>{
        this.subLoading = false;
        this.btnLoading = 0;
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.getPostsList(Number(webDb.getLItem('currentPag')) || 1);
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }
      }).catch(err=>{

      })
    },
    patchPosts(data,id){
      this.appFetch({
        url:'submit_review_post_v3',
        method:'post',
        data:{
          type: 2,
          data
        }
      }).then(res=>{
        this.subLoading = false;
        this.btnLoading = 0;
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          this.getPostsList(Number(webDb.getLItem('currentPag')) || 1);
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }
      }).catch(err=>{
      })
    },

    contentIndexes(data, val) {
      return commonHelper.dataTypeJudgment(data, val);
    },

  },
  created(){
    this.getCategories();
    this.getPostsList(Number(webDb.getLItem('currentPag'))||1);
  },

  components:{
    Card,
    ContArrange,
    Page,
    tableNoList,
    ElImageViewer
  }

}
