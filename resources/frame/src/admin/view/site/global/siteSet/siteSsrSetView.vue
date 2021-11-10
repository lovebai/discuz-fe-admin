<template>
  <div class="site-seo">
    <!-- <Card class="site-seo-nav">
      <p class="site-seo-nav__map"  @click="jumpDataRules">推荐首页</p>
      <p class="site-seo-nav__ssr repeat">数据规则</p>
    </Card> -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#336699">
      <el-menu-item index="1">站点地图</el-menu-item>
      <el-menu-item index="2">静态输出(SSR)</el-menu-item>
    </el-menu>
    <div>
      SSR
    </div>
  </div>
</template>

<script>
  import "../../../../scss/site/module/globalStyle.scss";
  import siteDataRulesCon from "../../../../controllers/site/global/siteSet/siteSsrSetCon";
  export default {
    name: "site-ssr-set",
    ...siteDataRulesCon
  };
</script>