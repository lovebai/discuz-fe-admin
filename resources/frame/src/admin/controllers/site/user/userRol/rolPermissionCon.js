/**
 * 角色权限编辑
 */
import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";

export default {
  data: function () {
    return {
      groupId: 0, // 用户组 ID
      checked: [], // 选中的权限
      videoDisabled: false, // 是否开启云点播
      captchaDisabled: false, // 是否开启验证码
      realNameDisabled: false, // 是否开启实名认证
      isSubordinate: false, // 是否开启推广下线
      isCommission: false, // 是否开启分成
      scale: 0, // 提成比例
      bindPhoneDisabled: false, // 是否开启短信验证
      wechatPayment: false, // 是否开启微信支付
      isReward: false, // 是否开启打赏功能
      categoriesList: [], // 分类列表
      selectList: {
        "createThread": [], // 发布帖子
        "insertImage": [], // 插入图片
        "insertVideo": [], // 插入视频
        "insertAudio": [], // 插入语音
        "insertDoc": [], // 插入附件
        "insertGoods": [], // 插入商品
        "insertPay": [], // 插入付费
        "insertReward": [], // 插入悬赏
        "insertRedPacket": [], // 插入红包
        "insertPosition": [], // 插入位置
        'viewThreads': [], // 查看主题列表扩展
        'thread.reply': [], // 回复主题扩展项
        'thread.edit': [], // 编辑主题扩展
        'thread.hide': [], // 删除主题扩展
        'thread.essence': [], // 加精扩展
        'thread.viewPosts': [], // 查看主题详情扩展
        'thread.editPosts': [], // 编辑回复扩展
        'thread.hidePosts': [], // 删除回复扩展
        'thread.canBeReward': [], //打赏扩展
        'thread.editOwnThreadOrPost': [], // 编辑自己的主题、回复
        'thread.hideOwnThreadOrPost': [], // 删除自己的主题、回复
        'thread.freeViewPosts.1': [],
        'thread.freeViewPosts.2': [],
        'thread.freeViewPosts.3': [],
        'thread.freeViewPosts.4': [],
        'thread.freeViewPosts.5': [],
      },
      activeTab: {
        // 设置权限当前项
        title: "操作权限",
        name: "userOperate"
      },
      menuData: [
        // 设置权限
        {
          title: "操作权限",
          name: "userOperate"
        },
        {
          title: "安全设置",
          name: "security"
        },
        // {
        //   title: "价格设置",
        //   name: "pricesetting"
        // },
        {
          title: "其他设置",
          name: "other"
        }
        // {
        //   title: '默认权限',
        //   name: 'default'
        // },
      ],
      value: "",
      purchasePrice: "",
      dyedate: "",
      ispad: "",
      allowtobuy: "",
      defaultuser: false,
      checkAll: false, //是否全选
      isIndeterminate: false,//全选不确定状态
      selectText: '全选', //全选文字
      checkAllPermission: [], //所有操作权限
      temporaryChecked: [], //接口返回权限
      // 扩展全选
      expandItem: [
        "createThread",
        "insertImage",
        "insertVideo",
        "insertAudio",
        "insertDoc",
        "insertGoods",
        "insertPay",
        "insertReward",
        "insertRedPacket",
        "insertPosition",
        'viewThreads',
        'thread.reply',
        'thread.edit',
        'thread.hide',
        'thread.essence',
        'thread.viewPosts',
        'thread.editPosts',
        'thread.hidePosts',
        'thread.canBeReward',
        'thread.editOwnThreadOrPost',
        'thread.hideOwnThreadOrPost',
        'thread.freeViewPosts.1',
        'thread.freeViewPosts.2',
        'thread.freeViewPosts.3',
        'thread.freeViewPosts.4',
        'thread.freeViewPosts.5'
      ],
      mapCategoryId: new Map(),
      keyValue: 0
    };
  },
  watch: {
    checked(val) {
      let isEqual = true;
      this.checkAllPermission.forEach(item => {
        if (val.indexOf(item) === -1) {
          isEqual = false;
          return;
        }
      });
      if (isEqual) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
    },
    checkAll(val) {
      if (val) {
        this.isIndeterminate = false;
        this.selectText = "取消全选";
      } else {
        this.isIndeterminate = true;
        this.selectText = "全选";
      }
    }
  },
  methods: {
    duedata: function (evn) {
      this.duedata = evn.replace(/[^\d]/g, "");
    },
    addprice: function (evn) {
      setTimeout(() => {
        this.purchasePrice = evn
          .replace(/[^\d.]/g, "")
          .replace(/\.{2,}/g, ".")
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".")
          .replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3")
          .replace(/^\./g, "");
      }, 5);
    },

    getData() {
      Promise.all([this.getCategories(), this.getGroupResource(), this.getSiteInfo()])
        .then(
          res => {
            this.handleCategories(res[0]);
            this.handleGroupResource(res[1]);
            this.signUpSet(res[2]);
          },
          err => {
            console.log(err);
          }
        )
    },
    handleCategories(res) {
      if (res.errors) return this.$message.error(res.errors[0].code);

      this.categoriesList = [{ id: "", name: "全局", children: [] }]
      res.readdata.forEach(item => {
        this.mapCategoryId.set(parseInt(item._data.id), item._data.parentid);
        const category = {
          id: item._data.id,
          name: item._data.name,
          children: []
        }
        if (item._data.children) {
          item._data.children.forEach(subItem => {
            this.mapCategoryId.set(subItem.id, subItem.parentid);
            category.children.push({
              id: subItem.id,
              name: subItem.name
            })
          })
        }
        this.categoriesList.push(category);
      });
    },
    handleGroupResource(res) {
      // console.log('v3权限 :>> ', res);
      if (res.Code !== 0) {
        return this.$message.error(`${res.Code} ${res.Message}`)
      }

      const data = res.Data;
      this.ispad = data.isPaid;
      this.scale = data.scale;
      // this.dyedate = data.days;
      // this.purchasePrice = data.fee;
      this.defaultuser = data.default;
      this.isCommission = data.isCommission;
      this.isSubordinate = data.isSubordinate;
      // this.value = data.isPaid;

      const permissions = data.permission || [];
      this.checked = [];
      permissions.forEach(item => {
        this.checked.push(item.permission);
      });

      // 回显选择值
      this.setSelectValue(this.checked);
    },
    signUpSet(res) {
      if (res.errors) return this.$message.error(res.errors[0].code);

      const data = res.readdata._data;
      const siteData = res.readdata._data.set_site;
      this.videoDisabled = data.qcloud.qcloud_vod === false;
      this.captchaDisabled = data.qcloud.qcloud_captcha === false;
      this.realNameDisabled = data.qcloud.qcloud_faceid === false;
      this.bindPhoneDisabled = data.qcloud.qcloud_sms === false;
      this.wechatPayment = data.paycenter.wxpay_close === false;
      this.isReward = data.set_site.site_can_reward === 1;
      this.allowtobuy = siteData.site_pay_group_close;
      // if (!this.allowtobuy) {
      //   this.value = false;
      // }
    },
    // 扩展项回显
    setSelectValue(data) {
      const checkedData = data;
      console.log('checkedData', checkedData);
      const selectList = this.selectList;
      checkedData.forEach((value, index) => {

        // 1 分类-非全局状态回显
        if (value.includes("category")) {
          const splitIndex = value.indexOf(".");
          const obj = value.substring(splitIndex + 1);
          if (checkedData.includes(obj)) {
            checkedData.splice(index, 1);
            return;
          }
          const id = value.substring(8, splitIndex);
          const parentId = this.mapCategoryId.get(parseInt(id));
          const selectItem = parentId === 0 ? [id] : [parentId, id];
          selectList[obj].push(selectItem);
          return;
        }

        // 2 分类-全局状态回显
        this.expandItem.includes(value) && selectList[value].push([""]);
      });
      this.selectList = selectList;
      this.checked = checkedData;
    },
    // 提交权限选择
    submitClick() {
      if (!this.checkNum()) {
        return;
      }
      if (!this.checkSelect()) {
        return;
      }
      if (this.value) {
        if (this.purchasePrice == 0) {
          this.$message.error("价格不能为0");
          return;
        } else if (this.purchasePrice == " ") {
          this.$message.error("价格不能为空");
          return;
        } else if (this.dyedate == 0) {
          this.$message.error("到期时间不能为0");
          return;
        } else if (this.dyedate == " ") {
          this.$message.error("到期时间不能为空");
          return;
        } else {
          this.patchGroupScale();
        }
      } else {
        this.patchGroupScale();
      }
    },

    /*
     * 接口请求
     * */
    getSiteInfo() {
      return this.appFetch({ url: "forum", method: "get" });
    },
    getCategories() {
      return this.appFetch({ url: "categories", method: "get" });
    },
    getGroupResource() {
      return this.appFetch({
        url: "permission_get_v3",
        method: "get",
        apiType: 'v3',
        params: {
          id: this.groupId,
          include: 'permission',
        }
      })
    },

    patchGroupPermission() {
      let checked = this.checked;
      if (this.isCommission || this.isSubordinate) {
        if (checked.indexOf("other.canInviteUserScale") === -1) {
          checked.push("other.canInviteUserScale");
        }
      } else {
        checked = checked.filter(v => v !== "other.canInviteUserScale");
      }

      const param = {
        groupId: this.groupId,
        permissions: checked,
      }

      this.appFetch({
        url: "permission_update_v3",
        method: "post",
        data: param,
        apiType: 'v3',
      })
        .then(res => {
          if (res.Code === 0) {
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
          } else {
            this.$message.error(res.Message);
          }
        })
        .catch(err => { });
    },

    patchGroupScale() {
      this.appFetch({
        url: "groups",
        method: "PATCH",
        splice: "/" + this.groupId,
        data: {
          data: {
            attributes: {
              name: this.$route.query.name,
              // is_paid: this.value ? 1 : 0,
              // fee: this.purchasePrice,
              // days: this.dyedate,
              scale: this.scale,
              is_subordinate: this.isSubordinate,
              is_commission: this.isCommission
            }
          }
        }
      })
        .then(res => {
          if (res.errors) {
            this.$message.error(res.errors[0].code);
          } else {
            this.patchGroupPermission();
          }
        })
        .catch(err => { });
    },

    handlePromotionChange(value) {
      this.isSubordinate = value;
    },
    handleScaleChange(value) {
      this.isCommission = value;
    },
    checkNum() {
      if (!this.scale) {
        return true;
      }
      const reg = /^([0-9](\.\d)?|10)$/;
      if (!reg.test(this.scale)) {
        this.$message({
          message: "提成比例必须是0~10的整数或者一位小数",
          type: "error"
        });
        return false;
      }
      return true;
    },
    // 分类下拉改变
    changeCategory(value, obj) {
      let checked = this.checked;
      const isAll = this.checked.includes(obj);

      // 获取当前选中的权限字符串;全选权限不用加category
      const selectPermission = value.map(item => {
        return item[0] ? `category${item[item.length - 1]}.${obj}` : obj;
      })

      if (isAll) {
        // 取消全选
        this.selectList[obj] = value.filter(v => v[0] !== "");
        selectPermission.shift();
        checked = checked.filter(item => item !== obj);
        checked = [...checked, ...selectPermission];

      } else if (selectPermission.includes(obj)) {
        // 非全选-选中全选
        this.selectList[obj].splice(1);
        checked = checked.filter(item => !selectPermission.includes(item));
        checked.push(obj);
        this.keyValue = Math.random();
      } else {
        // 非全选-选中一二级分类项
        checked = checked.filter(item => {
          return !(item.includes('category') && item.includes(obj));
        });
        checked = [...checked, ...selectPermission];
      }
      this.checked = checked;
    },
    // 清除tag
    clearItem(value, obj) {
      let checked = this.checked;
      const removedPermission = value[0] ? `category${value[value.length - 1]}.${obj}` : obj;
      checked = checked.filter(v => v !== removedPermission);
      this.selectList[obj].shift();
      this.checked = checked;
      this.keyValue = Math.random();
    },
    changeChecked(value, obj) {
      if (value) return;
      const checkedData = this.checked;
      const selectedPermission = this.selectList[obj].map(item => {
        return item[0] ? `category${item[item.length - 1]}.${obj}` : obj;
      })
      this.checked = checkedData.filter(v => !selectedPermission.includes(v));
      this.selectList[obj] = [];
    },
    checkSelect() {
      if (this.checked.includes('switch.createThread')) {
        if (this.selectList.createThread.length === 0) {
          this.$message.error("请选择发布帖子权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertImage')) {
        if (this.selectList.insertImage.length === 0) {
          this.$message.error("请选择插入图片权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertVideo')) {
        if (this.selectList.insertVideo.length === 0) {
          this.$message.error("请选择插入视频权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertAudio')) {
        if (this.selectList.insertAudio.length === 0) {
          this.$message.error("请选择插入语音权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertDoc')) {
        if (this.selectList.insertDoc.length === 0) {
          this.$message.error("请选择插入附件权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertGoods')) {
        if (this.selectList.insertGoods.length === 0) {
          this.$message.error("请选择插入商品权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertPay')) {
        if (this.selectList.insertPay.length === 0) {
          this.$message.error("请选择插入付费权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertReward')) {
        if (this.selectList.insertReward.length === 0) {
          this.$message.error("请选择插入悬赏权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertRedPacket')) {
        if (this.selectList.insertRedPacket.length === 0) {
          this.$message.error("请选择插入红包权限");
          return false;
        }
      }
      if (this.checked.includes('switch.insertPosition')) {
        if (this.selectList.insertPosition.length === 0) {
          this.$message.error("请选择插入位置权限");
          return false;
        }
      }

      if (this.checked.indexOf('switch.thread.reply') !== -1) {
        if (this.selectList['thread.reply'].length === 0) {
          this.$message.error("请选择回复主题权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.canBeReward') !== -1) {
        if (this.selectList['thread.canBeReward'].length === 0) {
          this.$message.error("请选择允许被打赏权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.viewThreads') !== -1) {
        if (this.selectList.viewThreads.length === 0) {
          this.$message.error("请选择查看主题列表权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.viewPosts') !== -1) {
        if (this.selectList['thread.viewPosts'].length === 0) {
          this.$message.error("请选择查看主题详情权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.freeViewPosts.1') !== -1) {
        if (this.selectList['thread.freeViewPosts.1'].length === 0) {
          this.$message.error("请选择免费查看付费帖子权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.freeViewPosts.2') !== -1) {
        if (this.selectList['thread.freeViewPosts.2'].length === 0) {
          this.$message.error("请选择免费查看付费视频权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.freeViewPosts.3') !== -1) {
        if (this.selectList['thread.freeViewPosts.3'].length === 0) {
          this.$message.error("请选择免费查看付费图片权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.freeViewPosts.4') !== -1) {
        if (this.selectList['thread.freeViewPosts.4'].length === 0) {
          this.$message.error("请选择免费查看付费语音权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.freeViewPosts.5') !== -1) {
        if (this.selectList['thread.freeViewPosts.5'].length === 0) {
          this.$message.error("请选择免费查看付费问答权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.essence') !== -1) {
        if (this.selectList['thread.essence'].length === 0) {
          this.$message.error("请选择加精权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.edit') !== -1) {
        if (this.selectList['thread.edit'].length === 0) {
          this.$message.error("请选择编辑主题权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.hide') !== -1) {
        if (this.selectList['thread.hide'].length === 0) {
          this.$message.error("请选择删除主题权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.editPosts') !== -1) {
        if (this.selectList['thread.editPosts'].length === 0) {
          this.$message.error("请选择编辑回复权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.hidePosts') !== -1) {
        if (this.selectList['thread.hidePosts'].length === 0) {
          this.$message.error("请选择删除回复权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.editOwnThreadOrPost') !== -1) {
        if (this.selectList['thread.editOwnThreadOrPost'].length === 0) {
          this.$message.error("请选择编辑自己的主题或回复权限");
          return false;
        }
      }
      if (this.checked.indexOf('switch.thread.hideOwnThreadOrPost') !== -1) {
        if (this.selectList['thread.hideOwnThreadOrPost'].length === 0) {
          this.$message.error("请选择删除自己的主题或回复权限");
          return false;
        }
      }
      return true;
    },

    // 全选切换
    handleCheckAllChange(val) {
      this.checked = [];
      this.selectList = {
        "createThread": [], // 发布帖子
        "insertImage": [], // 插入图片
        "insertVideo": [], // 插入视频
        "insertAudio": [], // 插入语音
        "insertDoc": [], // 插入附件
        "insertGoods": [], // 插入商品
        "insertPay": [], // 插入付费
        "insertReward": [], // 插入悬赏
        "insertRedPacket": [], // 插入红包
        "insertPosition": [], // 插入位置
        'viewThreads': [],
        'thread.reply': [], // 回复主题扩展项
        'thread.canBeReward': [], //打赏扩展
        'thread.edit': [],
        'thread.hide': [],
        'thread.essence': [],
        'thread.viewPosts': [],
        'thread.editPosts': [],
        'thread.hidePosts': [],
        'thread.editOwnThreadOrPost': [],
        'thread.hideOwnThreadOrPost': [],
        'thread.freeViewPosts.1': [],
        'thread.freeViewPosts.2': [],
        'thread.freeViewPosts.3': [],
        'thread.freeViewPosts.4': [],
        'thread.freeViewPosts.5': []
      };
      if (val) {
        // 1 主权限全选
        this.checkAllPermission.forEach(item => {
          this.checked.push(item);
        })
        // 2 分类扩展全选
        this.checked.push(...this.expandItem)

        this.checkAll = true;
        this.setSelectValue(this.checked);
      } else {
        this.checkAll = false;
      }
    },
  },
  created() {
    this.groupId = this.$route.query.id;
    this.activeTab.title = this.$route.query.title || "操作权限";
    this.activeTab.name = this.$route.query.names || "userOperate";
    this.getData();
    if (this.groupId === '7') {
      // 游客权限
      this.checkAllPermission = [
        "switch.viewThreads", //查看主题列表
        "switch.thread.viewPosts", //查看主题详情
        "switch.thread.freeViewPosts.1", //免费查看付费帖子
        "switch.thread.freeViewPosts.2", //免费查看付费视频
        "switch.thread.freeViewPosts.3", //免费查看付费图片
        "switch.thread.freeViewPosts.4", //免费查看付费语音
        "switch.thread.freeViewPosts.5", //免费查看付费问答
      ];
    } else {
      this.checkAllPermission = [
        "switch.createThread", // 发布帖子
        "switch.insertImage", // 插入图片
        "switch.insertVideo", // 插入视频
        "switch.insertAudio", // 插入语音
        "switch.insertDoc", // 插入附件
        "switch.insertGoods", // 插入商品
        "switch.insertPay", // 插入付费
        "switch.insertReward", // 插入悬赏
        "switch.insertRedPacket", // 插入红包
        "switch.insertPosition", // 插入位置
        "dialog.create", // 发布私信
        "attachment.create.0", //上传附件
        "attachment.create.1", //上传图片
        "createThreadPaid", //发布付费内容
        "switch.thread.reply", //回复主题
        "switch.thread.canBeReward", //允许被打赏
        "switch.viewThreads", //查看主题列表
        "switch.thread.viewPosts", //查看主题详情
        "switch.thread.freeViewPosts.1", //免费查看付费帖子
        "switch.thread.freeViewPosts.2", //免费查看付费视频
        "switch.thread.freeViewPosts.3", //免费查看付费图片
        "switch.thread.freeViewPosts.4", //免费查看付费语音
        "switch.thread.freeViewPosts.5", //免费查看付费问答
        "thread.sticky", //置顶
        "createInvite", //邀请加入
        "user.edit.group", //编辑用户组
        "user.edit.status", //编辑用户状态
        "switch.thread.essence", //加精
        "switch.thread.edit", //编辑主题
        "switch.thread.hide", //删除主题
        "switch.thread.editPosts", //编辑回复
        "switch.thread.hidePosts", //删除回复
        "switch.thread.editOwnThreadOrPost", //编辑自己的主题或回复
        "switch.thread.hideOwnThreadOrPost", //删除自己的主题或回复
      ];
    }
  },
  components: {
    Card,
    CardRow
  }
};
