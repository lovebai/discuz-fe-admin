/*
*  提现申请
* */

import Card from '../../../../view/site/common/card/card';
import Page from '../../../../view/site/common/page/page';
import webDb from 'webDbHelper';

export default {
  data:function () {
    return {
      tableData: [],              //列表数据
      cashSn:'',                  //搜索-流水号
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },                          //搜索-申请时间
      applicationTime: ['',''],   //申请时间
      operationUser:'',           //操作用户
      statusOptions: [
        {
          value: '1',
          label: '待审核'
        },
        {
          value: '2',
          label: '审核通过'
        },
        {
          value: '3',
          label: '审核不通过'
        },
        {
          value: '4',
          label: '待打款'
        },
        {
          value: '5',
          label: '已打款'
        },
        {
          value: '6',
          label: '打款失败'
        }
      ],                          //搜索-状态
      statusSelect: '',          //状态选中
      visible:false,

      total:0,                    //总数
      pageCount:0,                //总页数
      currentPaga:1,               //第几页
      type1: '微信零钱',            //打款方式-微信零钱
      type2: '人工打款',            //打款方式-人工打款
    }
  },
  methods:{
    handleTimeChange () {
      if (this.applicationTime != null) {
        this.applicationTime[0] = this.applicationTime[0] + '-00-00-00';
        this.applicationTime[1] = this.applicationTime[1] + '-24-00-00';
      }
    },
    /**
     * 状态码转换为中文
     */
    cashStatus(status, data){
      switch (status){
        case 1:
          if (!data.errorMessage){
            return '待审核'
          } else {
            return "待审核，原因：" + data.errorMessage;
          }
        case 2:
          return "审核通过";
        case 3:
          return "审核不通过，原因：" + data.remark;
        case 4:
          return "待打款";
        case 5:
          return "已打款";
        case 6:
          return "打款失败，原因：" + data.errorMessage;
        default:
          return "未知状态";
      }
    },
    /**
     * 收款账号
     */
    accountNumber(num) {
      if (num.cashType === 1) {
        if (num.wechat) {
          return num.wechat.mpOpenid || num.wechat.minOpenid;
        } else {
          return '';
        }
      } else {
        return num.tradeNo;
      }
    },
    toexamine(num) {
      if (num.cashStatus == 1 && num.cashType === 1) {
        return true;
      }
      if (num.cashStatus == 1 && num.cashType === 0) {
        return false;
      }
    },
    /**
     * 操作-不通过
     */
    noReviewClick(id){
      let data = {id:[]};
      this.$MessageBox.prompt('', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        inputPlaceholder:'请输入不通过理由'
      }).then((value)=>{
        data.id.push(id);
        data.status = 3;
        data.remark = value.value;
        this.postReview(data);
      }).catch((err) => {
      });
    },
     /**
     * 操作-通过
     */
    reviewClick(id){
      let data = {id:[]};
      data.id.push(id);
      data.status = 2;
      this.postReview(data);
    },
     /**
     * 操作-标记已打款
     */
    reviewClicks(id){
      let data = {id:[]};
      data.id.push(id);
      data.status = 5;
      this.postReview(data);
    },
    /**
     * 审核之后的状态
     */
    auditstatus(status) {
      switch (status){
        case 2:
          return "标记打款";
        case 3:
          return "审核拒绝";
        case 4:
          return "标记打款";
        case 5:
          return "标记打款";
        case 6:
          return "打款失败"
        default:
          return "未知状态";
      }
    },
    /**
     * 提现申请搜索
     */
    searchClick(){
      this.applicationTime = this.applicationTime == null ? ['',''] : this.applicationTime;
      this.currentPaga = 1;
      this.getReflectList();
    },
    /*
    * 切换页码
    * */
    handleCurrentChange(val){
      this.currentPaga = val;
      this.getReflectList();
    },

    /*
    * 格式化日期
    * */
    formatDate(data){
      return this.$dayjs(data).format('YYYY-MM-DD HH:mm')
    },

    /*
    * 获取提现申请列表
    * */
    getReflectList(){
      this.appFetch({
        url:'cashLogs_get_v3',
        method:'get',
        data:{
          'filter[cashStatus]':this.statusSelect,
          'page':this.currentPaga,
          'perPage':10,
          'filter[cashSn]':this.cashSn,
          'filter[nickname]':this.operationUser,
          'filter[startTime]':this.applicationTime[0],
          'filter[endTime]':this.applicationTime[1]
        }
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.tableData = [];
          const { Data: data } = res;
          this.tableData = data.pageData || [];
          this.total = data.totalCount;
          this.pageCount = data.totalPage;
        }
      }).catch(err=>{
      })
    },
    /*
    * 提交操作
    * */
    postReview(data){
      if (data.status === 3 && !data.remark) {
        this.$message.warning('理由不能为空！');
        return;
      }
      this.appFetch({
        url:'cashReview_post_v3',
        method:'post',
        data:{
          'ids':data.id,
          'cashStatus':data.status,
          'remark':data.remark
        }
      }).then(res=>{
        if (res.errors){
          this.$message.error(res.errors[0].code);
        }else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.getReflectList();
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
        }
      }).catch(err=>{
      })
    },

    getCreated(state){
      if(state){
        this.currentPaga = 1;
      } else {
        this.currentPaga = Number(webDb.getLItem('currentPag'))||1;
      }
      this.getReflectList();
    }
  },
  created(){
    // this.getReflectList(Number(webDb.getLItem('currentPag'))||1);
  },
  beforeRouteEnter (to,from,next){
    next(vm => {
      if (to.name !== from.name && from.name !== null){
        vm.getCreated(true)
      }else {
        vm.getCreated(false)
      }
    })
  },
  components:{
    Card,
    Page
  }
}
