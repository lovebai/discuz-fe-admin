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
      // checkedImgUrl: '',
      // checkedAppId: '',
      // checkedSecretKey: '',
      // checkedTranslate: '',
      // checkedRadioOpen: '',
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
          this.imageUrl = num.publicValue.wxQrcode;
          this.shopAppId = num.publicValue.wxAppId;
          this.shopSecretKey = num.privateValue.wxAppSecret;
          this.shopTranslate = num.publicValue.description;
          this.radioOpen = num.publicValue.isOpen === 1;
          if(this.imageUrl !== '' && this.imageUrl != null){
            this.deleteBtn = true;
          }
        }
      })
    },
    // parameterSubmit() {
    //   this.submitConfiguration();
    // },
    parameterSubmit(){
      this.appFetch({
        url:'plugin_settings_post_v3',
        method:'post',
        data: {
          appId: this.appId,
          appName: 'wxshop',
          type:1,
          privateValue: {
            wxAppSecret: this.shopSecretKey
          },
          publicValue: {
            wxQrcode: this.imageUrl,
            wxAppId: this.shopAppId,
            description: this.shopTranslate,
            isOpen: this.radioOpen ? 1 : 0,
          }
          // privateValue: this.privateValue,
          // publicValue: this.publicValue,
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
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.warning("上传图片只能是 JPG 或 PNG 格式!");
        return isJPG;
      }
      return isJPG;
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