
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
      startTiming: false,
      contentSourceId: '',
      accuntlnroCookie: '',
      accuntlnroToken: '',
      totalNumber: 0,
      contentSource : [
        {
          name: '微博',
          id: 1
        },
        {
          name: '微信公众号',
          id: 4
        },
      ],
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
      let params = {};
      if (this.contentSourceId === 1) {
        params = {
          topic: this.topicContent,
          number: this.topicNum,
          platform: this.contentSourceId,
        }
      } else {
        params = {
          officialAccountName:this.topicContent,
          officialAccountCookie: this.accuntlnroCookie,
          officialAccountToken: this.accuntlnroToken,
          platform: this.contentSourceId,
        }
      }
      this.appFetch({
        url:'create_crawler_get',
        method:'get',
        data: params,
      }).then(res => {
        if (res.errors){
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.speed = true;
          clearInterval(this.timer);
          this.startTiming = false;
          this.progress = 0;
          this.importing = 1;
          this.timer = setInterval(this.crawlerQuery, 2000);
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
          if (crawlerData.startCrawlerTime !== 0) {
            this.startTiming = true;
            this.importing = crawlerData.status;
            this.progress = crawlerData.progress;
            // if (crawlerData.status === 2 && crawlerData.progress === 100) {
            //   this.progress = 100;
            //   clearInterval(this.timer);
            // }
            if (crawlerData.status !== 0 && crawlerData.status !== 1 && crawlerData.status !== 2) {
              clearInterval(this.timer);
            }
          }
          if (this.startTiming) {
            this.importing = crawlerData.status;
            this.progress = crawlerData.progress;
            if (crawlerData.status === 2 && crawlerData.progress === 100) {
              this.progress = 100;
              this.totalDataNumber = crawlerData.totalDataNumber;
              clearInterval(this.timer);
            }
            if (crawlerData.status !== 0 && crawlerData.status !== 1 && crawlerData.status !== 2) {
              clearInterval(this.timer);
            }
          }
        }
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