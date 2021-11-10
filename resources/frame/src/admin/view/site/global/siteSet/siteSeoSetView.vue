<template>
  <div class="site-seo">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#336699"
    >
      <el-menu-item index="1">站点地图</el-menu-item>
      <el-menu-item index="2">静态输出(SSR)</el-menu-item>
    </el-menu>

    <Card class="site-seo-explain">
      <div class="site-seo-explain__box">
        <p class="site-seo-explain__box-introduce">
          目前<a
            href="https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap"
            target="_blank"
            >站点地图</a
          >为系统自动生成，暂不支持Changefreg(更新频率)、Priority(权重)等参数的配置；
        </p>
        <p class="site-seo-explain__box-introduce">预设生成规则如下：</p>
        <p class="site-seo-explain__box-introduce">
          ·
          以常驻入口、站点分类、话题、用户拆分创建子Sitemaps，并进行gzip压缩，同时创建<a
            href="https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps"
            target="_blank"
            >站点地图索引</a
          >(Sitemap Index)；
        </p>
        <p class="site-seo-explain__box-introduce">
          · lastmod的值取帖子或用户的updatetime；
        </p>
        <p class="site-seo-explain__box-introduce">
          · changefreg值为weekly，priority值为0.8；
        </p>
        <p class="site-seo-explain__box-introduce">
          · 每日凌晨3点定时任务自动更新。
        </p>
      </div>
    </Card>

    <Card>
      <div class="site-seo-address">
        <div class="site-seo-address__title">
          <p :class="optionType === 'option' ? 'site-seo-address__title-option' : ''" @click="indexesClick('option')">站点地图索引</p>
          <p :class="optionType === 'seat' ? 'site-seo-address__title-option title-seat' : 'title-seat'" @click="indexesClick('seat')">站点地图</p>
        </div>
        <div class="site-seo-address__textarea" v-if="optionType === 'option'">
          <el-input
            type="textarea"
            ref="indexesText"
            :autosize="{ minRows: 10, maxRows: 20}"
            v-model="indexesText">
          </el-input>
        </div>
        <div class="site-seo-address__textarea" v-if="optionType === 'seat'">
          <el-input
            type="textarea"
            ref="mapText"
            :autosize="{ minRows: 10, maxRows: 20}"
            v-model="mapText">
          </el-input>
        </div>
      </div>
    </Card>

    <Card class="footer-btn">
      <el-button
        type="primary"
        @click="optionBtn"
        >复制</el-button
      >
      <el-button
        size="primary"
        :loading="delpaidLoading"
        @click="deleteClick"
        >打包下载</el-button
      >
    </Card>
  </div>
</template>

<script>
import "../../../../scss/site/module/globalStyle.scss";
import siteDataRulesCon from "../../../../controllers/site/global/siteSet/siteSeoSetCon";
export default {
  name: "site-seo-set",
  ...siteDataRulesCon,
};
</script>