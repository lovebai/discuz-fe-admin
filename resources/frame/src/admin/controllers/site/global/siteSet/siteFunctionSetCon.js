import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";

export default {
  data(){
    return {
      // purchase:false, // 购买权限
      reward: false, // 打赏功能
    }
  },
  methods:{
    // 加载功能权限
    loadFunctionStatus() {
      this.appFetch({
        url: "forum",
        method: "get",
        data: {}
      })
        .then(data => {
          if (data.errors) {
            this.$message.error(data.errors[0].code);
          } else {
            // 购买权限
            // this.purchase = data.readdata._data.set_site.site_pay_group_close === '1';
            // 打赏权限
            this.reward = data.readdata._data.set_site.site_can_reward === 1;
          }
        })
        .catch(error => {});
    },
    // 提交功能状态更改
    handlePublishingSubmit(){
      this.appFetch({
        url: "settings_post_v3",
        method: "post",
        data: {
          data: [
            {
              key: "site_can_reward",
              value: this.reward ? 1 : 0,
              tag: "default"
            },
            // {
            //   attributes: {
            //     key: "site_pay_group_close",
            //     value: this.purchase,
            //     tag: "default"
            //   }
            // },
          ]
        }
      })
        .then(data => {
          if (data.errors) {
            if (data.errors[0].detail) {
              this.$message.error(
                data.errors[0].code + "\n" + data.errors[0].detail[0]
              );
            } else {
              this.$message.error(data.errors[0].code);
            }
          } else {
            this.$message({
              message: "提交成功",
              type: "success"
            });
          }
        })
        .catch(error => {});
    },
  },
  created(){
    this.loadFunctionStatus()
  },
  components:{
    Card,
    CardRow
  }
}