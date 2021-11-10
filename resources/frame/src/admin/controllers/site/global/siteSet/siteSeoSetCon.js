import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";
import axios from "axios";

export default {
  components:{
    Card,
    CardRow
  },
  data(){
    return {
      activeIndex: '1',
      indexesText: '',
      mapText: '',
      optionType: 'option',
    }
  },
  // created(){
    
  // },
  methods:{
    handleSelect(key, keyPath) {
      this.$router.push({ path: '/admin/site-ssr-set'});
    },
    indexesClick(type) {
      this.optionType = type;
    },
    optionBtn() {
      axios({
        method: 'get',
        url: 'https://discuz.chat/sitemap.xml'
      })
      .then(res => {
        console.log(res);
      })
      // let input = '';
      // if (this.optionType === 'option') {
      //   input = this.$refs.indexesText.$refs.textarea
      // } else {
      //   input = this.$refs.mapText.$refs.textarea;
      // }
      // input.select();
      // document.execCommand('Copy');
      // this.$message({
      //   message: '链接已复制到剪贴板',
      //   type: 'success'
      // });
    },
    initializeData() {
      this.appFetch({
        url: 'forum_get_v3',
        method: 'get',
        data: {}
      }).then(res => {
        if (res.errors) {
            this.$message.error(res.errors[0].code);
        } else {
            if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
            }
            const {Data: forumData} = res;
            this.radio = forumData.setSite.openViewCount;
            this.exhibition = forumData.other.threadTab;
        }
      })
    },
    jumpDataRules() {
      this.$router.push({ path: '/admin/site-sort-set'});
    },
    ruleSubmission() {
      this.appFetch({
        url:'bopen_view_count_post',
        method:'post',
        data: {
          openViewCount: Number(this.radio),
        }
      }).then(res => {
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.exhibitionPost();
          if (this.upgradeData.length > 0) {
            this.toppingSubmit();
          }
        }
      })
    },
    toppingListObtain() {
      this.appFetch({
        url: 'thread_stick_get_v3',
        method: "get",
        data: {}
      })
      .then(res => {
        if (res.errors) {
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.upgradeData = res.Data;
        }
      })
    },
  },
}