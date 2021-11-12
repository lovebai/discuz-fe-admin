<template>
  <div class="config-cdn">
    <Card class="config-cdn-domain">
      <span class="config-cdn-domain__name"> 配置地区 </span>
      <el-input
        v-model="configAddress"
        class="elinput"
        style="height: 36px; width: 400px"
        size="small"
      ></el-input>
    </Card>

    <Card class="config-cdn-domain"> 
      <span class="config-cdn-domain__name"> 配置存储桶名称 </span>
      <el-input
        v-model="configName"
        class="elinput"
        style="height: 36px; width: 400px"
        size="small"
      ></el-input>
    </Card>
    
    <Card class="config-serve"> 
      <span class="config-serve__name"> 配置存储桶名称 </span>
      <p></p>
    </Card>

    <Card class="register-option-btn">
      <el-button
        type="primary"
        :loading="subLoading"
        size="medium"
        @click="submitClick"
      >提交</el-button>
    </Card>
  </div>
</template>

<script>
import "../../../../scss/site/module/globalStyle.scss";
import tencentCloudServerCon from "../../../../controllers/site/global/tencentCloundSet/tencentCloudServerCon";

export default {
  name: "tencent-cloud-server",
  ...tencentCloudServerCon,
};
</script>