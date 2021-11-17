
import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';

export default {
  data:function () {
    return {
      fissionDataEcharts: null, // 图表
      stationData: [
        {
          type: 1,
          mode: '站内阅读',
          num: '30%',
          name: 'cont-manage-fication__station-left station'
        },
        {
          type: 2,
          mode: '海报阅读',
          num: '30%',
          name: 'cont-manage-fication__station-poster station'
        },
        {
          type: 3,
          mode: '链接阅读',
          num: '30%',
          name: 'cont-manage-fication__station-link station'
        }
      ]
    }
  },
  created:function(){
    this.loadStatus();
  },
  methods:{
    loadStatus(){
      this.appFetch({
        url:'forum_get_v3',
        method:'get',
        data:{
        }
      }).then(data=>{
        if (data.errors){
          this.$message.error(data.errors[0].code);
        }else {
          if (data.Code !== 0) {
            this.$message.error(data.Message);
            return
          }
          // const {Data: forumData} = data;
          this.siteDataEcharts();
        }
      })
    },
    siteDataEcharts() {
      //初始化Echarts实例
      if (!this.fissionDataEcharts) {
        this.fissionDataEcharts = this.$echarts.init(
          this.$refs.fissionEcharts
        );
      }

      // const items = this.chartItems[this.selectedMode];
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        color: ["#333333", "#333333", "#333333"],
        series: [
          {
            // name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '站内阅读' },
              { value: 735, name: '海报阅读' },
              { value: 580, name: '链接阅读' },
            ]
          }
        ]
      };
      this.fissionDataEcharts.setOption(option);
    },
  },
  components:{
    Card,
    CardRow
  }
}