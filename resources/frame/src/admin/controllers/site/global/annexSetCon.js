
import Card from '../../../view/site/common/card/card';
import CardRow from '../../../view/site/common/card/cardRow';

export default {
  data: function () {
    return {
      picture: '',       // 图片扩展名
      fileExtension: '', // 文件扩展名
      maximumSize: '',   // 最大尺寸
      tipShow: false,    // 是否显示提示信息
    }
  },
  created() {
    this.annexSet()
  },
  methods: {
    annexSet() {
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
          this.picture = forumData.setAttach.supportImgExt;
          this.fileExtension = forumData.setAttach.supportFileExt;
          this.maximumSize = forumData.setAttach.supportMaxSize;
        }
      })
    },
    onblurFun () {
      if (this.maximumSize > 100) {
        this.tipShow = true;
      } else {
        this.tipShow = false;
      }
    },
    submi() { //提交附件信息
      var reg = /^(?:[a-zA-Z]{3},)*[a-zA-Z]{3}$/;
      var regs = /^\d+$|^\d+[.]?\d+$/;
      var regSize = /^[0-9]*$/;
      var picture = this.picture;
      var fileExtension = this.fileExtension;
      var maximumSize = this.maximumSize;
      if (!picture) {
        this.$message.error('请您输入图片扩展名');
        return
      }
      if (!fileExtension) {
        this.$message.error('请您输入文件扩展名');
        return
      }
      if (!maximumSize) {
        this.$message.error('请您输入支持的最大尺寸');
        return
      }
      if (maximumSize > 100 ) {
        this.$message.error('最大尺寸不能超过100MB');
        return
      }
      if (!regs.test(maximumSize)) {
        this.$message.error('请输入正确的支持最大尺寸格式');
        return
      }
      if (!regSize.test(maximumSize)) {
        this.$message.error('请输入正确的支持最大尺寸格式');
        return
      }
      this.appFetch({
        url: 'settings_post_v3',
        method: 'post',
        data: {
          "data": [
            {
              "key": 'support_img_ext',
              "value": this.picture,
              "tag": "default"
            },
            {
              "key": 'support_file_ext',
              "value": this.fileExtension,
              "tag": "default",
            },
            {
              "key": 'support_max_size',
              "value": this.maximumSize,
              "tag": "default",
            },
          ]
        }
      }).then(data => {
        if (data.errors) {
          this.$message.error(data.errors[0].code);
        } else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          this.$message({ message: '提交成功', type: 'success' });
          this.annexSet()  //提交成功后调取新数据
        }
      }).catch(error => {
      })
    }
  },
  components: {
    Card,
    CardRow
  }
}
