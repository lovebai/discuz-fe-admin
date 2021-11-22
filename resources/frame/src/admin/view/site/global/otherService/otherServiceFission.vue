<template>
  <div class="fission-box">
    <Card>
      分享裂变
    </Card>

    <Card>
      <div class="fission-box-open">
        <span class="fission-box-open__title">分享裂变功能</span>
        <el-switch
          v-model="fissionOpen"
          active-color="#336699"
          inactive-color="#bbbbbb"
        >
        </el-switch>
        <span class="fission-box-open__text">开启后，内容创作者可支付金额，鼓励分享者分享内容，进行传播</span>
      </div>
      <div class="fission-box-open fission-box-bottom">
        <span class="fission-box-open__title">防作弊机制</span>
        <el-switch
          v-model="preventMechanism"
          active-color="#336699"
          inactive-color="#bbbbbb"
        >
        </el-switch>
        <span class="fission-box-open__text">开启后，可自定义随机金额规则下分享者邀请新用户和老用户所获奖励的倍数</span>
      </div>
      <div class="fission-box-carve">
        <span class="fission-box-carve__title">默认邀请新老用户瓜分金额</span>
        <div  class="fission-box-carve__input">
          <el-input v-model="carveLeft"></el-input> : <el-input v-model="carveRight"></el-input>
        </div>
        <span class="fission-box-carve__text">分享着可在前台修改比例；如果邀请的阅读者同时包含新老用户，则当新用户大于等于50%时，触发新用户瓜分机制</span>
      </div>
    </Card>

    <Card>
      <div class="fission-box-black">
        <span class="fission-box-black__title">黑名单</span>
        <span class="fission-box-black__text">黑名单中的用户将无法成为分享者或阅读者</span>
      </div>
      <div class="fission-box-user">
        <div class="fission-box-user__search">
          <el-input v-model="userSearch" @focus="searchInput" @blur="loseInput"></el-input>
          <div class="fission-box-user__search-box" v-if="searchFocusing">
            <span>
              <i class="el-icon-search"></i>
            </span>
            <span>搜索用户昵称</span>
          </div>
        </div>
        <el-button class="fission-box-user__search-addto" type="primary" size="medium" @click="userSearchChange">搜索</el-button>
        <!-- <div class="fission-box-user__search-addto" @click="userSearchChange">
           搜索
        </div> -->
        <el-button type="primary" size="medium" @click="addtoChange">添加</el-button>
        <!-- <div class="fission-box-user__search-addto" @click="addtoChange">
          添加
        </div> -->
      </div>
      <div class="fission-box-search" v-if="userList.length > 0">
        <el-checkbox-group v-model="checkList">
          <p class="fission-box-search__title" v-for="(item, index) in userList" :key="index">
            <el-checkbox :label="item">{{item.nickname}}</el-checkbox>
          </p>
        </el-checkbox-group>
        <Page v-if="total > 10" :total="total" :pageSize="pageLimit" :currentPage="pageNum" @current-change="handleCurrentChange" />
      </div>
      <div class="fission-box-list">
        <li class="fission-box-list__user" v-for="(items, indexs) in userSearchList" :key="indexs">
          <span>{{items.nickname}}</span>
          <span class="fission-box-list__user-delete" @click="userSearchDelete(indexs)"><i class="el-icon-delete"></i></span>
        </li>
         <Page v-if="blackTotal > 10" :total="blackTotal" :pageSize="blackLimit" :currentPage="blackNum" @current-change="blackListChange" />
      </div>
    </Card>

    <Card>
      <el-button type="primary" size="medium" @click="importDataBtn">提交</el-button>
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