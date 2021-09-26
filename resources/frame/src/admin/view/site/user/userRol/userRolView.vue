<template>
  <div class="user-rol-box">
    <div class="user-rol-table">
      <p>付费用户组</p>
      <el-table
        :data="upgradeData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="checkSelectable"
        >
        </el-table-column>

        <el-table-column
          label="级别"
          min-width="20"
        >
          <template slot-scope="scope">
             <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column label="级别名称" width="240">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
          </template>
        </el-table-column>

        <el-table-column width="100" label="显示组名">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.id === 7"
              v-model="scope.row.isDisplay"
              active-color="#336699"
              inactive-color="#bbbbbb"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column width="200">
          <template slot-scope="scope">
            <el-button size="medium" @click="extension(scope.row.id)"
              >邀请</el-button
            >
            <el-button
              v-if="scope.row.id !== 1"
              :disabled="addStatus && tableData.length - 1 === scope.$index"
              type="text"
              @click="
                $router.push({
                  path: '/admin/rol-permission',
                  query: { type: 'normal', id: scope.row.id, name: scope.row.name },
                })
              "
              >设置</el-button
            >
            <el-popover
              width="100"
              placement="top"
              :ref="`popover-${scope.$index}`"
            >
              <p>确定删除该项吗？</p>
              <div style="text-align: right; margin: 10px 0 0 0">
                <el-button
                  type="danger"
                  size="mini"
                  @click="
                    scope._self.$refs[`popover-${scope.$index}`].doClose()
                  "
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="
                    singleDelete(scope.$index, scope.row.id);
                    scope._self.$refs[`popover-${scope.$index}`].doClose();
                  "
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                v-if="
                  scope.row.id !== 1 &&
                  scope.row.id !== 6 &&
                  scope.row.id !== 7 &&
                  scope.row.id !== 10 &&
                  scope.row.default !== 1
                "
                type="text"
                >删除</el-button
              >
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column min-width="50" label="级别顺序">
          <template slot-scope="scope">
            <!-- <el-radio v-model="radio" @change="radioChange(scope.row,scope.$index)" v-if="scope.row.id != 1 && scope.row.id !== 6 && scope.row.id !== 7" :label="scope.row.id">设为加入站点的默认级别</el-radio> -->
            <span :class="scope.$index !== upgradeData.length - 1  ? 'user-rol-table__left' : 'user-rol-table__icon'" @click="dropOperation(scope)" v-if="scope.$index !== upgradeData.length - 1"><i class="iconfont icon-xiangxia table-icon"></i></span>
            <span :class="scope.$index !== upgradeData.length - 1  ? 'user-rol-table__right' : 'user-rol-table__icons'" @click="riseOperation(scope)" v-if="scope.$index !== 0"><i class="iconfont icon-xiangshang table-icon"></i></span>
          </template>
        </el-table-column>
      </el-table>
      <TableContAdd cont="新增" @tableContAddClick="upgradeList"></TableContAdd>
    </div>

    <Card class="footer-btn">
      <el-button
        type="primary"
        :loading="btnLoading"
        size="medium"
        @click="paidNewbtn"
        >提交</el-button
      >
      <el-button
        size="medium"
        :loading="delLoading"
        :disabled="deleteStatus"
        @click="deleteClick"
        >删除</el-button
      >
    </Card>

    <div class="user-rol-table">
      <p>免费用户组</p>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="checkSelectable"
        >
        </el-table-column>

        <el-table-column label="级别名称" width="240">
          <template slot-scope="scope">
            <el-input maxlength="20" v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>

        <el-table-column width="100" label="显示组名">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.id === 7"
              v-model="scope.row.isDisplay"
              active-color="#336699"
              inactive-color="#bbbbbb"
            >
            </el-switch>
          </template>
        </el-table-column>

        <!-- <el-table-column width="100">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.id !== '7' && scope.row.id !== '1'"
              :disabled="addStatus && tableData.length - 1 === scope.$index"
              type="text"
              @click="
                $router.push({
                  path: '/admin/rol-permission',
                  query: {
                    id: scope.row.id,
                    name: scope.row.name,
                    title: '其他设置',
                    names: 'other',
                  },
                })
              "
              >允许购买</el-button
            >
          </template>
        </el-table-column> -->

        <el-table-column>
          <template slot-scope="scope">
            <el-button size="medium" @click="extension(scope.row.id)"
              >邀请</el-button
            >
            <el-button
              v-if="scope.row.id !== 1"
              :disabled="addStatus && tableData.length - 1 === scope.$index"
              type="text"
              @click="
                $router.push({
                  path: '/admin/rol-permission',
                  query: { type: 'normal', id: scope.row.id, name: scope.row.name },
                })
              "
              >设置</el-button
            >
            <el-popover
              width="100"
              placement="top"
              :ref="`popover-${scope.$index}`"
            >
              <p>确定删除该项吗？</p>
              <div style="text-align: right; margin: 10px 0 0 0">
                <el-button
                  type="danger"
                  size="mini"
                  @click="
                    scope._self.$refs[`popover-${scope.$index}`].doClose()
                  "
                >
                  取消
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="
                    singleDelete(scope.$index, scope.row.id);
                    scope._self.$refs[`popover-${scope.$index}`].doClose();
                  "
                  >确定</el-button
                >
              </div>
              <el-button
                slot="reference"
                v-if="
                  scope.row.id !== 1 &&
                  scope.row.id !== 6 &&
                  scope.row.id !== 7 &&
                  scope.row.id !== 10 &&
                  scope.row.default !== 1
                "
                type="text"
                >删除</el-button
              >
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column min-width="115">
          <template slot-scope="scope">
            <el-radio
              v-model="radio"
              @change="radioChange(scope.row, scope.$index)"
              v-if="
                scope.row.id != 1 && scope.row.id !== 6 && scope.row.id !== 7
              "
              :label="scope.row.id"
              >设为加入站点的默认级别</el-radio
            >
          </template>
        </el-table-column>
      </el-table>
      <TableContAdd cont="新增" @tableContAddClick="addList"></TableContAdd>
    </div>

    <Card class="footer-btn">
      <el-button
        type="primary"
        :loading="btnLoading"
        size="medium"
        @click="submitClick"
        >提交</el-button
      >
      <el-button
        size="medium"
        :loading="delLoading"
        :disabled="deleteStatus"
        @click="deleteClick"
        >删除</el-button
      >
    </Card>
  </div>
</template>

<script>
import "../../../../scss/site/module/userStyle.scss";
import userRolCon from "../../../../controllers/site/user/userRol/userRolCon";
export default {
  name: "user-rol-view",
  ...userRolCon,
};
</script>
