import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";

export default {
  components:{
    Card,
    CardRow
  },
  data(){
    return {
      radio: '',
      exhibition: '',
    }
  },
  created(){
    // 初始化状态
    this.initializeData();
  },
  methods:{
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
            this.exhibition = forumData.other.threadTab
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
        }
      })
    },
    exhibitionPost() {
      this.appFetch({
        url:'settings_post_v3',
        method:'post',
        data:{
          data:[
            {
              key: "thread_tab",
              value: this.exhibition,
              tag: "default"
            }  
          ]
        }
      }).then(res => {
        if (res.errors){
          this.$message.error(res.errors[0].code)
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.initializeData();
        }
      })
    }
  },
}