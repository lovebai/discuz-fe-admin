/*
 * 用户详情
 * */

import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";
import browserDb from "../../../../../helpers/webDbHelper";

export default {
  data: function() {
    return {
      fileList: [],
      options: [],
      optionsList: [],
      imageUrl: "",
      userRole: [],
      userInfo: {},
      newPassword: "",
      wechatNickName: "",
      sex: "",
      // disabled: false,    // 
      noAdmin: false,  // 判断是否是admin
      disabledReason: false,
      oldPassword: '', // 旧密码
      confirmPassword: '', // 确认新密码
      reasonsForDisable: "", //禁用原用
      realname: "", //实名认证是否显示
      expired_at: "", // 选择过期时间
      userName: "",   // 修改用户名
      optionsStatus: [
        {
          value: 0,
          label: "正常"
        },
        {
          value: 1,
          label: "禁用"
        },
        {
          value: 2,
          label: "审核"
        },
        {
          value: 3,
          label: "审核拒绝"
        },
        {
          value: 10,
          label: "待填写注册扩展信息"
        }
      ],
      value: "",
      query: {},
      deleBtn: false,
      expandUsers:[],
      expandDatas: [],
      exends: [],
    };
  },

  created() {
    this.query = this.$route.query;
    this.getUserDetail();
    this.getUserList();
    this.expandInformation();
  },

  methods: {
    async getUserDetail() {
      try {
        var userId = browserDb.getLItem("tokenId");
        const response = await this.appFetch({
          method: "get",
          url: "user_get_v3",
          // splice: `/${this.query.id}`,
          data: {
            pid: this.query.id
          }
        });
        if (response.Code || (response.Code && response.Code !== 0)) {
          this.$message.error(response.Message);
        } else {
          this.userInfo = response.Data;
          this.imageUrl = this.userInfo.avatarUrl;
          this.userName = this.userInfo.username;
          this.expired_at = this.userInfo.expiredAt && this.$dayjs(this.userInfo.expiredAt).format("YYYY-MM-DD HH:mm:ss");
          if (this.imageUrl != "" && this.imageUrl != null) {
            this.deleBtn = true;
          }
          this.reasonsForDisable = this.userInfo.banReason;
          this.userRole = response.Data.groups.map(v => {
            return v.pid;
          });
          if (response.isBindWechat) {
            this.wechatNickName = response.Data.nickname;
            this.sex = response.Data.sex;
          }
          if (userId == this.userInfo.id) {
            // this.disabled = false;
            this.noAdmin = true;
          }
          if (this.userInfo.status == 1) {
            this.disabledReason = true;
          }
          if (this.userInfo.realname == "") {
            this.realname = false;
          } else {
            this.realname = true;
          }
        }
      } catch (err) {}
    },

    // 扩展信息查询
    expandInformation() {
      this.appFetch({
        url: 'signinfields_get_v3',
        method: 'get',
        data: {},
      }).then(res => {
        res.Data.forEach(item => {
          if (item.status == 1) {
            this.expandDatas.push(item);
          }
        })
        this.userExpandInformation();
      }) 
    },

    // 用户扩展信息查询
    userExpandInformation() {
      let userId = this.query.id;
      this.appFetch({
        url: 'user_signinfields_get_v3',
        method: 'get',
        data: {
          uid: userId
        }
      }).then((res) => {
        if (res.Data && res.Data.length > 0) {
          res.Data.forEach((item, index) => {
            if (item.type > 1 && item.fieldsExt) {
              item.fieldsExt = JSON.parse(item.fieldsExt);
              this.expandUsers.push(item);
            } else {
              if (item.fieldsExt !== '') {
                this.expandUsers.push(item);
              }
            }
          })
        } else {
          this.expandUsers = [];
        }
      })
    },
    extendName(data) {
      let userName = '';
      this.expandDatas.forEach(items => {
        if (data === items._data.id) {
          userName = items._data.name;
        }
      })
      return userName;
    },
    handleRemove(file, fileList) {},
    deleteImage() {
      if (this.deleBtn == false) {
        return;
      }
      this.imageUrl = "";
      this.appFetch({
        url: "delete_avatar_post_v3",
        method: "post",
        // splice: `/${this.query.id}` + "/avatar",
        data: {
          aid: this.query.id
        }
      }).then(res => {
        if (res.Code !== 0) {
          this.$message.error(res.Message);
        } else {
          this.deleBtn = false;
          this.$message.success("删除成功");
        }
      });
    },
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.MessageBox.confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleFile() {},
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      if (isJPG && isLt10M == true) {
      }
      return isJPG && isLt10M;
    },
    uploaderLogo(file) {
      let formData = new FormData();
      formData.append("aid", this.query.id);
      formData.append("avatar", file.file);
      this.appFetch({
        url: "users_avatar_post_v3",
        method: "post",
        // splice: `${this.query.id}` + "/avatar",
        data: formData
      }).then(res => {
        if (res.errors) {
          this.$message.error(res.errors[0].code);
        } else {
          this.$message.success("上传成功");
          this.imageUrl = res.Data.avatarUrl;
          this.deleBtn = true;
        }
      });
    },

    submission() {
      var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/; //手机号正则验证
      var mobile = this.userInfo.originalMobile;
      if (mobile == "") {
      } else if (!reg.test(mobile)) {
        return this.$toast("您输入的手机号码不合法，请重新输入");
      }
      // if (!reg.test(mobile)) { //手机号不合法
      // return  this.$toast("您输入的手机号码不合法，请重新输入");
      // }
      this.userExtensionModification();
      this.appFetch({
        url: "users_update_post_v3",
        method: "post",
        data: {
          id: this.query.id,
          newPassword: this.newPassword,
          mobile: mobile,
          groupId: this.userRole,
          status: this.userInfo.status,
          refuseMessage: this.reasonsForDisable,
          expiredAt: this.expired_at,
          username: this.userName,
          // password: this.oldPassword,
          // newPassword: this.confirmPassword
        }
      }).then(res => {
        if (res.errors) {
          this.$message.error(res.errors[0].code);
        } else {
          this.$message({ message: "提交成功", type: "success" });
          this.getUserDetail();
        }
      });
    },

    async getUserList() {
      //获取用户角色
      try {
        const response = await this.appFetch({
          method: "get",
          url: "groups_list_get_v3"
        });
        const data = response.Data;
        this.options = data.map(v => {
          return {
            value: v.id,
            label: v.name
          };
        });
      } catch (err) {
        console.error(err, "getUserList");
      }
    },
    userStatusChange(value) {
      this.disabledReason = value == 1;
      if (value != 1) {
        this.reasonsForDisable = "";
      }
    },
    extendUsers(code) {
      let extendArr = '';
      if (code.fields_ext.options) {
        code.fields_ext.options.forEach(item => {
          if (item.checked) {
            extendArr += item.value + ' ';
          }
        })
      } else {
        code.fields_ext.forEach(item => {
          if (item.checked) {
            extendArr += item.value + ' ';
          }
        })
      }
      return extendArr;
    },

    userExtensionModification() {
      this.exends = [];
      this.expandUsers.forEach(item => {
        let data = {
          "type": "user_sign_in",
          "attributes": {
            "aid": item.aid,
            "fields_desc": item.fieldsDesc,
            "id": item.id,
            "remark": "",
            "status": item.status,
            "type": item.type,
            "user_id": item.userId,      
          }
        };
        if (item.type > 1 && item.fields_ext) {
          data.attributes.fields_ext = JSON.stringify(item.fields_ext);
          this.exends.push(data);
        } else {
          data.attributes.fields_ext = item.fields_ext;
          this.exends.push(data);
        }
      })
      // console.log(this.exends);
      // this.modificationUsers(this.exends);
    },

    modificationUsers(data) {
      let userId = this.query.id;
      this.appFetch({
        url: 'userSigninfields',
        method: 'post',
        splice: `/${userId}`,
        data: {
          data
        }
      }).then(res => {
        console.log(res);
      })
    },
  },

  components: {
    Card,
    CardRow
  }
};
