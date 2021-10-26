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
        description="关闭后，这些功能将无法在站内使用。(仅限小程序)"
      >
        <el-checkbox v-model="reward">打赏、悬赏、红包、匿名、私信、商品、付费</el-checkbox>
      </CardRow>
    </Card>
   
   <Card class="recharge-points">
      <div class="recharge-points__lf">
        <el-checkbox v-model="recharge">充值</el-checkbox>
      </div>
      <div class="recharge-points__rf">
        <p>开启后，用户可在站内自主充值钱包余额。</p>
        <p>根据相关规定，开启自动充值功能站长需先取得ICCP增值业务许可证，请确保已获取相关资质后开启本功能，否则责任自负</p>
      </div>
    </Card>

    <p class="user-rol-table__pay">首页置顶管理</p>
    <p v-if="upgradeData.length <= 0" class="user-rol-table__pay">暂无置顶贴，可在内容-内容管理中进行设置。</p>
    <div class="user-rol-table"  v-if="upgradeData.length > 0">
      <el-table
        :data="upgradeData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
      >
        <el-table-column width="150" label="级别顺序">
          <template slot-scope="scope">
            <div class="user-rol-table-box">
              <span
                :class="groupEdit ? 'user-rol-table__frame' : ''"
                @click="dropOperation(scope)"
                v-if="scope.$index !== upgradeData.length - 1"
              >
                <i class="iconfont icon-xiangxiaicon table-icon"></i>
              </span>
              <span
                :class="scope.$index === upgradeData.length - 1 ? groupEdit ? 'user-rol-table__right user-rol-table__frame' : 'user-rol-table__rights' : groupEdit ? 'user-rol-table__frame' : ''"
                @click="riseOperation(scope)"
                v-if="scope.$index !== 0"
              >
                <i class="iconfont icon-xiangshang table-icon"></i>
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="帖子标题/内容"
          width="400"
        >
          <template slot-scope="scope">
             <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>

        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <p class="site-function-set-box__topping">
              <el-button type="text" @click="relieveToppingopen(scope)">取消置顶</el-button>
            </p>
          </template>
        </el-table-column>

        <el-table-column>
          <p></p>
        </el-table-column>
      </el-table>
    </div>
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