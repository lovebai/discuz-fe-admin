<template>
  <div class="rol-permission-box">
    <!-- 设置权限子菜单 -->
    <div class="index-main-con__main-title__class permission__title">
      <i></i>
      <span
        v-for="(item, index) in menuData"
        :key="index"
        :class="activeTab.name === item.name ? 'is-active' : ''"
        @click="activeTab = item"
        >{{ item.title }}</span
      >
    </div>

    <Card
      :header="$router.history.current.query.name + '--' + activeTab.title"
    ></Card>

    <!-- 操作权限 -->
    <div v-show="activeTab.name === 'userOperate'">
      <div class="user-operate__title">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        ></el-checkbox>
        <p style="margin-left: 10PX;">{{selectText}}</p>
      </div>
      <div class="user-operate">
        <div class="user-operate__header">
          <div class="scope-action">
              生效范围
          </div>
          <Card header="内容发布权限">
          </Card>
        </div>

        <!-- 7帖合一  统一为发帖权限-->
        <Card class="hasSelect">
          <CardRow description="允许发布帖子的权限">
            <el-checkbox
              v-model="checked"
              label="switch.createThread"
              @change="changeChecked($event,'createThread')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >发布帖子</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.createThread"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.createThread') === -1"
            clearable
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'createThread')"
            @remove-tag="clearItem($event, 'createThread')"
          ></el-cascader>
        </Card>
        <Card>
          <CardRow description="允许发帖插入图片的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertImage"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入图片</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入视频的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertVideo"
              :disabled="
                videoDisabled ||
                  $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入视频</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入语音的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertAudio"
              :disabled="
                videoDisabled ||
                  $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入语音</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入附件的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertAttachment"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入附件</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入商品的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertGoods"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入商品</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入付费的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertPay"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入付费</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入悬赏的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertReward"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入悬赏</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入红包的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertRedPacket"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入红包</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入位置的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertPosition"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入位置</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖插入投票的权限">
            <el-checkbox
              v-model="checked"
              label="thread.insertVote"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入投票</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发帖发布匿名的权限">
            <el-checkbox
              v-model="checked"
              label="thread.allowAnonymous"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >允许匿名</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发布私信">
            <el-checkbox
              v-model="checked"
              label="dialog.create"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >发布私信</el-checkbox
            >
          </CardRow>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许在内容分类回复主题的权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.reply"
               @change="changeChecked($event,'thread.reply')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >回复主题</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.reply']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.reply') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.reply')"
            @remove-tag="clearItem($event, 'thread.reply')"
          ></el-cascader>
        </Card>
      </div>
      <div class="user-operate">
        <div class="user-operate__header">
          <div class="scope-action">
              生效范围
          </div>
          <Card header="查看权限"></Card>
        </div>
        <Card class="hasSelect">
          <CardRow description="查看内容分类主题列表的权限">
            <el-checkbox
              v-model="checked"
              label="switch.viewThreads"
              @change="changeChecked($event,'viewThreads')"
              :disabled="$router.history.current.query.id === '1'"
              >查看主题列表</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.viewThreads"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.viewThreads') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'viewThreads')"
            @remove-tag="clearItem($event, 'viewThreads')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="查看内容分类主题详情的权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.viewPosts"
              @change="changeChecked($event,'thread.viewPosts')"
              :disabled="$router.history.current.query.id === '1'"
              >查看主题详情</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.viewPosts']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.viewPosts') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.viewPosts')"
            @remove-tag="clearItem($event, 'thread.viewPosts')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="免费查看内容分类下的付费帖子">
            <el-checkbox
              v-model="checked"
              label="switch.thread.freeViewPosts"
              @change="changeChecked($event,'thread.freeViewPosts')"
              :disabled="$router.history.current.query.id === '1'"
              >免费查看付费帖子</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.freeViewPosts']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.freeViewPosts') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.freeViewPosts')"
            @remove-tag="clearItem($event, 'thread.freeViewPosts')"
          ></el-cascader>
        </Card>
        <Card>
          <CardRow description="查看帖子内上传的视频">
            <el-checkbox
              v-model="checked"
              label="thread.viewVideo"
              :disabled="
                $router.history.current.query.id === '1'
              "
              >查看视频</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="查看帖子内上传的附件">
            <el-checkbox
              v-model="checked"
              label="thread.viewAttachment"
              :disabled="
                $router.history.current.query.id === '1'
              "
              >查看附件</el-checkbox
            >
          </CardRow>
        </Card>
         <Card>
          <CardRow description="下载帖子内上传的附件">
            <el-checkbox
              v-model="checked"
              label="thread.downloadAttachment"
              :disabled="
                $router.history.current.query.id === '1'
              "
              >下载附件</el-checkbox
            >
          </CardRow>
        </Card>
      </div>
      <div class="user-operate">
        <div class="user-operate__header">
          <div class="scope-action">
              生效范围
          </div>
          <Card header="管理权限"></Card>
        </div>
        <Card>
          <CardRow description="前台置顶、取消置顶主题的权限">
            <el-checkbox
              v-model="checked"
              label="thread.sticky"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >置顶</el-checkbox
            >
          </CardRow>
        </Card>
        <Card class="hasSelect">
          <CardRow description="前台精华、取消精华主题的权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.essence"
              @change="changeChecked($event,'thread.essence')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >加精</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.essence']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.essence') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.essence')"
            @remove-tag="clearItem($event, 'thread.essence')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="前台单个主题的编辑权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.edit"
              @change="changeChecked($event,'thread.edit')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >编辑主题</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.edit']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.edit') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.edit')"
            @remove-tag="clearItem($event, 'thread.edit')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="前台删除单个主题的权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.hide"
              @change="changeChecked($event,'thread.hide')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >删除主题</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.hide']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.hide') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.hide')"
            @remove-tag="clearItem($event, 'thread.hide')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="前台删除单个回复的权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.hidePosts"
              @change="changeChecked($event,'thread.hidePosts')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >删除回复</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.hidePosts']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.hidePosts') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.hidePosts')"
            @remove-tag="clearItem($event, 'thread.hidePosts')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="作者编辑自己的主题的权限">
            <el-checkbox
              v-model="checked"
              @change="changeChecked($event,'thread.editOwnThreadOrPost')"
              label="switch.thread.editOwnThreadOrPost"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >编辑自己的主题</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.editOwnThreadOrPost']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.editOwnThreadOrPost') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.editOwnThreadOrPost')"
            @remove-tag="clearItem($event, 'thread.editOwnThreadOrPost')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="作者删除自己的主题或回复的权限">
            <el-checkbox
              v-model="checked"
              @change="changeChecked($event,'thread.hideOwnThreadOrPost')"
              label="switch.thread.hideOwnThreadOrPost"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >删除自己的主题或回复</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.hideOwnThreadOrPost']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.hideOwnThreadOrPost') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.hideOwnThreadOrPost')"
            @remove-tag="clearItem($event, 'thread.hideOwnThreadOrPost')"
          ></el-cascader>
        </Card>
      </div>
    </div>
    <!-- 安全设置 -->
    <div v-show="activeTab.name === 'security'">
      <Card>
        <CardRow description="启用验证码需先在腾讯云设置中开启验证码服务">
          <el-checkbox
            v-model="checked"
            label="createThreadWithCaptcha"
            :disabled="
              captchaDisabled ||
                $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7'
            "
            >发布内容时启用验证码</el-checkbox
          >
        </CardRow>
      </Card>

      <Card>
        <CardRow description="实名认证后才可发布内容">
          <el-checkbox
            v-model="checked"
            label="publishNeedRealName"
            :disabled="
              realNameDisabled ||
                $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7'
            "
            >发布内容需先实名认证</el-checkbox
          >
        </CardRow>
      </Card>

      <Card>
        <CardRow description="绑定手机后才可发布内容">
          <el-checkbox
            v-model="checked"
            label="publishNeedBindPhone"
            :disabled="
              bindPhoneDisabled ||
                $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7'
            "
            >发布内容需先绑定手机</el-checkbox
          >
        </CardRow>
      </Card>
      
      <Card>
        <CardRow description="绑定微信后才可发布内容">
          <el-checkbox
            v-model="checked"
            label="publishNeedBindWechat"
            :disabled="
              postDisabled ||
                $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7'
            "
            >发布内容需先绑定微信</el-checkbox
          >
        </CardRow>
      </Card>
    </div>
    <!-- 默认权限 -->
    <div v-show="activeTab.name === 'default'">
      <Card>
        <CardRow description>
          <p style="margin-left: 24PX">站点信息</p>
        </CardRow>
      </Card>

      <Card>
        <CardRow description>
          <p style="margin-left: 24PX">主题点赞</p>
        </CardRow>
      </Card>

      <Card>
        <CardRow description>
          <p style="margin-left: 24PX">主题收藏</p>
        </CardRow>
      </Card>

      <Card>
        <CardRow description>
          <p style="margin-left: 24PX">主题打赏</p>
        </CardRow>
      </Card>
    </div>
    <!-- 其他权限 -->
    <div v-show="activeTab.name === 'other'">
      <Card header="裂变推广：">
        <CardRow
          description="允许用户裂变推广以及通过推广注册进来的用户收入是否能分成"
        >
          <el-checkbox
            v-model="isSubordinate"
            @change="handlePromotionChange"
            :disabled="
              $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7'
            "
            >裂变推广</el-checkbox
          >
        </CardRow>
        <CardRow
          description="站点开启付费模式时下线付费加入、主题被打赏、被付费等的分成比例设置，填1表示10%，不填或为0时为不分成"
          class="proportion-box"
          v-if="isSubordinate"
        >
          <div>
            <span>提成比例</span>
            <el-input
              class
              type="number"
              v-model="scale"
              @blur="checkNum"
            ></el-input>
          </div>
        </CardRow>
      </Card>
    </div>
    <!-- 价格设置 -->
    <!-- <div v-show="activeTab.name === 'pricesetting'">
      <Card header="允许购买：">
        <CardRow description="允许购买" class="allow-box">
          <el-switch
            :disabled="
              $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7' ||
                !allowtobuy ||
                defaultuser
            "
            v-model="value"
            @change="fun"
            active-color="#336699"
            inactive-color="#bbbbbb"
          >
          </el-switch>
        </CardRow>
      </Card>
      <Card header="购买价格（元）：" v-if="value">
        <CardRow description="需支付的金额">
          <el-input
            placeholder="加入价格"
            type="number"
            v-model="purchasePrice"
            @input="addprice"
          ></el-input>
        </CardRow>
      </Card>
      <Card header="到期时间：" v-if="value">
        <CardRow description="到期时间，可维持的时间">
          加入起
          <el-input
            class="elinput"
            style="height: 36PX;width: 80PX"
            clearable
            placeholder="天数"
            type="number"
            @input="duedata"
            v-model="dyedate"
          ></el-input>
          天后
        </CardRow>
      </Card>
    </div> -->
    <Card class="footer-btn" :class="activeTab.name === 'userOperate' ? 'footer-btn__inner': ''">
      <el-button size="medium" type="primary" @click="submitClick"
        >提交</el-button
      >
    </Card>
  </div>
</template>

<script>
import "../../../../scss/site/module/userStyle.scss";
import rolPermissionCon from "../../../../controllers/site/user/userRol/rolPermissionCon";
// import '../../../scss/site/module/contStyle.scss';
export default {
  name: "user-permission-view",
  ...rolPermissionCon
  // ...contClassConfigure,
};
</script>