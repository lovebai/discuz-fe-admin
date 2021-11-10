import Card from "../../../../view/site/common/card/card";
import CardRow from "../../../../view/site/common/card/cardRow";
import webDb from 'webDbHelper';
import commonHelper from '../../../../../helpers/commonHelper';

export default {
  components:{
    Card,
    CardRow
  },
  data(){
    return {
      activeIndex: '2'
    }
  },
  // created(){
  // },
  methods:{
    handleSelect(key, keyPath) {
      this.$router.push({ path: '/admin/site-seo-set'});
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
  },
}