import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';
import Page from '../../../../view/site/common/page/page';
import webDb from 'webDbHelper';

export default {
  data:function () {
    return {
      fissionOpen: '',
      preventMechanism: '',
      carveLeft: '',
      carveRight: '',
      userSearch: '',
      checkList: [],
      userList: [],
      userSearchList: [],
      pageLimit: 10,
      pageNum: 1,
      total: 0,
      blackLimit: 10,
      blackNum: 1,
      blackTotal: 0,
      searchFocusing: true,
    }
  },

  created(){
    this.loadStatus();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name !== from.name && from.name !== null) {
        vm.getCreated(true)
      } else {
        vm.getCreated(false)
      }
    })
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
          this.fissionOpen = forumData.other.shareFission;
          this.preventMechanism = forumData.other.preventCheat;
          this.carveLeft = forumData.other.newOldUserShareScale[0];
          this.carveRight = forumData.other.newOldUserShareScale[1];
        }
      })
    },
    getCreated(state) {
      if (state) {
        this.blackNum = 1;
      } else {
        this.blackNum = Number(webDb.getLItem('currentPag')) || 1;
      }
      this.fissionBlack(true);
    },
    searchInput() {
      this.searchFocusing = false;
    },
    loseInput() {
      this.searchFocusing = true;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.userSearchChange();
    },
    blackListChange(val) {
      this.blackNum = val;
      this.fissionBlack();
    },
    userSearchChange() {
      this.appFetch({
        method: "get",
        url: 'user_list_get_v3',
        data: {
          "perPage": this.pageLimit,
          "page": this.pageNum,
          "filter[nickname]": this.userSearch,
        }
      })
      .then(data => {
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          this.total = data.Data.totalCount;
          this.userList = data.Data.pageData;
        }
      })
    },
    addtoChange() {
      // console.log(this.checkList);
      let arr = this.userSearchList;
      arr.push(...this.checkList);
      if (arr.length > 0) {
        for(let i = 0; i < arr.length; i ++) {
          for(let j = i + 1; j < arr.length; j ++) {
            if (arr[i].userId === arr[j].userId ) {
              arr.splice(j, 1);
            } 
          }
        }
        this.userSearchList = arr;
      }
    },
    userSearchDelete(index) {
      this.userSearchList.splice(index, 1);
    },
    // blacklistChange(e) {
    //   const num = e ? 1 : 0;
    //   this.settingPost('prevent_cheat', num)
    // },
    importDataBtn(key, num) {
      let blacklist = [];
      this.userSearchList.forEach(element => {
        blacklist.push(element.userId);
      });
      this.appFetch({
        url:'settings_post_v3',
        method:'post',
        data:{
         "data":[
            {
              "key": 'share_fission',
              "value": this.fissionOpen ? '1' : '0',
              "tag": 'default'
            },
            {
              "key": 'prevent_cheat',
              "value": this.preventMechanism ? '1' : '0',
              "tag": 'default'
            },
            {
              "key": 'share_fission_blacklist',
              "value": blacklist,
              "tag": 'default'
            },
            {
              "key": "new_old_user_share_scale",
              "value": [this.carveLeft, this.carveRight],
              "tag": "default"
            }
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
          this.blackNum = 1;
          this.fissionBlack();
        }
      }).catch(error=>{
        this.$message.error('修改失败');
      })
    },
    fissionBlack() {
      this.appFetch({
        method: "get",
        url: 'Fission_black_get_v3',
        data: {
          "perPage": this.blackLimit,
          "page": this.blackNum,
        }
      })
      .then(data => {
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          const pageData = data.Data.pageData;
          this.userSearchList = [];
          if (pageData) {
            this.blackTotal = data.Data.totalCount;
            pageData.forEach(item => {
              this.userSearchList.push({userId: item.id, nickname: item.nickname})
            });
          } else {
            this.blackTotal = 0;
          }
          console.log(this.blackTotal);
        }
      })
    }
  },
  components:{
    Card,
    CardRow,
    Page
  }
}