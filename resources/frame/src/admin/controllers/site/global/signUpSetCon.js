
import Card from '../../../view/site/common/card/card';
import CardRow from '../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      is_register_close:'', //是否允许游客注册成为会员
      is_need_transition:'', //是否启用微信内落地页
      register_validate:'',   //注册审核
      pwdLength:'',           //密码长度
      checkList:[],           //密码规则
      register_captcha:'',    //验证码开始
      disabled:true,            //是否可以开启验证码
      register_type: 0,      // 注册模式
      qcloud_name: false,
      qcloud_sms: false,
      qcloud_wx: false,
      privacy: "0", //隐私协议
      register: "0", //用户协议
      register_content:'',
      privacy_content:'',
      registerFull: false,
      privacyFull: false,
      extensionOn: false,
      extendsBtn: false,
    }
  },
  created(){
    this.signUpSet()//获取前台信息
    this.extendFun();
  },
  methods:{
    signUpSet(){
      this.appFetch({
        url:'forum',
        method:'get',
        data:{
          'filter[tag]': 'agreement'
        }
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          const agreement = res.readdata._data.agreement;
          console.log(res);
          // this.pwdLength = res.readdata._data.setreg.password_length
          this.is_register_close = res.readdata._data.set_reg.register_close;
          this.is_need_transition = res.readdata._data.set_reg.is_need_transition;
          this.register_validate = res.readdata._data.set_reg.register_validate;
          this.pwdLength = res.readdata._data.set_reg.password_length;
          this.checkList = res.readdata._data.set_reg.password_strength;
          this.register_captcha = res.readdata._data.set_reg.register_captcha;
          this.register_type = res.readdata._data.set_reg.register_type;
          this.privacy = agreement.privacy ? "1" : "0";
          this.register = agreement.register ? "1" : "0";
          this.register_content = agreement.register_content;
          this.privacy_content = agreement.privacy_content;
          this.extensionOn = res.readdata._data.set_site.open_ext_fields === '1' ? true : false;
          // 旧注册登陆模式的禁用控制
          if(res.readdata._data.qcloud.qcloud_sms == true) {
            this.qcloud_sms = false
          } else {
            this.qcloud_sms = true
          }
          // 第三方登录设置：公众号配置、小程序配置、PC端微信扫码登录全部开启，才可选无感模式
          if(
            res.readdata._data.passport.offiaccount_close
              && res.readdata._data.passport.miniprogram_close
              && res.readdata._data.passport.oplatform_close
          ) {
            this.qcloud_wx = false
          } else {
            this.qcloud_wx = true;
          }

          // 新注册登陆模式的禁用控制
          // this.qcloud_name = !res.readdata._data.sign_enable.user_name;
          // this.qcloud_sms = !res.readdata._data.sign_enable.mobile_phone;
          // this.qcloud_wx = !res.readdata._data.sign_enable.wechat_direct;


          if(res.readdata._data.qcloud.qcloud_captcha == true){
            this.disabled = false
          }
        }
      })
    },
    changeRegister(register) {
      this.register = register;
      if(register==='0') {
        this.register_content = '';
      }
    },
    changePrivacy(privacy) {
      this.privacy = privacy;
      if(privacy==='0') {
        this.privacy_content = '';
      }
    },
    changeSize(obj){
       this[obj]= !this[obj];
    },
    extendFun() {
      this.appFetch({
        url: 'signInFields',
        method: 'get',
        data: {},
      }).then(res => {
        let arr = [];
        res.readdata.forEach(element => {
          if (element._data.status === 1) {
            arr.push(element);
          }
        });
        if (res.readdata.length > 0 && arr.length > 0) {
          this.extendsBtn = false;
        } else {
          this.extensionOn = false;
          this.extendsBtn = true;
          this.extendConfing();
        }
      })
    },
    extendConfing() {
      this.appFetch({
        url:'settings',
        method:'post',
        data:{
          "data" :[
            {
              "attributes":{
                "key":'open_ext_fields',
                "value": this.extensionOn ? 1 : 0,
                "tag": 'default'
              }
            }
          ],
        }
      }).then(res => {
        if (res.errors){
          if (res.errors[0].detail){
            this.$message.error(res.errors[0].code + '\n' + res.errors[0].detail[0])
          } else {
            this.$message.error(res.errors[0].code);
          }
          // this.$message.error(data.errors[0].code);
        }else {
          this.signUpSet();
        }
      })
    },
    submission(){ //提交注册信息接口
      var reg = /^\d+$|^\d+[.]?\d+$/;
      var pwdLength = this.pwdLength;
      var passwordStrength = this.checkList.join(",")
      // if(pwdLength === ''){
      //   return
      // }
      // if (!reg.test(pwdLength)) { //密码只能输入数字
      //   this.$message("密码只能输入数字");
      //   return
      // }
      this.appFetch({
        url:'settings',
        method:'post',
        data:{
          "data":[
            {
             "attributes":{
              "key":'register_close',
              "value":this.is_register_close,
              "tag": 'default'
             }
            },
            {
              "attributes":{
                "key":'is_need_transition',
                "value":this.is_register_close,
                "tag": 'default'
              }
            },
            {
              "attributes":{
                "key":'register_validate',
                "value":this.register_validate,
                "tag": 'default'
              }
            },
            {
              "attributes":{
                "key":'register_captcha',
                "value":this.register_captcha,
                "tag": 'default'
              }
            },
            {
              attributes: {
                key: "privacy",
                value: this.privacy,
                tag: "agreement"
              }
            },
            {
              attributes: {
                key: "register",
                value: this.register,
                tag: "agreement"
              }
            },
            {
              attributes: {
                key: "register_content",
                value: this.register_content ? this.register_content : "",
                tag: "agreement"
              }
            },
            {
              attributes: {
                key: "privacy_content",
                value: this.privacy_content ? this.privacy_content : "",
                tag: "agreement"
              }
            },
            {
              "attributes":{
                "key":'password_length',
                "value":this.pwdLength,
                "tag": 'default'
               }
            },
            {
              "attributes":{
                "key":'password_strength',
                "value":passwordStrength,
                "tag": 'default'
               }
            },
            {
              "attributes":{
                "key":'register_type',
                "value":this.register_type,
                "tag": 'default'
               }
            },
            {
              "attributes":{
                "key":'open_ext_fields',
                "value": this.extensionOn ? 1 : 0,
                "tag": 'default'
               }
            },
           ]
        }
      }).then(data=>{
        if (data.errors){
          if (data.errors[0].detail){
            this.$message.error(data.errors[0].code + '\n' + data.errors[0].detail[0])
          } else {
            this.$message.error(data.errors[0].code);
          }
          // this.$message.error(data.errors[0].code);
        }else {
          this.$message({message: '提交成功', type: 'success'});
        }
      })

    },
    configurat() {
      console.log('配置信息');
      this.$router.push({
        path: "/admin/registration-btn",
      });
    }
  },
  components:{
    Card,
    CardRow
  }
}
