<template>
  <div>
    <Card>
      <el-button type="primary" size="medium" @click="determineBtn"
        >上传插件</el-button
      >
    </Card>
    <Card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="级别">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="名称">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>

        <el-table-column label="类型">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>

        <el-table-column label="所属权限">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>
      </el-table>
    </Card>
  </div>
</template>

<script>
import "../../../scss/site/module/globalStyle.scss";
import otherServiceContentCon from "../../../controllers/site/global/pluginUnitCon";
export default {
  name: "other-service-content",
  ...otherServiceContentCon,
};
</script>