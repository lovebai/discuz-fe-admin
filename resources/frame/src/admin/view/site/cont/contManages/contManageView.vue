<template>
  <div class="cont-manage-box">
    <!-- 内容管理头部 -->
    <div class="cont-manage-header">
      <div class="cont-manage-header_top condition-box">
        <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">作者：</span>
          <el-input size="medium" placeholder="搜索作者" v-model="searchData.themeAuthor" clearable></el-input>
        </div>
        <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">主题ID：</span>
          <el-input size="medium" placeholder="搜索ID" v-model="searchData.threadID" clearable></el-input>
        </div>
        <div class="cont-manage-header_condition cont-manage-header_condition-rh">
          <span class="cont-manage-header_condition-title">内容包含：</span>
          <el-input size="medium" placeholder="搜索内容" v-model="searchData.themeKeyWords" clearable></el-input>
        </div>
      </div>

      <div class="cont-manage-header_middle condition-box">
        <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">搜索范围：</span>
          <el-cascader
            v-model="searchData.categoryId"
            clearable
            :options="categoriesList"
            :props="{ expandTrigger: 'hover', checkStrictly: true }">
          </el-cascader>
        </div>
        <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">主题类型：</span>
          <el-select v-model="searchData.topicTypeId" placeholder="选择主题类型" clearable>
            <el-option v-for="item in topicType" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="cont-manage-header_condition">
          <span class="cont-manage-header_condition-title">发布时间:</span>
          <el-date-picker
            v-model="searchData.dataValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </div>

      <div class="cont-manage-header_bottom condition-box">
         <!-- <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">内容来源：</span>
          <el-select v-model="searchData.contentSourceId" placeholder="选择内容来源" clearable>
            <el-option v-for="item in contentSource" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div> -->
        <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">分享裂变：</span>
          <el-select v-model="searchData.fissionType" placeholder="选择内容来源" clearable>
            <el-option v-for="item in fissionList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="cont-manage-header_condition cont-manage-header_condition-lf">
          <span class="cont-manage-header_condition-title">浏览次数：</span>
          <el-input size="medium" placeholder="大于" v-model="searchData.viewedTimesMin" clearable></el-input>
          <div class="spacing">-</div>
          <el-input size="medium" placeholder="小于" v-model="searchData.viewedTimesMax" clearable></el-input>
        </div>
        <div class="cont-manage-header_condition">
          <span class="cont-manage-header_condition-title">被回复数：</span>
          <el-input
            size="medium"
            placeholder="大于"
            v-model="searchData.numberOfRepliesMin"
            clearable
          ></el-input>
          <div class="spacing">-</div>
          <el-input
            size="medium"
            placeholder="小于"
            v-model="searchData.numberOfRepliesMax"
            clearable
          ></el-input>
          <el-button size="small" type="primary" @click="searchClick">搜索</el-button>
        </div>
      </div>
    </div>
    <!-- 主题展示 -->
    <div class="cont-manage-theme">
      <div class="cont-manage-theme__table">
        <div class="cont-manage-theme__table-header">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          ></el-checkbox>
          <p class="cont-manage-theme__table-header__title" style=" margin-left: 30PX;">{{ topic ? `话题 #${topic}#` : ''}} 主题列表</p>
        </div>

        <ContArrange
          v-for="(items, index) in  themeList"
          :author="!items.user? '该用户被删除': items.user.nickname"
          :theme="items.categoryName"
          :prply="items.likeReward.postCount"
          :browse="items.viewCount"
          :last="!items.lastPostedUser ? '该用户被删除': items.lastPostedUser.lastNickname"
          :releaseTime="formatDate(items.createdAt)"
          :userId="!items.user ? '该用户被删除':items.user.userId"
          :key="index"
        > 
          <div class="cont-manage-theme__table-side" slot="side">
            <el-checkbox
              v-model="checkedTheme"
              :label="items.threadId"
              @change="handleCheckedCitiesChange()"
            ></el-checkbox>
          </div>

          <a
            slot="longText"
            class="cont-manage-theme__table-long-text"
            v-if="items.title"
            :href="'/thread/' + items.threadId"
            target="_blank"
          >
            {{items.title}}
            <span
              class="iconfont"
              :class="parseInt(items.price) > 0?'iconmoney':'iconchangwen'"
            ></span>
          </a>

          <div class="cont-manage-theme__table-main" slot="main">
            <a
              class="cont-manage-theme__table-main__cont-text"
              :href="'/thread/' + items.threadId"
              target="_blank"
              :style="{'display':(contentIndexes(items.content, 'videos') ? 'inline':'block')}"
              v-html="$xss(filterContent(items.content.text))"
            ></a>
            <span class="iconfont iconvideo" v-if="contentIndexes(items.content, 'videos')"></span>
            <div class="cont-manage-theme__table-main__cont-imgs" v-if="contentIndexes(items.content, 'images')">
              <p
                class="cont-manage-theme__table-main__cont-imgs-p"
                v-for="(item,index) in contentIndexes(items.content, 'images')"
                :key="index"
              >
                <img
                  v-lazy="item.thumbUrl"
                  @click="imgShowClick(contentIndexes(items.content, 'images'),index)"
                  :alt="item.fileName"
                />
              </p>
            </div>
            <div
              class="cont-manage-theme__table-main__cont-annex"
              v-show="contentIndexes(items.content, 'attachments')"
            >
              <span>附件：</span>
              <p v-for="(item,index) in contentIndexes(items.content, 'attachments')" :key="index">
                <a :href="item.url" target="_blank">{{item.fileName}}</a>
              </p>
            </div>
            <div
              class="cont-manage-theme__table-main__cont-vote"
              v-if="contentIndexes(items.content, 'vote')"
            >
              <p>{{contentIndexes(items.content, 'vote')[0].voteTitle}}</p>
              <div>
                 <p v-for="(voteItems, indexs) in contentIndexes(items.content, 'vote')[0].subitems" :key="indexs">{{indexs + 1}}.  {{$xss(voteItems.content)}}</p>
              </div>
            </div>
            <div v-if="contentIndexes(items.content, 'audio')">
              <audio controls class="cont-manage-theme__table-main__audio" :src="contentIndexes(items.content, 'audio').mediaUrl" ref="audioPlear"></audio>
            </div>
            <div v-if="contentIndexes(items.content, 'iframe')">
               <div v-html="contentIndexes(items.content, 'iframe').content"></div>
            </div>
            <div class="cont-manage-theme__table-main__fission">
              <p class="cont-manage-theme__table-main__fission-text" @click="fissionClick">查看分享裂变数据</p>
            </div>
          </div>
        </ContArrange>

        <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="url" />

        <tableNoList v-show="themeList.length < 1"></tableNoList>

        <div class="cont-manage-theme__table-footer" v-if="pageCount > 1">
          <Page
            @current-change="handleCurrentChange"
            :current-page="currentPag"
            :page-size="10"
            :total="total"
          ></Page>
        </div>
      </div>
    </div>

    <!-- 内容管理操作 -->
    <div class="cont-manage-operating">
      <p>操作</p>
      <el-table :data="operatingList" tooltip-effect="dark" style="width: 100%">
        <el-table-column
          label-class-name="cont-manage-operating__table-label"
          label="操作"
          prop="theme"
          width="250"
        >
          <template slot-scope="scope">
            <div :class="scope.row.label === 'fission' ? 'cont-manage-operating__fissbox' : ''">
              <el-radio v-model="operatingSelect" :label="scope.row.label">{{scope.row.name}}</el-radio>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="选项" min-width="250">
          <template slot-scope="scope">
            <el-cascader
              v-if="scope.row.name === '批量移动到分类'"
              clearable
              v-model="categoryId"
              :options="moveCateList"
              :props="{ expandTrigger: 'hover', checkStrictly: true }">
            </el-cascader>

            <el-radio-group
              class="cont-manage__option-select"
              v-if="scope.row.name === '批量置顶'"
              v-model="toppingRadio"
            >
              <el-radio :label="1">置顶</el-radio>
              <el-radio :label="2">解除置顶</el-radio>
            </el-radio-group>

            <el-radio-group
              class="cont-manage__option-select"
              v-if="scope.row.name === '批量设置精华'"
              v-model="essenceRadio"
            >
              <el-radio :label="1">精华</el-radio>
              <el-radio :label="2">取消精华</el-radio>
            </el-radio-group>
            <div v-if="scope.row.name === '批量推送到付费首页'">
              <el-radio-group
                class="cont-manage__option-select"
                v-model="siteRadio"
              >
                <el-radio :label="1">推送</el-radio>
                <el-radio :label="2">取消推送</el-radio>
              </el-radio-group>
              <span class="cont-manage__option-select-tip">如未设置，默认展示热门内容</span>
            </div>
            <div v-if="scope.row.name === '批量开启分享裂变'">
              <div class="cont-manage__option-fission">
                <span class="cont-manage__option-fission__rule">发放规则</span>
                <el-radio-group
                  class="cont-manage__option-select"
                  v-model="distriBution"
                >
                  <el-radio :label="1">随机</el-radio>
                  <el-radio :label="2">定额</el-radio>
                </el-radio-group>
              </div>

              <div class="cont-manage__option-fission">
                <span class="cont-manage__option-fission__rule">红包总金额</span>
                <el-input
                  class="cont-manage__option-fission__money"
                  v-model="fissionPrice"
                  clearable
                ></el-input> 元
              </div>

              <p class="cont-manage__option-fistitle">*当前活动已发放0元，发完后可修改总金额继续塞钱</p>

              <div class="cont-manage__option-fission">
                <span class="cont-manage__option-fission__rule">每</span>
                <el-input
                  class="cont-manage__option-fission__money"
                  v-model="fissionPeople"
                  clearable
                ></el-input> 人阅读帖子，可瓜分一次红包金额
              </div>

              <div class="cont-manage__option-fission">
                <span class="cont-manage__option-fission__rule">一位分享用户最多瓜分</span>
                <el-input
                  class="cont-manage__option-fission__money"
                  v-model="fissionMost"
                  clearable
                ></el-input> 次
              </div>

              <div class="cont-manage__option-fission">
                <span class="cont-manage__option-fission__rule">单次瓜分金额在</span>
                <el-input
                  class="cont-manage__option-fission__money"
                  v-model="fissionSingleLeft"
                  clearable
                ></el-input>
                元和
                <el-input
                  class="cont-manage__option-fission__single"
                  v-model="fissionSingleRight"
                  clearable
                ></el-input> 元之间
              </div>

              <div class="cont-manage__option-fission">
                <span class="cont-manage__option-fission__rule">活动结束时间</span>
                <el-date-picker
                  v-model="endOfActivity"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <Card class="footer-btn">
        <el-button @click="submitClick" :loading="subLoading" type="primary">提交</el-button>
      </Card>
    </div>
  </div>
</template>

<script>
import "../../../../scss/site/module/contStyle.scss";
import contManageCon from "../../../../controllers/site/cont/contManage/contManageCon";
export default {
  name: "cont-manage-view",
  ...contManageCon
};
</script>
