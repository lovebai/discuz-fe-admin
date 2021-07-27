<template>
  <div class="site-sort-set-box">
    <div>
      <!-- 添加内容 -->
      <div class="sort-switch-header">
        <p class="sort-desc"  @click="jumpDataRules">推荐首页</p>
        <p class="data-rules repeat">数据规则</p>
      </div>
      <Card class="sort-switch-radio">
        <p class="sort-switch-radio_title">阅读数计算方式</p>
        <div class="sort-switch-radio_option">
          <el-radio v-model="radio" label="1" :class="radio === '1' ? 'sort-switch-radio_cont' : ''">仅点进帖子详情页增加阅读数</el-radio>
        </div>
        <div>
          <el-radio v-model="radio" label="0" :class="radio === '0' ? 'sort-switch-radio_cont' : ''">操作首页帖子、进入详情页，增加阅读数</el-radio>
        </div>
        <p class="sort-switch-radio_explain">说明：操作包括点赞、点击"查看更多"、分享、下载附件、点开图片预览、播放视频、播放语音、点击帖子中包含的链接或话题。</p>
      </Card>
      <el-button type="primary" size="medium" @click="ruleSubmission">提交</el-button>
    </div>
  </div>
</template>

<script>
  import "../../../../scss/site/module/globalStyle.scss";
  import siteDataRulesCon from "../../../../controllers/site/global/siteSet/siteDataRulesCon";
  export default {
    name: "site-data-rules",
    ...siteDataRulesCon
  };
</script>