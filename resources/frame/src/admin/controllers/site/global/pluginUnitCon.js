
import Card from '../../../view/site/common/card/card';
import CardRow from '../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogVisible: false,
      fileList: []
    }
  },
  methods:{
    detailsClick() {
       this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    beforePluginUpload() {
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      if (isLt20M == true) {
      }
      return isLt20M;
    },
    uploaderPlugin(file) {
      console.log(file);
    },
    importDataBtn() {
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
        }
      })
    },
  },
  components:{
    Card,
    CardRow
  }
}