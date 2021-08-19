
import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      topicContent: '',
      topicNum: '',
      speed: false, // 进度显示
      importing: '',
      progress: 0,
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
          this.speed = true;
          this.timer = setInterval(this.crawlerQuery, 2000);
          this.importing = 1;
          this.progress = 0;
          this.$message({
            message: res.Message,
            type: 'success'
          });
        }
      })
    },
    crawlerQuery() {
      this.appFetch({
        url:'check_crawler_get',
        method:'get',
      }).then( res => {
        if (res.errors){
          clearInterval(this.timer);
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            clearInterval(this.timer);
            this.$message.error(res.Message);
            return
          }
          const crawlerData = res.Data;
          this.importing = crawlerData.status;
          this.progress = crawlerData.progress;
          if (crawlerData.status === 2) {
            this.progress = 100;
            clearInterval(this.timer);
          }
          if (crawlerData.status === 3 || crawlerData.status === 4) {
            clearInterval(this.timer);
          }
        }
        // console.log(res);
        // const crawlerData = res.Data;
        // this.importing = crawlerData.status;
        // this.progress = crawlerData.progress;
        // if (crawlerData.status === 2) {
        //   this.progress = 100;
        //   clearInterval(this.timer);
        // }
        // if (crawlerData.status === 3 || crawlerData.status === 4) {
        //   clearInterval(this.timer);
        // }
        // if (crawlerData === 1) {
        //   this.importing = true;
        // }
      })
    },
    determineBtn() {
      this.speed = false;
      clearInterval(this.timer);
    },
    cancelBtn() {
      history.go(0);
    },
    retryBtn() {
      this.importDataBtn();
    }
  },
  components:{
    Card,
    CardRow
  }
}