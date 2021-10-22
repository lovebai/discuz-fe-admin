import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      imageUrl:'',
      deleteBtn: false, //图片删除按钮显示状态
      appId: '',
      shopAppId: '',
      shopSecretKey: '',
      radioOpen: '',
      shopTranslate: '',
      checkedImgUrl: '',
      checkedAppId: '',
      checkedSecretKey: '',
      checkedTranslate: '',
      checkedRadioOpen: '',
      privateValue: {},
      publicValue: {},
    }
  },

  created(){
    const type = this.$route.query.type;
    this.type = type;
    this.loadStatus();
    this.pluginUnitList();
  },
  methods:{
    loadStatus(){
      //初始化
      this.appFetch({
        url:'forum_get_v3',
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
          const {Data: forumData} = data;
          this.key = forumData.lbs.qqLbsKey;
        }
      })
    },
    pluginUnitList(){
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
          let num = '';
          data.Data.forEach(item => {
            if (item.name_en === 'shop') {
              num = item.setting;
              this.appId = item.app_id;
            }
          })
          if (num.publicValue) {
            if (num.publicValue.wxAppId || num.publicValue.wxAppId === "") {
              this.shopAppId = num.publicValue.wxAppId;
              this.checkedAppId = true;
            }
            if (num.publicValue.wxAppSecret || num.publicValue.wxAppSecret === "") {
              this.shopSecretKey = num.publicValue.wxAppSecret;
              this.checkedSecretKey = true;
            }
            if (num.publicValue.wxQrcode || num.publicValue.wxQrcode === "") {
              this.checkedImgUrl = true;
              this.imageUrl = num.publicValue.wxQrcode;
            }
            if (num.publicValue.description || num.publicValue.description === "") {
              this.shopTranslate = num.publicValue.description;
              this.checkedTranslate = true;
            }
            if (num.publicValue.isOpen || num.publicValue.isOpen === "") {
              this.radioOpen = num.publicValue.isOpen;
              this.checkedRadioOpen = true;
            }
          }
          if (num.privateValue) {
            if (num.privateValue.wxAppId || num.privateValue.wxAppId === "") {
              this.shopAppId = num.privateValue.wxAppId;
              this.checkedAppId = false;
            }
            if (num.privateValue.wxAppSecret || num.privateValue.wxAppSecret === "") {
              this.shopSecretKey = num.privateValue.wxAppSecret;
              this.checkedSecretKey = false;
            }
            if (num.privateValue.wxQrcode || num.privateValue.wxQrcode === "") {
              this.checkedImgUrl = false;
              this.imageUrl = num.privateValue.wxQrcode;
            }
            if (num.privateValue.description || num.privateValue.description === "") {
              this.shopTranslate = num.privateValue.description;
              this.checkedTranslate = false;
            }
            if (num.privateValue.isOpen || num.privateValue.isOpen === "") {
              this.radioOpen = num.privateValue.isOpen;
              this.checkedRadioOpen = false;
            }
          }
          if(this.imageUrl !== '' && this.imageUrl != null){
            this.deleteBtn = true;
          }
        }
      })
    },
    parameterSubmit() {
      this.publicValue = {};
      this.privateValue = {};
      if (this.checkedAppId) {
        this.publicValue.wxAppId = this.shopAppId;
      } else {
        this.privateValue.wxAppId = this.shopAppId;
      }
      if (this.checkedSecretKey) {
        this.publicValue.wxAppSecret = this.shopSecretKey;
      } else {
        this.privateValue.wxAppSecret = this.shopSecretKey;
      }
      if (this.checkedImgUrl) {
        this.publicValue.wxQrcode =  this.imageUrl;
      } else {
        this.privateValue.wxQrcode =  this.imageUrl;
      }
      if (this.checkedTranslate) {
        this.publicValue.description =  this.shopTranslate;
      } else {
        this.privateValue.description =  this.shopTranslate;
      }
      if (this.checkedRadioOpen) {
        this.publicValue.isOpen =  this.radioOpen;
      } else {
        this.privateValue.isOpen =  this.radioOpen;
      }
      this.submitConfiguration();
    },
    submitConfiguration(){
      this.appFetch({
        url:'plugin_settings_post_v3',
        method:'post',
        data: {
          appId: this.appId,
          appName: 'wxshop',
          type:1,
          privateValue: this.privateValue,
          publicValue: this.publicValue,
        }
      }).then(data=>{
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.pluginUnitList();
        }
      })
    },
    beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/png";
    //   const isLt2M = file.size / 1024 / 1024 < 2;
    //   if (!isJPG) {
    //     this.$message.warning("上传水印图片只能是 PNG 格式!");
    //     return isJPG;
    //   }
    //   if (!isLt2M) {
    //     this.$message.warning("上传头像图片大小不能超过 2MB!");
    //     return isLt2M;
    //   }
    //   return isJPG && isLt2M;
    },
    uploaderLogo(e) {
      let logoFormData = new FormData();
      logoFormData.append("file", e.file);
    //   logoFormData.append("type", "watermark_image");
      this.appFetch({
        url: "plugin_uploadimage_post_v3",
        method: "post",
        data: logoFormData,
      })
      .then(data => {
        if (data.errors) {
          this.$message.error(data.errors[0].code);
        } else {
          if (data.Code !== 0) {
          this.$message.error(data.Message);
          return
        }
        this.imageUrl = data.Data.url;
        this.$message({ message: "上传成功", type: "success" });
        this.deleteBtn = true;
        }
      })
      .catch(error => {});
    },
    deleteImage(file, fileList) {
      if (this.deleteBtn === false) {
        return;
      }
      this.appFetch({
        url: "plugin_deleteimage_post_v3",
        method: "post",
        data: {
          url: this.imageUrl,
        }
      })
      .then(data => {
        if (data.errors) {
          this.$message.error(data.errors[0].code);
        } else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          this.$message("删除成功");
          this.imageUrl = '';
          this.deleteBtn = false;
        }
      })
      .catch(error => {});
    },
  },
  components:{
    Card,
    CardRow
  }
}