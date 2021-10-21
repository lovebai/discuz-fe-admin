import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      imageUrl:'',
      deleteBtn: false, //图片删除按钮显示状态
      shopAppId: '',
      shopSecretKey: '',
      shopTranslate: '',
    }
  },

  created(){
    var type = this.$route.query.type;
    this.type = type;
    this.loadStatus();
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
    submitConfiguration(){
    //   if(!this.key) {
    //     this.$message({
    //       message: 'key不能为空',
    //       type: 'error'
    //     });
    //     return;
    //   }
      this.appFetch({
        url:'plugin_settings_post_v3',
        method:'post',
        data: {
          appId: '61540fef8f4de8',
          appName: 'wxshop',
          type: 1,
          value: {
            isopen : { value: 1, isPublic: 1 },
            wxAppId: { value: 'wx4fa036c724187cd1'},
            wxAppSecret: { value: 'd149e40218cfbbf'}
          }
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
        console.log(data);
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
      this.imageUrl = "";
      this.appFetch({
        url: "delete_logo_post_v3",
        method: "post",
        data: {
        type: 'watermark_image',
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