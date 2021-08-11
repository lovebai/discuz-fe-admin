<template>
  <div>
    <Card header="内容导入"></Card>
    <div class="content-import">多次导入同一话题会导致数据重复，需要站长手动清理</div>
    <Card>
      <div class="content-import-search">
        <el-input v-model="topicContent" placeholder="搜索想要导入站点的话题"></el-input>
      </div>
    </Card>
    
    <Card class="content-import-layer">
      <CardRow description="一次最多导入1000条">
        <div class="content-import-num">
          <p class="content-import-num__topic">导入条数</p>
          <el-input type="number" v-model="topicNum" @input="topicNumInput"></el-input>
        </div>
      </CardRow>
    </Card>

    <Card class="footer-btn" >
      <el-button type="primary" size="medium" @click="importDataBtn">提交</el-button>
    </Card>
  </div>
</template>

<script>
import '../../../../scss/site/module/globalStyle.scss';
import otherServiceContentCon from '../../../../controllers/site/global/otherService/otherServiceContentCon';
export default {
    name: "other-service-content",
  ...otherServiceContentCon
}
</script>