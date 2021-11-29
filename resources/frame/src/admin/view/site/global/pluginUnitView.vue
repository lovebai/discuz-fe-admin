<template>
  <div class="plugin-unit">
    <Card>
      <p class="plugin-unit-file"><a href="https://developer.discuz.chat/#/plugin/start" target="_blank">插件文档</a></p>
      <el-upload
        class="upload-demo"
        action
        :http-request="uploaderPlugin"
        :on-change="handleChange"
        :before-upload="beforePluginUpload">
        <el-button size="small" type="primary">上传插件</el-button>
      </el-upload>
      <!-- <el-button type="primary" size="medium" @click="determineBtn('upload', '')"
        >上传插件</el-button> -->
    </Card>
    <Card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID">
          <template slot-scope="scope">
            <span>{{ scope.row.app_id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="英文/中文">
          <template slot-scope="scope">
            <span>{{ scope.row.name_en }}</span>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <p>{{ scope.row.status === 1  ? '已发布' : '未发布'}}</p>
          </template>
        </el-table-column>

        <el-table-column label="类型">
          <template slot-scope="scope">
            <p>{{ typeConversion(scope.row.type) }}</p>
          </template>
        </el-table-column>

        <!-- <el-table-column label="所属权限">
          <template slot-scope="scope">
            <p>{{ scope.row.name_en }}</p>
          </template>
        </el-table-column> -->

        <el-table-column label="操作"  class="plugin-unit-post">
          <template slot-scope="scope">
            <div class="plugin-unit-post__box">
              <span class="plugin-unit-post__box-text" v-if="scope.row.status === 0" @click="plugInRelease(scope.row.app_id, 1)">发布</span>
              <span class="plugin-unit-post__box-text" v-if="scope.row.status === 1" @click="plugInRelease(scope.row.app_id, 2)">下线</span>
              <span class="plugin-unit-post__box-text" @click="determineBtn('details', scope)">设置</span>
              <span class="plugin-unit-post__box-detal" @click="plugInRelease(scope.row.app_id, 3)">删除</span>
              <!-- <span class="plugin-unit-post__box-text">编辑</span> -->
            </div>
          </template>
        </el-table-column>
        <el-dialog
          title="设置"
          :visible.sync="dialogVisible"
          width="55%"
          height="50%"
          :append-to-body="true"
          :lock-scroll="false"
          class="plugin-unit-post__box-dialog"
          >
            <div class="plugin-unit-post__box-upload">
              <div class="plugin-unit-post__box-upload-name" v-for="(item, index) in settingData" :key="index">
                <p :class="item.type === 1 ? 'plugin-unit-post__box-upload-name__textarea' : 'plugin-unit-post__box-upload-name__left'">
                  {{item.field_name}}
                </p>
                <div class="plugin-unit-post__box-upload-name__right">
                  <el-input
                    v-if="item.type === 0"
                    class="elinput"
                    size="small"
                    maxlength="10"
                    :placeholder="item.field_placeholder"
                    @input="downloadsNumInput"
                  ></el-input>

                  <el-input
                    v-if="item.type === 1"
                    type="textarea"
                    :rows="2"
                    :placeholder="item.field_placeholder">
                  </el-input>

                  <el-radio-group v-model="radio" v-if="item.type === 2">
                    <el-radio :label="3">备选项</el-radio>
                    <el-radio :label="6">备选项</el-radio>
                    <el-radio :label="9">备选项</el-radio>
                  </el-radio-group>
                  
                  <el-checkbox-group v-model="checkList" v-if="item.type === 3">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="禁用"></el-checkbox>
                    <el-checkbox label="选中且禁用"></el-checkbox>
                  </el-checkbox-group>
                  
                  <div v-if="item.type === 4">
                    <el-upload
                      class="upload-demo"
                      action
                      :http-request="uploaderEnclosure"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      list-type="picture">
                      <el-button size="small" type="primary">图片上传</el-button>
                    </el-upload>
                  </div>
                  
                  <div v-if="item.type === 5">
                    <el-upload
                      class="upload-demo"
                      action
                      :http-request="uploaderImg"
                      :on-preview="uploaderPreview"
                      :on-remove="uploaderRemove"
                      :file-list="enclosureList">
                      <el-button size="small" type="primary">附件上传</el-button>
                    </el-upload>
                  </div>

                  <div class="plugin-unit-post__box-upload-name__right-import" v-if="item.type === 6">
                    <Card class="content-import-text">
                      <div class="content-import-source">
                        <!-- <span class="content-import-source__title">来源</span> -->
                        <el-select class="content-import-source__option" v-model="contentSourceValue" placeholder="选择内容来源" clearable @change="contentSourceChange">
                          <el-option class="content-import-source__option-selected" v-for="(item, index) in contentSource" :key="index" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                      </div>
                    </Card>

                    <div v-if="contentSourceTip" class="content-import">{{contentSourceTip}}</div>
                    <!-- <div v-if="contentSourceValue === 'xingqiu'" class="content-import">仅支持导入已加入的星球内容，多次导入同一话题会导致数据重复，需要站长手动清理</div> -->

                    <Card v-if="contentSourceValue === 'xingqiu'">
                      <div class="content-import-planet">
                        <p class="content-import-planet__left">Cookie</p>
                        <el-input v-model="planetCookie"></el-input>
                        <a href="https://discuz.com/manual-admin/2.html#_2-10-2-知识星球cookie和user-agent" target="_blank" class="content-import-planet__right"><i class="el-icon-question"></i></a>
                      </div>
                    </Card>
                    
                    <Card v-if="contentSourceValue === 'xingqiu'">
                      <div class="content-import-planet">
                        <p class="content-import-planet__left">User-Agent</p>
                        <el-input v-model="planetUserAgent"></el-input>
                        <a href="https://discuz.com/manual-admin/2.html#_2-10-2-知识星球cookie和user-agent" target="_blank" class="content-import-planet__right"><i class="el-icon-question"></i></a>
                      </div>
                    </Card>

                    <Card v-if="contentSourceType === 0">
                      <div class="content-import-search">
                        <el-input v-model="topicContent" placeholder='搜索想要导入站点的话题'></el-input>
                      </div>
                    </Card>

                    <Card  v-if="contentSourceType === 7">
                      <div class="content-import-official" v-for="(item, index) in officialAccountLink" :key="index">
                        <el-input v-model="item.linkData" placeholder="输入想要导入公众号文章链接"></el-input>
                        <div class="content-import-official__btn">
                          <span class="content-import-official__btn-iconleft" v-if="index === officialAccountLink.length - 1" @click="increaseLink">
                            <i class="el-icon-circle-plus-outline"></i>
                          </span>
                          <span class="content-import-official__btn-iconright" v-if="officialAccountLink.length !== 1" @click="deleteLink(index)">
                            <i class="el-icon-remove-outline"></i>
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card class="content-import-layer" v-if="contentSourceValue !== 'wechat'">
                      <CardRow description="一次最多导入1000条">
                        <div class="content-import-num">
                          <p class="content-import-num__topic">导入条数</p>
                          <el-input type="number" v-model="topicNum" @input="topicNumInput"></el-input>
                        </div>
                      </CardRow>
                    </Card>

                    <!-- <Card class="footer-btn" >
                      <el-button type="primary" size="medium" @click="importContentBtn">提交</el-button>
                    </Card> -->

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
                  </div>

                  <el-switch
                    v-if="item.type === 8"
                    active-color="#336699"
                    inactive-color="#bbbbbb"
                  >
                  </el-switch>
                </div>
              </div>
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