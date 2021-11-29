
import Card from '../../../view/site/common/card/card';
import CardRow from '../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      tableData: [],
      dialogVisible: true,
      fileList: [],
      uploadType: '',
      uploadDetails: '',
      radio: '',
      checkList: ['选中且禁用','复选框 A'],
      settingData: [
        {
          "field_key": "appid", // 字段key值，提交的时候需要
          "field_name": "appid", // 字段名称
          "field_ext": {}, // 字段扩展信息，主要是单选、多选、下拉框类型的字段会用到。其它字段类型暂时用不到
          "field_placeholder": "请输入微信小商店 Appid", // 字段占位符（主要是文本框输入之前的提示信息）
          "field_tip": "", // 字段提示
          "type": 0, // 字段类型：0 - 单行文本框；1 - 多行文本框；2 - 单选；3 - 多选；4 - 图片上传；5 - 附件上传；6 - 下拉框；7 - 可添加的单行文本框，8 - 开关，9 - 按钮
          "type_desc": "单行文本框" // 字段类型描述
        },
        {
          "field_key": "secret_key",
          "field_name": "secret key",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "请输入微信小商店 secret key",
          "field_tip": "",
          "type": 0,
          "type_desc": "单行文本框"
        },
        {
          "field_key": "desc",
          "field_name": "小店介绍",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "请输入微信小商店介绍",
          "field_tip": "",
          "type": 1,
          "type_desc": "多行文本框"
        },
        {
          "field_key": "desc",
          "field_name": "小店介绍",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "请输入微信小商店介绍",
          "field_tip": "",
          "type": 2,
          "type_desc": "多行文本框"
        },
        {
          "field_key": "desc",
          "field_name": "小店介绍",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "请输入微信小商店介绍",
          "field_tip": "",
          "type": 3,
          "type_desc": "多行文本框"
        },
        {
          "field_key": "desc",
          "field_name": "小店介绍",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "请输入微信小商店介绍",
          "field_tip": "",
          "type": 4,
          "type_desc": "多行文本框"
        },
        {
          "field_key": "desc",
          "field_name": "小店介绍",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "请输入微信小商店介绍",
          "field_tip": "",
          "type": 5,
          "type_desc": "多行文本框"
        },
        // 这里是一个下拉框的例子
        {
          "field_key": "select",
          "field_name": "内容导入",
          "field_ext": {
            "options": [
              {
                "value": "weibo",
                "label": "微博",
                "tip": "多次导入同一话题会导致数据重复，需要站长手动清理",
                "setting": [ // 当选中微博时，应该展示的表单选项
                  {
                    "field_key": "topic",
                    "field_name": "话题",
                    "field_ext": {},
                    "field_placeholder": "搜索想要导入站点的话题",
                    "field_tip": "",
                    "type": 0,
                    "type_desc": "单行文本框"
                  }
                ]
              },
              {
                "value": "tieba",
                "label": "贴吧",
                "tip": "多次导入同一话题会导致数据重复，需要站长手动清理",
                "setting": [ // 当选中微博时，应该展示的表单选项
                  {
                    "field_key": "topic",
                    "field_name": "话题",
                    "field_ext": {},
                    "field_placeholder": "搜索想要导入站点的话题",
                    "field_tip": "",
                    "type": 0,
                    "type_desc": "单行文本框"
                  }
                ]
              },
              {
                "value": "douban",
                "label": "豆瓣",
                "tip": "多次导入同一话题会导致数据重复，需要站长手动清理",
                "setting": [ // 当选中微博时，应该展示的表单选项
                  {
                    "field_key": "topic",
                    "field_name": "话题",
                    "field_ext": {},
                    "field_placeholder": "搜索想要导入站点的话题",
                    "field_tip": "",
                    "type": 0,
                    "type_desc": "单行文本框"
                  }
                ]
              },
              {
                "value": "wechat",
                "label": "微信公众号",
                "tip": "",
                "setting": [ // 当选中微博时，应该展示的表单选项
                  {
                    "field_key": "link",
                    "field_name": "链接",
                    "field_ext": {},
                    "field_placeholder": "输入想要导入的公众号文章链接",
                    "field_tip": "",
                    "type": 7,
                    "type_desc": "可添加的单行文本框（文本框后面跟一个添加按钮，大于一个时，有可删除的删除）"
                  }
                ]
              },
              {
                "value": "xingqiu",
                "label": "知识星球",
                "tip": "仅支持导入已加入的星球内容，多次导入同一话题会导致数据重复，需要站长手动清理",
                "setting": [ // 当选中微博时，应该展示的表单选项
                  {
                    "field_key": "topic",
                    "field_name": "话题",
                    "field_ext": {},
                    "field_placeholder": "搜索想要导入站点的话题",
                    "field_tip": "",
                    "type": 0,
                    "type_desc": "单行文本框"
                  }
                ]
              },
            ]
          }, // 字段扩展信息
          "field_placeholder": "请选择要导入的平台",
          "field_tip": "",
          "type": 6,
          "type_desc": "单选下拉框"
        },
        {
          "field_key": "isUsed",
          "field_name": "是否启用",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "",
          "field_tip": "",
          "type": 8,
          "type_desc": "开关"
        },
        {
          "field_key": "init",
          "field_name": "初始化数据",
          "field_ext": {}, // 字段扩展信息
          "field_placeholder": "",
          "field_tip": "点击此按钮，会进行数据初始化操作",
          "type": 9,
          "type_desc": "按钮",
          "event_opt": { // 事件选项，这个目前只有button类型的表单项才有这个，这个也主要是给后端初始化事情的使用，就是点击按钮直接请求一个接口即可，接口返回什么就toast提示什么
            "name": "request",
            "api": "/api/backAdmin/plugin/data.test", // 随便写的
            "method": "post",
            "params": {},
            "setTimeout": 0 // 0 代表不轮询，1000 代表 1s 轮询一次
          } 
        },
      ],
      topicContent: '',
      topicNum: '',
      speed: false, // 进度显示
      importing: '',
      progress: 0,
      startTiming: false,
      contentSourceValue: 'weibo',
      accuntlnroCookie: '',
      accuntlnroToken: '',
      planetCookie: '',
      planetUserAgent: '',
      totalNumber: 0,
      contentSource: [
        // {
        //   name: '微博',
        //   id: 1
        // },
        // {
        //   name: '贴吧',
        //   id: 2
        // },
        // {
        //   name: '豆瓣',
        //   id: 3
        // },
        // {
        //   name: '微信公众号',
        //   id: 4
        // },
        // {
        //   name: '知识星球',
        //   id: 5
        // },
      ],
      contentSourceType: '',
      contentSourceTip: '',
      contentPlaceholder: '',
      officialAccountLink: [
        {
          linkData: '',
        }
      ],
      fileList: [],
      enclosureList: [],
    }
  },
  created() {
    this.importDataBtn();
    this.contentImportData();
  },
  methods:{
    // determineBtn(type, scope) {
    //   this.uploadType = type;
    //   this.uploadDetails = scope.row;
    //   this.dialogVisible = true;
    // },
    // detailsClick() {
    //   this.dialogVisible = true;
    // },
    contentImportData() {
      this.settingData.forEach(item => {
        if (item.type === 6) {
          item.field_ext.options.forEach((items, index) => {
            if (index === 0) {
              this.contentSourceValue = items.value;
              this.contentSourceType = items.setting[0].type;
              this.contentSourceTip = items.tip;
              this.contentPlaceholder = items.setting[0].field_placeholder
            }
            this.contentSource.push({
              name: items.label,
              value: items.value,
              tip: items.tip,
              type: items.setting[0].type,
              placeholder: items.setting[0].field_placeholder,
            })
          })
        }
      })
      console.log(this.contentSource);
    },
    plugInRelease(id, num) {
      this.appFetch({
        url:'panel_operate_post_v3',
        method:'post',
        data: {
          appId: id,
          operate: num
        },
      })
      .then(data => {
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          if (num === 1) {
            this.$message({
              message: '插件发布成功',
              type: 'success'
            });
          }
          if (num === 2) {
            this.$message({
              message: '插件下线成功',
              type: 'success'
            });
          }
          if (num === 3) {
            this.$message({
              message: '插件删除成功',
              type: 'success'
            });
          }
          this.importDataBtn();
        }
      })
    },
    beforePluginUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (isLt20M == true) {
      }
      return isLt20M;
    },
    uploaderPlugin(e) {
      let logoFormData = new FormData();
      logoFormData.append("file", e.file);
      this.appFetch({
        url:'panel_upload_post_v3',
        method:'post',
        data: logoFormData,
      })
      .then(data => {
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          this.$message({
            message: '插件上传成功',
            type: 'success'
          });
          this.importDataBtn();
        }
      })
    },
    importDataBtn() {
      this.appFetch({
        url:'plugin_list_get_v3',
        method:'get',
        data:{}
      }).then(data=>{
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          this.tableData = data.Data;
        }
      })
    },
    typeConversion(type) {
      switch (type) {
        case 0: return '完全自定义插件';
          break;
        case 1: return '帖子新增类型';
          break;
        case 2: return '外部数据导入';
          break;
        case 3: return '广告插件';
          break;
        case 4: return '首页banner插件';
          break;
        case 5: return '表情插件';
          break;
        default:
          break;
      }
    },
    contentSourceChange(value) {
      this.contentSource.forEach(item => {
        if (item.value === value) {
          this.contentSourceType = item.type;
          this.contentSourceTip = item.tip;
          this.contentPlaceholder = item.placeholder;
        }
      })
    },
    increaseLink() {
      if (this.officialAccountLink.length < 20) {
        this.officialAccountLink.push(
          {
            linkData: '',
          }
        );
      }
    },
    deleteLink(index) {
      if (this.officialAccountLink.length > 1 ) {
        this.officialAccountLink.splice(index, 1);
      }
    },
    topicNumInput(value) {
      if (Number(value) > 1000) {
        this.$message.error('一次最多导入1000条');
        this.topicNum = '';
      }
    },
    importContentBtn() {
      let params = {};
      if (this.contentSourceValue === 'wechat') {
        let officialAccountUrlArr = [];
        this.officialAccountLink.map(item => {
          officialAccountUrlArr.push(item.linkData);
        })
        params = {
          officialAccountUrl: officialAccountUrlArr,
          platform: this.contentSourceValue,
        }
      } else if (this.contentSourceValue === 'xingqiu') {
        params = {
          topic: this.topicContent,
          cookie: this.planetCookie,
          userAgent: this.planetUserAgent,
          number: this.topicNum,
          platform: this.contentSourceValue,
        }
      } else {
        params = {
          topic: this.topicContent,
          number: this.topicNum,
          platform: this.contentSourceValue,
        }
      }
      this.appFetch({
        url:'create_crawler_get',
        method:'get',
        data: params,
      }).then(res => {
        if (res.errors){
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.speed = true;
          clearInterval(this.timer);
          this.startTiming = false;
          this.progress = 0;
          this.importing = 1;
          this.timer = setInterval(this.crawlerQuery, 2000);
          this.$message({
            message: res.Message,
            type: 'success'
          });
        }
      })
    },
    crawlerQuery() {
      this.appFetch({
        url:'check_crawler_get',
        method:'get',
      }).then( res => {
        if (res.errors){
          clearInterval(this.timer);
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            clearInterval(this.timer);
            this.$message.error(res.Message);
            return
          }
          const crawlerData = res.Data;
          if (crawlerData.startCrawlerTime !== 0) {
            this.startTiming = true;
            this.importing = crawlerData.status;
            this.progress = crawlerData.progress;
            // if (crawlerData.status === 2 && crawlerData.progress === 100) {
            //   this.progress = 100;
            //   clearInterval(this.timer);
            // }
            if (crawlerData.status !== 0 && crawlerData.status !== 1 && crawlerData.status !== 2) {
              clearInterval(this.timer);
            }
          }
          if (this.startTiming) {
            this.importing = crawlerData.status;
            this.progress = crawlerData.progress;
            if (crawlerData.status === 2 && crawlerData.progress === 100) {
              this.progress = 100;
              this.totalDataNumber = crawlerData.totalDataNumber;
              clearInterval(this.timer);
            }
            if (crawlerData.status !== 0 && crawlerData.status !== 1 && crawlerData.status !== 2) {
              clearInterval(this.timer);
            }
          }
        }
      })
    },
    determineBtn() {
      this.speed = false;
      clearInterval(this.timer);
    },
    cancelBtn() {
      history.go(0);
    },
    retryBtn() {
      this.importContentBtn();
    },
    uploaderEnclosure(file) {
      console.log(file);
    },
    uploaderRemove(file) {
      console.log(file);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploaderImg(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  components:{
    Card,
    CardRow
  }
}