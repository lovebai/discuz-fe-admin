
import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      settingStatus:[
        {
          name: '腾讯位置服务',
          type: 'lbs_close',
          description: '配置KEY后，才可使用腾讯位置的WebServiceAPI服务，<a href="https://discuz.com/manual-admin/2.html#_2-10-1-%E8%85%BE%E8%AE%AF%E4%BD%8D%E7%BD%AE%E6%9C%8D%E5%8A%A1" target="_blank">查看文档</a>',
          tag:'lbs',
          status:'',
        },
        // {
        //   name: '内容导入',
        //   type: 'import',
        //   description: '为站点一键填充站点内容，营造活跃气氛',
        //   tag:'import',
        //   status:'',
        // }
      ],
      key: '',
    }
  },
  created:function(){
    this.loadStatus();
  },
  methods:{
    loadStatus(){
      this.appFetch({
        url:'forum_get_v3',
        method:'get',
        data:{
        }
      }).then(data=>{
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          const {Data: forumData} = data;
          const lbsData = forumData.lbs;
          this.key = forumData.lbs.qqLbsKey;
          if (lbsData.lbs) {
            this.settingStatus[0].status = true;
          } else {
            this.settingStatus[0].status = false;
          }
        }
      })
    },
    statusSetting(statusVal){
      if(statusVal && !this.key) {
        this.$message.error('请先配置key');
        return;
      }
      //状态修改
      this.appFetch({
        url:'settings_post_v3',
        method:'post',
        data:{
         "data":[
            {
              "key":"lbs",
              "value":statusVal,
              "tag": 'lbs'
            },
         ]
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
            message: '修改成功',
            type: 'success'
          });
          this.loadStatus();
        }
      }).catch(error=>{
        this.$message.error('修改失败');
      })
    },
    configClick(type){
      this.$router.push({
        path:'/admin/other-service-set-key',
        query: {type:type}
      });
    },
    importClick() {
      this.$router.push({
        path:'/admin/other-service-content'
      });
    }
  },
  components:{
    Card,
    CardRow
  }
}
