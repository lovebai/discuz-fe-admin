<template>
  <div class="fission-box">
    <Card>
      分享裂变
    </Card>
  </div>
</template>

<script>
import '../../../../scss/site/module/globalStyle.scss';
import otherServiceFission from '../../../../controllers/site/global/otherService/otherServiceFissionCon';
export default {
    name: "other-service-fission",
  ...otherServiceFission
}
</script>