import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      fissionOpen: '',
      preventMechanism: '',
      carveLeft: '',
      carveRight: '',
      userSearch: '',
    }
  },

  created(){
    // const type = this.$route.query.type;
    // this.type = type;
    // this.loadStatus();
    // this.pluginUnitList();
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
    codeObtain(){
      this.pluginFetch({
        url:'plugin_setting_v3',
        method:'post',
        data: {}
      }).then(data=>{
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          // this.imageUrl = data.Data.wxQrCode;
          this.pluginUnitList();
        }
      })
    },
  },
  components:{
    Card,
    CardRow
  }
}