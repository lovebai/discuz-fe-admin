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

    <Card v-if="speed">
      <el-progress :percentage="progress" class="progress-box"></el-progress>
      <p class="progress-box__importing" v-if="importing === 1">正在导入中</p>
      <div class="progress-box__success" v-if="importing === 2">
        <p class="progress-box__success-confirm">成功导入{{topicNum}}条数据，稍后可在前台查看</p>
        <el-button type="primary" size="medium" @click="determineBtn">确认</el-button>
      </div>
      <div class="progress-box__fail" v-if="importing === 3 || importing === 4">
        <p class="progress-box__fail-fotter">导入失败</p>
        <el-button type="primary" size="medium" @click="retrybtn">重试</el-button>
        <el-button size="medium" @click="cancelBtn">取消</el-button>
      </div>
    </Card>

    <!-- <Card class="footer-btn" >
      <el-button type="primary" size="medium" @click="crawlerQuery">提交</el-button>
    </Card> -->
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