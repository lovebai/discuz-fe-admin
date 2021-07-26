/**
 * 接口配置文件
 */

module.exports = {
  // v3新接口
  settings_post_v3: '/backAdmin/settings.create', // 全局-站点设置
  permission_get_v3: '/backAdmin/groups.resource', // 用户组权限获取
  permission_update_v3: '/backAdmin/permission.update', // 用户组权限修改

  // 首页
  siteinfo_get_v3: '/backAdmin/siteinfo', // 站点信息
  firstChart_get_v3: '/backAdmin/statistic/firstChart', // 数据看板
  cache_delete_get_v3:'/backAdmin/cache.delete', // 清除缓存
  checkQcloud_get_v3: '/backAdmin/checkQcloud', // 判断腾讯云云api是否配置

  // 财务
  walletLogs_get_v3: '/backAdmin/users.wallet.logs', // 资金明细
  orderLogs_get_v3: '/backAdmin/users.order.logs', // 订单记录
  cashLogs_get_v3: '/backAdmin/users.cash.logs', // 提现管理
  cashReview_post_v3: '/backAdmin/wallet.cash.review', // 审核拒绝/标记打款
  finance_get_v3: '/backAdmin/statistic.finance', // 获取资金概况
  financeChart_get_v3: 'backAdmin/statistic.financeChart', // 获取盈利图表数据


  //全局
  settings_get_v3: '/backAdmin/settings',
  signinfields_get_v3: '/backAdmin/signinfields', // 注册扩展信息字段配置
  settings_logo_post_v3: '/backAdmin/settings/logo', // 上传站点logo
  delete_logo_post_v3: '/backAdmin/settings/delete.logo', // 删除站点logo
  signinfields_post_v3: '/backAdmin/signinfields', // 编辑注冊扩展列表

  stopwords_batch_v3: '/backAdmin/stopwords.batch', // 创建/修改敏感词接口(批量)
  stopwords_get_v3: '/backAdmin/stopwords.list', // 查询敏感词(列表) 
  stopwords_delete_v3: '/backAdmin/stopwords.delete', // 删除敏感词(单个/批量)
  stopwords_export_v3: '/backAdmin/stopWords/export', // 导出敏感词

  forum_get_v3: '/backAdmin/forum',
  notices_get_v3: '/backAdmin/notification/tpl', // 通知模板列表
  notices_detail_get_v3: '/backAdmin/notification/tpl/detail', // 通知模板编辑列表
  notices_update_post_v3: '/backAdmin/notification/tpl/update', // 编辑通知模板

  sequence_get_v3: '/backAdmin/sequence', //获取智能排序
  sequence_post_v3: '/backAdmin/sequence', //修改智能排序
  recommend_topics_get_v3: '/backAdmin/recommend.topics', //推荐话题
  recommend_users_post_v3: '/backAdmin/recommend.users', //推荐用户

  // 内容
  categories_get_v3: '/backAdmin/categories', // 分类列表
  categories_create_v3: '/backAdmin/categories.create', // 创建内容分类(批量)
  categories_update_v3: '/backAdmin/categories.update', // 修改内容分类(批量)
  categories_delete_v3: '/backAdmin/categories.delete', // 删除内容分类(批量)

  reports_get_v3: '/backAdmin/reports', // 举报反馈列表
  reports_update_v3: '/backAdmin/reports/batch', // 批量修改举报反馈
  reports_delete_v3: '/backAdmin/reports/delete', // 批量删除举报反馈

  thread_get_v3: '/backAdmin/manage.thread.list', // 主题
  posts_get_v3: '/backAdmin/manage.posts.list', // 回复
  submit_review_post_v3: '/backAdmin/manage.submit.review', // 内容审核 主题审核
  threads_batch_post_v3: '/backAdmin/threads.batch',  // 修改主题

  topics_list_get_v3: '/backAdmin/topics.list',  // 话题管理列表
  topic_delete_post_v3: '/backAdmin/topics.batch.delete', // 删除话题
  topics_update_post_v3: '/backAdmin/topics.batch.update', // 话题修改

  thread_list_get_v3: '/backAdmin/manage.thread.list', // 主题列表接口
  posts_list_get_v3: '/backAdmin/manage.posts.list', // 回复列表
  check_posts_list_post_v3: '/backAdmin/check.posts.list', // 回复审核
  categories_list_get_v3: '/backAdmin/categories', // 分类列表

  // 用户
  users_update_post_v3: '/backAdmin/users/update.user',  // 用户资料修改
  users_avatar_post_v3: '/backAdmin/users/avatar', // 上传用户头像
  delete_avatar_post_v3: '/backAdmin/delete/users/avatar', // 删除用户头像
  export_users_post_v3: '/backAdmin/export/users', // 用户信息导出
  groups_list_get_v3: '/backAdmin/groups.list', // 用户组列表
  groups_create_post_v3: '/backAdmin/groups.create', // 创建用户组
  groups_batchupdate_post_v3: '/backAdmin/groups.batchupdate', // 用户组修改（批）
  groups_batchdelete_post_v3: '/backAdmin/groups.batchdelete', // 删除用户组 (批)
  user_wallet_post_v3: '/backAdmin/user.wallet',  // 用户钱包列表
  update_wallet_post_v3: '/backAdmin/update.user.wallet', // 更改用户钱包
  user_list_get_v3: '/backAdmin/users', // 用户筛选
  user_get_v3: '/backAdmin/user', // 获取用户信息
  user_signinfields_get_v3: '/backAdmin/user/signinfields', // 用户扩展信息查询
  users_examine_post_v3: '/backAdmin/users/examine', // 用户批量审核
  invite_link_v3: '/backAdmin/adminInvite.link.create', // 邀请链接
  // 登录
  login_post_v3: '/backAdmin/login', // 登录
  refresh_token_post_v3: '/backAdmin/refresh.token', // 刷新token

  emoji_list_get_v3: '/backAdmin/emoji.list', // 刷新token
};
