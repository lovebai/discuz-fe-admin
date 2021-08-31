<template>
  <div class="site-function-set-box">
    <Card>
      <CardRow class="publishing-title other">
        其它功能
      </CardRow>
    </Card>

    <!-- <Card>
      <CardRow
        class="card-points"
        description="开启后，用户角色将可以配置价格和有效期，用户可在前台进行用户角色购买"
      >
        <el-checkbox v-model="purchase">权限购买功能</el-checkbox>
      </CardRow>
    </Card> -->
    <Card>
      <CardRow
        class="card-points"
        description="关闭后，这些功能将无法在站内使用"
      >
        <el-checkbox v-model="reward">打赏、悬赏、红包、匿名、私信、商品、付费</el-checkbox>
      </CardRow>
    </Card>

    <el-button type="primary" size="medium" @click="handlePublishingSubmit">提交</el-button>

  </div>
</template>

<script>
  import "../../../../scss/site/module/globalStyle.scss";
  import siteFunctionSetCon from "../../../../controllers/site/global/siteSet/siteFunctionSetCon";
  export default {
    name: "site-function-set-view",
    ...siteFunctionSetCon
  };
</script>