/*
* 用户管理
* */

import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data: function () {
    return {
      options: [],
      username: '',
      uickname: '',
      userUID: '',
      userRole: [],
      checked: false,
      userPhone: '',
      userWeChat: '',
      userStatus: [],
      isReal: '', //是否实名认证
      disabled: true,//禁用表单上的游客
      optionsStatus: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '正常'
        },
        {
          value: 1,
          label: '禁用'
        },
        {
          value: 2,
          label: '审核'
        },
        {
          value: 3,
          label: '审核拒绝'
        }
      ],
      value: '',
      checkList: [],    // 多选值
      singleChoice: '', // 单选值
      realname: '', // 实名认证姓名
      identity: '', // 实名认证身份证号
    }
  },

  created() {
    this.getUserList();
  },

  methods: {
    checkedStatus(str) {
      setTimeout(() => {
        if (str) {
          let gd = document.getElementsByClassName('index-main-con__main')[0];
          gd.scrollTo(0, gd.scrollHeight);
        }
      }, 300);
    },
    searchBtn() {
      let query = {
        username: this.username.trim(),
        uickname: this.uickname.trim(),
        userUID: this.userUID.trim(),
        userRole: this.userRole,
        userStatus: this.userStatus,
        userPhone: this.userPhone.trim(),
        userWeChat: this.userWeChat,
        isReal: this.isReal,

      };
      if (!this.checked) {
        this.userPhone = '';
        this.userWeChat = '';
        this.isReal = '';

        if (query.username + query.userUID + query.uickname + query.userRole + query.userStatus === '') {
          query = {};
        } else {
          delete query.userPhone;
          delete query.userWeChat;
          delete query.isReal;
        }
      }
      this.$router.push({ path: '/admin/user-search-list', query })
    },

    async getUserList() {
      try {
        const response = await this.appFetch({
          url: 'groups_list_get_v3',
          method: 'get'
        });
        if (response.errors) {
          this.$message.error(response.errors[0].code);
        } else {
          if (response.Code !== 0) {
            this.$message.error(response.Message);
            return
          }
          const data = response.Data;
          this.options = data.map((v) => {
            return {
              value: v.id,
              label: v.name
            }
          })
        }

      } catch (err) {
        console.error(err, 'getUserList')
      }
    },

  },

  components: {
    Card,
    CardRow
  }
}
