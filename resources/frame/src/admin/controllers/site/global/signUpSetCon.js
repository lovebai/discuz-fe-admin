
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
        url:'forum_get_v3',
        method:'get',
        data:{
          'filter[tag]': 'agreement'
        }
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        } else {
          const {Data: forumData} = res;
          const agreement = forumData.agreement;
          this.is_register_close = forumData.setReg.registerClose;
          this.is_need_transition = forumData.setReg.isNeedTransition;
          this.register_validate = forumData.setReg.registerValidate;
          this.pwdLength = forumData.setReg.passwordLength;
          this.checkList = forumData.setReg.passwordStrength;
          this.register_captcha = forumData.setReg.registerCaptcha;
          this.privacy = agreement.privacy ? "1" : "0";
          this.register = agreement.register ? "1" : "0";
          this.register_content = agreement.registerContent;
          this.privacy_content = agreement.privacyContent;
          this.extensionOn = forumData.setSite.openExtFields === '1' ? true : false;

          if(forumData.qcloud.qcloudCaptcha == true){
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
        url: 'signinfields_get_v3',
        method: 'get',
        data: {},
      }).then(res => {
        let arr = [];
        res.Data.forEach(element => {
          if (element.status === 1) {
            arr.push(element);
          }
        });
        if (res.Data.length > 0 && arr.length > 0) {
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
        url:'settings_post_v3',
        method:'post',
        data:{
          "data" :[
            {
              "key":'open_ext_fields',
              "value": this.extensionOn ? 1 : 0,
              "tag": 'default'
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
        url:'settings_post_v3',
        method:'post',
        data:{
          "data":[
            {
              "key":'register_close',
              "value":this.is_register_close,
              "tag": 'default'
            },
            {
              "key":'is_need_transition',
              "value":this.is_need_transition,
              "tag": 'default'
            },
            {
              "key":'register_validate',
              "value":this.register_validate,
              "tag": 'default'
            },
            {
              "key":'register_captcha',
              "value":this.register_captcha,
              "tag": 'default'
            },
            {
              key: "privacy",
              value: this.privacy,
              tag: "agreement"
            },
            {
              key: "register",
              value: this.register,
              tag: "agreement"
            },
            {
              key: "register_content",
              value: this.register_content ? this.register_content : "",
              tag: "agreement"
            },
            {
              key: "privacy_content",
              value: this.privacy_content ? this.privacy_content : "",
              tag: "agreement"
            },
            {
              "key":'password_length',
              "value":this.pwdLength,
              "tag": 'default'
            },
            {
              "key":'password_strength',
              "value":passwordStrength,
              "tag": 'default'
            },
            {
              "key":'open_ext_fields',
              "value": this.extensionOn ? 1 : 0,
              "tag": 'default'
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
