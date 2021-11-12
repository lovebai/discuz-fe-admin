import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";

export default {
  components:{
    Card,
    CardRow
  },
  data(){
    return {
      activeIndex: '2',
      ssrText: '',
    }
  },
  // created(){
  // },
  methods:{
    handleSelect() {
      this.$router.push({ path: '/admin/site-seo-set'});
    },
    flipClick(type) {
      switch(type) {
        case 'qcloud_close':
          this.$router.push({ path: '/admin/tencent-cloud-config/cloud'});
          break;
        case 'qcloud_close':
          this.$router.push({ path: '/admin/tencent-cloud-config/cloud', query: { type: type } });
          break;
        default:
      }
    },
    optionBtn() {
      const div = document.getElementById('sharedurl');
      if (document.body.createTextRange) {
          let range = document.body.createTextRange();
          range.moveToElementText(div);
          range.select();
      } else if (window.getSelection) {
          let selection = window.getSelection();
          let range = document.createRange();
          range.selectNodeContents(div);
          selection.removeAllRanges();
          selection.addRange(range);
          /*if(selection.setBaseAndExtent){
              selection.setBaseAndExtent(text, 0, text, 1);
          }*/
      } else {
          console.warn("none");
      }
      this.$message({
        message: '内容已复制到剪贴板',
        type: 'success'
      });
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
  },
}