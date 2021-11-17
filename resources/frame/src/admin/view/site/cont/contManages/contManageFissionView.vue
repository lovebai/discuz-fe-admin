<template>
  <div class="cont-manage-fission">
    <Card class="cont-manage-min">
      <div class="cont-manage-statistics">
        <div class="cont-manage-statistics__top cont-manage-statistics__active">
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">总分享者</p>
            <p class="cont-manage-statistics__top-text-num">89</p>
          </div>
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">今日净增</p>
            <p class="cont-manage-statistics__top-text-num">50</p>
          </div>
        </div>
        <div class="cont-manage-statistics__top">
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">总阅读者</p>
            <p class="cont-manage-statistics__top-text-num">523</p>
          </div>
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">今日净增</p>
            <p class="cont-manage-statistics__top-text-num">50</p>
          </div>
        </div>
      </div>

      <div class="cont-manage-statistics cont-manage-statistics-right">
        <div class="cont-manage-statistics__top-text">
          <p class="cont-manage-statistics__top-text-title">总分享者</p>
          <p class="cont-manage-statistics__top-text-num">89</p>
        </div>
      </div>
    </Card>
    
    <Card>
      <p class="cont-manage-acctitle">渠道分析:</p>
      <div class="cont-manage-access" ref="fissionEcharts"></div>
      <div class="cont-manage-fication">
        <ul class="cont-manage-fication__station" v-for="(item, index) in stationData" :key="index">
          <li :class="item.name"></li>
          <li class="cont-manage-fication__station-text">站内阅读</li>
          <li class="cont-manage-fication__station-right">30%</li>
        </ul>
      </div>
    </Card>

    <Card class="cont-manage-acctitle">
      <div>
        <span>用户分析</span>
        <span>每天10:00更新</span>
      </div>
    </Card>
  </div>
</template>

<script>
import "../../../../scss/site/module/contStyle.scss";
import contManageFissionCon from "../../../../controllers/site/cont/contManage/contManageFissionCon";
export default {
    name: "cont-manage-fission-con",
  ...contManageFissionCon
}
</script>