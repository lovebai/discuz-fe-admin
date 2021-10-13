/**云API配置 */
import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      secretId:'',
      secretKey:'',
      appId:'',
      type:'',
      text: '支持填充多个IP源站（一行一个）或者一个域名源站 \n 支持增加配置端口（0-65535）和权重（1-100）: 源站:端口:权重（端口可缺省：源站:权重）\n若选择HTTPS回源，端口仅可配置为443或不配置端口 \n最多可填充511个字符'
    }
  },
  created(){
    // this.tencentCloudList()//初始化云API配置
    // var type = this.$route.query.type;
    // this.type = type;
  },
  methods:{
    configClick(type){

    },
    tencentCloudList(){
      this.appFetch({
        url:'forum_get_v3',
        method:'get',
        data:{}
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          const {Data: forumData} = res;
          this.appId = forumData.qcloud.qcloudAppId;
          this.secretId = forumData.qcloud.qcloudSecretId;
          this.secretKey = forumData.qcloud.qcloudSecretKey;
        }
      })
    },
    async  Submission(){
      this.secretId = this.secretId.trim();
      this.secretKey = this.secretKey.trim();
      try{
        await this.appFetch({
        url:'settings_post_v3',
        method:'post',
        data:{
          "data":[
            {
              "key":'qcloud_app_id',
              "value":this.appId,
              "tag": "qcloud"
            },
            {
              "key":'qcloud_secret_id',
              "value":this.secretId,
              "tag": "qcloud",
            },
            {
              "key":'qcloud_secret_key',
              "value":this.secretKey,
              "tag": "qcloud",
            }
          ]
        }
      }).then(res=>{
        if(res.errors){
          throw new Error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({ message: '提交成功', type: 'success' });
        }
      })
    }
      catch(err){
        this.$message({
          showClose: true,
          message: err
        });
      }
   }
  },
  components:{
    Card,
    CardRow
  }
}