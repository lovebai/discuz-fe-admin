<template>
  <div class="cont-review-box">
    <div class="cont-review-header">
      <div class="cont-review-header__lf">
        <div>
          <span class="cont-review-header__lf-title">用户名：</span>
          <el-input size="medium" placeholder="搜索用户名" clearable v-model="searchUserName"></el-input>
        </div>
        <div>
          <span class="cont-review-header__lf-title">每页显示：</span>
          <el-select v-model="pageSelect" size="medium" placeholder="选择每页显示">
            <el-option
              v-for="item in pageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="cont-review-header__rt">
        <div>
          <span class="cont-review-header__lf-title">内容包含：</span>
          <el-input
            size="medium"
            class="content-contains-input"
            clearable
            placeholder="搜索关键词"
            v-model="keyWords"
          ></el-input>
          <el-checkbox v-model="showSensitiveWords">显示敏感词</el-checkbox>
        </div>
        <div class="cont-review-header__rt-search">
          <span class="cont-review-header__lf-title">搜索范围：</span>
          <el-select v-model="searchReviewSelect" size="medium" placeholder="选择审核状态" clearable>
            <el-option
              v-for="item in searchReview"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-select v-model="categoriesListSelect" size="medium" clearable placeholder="选择搜索分类">
            <el-option
              v-for="item in categoriesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select> -->
          <el-cascader
            v-model="categoriesListSelect"
            clearable
            :options="categoriesList"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            @change="handleChange">
          </el-cascader>
          <el-select
            v-model="searchTimeSelect"
            @change="searchTimeChange"
            size="medium"
            placeholder="选择搜索时间"
            clearable
          >
            <el-option
              v-for="item in searchTime"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button size="small" @click="themeSearch" type="primary">搜索</el-button>
        </div>
      </div>
    </div>

    <div class="cont-review-table">
      <ContArrange
        v-for="(items,index) in  themeList"
        :author="!items.user ? '该用户被删除' :items.user.nickname"
        :theme="items.categoryName"
        :prply="items.likeReward.postCount"
        :browse="items.viewCount"
        :last="!items.lastPostedUser ? '该用户被删除' : items.lastPostedUser.lastNickname"
        :finalPost="formatDate(items.updatedAt)"
        :userId="!items.user ? '该用户被删除' : items.userId"
        :key="items.threadId"
      >
        <div class="cont-review-table__side" slot="side">
          <el-radio-group v-model="submitForm[index].radio" @change="radioChange($event,index)">
            <el-radio
              :label="0"
              :disabled="contentIndexes(items.content, 'video')"
            >通过</el-radio>

            <el-radio :label="1">删除</el-radio>
            <el-radio
              :label="2"
              v-if="items.isApproved !== 2"
              :disabled="items.isApproved === 2"
            >忽略</el-radio>
          </el-radio-group>
        </div>

        <a
          slot="longText"
          class="cont-review-table__long-text"
          v-if="items.title"
          :href="'/thread/' + items.threadId"
        >
          {{items.title}}
          <span
            class="iconfont"
            :class="parseInt(items.price) > 0 ? 'iconmoney':'iconchangwen'"
          ></span>
        </a>

        <div class="cont-review-table__main" slot="main">
          <div class="cont-review-table__main-box">
            <a
              class="cont-review-table__main__cont-text"
              :href="'/thread/' + items.threadId"
              target="_blank"
              :style="{'display':(contentIndexes(items.content, 'videos') ? 'inline':'block')}"
              v-html="$xss(filterContent(items.content.text))"
            ></a>
          </div>
          <span class="iconfont iconvideo" v-if="contentIndexes(items.content, 'videos')"></span>
          <div class="cont-review-table__main__cont-imgs" v-if="contentIndexes(items.content, 'images')">
            <p
              class="cont-review-table__main__cont-imgs-p"
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
            class="cont-review-table__main__cont-annex"
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
        </div>

        <div class="cont-review-table__footer" slot="footer">
          <div class="cont-review-table__footer__lf" v-if="contentIndexes(items.content, 'videos')">
            <el-button
              type="text"
              :class="{'graybtn': contentIndexes(items.content, 'video')}"
              v-if="contentIndexes(items.content, 'video')"
              @click="sun"
            >通过</el-button>
            <el-button
              type="text"
              v-else
              @click="singleOperationSubmit(1,items.categoryId, items.threadId, index)"
            >通过</el-button>
            <i></i>
            <el-popover
              width="100"
              placement="top"
              :ref="`popover-${index}`"
            >
              <p>确定删除该项吗？</p>
              <div style="text-align: right; margin: 10PX 0 0 0 ">
                <el-button
                  type="danger"
                  size="mini"
                  @click="closeDelet(`popover-${index}`)"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="
                    singleOperationSubmit(2,items.categoryId, items.threadId,index);
                    closeDelet(`popover-${index}`)"
                  >确定</el-button
                >
              </div>
            <el-button
              type="text"
              slot="reference"
            >删除</el-button>
            </el-popover>
            <i></i>
            <el-button
              type="text"
              v-if="items.isApproved !== 2"
              @click="singleOperationSubmit(3,items.categoryId, items.threadId,index)"
            >忽略</el-button>
          </div>
          <div class="cont-review-table__footer__lf" v-else>
            <el-button
              type="text"
              @click="singleOperationSubmit(1,items.categoryId, items.threadId,index)"
            >通过</el-button>
            <i></i>
            <el-popover
              width="100"
              placement="top"
              :ref="`popover-${index}`"
            >
              <p>确定删除该项吗？</p>
              <div style="text-align: right; margin: 10PX 0 0 0 ">
                <el-button
                  type="danger"
                  size="mini"
                  @click="closeDelet(`popover-${index}`)"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="
                    singleOperationSubmit(2,items.categoryId, items.threadId,index);
                    closeDelet(`popover-${index}`)"
                  >确定</el-button
                >
              </div>
            <el-button
              type="text"
              slot="reference"
            >删除</el-button>
            </el-popover>
            <i></i>
            <el-button
              type="text"
              v-if="items.isApproved !== 2"
              @click="singleOperationSubmit(3,items.categoryId, items.threadId,index)"
            >忽略</el-button>
          </div>

          <div class="cont-review-table__footer__rt">
            <span>操作理由：</span>
            <el-input size="medium" clearable v-model="submitForm[index].message"></el-input>
            <el-select
              size="medium"
              @change="reasonForOperationChange($event,index)"
              v-model="submitForm[index].Select"
              placeholder="选择操作理由"
            >
              <el-option
                v-for="item in reasonForOperation"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>

          <div class="cont-review-table__footer__bottom">
            <el-button
              type="text"
              class="transcoding_status"
              v-if="contentIndexes(items.content, 'videoStatus')"
            >转码中</el-button>
            <el-button
              type="text"
              class="transcoding_status"
              v-if="contentIndexes(items.content, 'videoStatusTwo')"
            >转码失败</el-button>
            <el-button type="text" @click="viewClick(items.threadId)">查看</el-button>
            <el-button type="text" @click="editClick(items.threadId, '编辑')">编辑</el-button>
          </div>
        </div>
      </ContArrange>

      <el-image-viewer v-if="showViewer" :on-close="closeViewer" :url-list="url" />

      <tableNoList v-show="themeList.length < 1"></tableNoList>

      <Page
        v-if="pageCount > 1"
        @current-change="handleCurrentChange"
        :current-page="currentPaga"
        :page-size="pageSelect"
        :total="total"
      ></Page>
    </div>

    <div class="cont-review-footer footer-btn">
      <el-button size="small" type="primary" :loading="subLoading" @click="submitClick">提交</el-button>
      <el-button type="text" :loading="btnLoading === 1" @click="allOperationsSubmit(1)">全部通过</el-button>
            <el-popover
              width="100"
              placement="top"
              v-model="visible"
            >
              <p>确定删除该项吗？</p>
              <div style="text-align: right; margin: 10PX 0 0 0 ">
                <el-button
                  type="danger"
                  size="mini"
                  @click="visible = false"
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="
                    allOperationsSubmit(2)
                    visible = false"
                  >确定</el-button
                >
              </div>
      <el-button slot="reference" type="text" :loading="btnLoading === 2">全部删除</el-button>
            </el-popover>
      <el-button type="text" :loading="btnLoading === 3" v-show="ignoreStatus" @click="allOperationsSubmit(3)">全部忽略</el-button>
      <!-- <el-checkbox v-model="appleAll">将操作应用到其他所有页面</el-checkbox> -->
    </div>
  </div>
</template>

<script>
import "../../../../scss/site/module/contStyle.scss";
import contReviewCon from "../../../../controllers/site/cont/contModeration/contReviewCon";
export default {
  name: "cont-review-view",
  ...contReviewCon
};
</script>
