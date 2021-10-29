<template>
  <div class="shop-box">
    <Card header="微信小商店"></Card>
    
    <Card header="小商店二维码上传" class="shop-box-img">
      <div>
        <el-upload
          class="avatar-uploader"
          action
          :http-request="uploaderLogo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          @change="handleFile"
          :before-upload="beforeAvatarUpload"
        >
          <div v-if="imageUrl" class="avatar">
            <img
                :src="imageUrl"
                class="avatar-LogoImage"
            />
          </div>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button
          type="text"
          :style="{
          opacity: deleteBtn ? '1' : '0',
          cursor: deleteBtn ? 'pointer' : 'auto'
          }"
          @click="deleteImage"
        >删除</el-button>
      </div>
    </Card>
    
    <Card class="config-cdn-domain config-cdn-shop">
      <span class="config-cdn-domain__name"> appid </span>
      <el-input
        v-model="shopAppId"
        class="elinput"
        style="height: 36px; width: 400px"
        size="small"
      ></el-input>
    </Card>

    <Card class="config-cdn-domain config-cdn-shop">
      <span class="config-cdn-domain__name"> secret key </span>
      <el-input
        v-model="shopSecretKey"
        class="elinput"
        style="height: 36px; width: 400px"
        size="small"
      ></el-input>
    </Card>

    <Card class="config-cdn-address config-shop-address">
      <p class="config-cdn-address__text"> 小店介绍 </p>
      <div class="config-cdn-address__box">
        <el-input
          class="config-cdn-address__input"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="shopTranslate"
        >
        </el-input>
      </div>
    </Card>
    
    <Card class="config-cdn-domain config-shop-radio">
      <span class="config-cdn-domain__name"> 是否打开 </span>
      <el-switch v-model="radioOpen" active-color="#336699" inactive-color="#bbbbbb"></el-switch>
    </Card>

    <Card class="footer-btn" >
      <el-button type="primary" size="medium" @click="parameterSubmit">提交</el-button>
    </Card>
  </div>
</template>

<script>
import '../../../../scss/site/module/globalStyle.scss';
import pyaConfigWxCon from '../../../../controllers/site/global/otherService/otherServiceWechatShopCon';
export default {
    name: "other-service-wechat-shop-view",
  ...pyaConfigWxCon
}
</script>