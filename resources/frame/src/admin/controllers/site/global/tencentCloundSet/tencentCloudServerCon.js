/**云API配置 */
import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      configAddress: '',
      configName: '',
      configPatn: 'http://service-74pdgz7k-1258344699.gz.apigw.tencentcs.com',
    }
  },
  created(){
    this.tencentCloudList()//初始化云API配置
  },
  methods:{
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
          this.configAddress = forumData.qcloud.qcloudSsrRegion;
          this.configName = forumData.qcloud.qcloudSsrBucket;
          this.configPatn = forumData.qcloud.qcloudSsrAccessPath;
        }
      })
    },
    submitClick(){
      this.subLoading = true;
      let originAddressArr = [];
      if (this.originAddress) {
        let lines = this.originAddress.split(/\n/);
        for (var j = 0; j < lines.length; j++) {
          if (lines[j].trim() !== '') {
            originAddressArr.push(lines[j].trim());
          }
        }
      }
      this.appFetch({
        url:'settings_post_v3',
        method:'post',
        data:{
          "data": [
            {
              "key": "qcloud_ssr_region",
              "value": "ap-guangzhou",
              "tag": "qcloud"
            },
            {
              "key": "qcloud_ssr_bucket",
              "value": "discuz-ssr",
              "tag": "qcloud"
            }
        ]
        }
      })
      .then(res=>{
        this.subLoading = false
        if(res.errors){
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({ message: '提交成功', type: 'success' });
          this.tencentCloudList();
        }
      })
      .catch(err => {
        this.subLoading = false
        this.$message({
          showClose: true,
          message: err
        });
      })
    },
  },
  components:{
    Card,
    CardRow
  }
}