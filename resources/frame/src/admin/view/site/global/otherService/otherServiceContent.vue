<template>
  <div>
    <Card header="内容导入"></Card>
    <Card>
      <div class="content-import-source">
        <span class="content-import-source__title">来源</span>
        <el-select class="content-import-source__option" v-model="contentSourceId" placeholder="选择内容来源" clearable>
          <el-option class="content-import-source__option-selected" v-for="item in contentSource" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </div>
    </Card>
    <div v-if="contentSourceId === 1" class="content-import">多次导入同一话题会导致数据重复，需要站长手动清理</div>
    <Card>
      <div class="content-import-search">
        <el-input v-model="topicContent" :placeholder="contentSourceId === 1 ? '搜索想要导入站点的话题' : '输入想要导入公众号名称'"></el-input>
      </div>
    </Card>

    <Card  v-if="contentSourceId === 4">
      <div class="content-import-search">
        <el-input v-model="accuntlnroCookie" placeholder="输入想要导入公众号的cookie"></el-input>
      </div>
    </Card>
    
    <Card  v-if="contentSourceId === 4">
      <div class="content-import-search">
        <el-input v-model="accuntlnroToken" placeholder="输入想要导入公众号的token"></el-input>
      </div>
    </Card>

    <Card class="content-import-layer" v-if="contentSourceId === 1">
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
        <p class="progress-box__success-confirm">成功导入{{totalDataNumber}}条数据，稍后可在前台查看</p>
        <el-button type="primary" size="medium" @click="determineBtn">确认</el-button>
      </div>
      <div class="progress-box__fail" v-if="importing !== 0 && importing !== 1 && importing !== 2">
        <p class="progress-box__fail-fotter">导入失败</p>
        <el-button type="primary" size="medium" @click="retryBtn">重试</el-button>
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