/*
* 内容分类控制器
* */

import Card from '../../../../view/site/common/card/card';
import ContArrange from '../../../../view/site/common/cont/contArrange';
import tableNoList from '../../../../view/site/common/table/tableNoList'
import Page from '../../../../view/site/common/page/page';
import webDb from 'webDbHelper';
import { mapState, mapMutations } from 'vuex';
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import commonHelper from '../../../../../helpers/commonHelper';

export default {
  data: function () {
    return {
      operatingList: [
        {
          name: '批量移动到分类',
          label: 'class'
        },
        {
          name: '批量置顶',
          label: 'sticky'
        },
        {
          name: '批量删除',
          label: 'delete'
        },
        {
          name: '批量设置精华',
          label: 'marrow'
        },
        {
          name: '批量推送到付费首页',
          label: 'site'
        }
      ],  //操作列表
      operatingSelect: '',   //操作单选选择

      // categoriesList: [
      //   {
      //     name: '所有分类',
      //     id: 0
      //   }
      // ], //选择站点列表
      categoriesList: [
        {
          label: '所有分类',
          value: 0
        }
      ],
      moveCateList: [], // 批量移动的分类列表
      categoryId: '',        //选择站点选中

      toppingRadio: 2,       //是否置顶
      essenceRadio: 2,       //是否精华
      siteRadio: 2,       //是否推送到付费

      checkAll: false,       //全选状态
      checkAllNum: 0,        //多选打勾数
      themeListAll: [],      //主题列表全部
      checkedTheme: [],      //多选列表初始化
      isIndeterminate: false,//全选不确定状态

      themeList: [],         //主题列表
      currentPag: 1,         //当前页数
      total: 0,              //主题列表总条数
      pageCount: 1,          //总页数
      showViewer: false,     //预览图
      url: [],

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      searchData: {
        topicTypeId: '',         //主题类型
        contentSourceId: '',      // 内容来源
        // categoryId: 0,            //主题分类ID
        categoryId: [0],          //主题分类ID
        pageSelect: '10',         //每页显示数
        themeAuthor: '',          //主题作者
        threadID: '',               // 主题ID
        themeKeyWords: '',        //主题关键词
        dataValue: ['', ''],      //发表时间范围
        viewedTimesMin: '',       //被浏览次数最小
        viewedTimesMax: '',       //被浏览次数最大
        numberOfRepliesMin: '',   //被回复数最小
        numberOfRepliesMax: '',   //被回复数最大
        essentialTheme: '',       //精华主题类型
        topType: '',              //置顶主题类型
        isSite: '',               //是否推送首页付费主题
        topicId: 0,               //主题话题ID
      },
      topic: null,  // 话题
      topicType: [
        {
          name: '全部',
          id: '0'
        },
        {
          name: '置顶主题',
          id: '1'
        }, {
          name: '精华主题',
          id: '2'
        }, {
          name: '置顶并精华主题',
          id: '3'
        },
        {
          name: '付费首页主题',
          id: '4'
        }
      ],
      contentSource : [
        {
          name: '全部',
          id: ''
        },
        {
          name: '导入内容',
          id: 1
        },
        {
          name: '普通内容',
          id: 0
        },
      ],
      subLoading:false,     //提交按钮状态

    }
  },
  computed: mapState({
    // searchData:state => state.admin.searchData
  }),

  methods: {
    /*...mapMutations({
      setSearch:'admin/SET_SEARCH_CONDITION'
    }),*/

    imgShowClick(list, imgIndex) {
      this.url = [];
      let urlList = [];

      list.forEach((item) => {
        urlList.push(item.url)
      });

      this.url.push(urlList[imgIndex]);

      urlList.forEach((item, index) => {
        if (index > imgIndex) {
          this.url.push(item);
        }
      });

      urlList.forEach((item, index) => {
        if (index < imgIndex) {
          this.url.push(item);
        }
      });

      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    },

    handleCheckAllChange(val) {
      /*if (val){
        this.checkedTheme.forEach((item,index)=>{
          this.checkedTheme[index].id = this.themeList[index].id();
          this.checkedTheme[index].status = true;
          this.checkAllNum = this.checkedTheme.length;
        })
      } else {
        this.checkedTheme.forEach((item,index)=>{
          this.checkedTheme[index].id = this.themeList[index].id();
          this.checkedTheme[index].status = false;
          this.checkAllNum = 0;
        })
      }
      this.isIndeterminate = false;
      */

      this.checkedTheme = val ? this.themeListAll : [];
      this.isIndeterminate = false;
    },

    handleCheckedCitiesChange(index, id, status) {

      let checkedCount = this.checkedTheme.length;
      this.checkAll = checkedCount === this.themeListAll.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.themeListAll.length;

      /*this.checkedTheme[index].id = id;

      let checkLength = this.checkedTheme.length;

      /!*
      * 统计多选打勾数
      * *!/
      this.checkAllNum = status
        ? this.checkAllNum + 1 : this.checkAllNum - 1;

      /!*
      * 如果打勾数大于 0 或小于 主题列表长度，则全选不确定状态打开
      * *!/
      if (this.checkAllNum > 0 && this.checkAllNum < checkLength){
        this.isIndeterminate = true;
      }

      /!*
      * 如果打勾数等于主题列表长度，则全选状态打开，不确定状态关闭
      * *!/
      if (this.checkAllNum === checkLength){
        this.checkAll = true;
        this.isIndeterminate = false;
      }

      /!*
      * 如果打勾数小于1，则全选状态、不确定状态都关闭
      * *!/
      if (this.checkAllNum < 1){
        this.isIndeterminate = false;
        this.checkAll = false;
      }*/

    },

    /*
    * 格式化日期
    * */
    formatDate(data) {
      return this.$dayjs(data).format('YYYY-MM-DD HH:mm')
    },
    // 提交
    submitClick() {
      this.subLoading = true;

      let themeData = [];      //操作主题数据
      let themeId = [];
      let attributes = {};        //操作选项
      let relationships = {
        'category': {
          'data': {
            'id': ''
          }
        }
      };  //主题分类关系
      let selectStatus = false;
      if (this.operatingSelect === 'class') {
        this.checkedTheme.forEach((item, index) => {
          themeId.push(item);
          // themeData.push(
          //   {
          //     'type': 'threads',
          //     'id': item,
          //     'attributes': attributes,
          //     'relationships': relationships
          //   }
          // )
        });
      } else {
        this.checkedTheme.forEach((item, index) => {
          themeId.push(item);
          // themeData.push(
          //   {
          //     'type': 'threads',
          //     'id': item,
          //     'attributes': attributes,
          //   }
          // )
        });
      }
      attributes.ids = themeId.toString();
      switch (this.operatingSelect) {
        case 'class':
          if (this.categoryId) {
            attributes.categoryId = this.categoryId[this.categoryId.length -1];
            // relationships.category.data.id = this.categoryId;
            // relationships.category.data.id = this.categoryId[this.categoryId.length -1];

          } else {
            selectStatus = true;
          }
          break;
        case 'sticky':
          attributes.isSticky = this.toppingRadio === 1 ? 1 : 0;
          break;
        case 'delete':
          attributes.isDeleted = 1;
          break;
        case 'marrow':
          attributes.isEssence = this.essenceRadio === 1 ? 1 : 0;
          break;
        case 'site':
          attributes.isSite = this.siteRadio === 1 ? 1 : 0;
          break;
        default:
          selectStatus = true;
          this.subLoading = false;
          if (themeId.length > 0){
            this.$message({
              showClose: true,
              message: '操作选项错误，请重新选择或刷新页面(F5)',
              type: 'warning'
            });
          }
      }

      /*if (selectStatus){
        this.$message({
          showClose: true,
          message: '操作选项错误，请重新选择或刷新页面(F5)',
          type: 'warning'
        });
      }*/

      if (themeId.length < 1) {
        this.$message({
          showClose: true,
          message: '操作主题列表为空，请选择主题',
          type: 'warning'
        });
        this.subLoading = false;
      } else if (!selectStatus) {
        this.appFetch({
          url: 'threads_batch_post_v3',
          method: 'post',
          data: attributes
        }).then(res => {
          this.subLoading = false;
          if (res.errors) {
            this.$message.error(res.errors[0].code);
          } else {
            if (res.Code !== 0) {
              this.$message.error(res.Message);
              return
            }
            if (this.pageCount < 3) {
              this.currentPag = 1;
              webDb.setLItem('currentPag', 1);
            }
            this.getThemeList(Number(webDb.getLItem('currentPag')) || 1);
            this.isIndeterminate = false;
            this.checkAll = false;
            this.checkedTheme = [];
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          }
        }).catch(err => {
        })
      }

    },

    handleCurrentChange(val) {
      document.getElementsByClassName('index-main-con__main')[0].scrollTop = 0;
      this.isIndeterminate = false;
      this.currentPag = val;
      this.checkAll = false;
      this.checkedTheme = [];
      this.getThemeList(val);
    },

    searchClick() {
      //判断主题类型
      switch (this.searchData.topicTypeId) {
        case '0':
          this.searchData.essentialTheme = '';
          this.searchData.topType = '';
          this.searchData.isSite = '';
          break;
        case '1':
          this.searchData.essentialTheme = '';
          this.searchData.topType = 'yes';
          this.searchData.isSite = '';
          break;
        case '2':
          this.searchData.essentialTheme = 'yes';
          this.searchData.topType = '';
          this.searchData.isSite = '';
          break;
        case '3':
          this.searchData.essentialTheme = 'yes';
          this.searchData.topType = 'yes';
          this.searchData.isSite = '';
          break;
        case '4':
          this.searchData.essentialTheme = '';
          this.searchData.topType = '';
          this.searchData.isSite = 'yes';
          break;
      }

      //处理时间为空
      this.searchData.dataValue = this.searchData.dataValue == null ? ['', ''] : this.searchData.dataValue;
      this.topic = null;
      this.currentPag = 1;
      this.getThemeList(1);
    },

    /*
    * 请求接口
    * */
    getThemeList(pageNumber) {
      let searchData = this.searchData;
      this.appFetch({
        url: 'thread_get_v3',
        method: 'get',
        data: {
          page: pageNumber,
          perPage: searchData.pageSelect,
          nickname: searchData.themeAuthor,
          threadType: searchData.topicTypeId,
          viewCountGt: searchData.viewedTimesMin,
          viewCountLt: searchData.viewedTimesMax,
          postCountGt: searchData.numberOfRepliesMin,
          postCountLt: searchData.numberOfRepliesMax,
          isApproved: 1,
          threadId: searchData.threadID,
          q: searchData.themeKeyWords,
          isDeleted: 'no',
          createdAtBegin: searchData.dataValue[0],
          createdAtEnd: searchData.dataValue[1],
          categoryId: searchData.categoryId[searchData.categoryId.length - 1],
          source: searchData.contentSourceId,
          sort: '-created_at',
        }
      }).then(res => {
        if (res.errors) {
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.themeList = res.Data.pageData;
          this.total = res.Data.totalCount;
          this.pageCount = res.Data.totalPage;

          this.themeListAll = [];
          this.themeList.forEach((item, index) => {
            this.themeListAll.push(item.threadId);
          });
        }
      }).catch(err => {
      })
    },
    getCategories() {
      this.appFetch({
        url: 'categories_get_v3',
        method: 'get',
        data: {}
      }).then(res => {
        if (res.errors) {
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          res.Data.forEach(item => {
            if (item.children.length) {
              const child = []
              item.children.forEach(c => {
                child.push({
                  label: c.name,
                  value: c.searchIds.length > 1 ? c.searchIds[0] : c.searchIds,
                })
              })
              this.categoriesList.push({
                label: item.name,
                value: item.searchIds.length > 1 ? item.searchIds[0] : item.searchIds,
                children: child
              })
              this.moveCateList.push({
                label: item.name,
                value: item.pid,
                children: child
              })
            } else {
              this.categoriesList.push({
                label: item.name,
                value: item.searchIds.length > 1 ? item.searchIds[0] : item.searchIds,
              })
              this.moveCateList.push({
                label: item.name,
                value: item.pid
              })
            }
          })
        }
      }).catch(err => {
      })
    },

    contentIndexes(data, val) {
      return commonHelper.dataTypeJudgment(data, val);
    },
    filterContent(text) {
      const emojis = webDb.getLItem('Emoji');
      return commonHelper.convertEmoticon(text, emojis);
    }
  },

  beforeDestroy() {
    webDb.setLItem('currentPag', 1);

    let data = new Object();

    for (let key in this.searchData) {
      if (key === 'pageSelect') {
        data[key] = '10'
      } else {
        data[key] = ''
      }
    }

    // this.setSearch(data);
  },

  created() {
    if (this.$route.query && this.$route.query.name) {
      this.searchData.topicId = this.$route.query.id;
      this.topic =  this.$route.query.name;
    }

    this.currentPag = Number(webDb.getLItem('currentPag')) || 1;
    this.getThemeList(Number(webDb.getLItem('currentPag')) || 1);
    this.getCategories();
  },

  components: {
    Card,
    ContArrange,
    tableNoList,
    ElImageViewer,
    Page
  }

}
