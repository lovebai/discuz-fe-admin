/*
* 用户角色控制器
* */

import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';
import TableContAdd from '../../../../view/site/common/table/tableContAdd';

export default {
  data:function () {
    return {
      tableData: [],
      alternateLength:0,    //数据长度备份
      radio:'',             //设为加入站点的默认级别
      alternateRadio:'',    //默认级别选中备份
      radioName:'',         //默认级别名称
      radioIndex:'',        //默认级别序号
      deleteStatus:true,
      multipleSelection:[],
      addStatus:false,
      btnLoading:false,     //提交按钮状态
      delLoading:false,     //删除按钮状态
      groupName:'',      //是否显示用户组名称
      groupId: '',       // 用户组id
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;

      if (this.multipleSelection.length >= 1){
        this.deleteStatus = false
      } else {
        this.deleteStatus = true
      }
    },

    /*checkSelect(val){

    },*/

    radioChange(val,index){
      this.radioName = val.name;
      this.radioIndex = index;
      this.groupId = val.id;
    },

    checkSelectable(row){
      switch (row.id){
        case 1:
          return false;
        case 6:
          return false;
        case 7:
          return false;
        case 10:
          return false;
        default:
          return true;
      }
    },

    addList(){
      if (this.alternateLength >= this.tableData.length){
        this.tableData.push(
          {
            "name": "",
            "type": "",
            "color": "",
            "icon": ""
          }
        );
      }
      this.addStatus = true;
    },

    submitClick(){
      this.btnLoading = true;
      /*if (this.addStatus && this.multipleSelection.length > 0){
        this.$message({
          showClose: true,
          message: '新增用户角色未提交！请先提交，再操作其他角色',
          type: 'warning'
        });
      } else*/
      if (this.addStatus){
        let singleData = {
          "type": "groups",
          "name": "",
          'default':''
        };    //单个

        let batchData = [];   //批量

        for (let i = this.alternateLength;i < this.tableData.length;i++){
          /*
          * 批量添加写法，接口暂时不支持
          * */
          /*batchData.push({
            "type": "groups",
            "attributes": {
              "name": this.tableData[i].name,
              "type": "",
              "color": "",
              "icon": ""
            }
          })*/

          /*
          * 单个添加用户组写法
          * */
          singleData.name = this.tableData[i].name;
        }

        if (this.radioIndex + 1 === this.tableData.length){
          singleData.default = 1;
        }

        this.postGroups(singleData);
      } else {
        let data = [];
        this.tableData.forEach((item)=>{
          data.push({
            "name": item.name,
            'id': item.id,
            'isDisplay': item.isDisplay,
            'default': item.id == this.radio,
          })
        });
        this.batchPatchGroup(data);
      }
      // this.PermissionPurchaseAllowed();
    },

    singleDelete(index,id){
      if (index > this.alternateLength-1){
        this.tableData.pop();
        this.addStatus = false;
      } else {
        this.singleDeleteGroup(id);
      }
    },

    deleteClick(){
      this.delLoading = true;
      let data = {
        id:[]
      };
      this.multipleSelection.forEach((item)=>{
        data.id.push(item.id)
      });

      this.batchDeleteGroup(data)
    },

    /*
    * 接口请求
    * */
    getGroups(){
      this.appFetch({
        url:'groups_list_get_v3',
        method:'get',
        data:{}
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.tableData = res.Data;
          this.alternateLength = res.Data.length;
          this.tableData.forEach((item) => {
            this.groupName = item.isDisplay;
            if (item.default == 1) {
              this.radio = item.id;
              this.alternateRadio = item.id;
            }
          })
        }
      }).catch(err=>{
      })
    },
    postGroups(data){
      this.appFetch({
        url:"groups_create_post_v3",
        method:"post",
        data: data
      }).then(res=>{
        this.btnLoading = false;
        if (res.errors){
          if (res.errors[0].detail){
            this.$message.error(res.errors[0].code + '\n' + res.errors[0].detail[0])
          } else {
            this.$message.error(res.errors[0].code);
          }
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
          this.addStatus = false;
          this.getGroups();
        }
      }).catch(err=>{
      })
    },
    singleDeleteGroup(id){
      this.appFetch({
        url:'groups_batchdelete_post_v3',
        method:'post',
        data:{
          ids: id
        }
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getGroups();
        }
      }).catch(err=>{
      })
    },
    batchDeleteGroup(data){
      const idString = data.id.toString();
      this.appFetch({
        url:'groups_batchdelete_post_v3',
        method:'post',
        data: {
          ids: idString
        }
      }).then(res=>{
        this.delLoading = false;
        if (res.errors){
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getGroups();
        }
      }).catch(err=>{
      })
    },
    // singlePatchGroup(id,name){
    //   console.log('提交');
    //   this.appFetch({
    //     url:'groups',
    //     method:'patch',
    //     splice:'/' + id,
    //     data:{
    //       data:{
    //         "attributes": {
    //           'name':name,
    //           'default':1
    //         }
    //       }
    //     }
    //   }).then(res=>{
    //     this.btnLoading = false;
    //     if (res.errors){
    //       this.$message.error(res.errors[0].code);
    //     }else {
    //       this.$message({
    //         message: '提交成功！',
    //         type: 'success'
    //       });
    //       this.getGroups();
    //     }
    //   }).catch(err=>{
    //   })
    // },
    batchPatchGroup(data){
      this.appFetch({
        url:'groups_batchupdate_post_v3',
        method:'post',
        data:{
          data
        }
      }).then(res=>{
        this.btnLoading = false;
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
          this.getGroups();
        }
      }).catch(err=>{
      })
    },
    PermissionPurchaseAllowed () {
      this.appFetch({
        url: "groups",
        method: "PATCH",
        splice: "/" + this.groupId,
        data: {
          data: {
            attributes: {
              name: this.radioName,
              is_paid: 0,
            }
          }
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {});
    },

    extension(id) {
      this.appFetch({
        url: "invite_link_v3",
        method: 'get',
        data: {
          groupId: id
        }
      }).then(res => {
        if (res.errors){
        this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          const oInput = document.createElement('input');
          oInput.value = `${window.location.protocol}//${window.location.host}/forum/partner-invite?inviteCode=${res.Data.code}`;
          oInput.id = 'copyInput';
          document.body.appendChild(oInput);
          oInput.select();
          document.execCommand('Copy');
          this.$message({
            message: '链接已复制到剪贴板',
            type: 'success'
          });
          setTimeout(() => {
            oInput.remove();
          }, 100);
        }
      });
    }
  },
  created(){
    this.getGroups();
  },
  components:{
    Card,
    CardRow,
    TableContAdd
  }
}
