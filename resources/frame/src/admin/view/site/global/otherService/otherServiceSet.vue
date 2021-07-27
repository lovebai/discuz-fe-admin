<template>
  <div class="other-service-set-box">
    <div class="other-service-set__default">
      <el-table
        :data="settingStatus"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="其他服务设置"
        >
          <template slot-scope="scope">
            <div class="pother-service-set-import" v-if="scope.row.type === 'import'">
              <div class="pother-service_import-icon">
                <el-image
                  style="width: 40px; height: 40px; background: #0054A5; border-radius: 50%;"
                  src="../../static/images/import.svg"
                  :fit="fit">
                </el-image>
              </div>
              <div class="table-con-box">
                <p>{{scope.row.name }}</p>
                <p><span v-html="scope.row.description"></span></p>
              </div>
            </div>
            <div class="pother-service-set-type-box" v-if="scope.row.type === 'lbs_close'">
              <i class="iconfont iconweizhi1 table-icon" ></i>
              <div class="table-con-box">
                <p>{{scope.row.name }}</p>
                <p><span v-html="scope.row.description"></span></p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status" class="iconfont iconicon_select" ></span>
            <span v-else class="iconfont iconicon_"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.type === 'lbs_close'">
              <el-button
                size="mini"
                @click="configClick(scope.row.tag)"
              >配置</el-button>
              <el-button
                v-if="scope.row.status"
                size="mini"
                @click.native.prevent="statusSetting(false)"
              >关闭</el-button>
              <el-button
                v-else
                size="mini"
                @click.native.prevent="statusSetting(true)"
              >开启</el-button>
            </div>

            <div v-else>
              <el-button
                size="mini"
                @click="importClick()"
              >配置</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import otherServiceSetCon from '../../../../controllers/site/global/otherService/otherServiceSetCon';
import '../../../../scss/site/module/globalStyle.scss';
export default {
    name: "other-service-set-view",
  ...otherServiceSetCon
}
</script>
