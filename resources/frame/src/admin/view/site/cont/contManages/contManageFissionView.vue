<template>
  <div class="cont-manage-fission">
    <Card class="cont-manage-min">
      <div class="cont-manage-statistics">
        <div class="cont-manage-statistics__top cont-manage-statistics__active">
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">总分享者</p>
            <p class="cont-manage-statistics__top-text-num">89</p>
          </div>
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">今日净增</p>
            <p class="cont-manage-statistics__top-text-num">50</p>
          </div>
        </div>
        <div class="cont-manage-statistics__top">
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">总阅读者</p>
            <p class="cont-manage-statistics__top-text-num">523</p>
          </div>
          <div class="cont-manage-statistics__top-text">
            <p class="cont-manage-statistics__top-text-title">今日净增</p>
            <p class="cont-manage-statistics__top-text-num">50</p>
          </div>
        </div>
      </div>

      <div class="cont-manage-statistics cont-manage-statistics-right">
        <div class="cont-manage-statistics__top-text">
          <p class="cont-manage-statistics__top-text-title">总分享者</p>
          <p class="cont-manage-statistics__top-text-num">89</p>
        </div>
      </div>
    </Card>
    
    <Card>
      <p class="cont-manage-acctitle">渠道分析:</p>
      <div class="cont-manage-access" ref="fissionEcharts"></div>
      <div class="cont-manage-fication">
        <ul class="cont-manage-fication__station" v-for="(item, index) in stationData" :key="index">
          <li :class="item.name"></li>
          <li class="cont-manage-fication__station-text">站内阅读</li>
          <li class="cont-manage-fication__station-right">30%</li>
        </ul>
      </div>
    </Card>

    <Card class="cont-manage-acctitle">
      <div class="cont-manage-title">
        <span class="cont-manage-title__left">用户分析</span>
        <span class="cont-manage-title__right">每天10:00更新</span>
      </div>
      <div class="cont-manage-analysis">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="排名">
            <template slot-scope="scope">
              <span>{{ scope.row.app_id}}1</span>
            </template>
          </el-table-column>

          <el-table-column label="用户">
            <template slot-scope="scope">
              <span>{{ scope.row.name_en }}1</span>
            </template>
          </el-table-column>

          <el-table-column label="分享次数">
            <template slot-scope="scope">
              <p>{{ scope.row.status === 1  ? '已发布' : '未发布'}}1</p>
            </template>
          </el-table-column>

          <el-table-column label="阅读人数">
            <template slot-scope="scope">
              <p>{{scope.row.type}}1</p>
            </template>
          </el-table-column>

          <el-table-column label="瓜分赏金（元）">
            <template slot-scope="scope">
              <span>{{ scope.row.app_id}}1</span>
            </template>
          </el-table-column>
          
          <el-table-column label="用户层级">
            <template slot-scope="scope">
              <span>{{ scope.row.name_en }}1</span>
            </template>
          </el-table-column>

          <el-table-column label="渠道来源">
            <template slot-scope="scope">
              <span>{{ scope.row.name_en }}1</span>
            </template>
          </el-table-column>

          <el-table-column label="排行榜是否吸显示">
            <template>
              <div>
                <el-switch
                  v-model="fissionOpen"
                  active-color="#336699"
                  inactive-color="#bbbbbb"
                >
                </el-switch>
                是
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Card>
  </div>
</template>

<script>
import "../../../../scss/site/module/contStyle.scss";
import contManageFissionCon from "../../../../controllers/site/cont/contManage/contManageFissionCon";
export default {
    name: "cont-manage-fission-con",
  ...contManageFissionCon
}
</script>