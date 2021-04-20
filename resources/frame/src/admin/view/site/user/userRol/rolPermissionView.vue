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
        <Card class="hasSelect">
          <CardRow description="允许发帖插入图片的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertImage"
              @change="changeChecked($event,'insertImage')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入图片</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertImage"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertImage') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertImage')"
            @remove-tag="clearItem($event, 'insertImage')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入视频的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertVideo"
              @change="changeChecked($event,'insertVideo')"
              :disabled="
                videoDisabled ||
                  $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入视频</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertVideo"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertVideo') === -1 || videoDisabled"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertVideo')"
            @remove-tag="clearItem($event, 'insertVideo')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入语音的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertAudio"
              @change="changeChecked($event,'insertAudio')"
              :disabled="
                videoDisabled ||
                  $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入语音</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertAudio"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertAudio') === -1 || videoDisabled"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertAudio')"
            @remove-tag="clearItem($event, 'insertAudio')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入附件的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertAttachment"
              @change="changeChecked($event,'insertAttachment')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入附件</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertAttachment"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertAttachment') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertAttachment')"
            @remove-tag="clearItem($event, 'insertAttachment')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入商品的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertGoods"
              @change="changeChecked($event,'insertGoods')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入商品</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertGoods"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertGoods') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertGoods')"
            @remove-tag="clearItem($event, 'insertGoods')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入付费的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertPay"
              @change="changeChecked($event,'insertPay')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入付费</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertPay"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertPay') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertPay')"
            @remove-tag="clearItem($event, 'insertPay')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入悬赏的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertReward"
              @change="changeChecked($event,'insertReward')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入悬赏</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertReward"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertReward') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertReward')"
            @remove-tag="clearItem($event, 'insertReward')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入红包的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertRedPacket"
              @change="changeChecked($event,'insertRedPacket')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入红包</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertRedPacket"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertRedPacket') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertRedPacket')"
            @remove-tag="clearItem($event, 'insertRedPacket')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="允许发帖插入位置的权限">
            <el-checkbox
              v-model="checked"
              label="switch.insertPosition"
              @change="changeChecked($event,'insertPosition')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >插入位置</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList.insertPosition"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.insertPosition') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'insertPosition')"
            @remove-tag="clearItem($event, 'insertPosition')"
          ></el-cascader>
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
        <Card>
          <CardRow description="发布主题时上传附件的权限">
            <el-checkbox
              v-model="checked"
              label="attachment.create.0"
              :disabled="
                $router.history.current.query.id === '1'
              "
              >上传附件</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="发布主题时上传图片的权限">
            <el-checkbox
              v-model="checked"
              label="attachment.create.1"
              :disabled="
                $router.history.current.query.id === '1'
              "
              >上传图片</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="允许发布付费内容、付费附件">
            <el-checkbox
              v-model="checked"
              label="createThreadPaid"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7' ||
                  wechatPayment
              "
              >发布付费内容</el-checkbox
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
        <Card class="hasSelect">
          <CardRow description="内容分类下内容允许被打赏的权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.canBeReward"
              @change="changeChecked($event,'thread.canBeReward')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7' ||
                  wechatPayment ||
                  !isReward
              "
              >允许被打赏</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.canBeReward']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.canBeReward') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.canBeReward')"
            @remove-tag="clearItem($event, 'thread.canBeReward')"
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
              label="switch.thread.freeViewPosts.1"
              @change="changeChecked($event,'thread.freeViewPosts.1')"
              :disabled="$router.history.current.query.id === '1'"
              >免费查看付费帖子</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.freeViewPosts.1']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.freeViewPosts.1') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.freeViewPosts.1')"
            @remove-tag="clearItem($event, 'thread.freeViewPosts.1')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="免费查看内容分类下的付费视频">
            <el-checkbox
              v-model="checked"
              label="switch.thread.freeViewPosts.2"
              @change="changeChecked($event,'thread.freeViewPosts.2')"
              :disabled="$router.history.current.query.id === '1'"
              >免费查看付费视频</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.freeViewPosts.2']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.freeViewPosts.2') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.freeViewPosts.2')"
            @remove-tag="clearItem($event, 'thread.freeViewPosts.2')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="免费查看内容分类下的付费图片">
            <el-checkbox
              v-model="checked"
              label="switch.thread.freeViewPosts.3"
              @change="changeChecked($event,'thread.freeViewPosts.3')"
              :disabled="$router.history.current.query.id === '1'"
              >免费查看付费图片</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.freeViewPosts.3']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.freeViewPosts.3') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.freeViewPosts.3')"
            @remove-tag="clearItem($event, 'thread.freeViewPosts.3')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="免费查看内容分类下的付费语音">
            <el-checkbox
              v-model="checked"
              label="switch.thread.freeViewPosts.4"
              @change="changeChecked($event,'thread.freeViewPosts.4')"
              :disabled="$router.history.current.query.id === '1'"
              >免费查看付费语音</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.freeViewPosts.4']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.freeViewPosts.4') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.freeViewPosts.4')"
            @remove-tag="clearItem($event, 'thread.freeViewPosts.4')"
          ></el-cascader>
        </Card>
        <Card class="hasSelect">
          <CardRow description="免费查看内容分类下的付费问答">
            <el-checkbox
              v-model="checked"
              label="switch.thread.freeViewPosts.5"
              @change="changeChecked($event,'thread.freeViewPosts.5')"
              :disabled="$router.history.current.query.id === '1'"
              >免费查看付费问答</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.freeViewPosts.5']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.freeViewPosts.5') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.freeViewPosts.5')"
            @remove-tag="clearItem($event, 'thread.freeViewPosts.5')"
          ></el-cascader>
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
        <Card>
          <CardRow description="前台站点管理中按用户组邀请成员的权限">
            <el-checkbox
              v-model="checked"
              label="createInvite"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >邀请加入</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="前台更改成员所属用户组的权限">
            <el-checkbox
              v-model="checked"
              label="user.edit.group"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >编辑用户组</el-checkbox
            >
          </CardRow>
        </Card>
        <Card>
          <CardRow description="前台更改成员禁用状态的权限">
            <el-checkbox
              v-model="checked"
              label="user.edit.status"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >编辑用户状态</el-checkbox
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
          <CardRow description="前台单个回复的编辑权限">
            <el-checkbox
              v-model="checked"
              label="switch.thread.editPosts"
              @change="changeChecked($event,'thread.editPosts')"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >编辑回复</el-checkbox
            >
          </CardRow>
          <el-cascader
            :key="keyValue"
            placeholder="请选择"
            v-model="selectList['thread.editPosts']"
            :options="categoriesList"
            :disabled="checked.indexOf('switch.thread.editPosts') === -1"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              multiple: true,
              checkStrictly: true,
              expandTrigger: 'hover'
            }"
            collapse-tags
            @change="changeCategory($event, 'thread.editPosts')"
            @remove-tag="clearItem($event, 'thread.editPosts')"
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
          <CardRow description="作者编辑自己的主题或回复的权限">
            <el-checkbox
              v-model="checked"
              @change="changeChecked($event,'thread.editOwnThreadOrPost')"
              label="switch.thread.editOwnThreadOrPost"
              :disabled="
                $router.history.current.query.id === '1' ||
                  $router.history.current.query.id === '7'
              "
              >编辑自己的主题或回复</el-checkbox
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
          <el-checkbox
            v-model="isCommission"
            @change="handleScaleChange"
            :disabled="
              $router.history.current.query.id === '1' ||
                $router.history.current.query.id === '7'
            "
            >收入分成</el-checkbox
          >
        </CardRow>
        <CardRow
          description="站点开启付费模式时下线付费加入、主题被打赏、被付费等的分成比例设置，填1表示10%，不填或为0时为不分成"
          class="proportion-box"
          v-if="isSubordinate || isCommission"
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
    <div v-show="activeTab.name === 'pricesetting'">
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
    </div>
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
