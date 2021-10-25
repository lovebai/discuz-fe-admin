import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";

export default {
  data(){
    return {
      // purchase:false, // 购买权限
      reward: false, // 数据过滤开关
      recharge: false,
      upgradeData: [],
      groupEdit: false,
      counter: '',
      toppingList: [],
    }
  },
  methods:{
    // 加载功能权限
    loadFunctionStatus() {
      this.appFetch({
        url: 'forum_get_v3',
        method: "get",
        data: {}
      })
        .then(data => {
          if (data.errors) {
            this.$message.error(data.errors[0].code);
          } else {
            if (data.Code !== 0) {
              this.$message.error(data.Message);
              return
            }
            const {Data: forumData} = data;
            // 购买权限
            // this.purchase = forumData.setSite.sitePayGroupClose === '1';
            // 打赏权限
            this.reward = forumData.other.threadOptimize;
            this.recharge = forumData.setSite.siteCharge === 1 ? true : false;
          }
        })
        .catch(error => {});
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
    // 提交功能状态更改
    handlePublishingSubmit(){
      this.appFetch({
        url: "thread_optimize_post",
        method: "post",
        data: {
          isDisplay: this.reward ? 1 : 0
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
            if (data.Code !== 0) {
              this.$message.error(data.Message);
              return
            }
            if (this.upgradeData.length > 0) {
              this.toppingSubmit();
            }
            this.rechargePost();
          }
        })
        .catch(error => {});
    },
    toppingSubmit() {
      let toppingList = [];
      this.upgradeData.forEach((item, index) => {
        toppingList.push({
          id: item.threadId,
          sort: index + 1,
        })
      });
      this.toppingListSort(toppingList)
    },
    toppingListSort(arr) {
      this.appFetch({
        url:'stick_sort_set_post_v3',
        method:'post',
        data:{
          data: arr,
        }
      })
      .then(res => {
        if (res.errors){
          this.$message.error(res.errors[0].code)
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.toppingListObtain();
        }
      })
    },
    rechargePost() {
      this.appFetch({
        url:'settings_post_v3',
        method:'post',
        data:{
          data:[
            {
              "key":"site_charge",
              "value": this.recharge ? 1 : 0,
              "tag": "default"
            },
          ]
        }
      }).then(res=>{
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
          this.loadFunctionStatus();
        }
  
      }).catch(err=>{
        this.$message.error('操作失败！');
      })
    },
    relieveTopping(scope) {
      this.appFetch({
        url: 'threads_batch_post_v3',
        method: 'post',
        data: {
          ids: scope.row.threadId,
          isSticky: 0,
        }
      })
      .then(res => {
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
          this.toppingListObtain();
        }
      })
    },
    riseOperation(scope) {
      this.groupEdit = true;
      let payData = [...this.upgradeData];
      let newData = [...this.upgradeData];
      newData.splice(scope.$index, 1);
      newData.splice(scope.$index - 1, 0, payData[scope.$index]);
      this.counter = scope.$index - 1;
      setTimeout(() => {
        this.counter = '';
      }, 500);
      this.upgradeData = newData;
    },
    dropOperation(scope) {
      this.groupEdit = true;
      let payData = [...this.upgradeData];
      let newData = [...this.upgradeData];
      newData.splice(scope.$index, 1);
      newData.splice(scope.$index + 1, 0, payData[scope.$index]);
      this.counter = scope.$index + 1;
      setTimeout(() => {
        this.counter = '';
      }, 500);
      this.upgradeData = newData;
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === this.counter) {
        return 'success-row';
      }
      return '';
    },
  },
  created(){
    this.loadFunctionStatus();
    this.toppingListObtain();
  },
  components:{
    Card,
    CardRow
  }
}