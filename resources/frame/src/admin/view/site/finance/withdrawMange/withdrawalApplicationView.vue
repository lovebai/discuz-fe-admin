<template>
    <div class="withdrawal-application-box">
      <!-- 提现申请 搜索条件 -->
      <div class="withdrawal-application__search-box">
        <div class="withdrawal-application__search-condition">
          <span class="withdrawal-application__search-condition__title">流水号：</span>
          <el-input v-model="cashSn" clearable placeholder="搜索流水号"></el-input>
        </div>

        <div class="withdrawal-application__search-condition">
          <span class="withdrawal-application__search-condition__title">申请时间：</span>
          <el-date-picker
            v-model="applicationTime"
            clearable
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="handleTimeChange"
          >
          </el-date-picker>
        </div>

        <div class="withdrawal-application__search-condition">
          <span class="withdrawal-application__search-condition__title">操作用户：</span>
          <el-input v-model="operationUser" clearable placeholder="搜索操作用户"></el-input>
        </div>

        <div class="withdrawal-application__search-condition">
          <span class="withdrawal-application__search-condition__title">状态：</span>
          <el-select v-model="statusSelect" placeholder="请选择" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="withdrawal-application__search-condition">
          <el-button  type="primary" size="medium" @click="searchClick">搜索</el-button>
        </div>
      </div>
      <!-- 提现申请 列表 -->
      <div class="withdrawal-application-table">
        <el-table
          :data="tableData"
          style="width: 100%">

          <el-table-column
            prop="cashSn"
            label="流水号"
            min-width="160">
          </el-table-column>

          <el-table-column
            prop="nickname"
            label="操作用户"
            width="110">
          </el-table-column>
          
          <el-table-column
            :prop="cashType == 1 ? '微信零钱' : '人工打款'"
            label="提现方式"
            width="110">
            <template slot-scope="scope">{{scope.row.cashType == 1 ? type1 : type2}}</template>
          </el-table-column>

          <el-table-column
            prop="cashApplyAmount"
            label="提现金额（元）"
            width="110">
          </el-table-column>
          
          <el-table-column
            label="收款账号"
            width="210">
             <template slot-scope="scope">{{accountNumber(scope.row)}}</template>
          </el-table-column>

          <el-table-column
            label="申请时间"
            min-width="160">
            <template slot-scope="scope">{{formatDate(scope.row.createdAt)}}</template>
          </el-table-column>

          <el-table-column
            label="状态"
            show-overflow-tooltip>
            <template slot-scope="scope">{{cashStatus(scope.row.cashStatus,scope.row)}}</template>
          </el-table-column>

          <el-table-column
            label="操作"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <div v-if="scope.row.cashStatus === 1">
                <el-popover
                  width="100"
                  placement="top"
                  :ref="`popover-${scope.$index}`">
                  <p>确定通过该提现吗？</p>
                  <div style="text-align: right; margin: 10PX 0 0 0 ">
                    <el-button type="danger" size="mini" @click="noReviewClick(scope.row.id);scope._self.$refs[`popover-${scope.$index}`].doClose()">
                      不通过
                    </el-button>
                    <el-button type="primary" size="mini" @click="reviewClick(scope.row.id);scope._self.$refs[`popover-${scope.$index}`].doClose()" >通过</el-button>
                  </div>
                  <el-button type="text" size="small" slot="reference">审核</el-button>
                </el-popover>
              </div>
              <p v-else>{{auditstatus(scope.row.cashStatus)}}</p>
            </template>
          </el-table-column>

        </el-table>
        <!-- 提现申请 分页 -->
        <Page
          v-if="pageCount > 1"
          @current-change="handleCurrentChange"
          :current-page="currentPaga"
          :page-size="10"
          :total="total">
        </Page>

      </div>

    </div>
</template>

<script>
import '../../../../scss/site/module/financeStyle.scss';
import withdrawalApplicationCon from '../../../../controllers/site/finance/withdrawMange/withdrawalApplicationCon';
export default {
    name: "withdrawal-application-view",
  ...withdrawalApplicationCon
}
</script>
