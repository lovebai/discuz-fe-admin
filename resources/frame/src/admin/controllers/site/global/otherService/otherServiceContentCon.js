
import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      topicContent: '',
      topicNum: '',
    }
  },
  methods:{
    topicNumInput(value) {
      if (Number(value) > 1000) {
        this.$message.error('一次最多导入1000条');
        this.topicNum = '';
      }
    },
    importDataBtn() {
      this.appFetch({
        url:'create_crawler_get',
        method:'get',
        data:{
          topic: this.topicContent,
          number: this.topicNum,
          platform: 1,
        }
      }).then(res => {
        if (res.errors){
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({
            message: res.Message,
            type: 'success'
          });
        }
      })
    }
  },
  components:{
    Card,
    CardRow
  }
}