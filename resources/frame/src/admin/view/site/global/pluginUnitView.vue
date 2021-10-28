<template>
  <div>
    <Card>
      <el-button type="primary" size="medium" @click="determineBtn">上传插件</el-button>
    </Card>
    <Card>
      
    </Card>
  </div>
</template>

<script>
import '../../../scss/site/module/globalStyle.scss';
import otherServiceContentCon from '../../../controllers/site/global/otherService/otherServiceContentCon';
export default {
    name: "other-service-content",
  ...otherServiceContentCon
}
</script>