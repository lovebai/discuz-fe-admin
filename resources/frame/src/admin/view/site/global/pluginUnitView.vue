<template>
  <div class="plugin-unit">
    <Card>
      <el-button type="primary" size="medium" @click="determineBtn"
        >上传插件</el-button
      >
    </Card>
    <Card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="级别"  width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="名称">
          <template slot-scope="scope">
            <p>{{ scope.row.address }}</p>
          </template>
        </el-table-column>

        <el-table-column label="状态"  width="100">
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

        <el-table-column label="操作"  class="plugin-unit-post">
          <template>
            <div class="plugin-unit-post__box">
              <span class="plugin-unit-post__box-text" @click="detailsClick">查看详情</span>
              <span class="plugin-unit-post__box-text">发布</span>
              <span class="plugin-unit-post__box-detal">删除</span>
              <span class="plugin-unit-post__box-text">编辑</span>
            </div>
          </template>
        </el-table-column>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%"
          height="40%"
          :append-to-body="true"
          :lock-scroll="false"
          class="plugin-unit-post__box-dialog"
          >
            <div class="plugin-unit-post__box-upload">
              <p class="plugin-unit-post__box-upload-name">
                <span class="plugin-unit-post__box-upload-name__left">插件名称:</span>
                <el-input
                  class="plugin-unit-post__box-upload-name__right"
                  style="height: 36PX;width: 200PX"
                  size="small"
                ></el-input>
              </p>
              <p class="plugin-unit-post__box-upload-file">
                <span class="plugin-unit-post__box-upload-file__left">插件上传:</span>
                <el-upload
                  class="upload-demo"
                  action
                  :http-request="uploaderPlugin"
                  :on-change="handleChange"
                  :before-upload="beforePluginUpload"
                  :file-list="fileList">
                  <el-button size="small" type="primary">选择图片</el-button>
                </el-upload>
              </p>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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