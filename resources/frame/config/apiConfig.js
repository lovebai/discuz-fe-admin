/**
 * 接口配置文件
 */

module.exports = {
  register: "/register", //用户名注册
  login: "/login", //用户名登录
  users: "/users", //用户信息
  sendSms: "/sms/send", //发送验证码
  smsVerify: "/sms/verify", //短信验证
  wechat: "/oauth/wechat/user", //微信接口
  authority: "/groups", //权限列表
  wxPcLogin: "/oauth/wechat/pc/user", // 微信登录列表
  signInFields: "/admin/signinfields",  // 注册扩展信息字段配置
  userSigninfields: "/user/signinfields", // 用户信息展示扩展字段信息

  categories: "/categories", //分类列表
  categoriesDelete: "/categories", //分类单个删除
  categoriesBatchDelete: "/categories/batch", //分类批量删除
  createCategories: "/categories", //创建分类
  createBatchCategories: "/categories/batch", //批量创建分类
  categoriesBatchUpdate: "/categories/batch", //批量修改分类

  emojis: "/emoji", //表情接口
  attachment: "/attachments", //上传附件、图片
  threads: "/threads", //主题
  shareThreads: "/threads/share",
  notice: "/notification", //通知列表(回复,点赞,打赏)
  wallet: "/wallet/user/", //查看用户钱包
  reflect: "/wallet/cash", //提现记录列表
  review: "/wallet/cash/review", //提现审核
  circleInfo: "/circleInfo", //站点信息
  themeNavListCon: "/themeNavListCon", //主题列表
  walletFrozen: "/wallet/log", //冻结金额
  orderList: "/orders", //订单明细,打赏支付
  orderPay: "/trade/pay/order", //订单支付
  order: "/orders", //订单支付
  walletDetails: "/wallet/log", //钱包明细
  updateWallet: "/wallet/user/", //更新用户钱包
  cash: "/wallet/cash", //提现
  collection: "/favorites", //我的收藏
  // 'changePassword':'api/users/',     //修改密码
  noticeList: "/notificationUnread", //通知列表未读信息
  // 'searchUser':'/users',             //用户搜索
  searchThreads: "/threads", //搜索
  notice: "/notification",
  posts: "/posts", //回复审核修改-单条
  postsBatch: "/posts/batch", //回复主题修改-批量

  // 'getCircle': '/circle/getCircle',  //获取circle信息

  pay: "/trade/pay/order", //支付订单\
  verifyPayPwd: "/users/pay-password/reset", //验证支付密码

  threadsBatch: "/threads/batch", //修改主题接口(批量)
  upload: "/users/", //上传头像(原接口是'/users/{id}/avatar')
  invite: "/invite", //创建邀请码
  groups: "/groups", //获取所有操作类型、获取所有用户角色
  groupPermission: "/permission", //修改用户组权限
  setPermission: "/permission/group", //设置权限的用户组
  deleteNotification: "/notification", //删除通知里的回复我的
  wechatDelete: "/users/", //修改资料里的解绑微信
  wechatBind: "/oauth/wechat/user", //去绑定微信
  postBatch: "/posts/batch", //删除回复接口[批量]
  threadVideo: "/thread/video", // 创建主题视频接口

  access: "/refresh-token", //刷新token
  follow: "/follow", //关注
  realName: "/users/real", //实名认证
  signature: "/signature", //视频签名
  weChatShare: "/offiaccount/jssdk", //微信分享

  /*后台*/
  siteinfo: "/siteinfo", //首页-系统信息
  settings: "/settings", //设置接口
  forum: "/forum", //获取前台配置接口
  batchSubmit: "/stop-words/batch", //创建敏感词接口[批量]
  serachWords: "/stop-words", //查询敏感词接口[列表]
  exportWords: "/stop-words/export", //导出敏感词
  logo: "/settings/logo", //上传站点logo
  siteinfo: "/siteinfo", //站点基本信息
  deleteWords: "/stop-words/", //删除敏感词
  deleteAvatar: "/users", //删除用户头像
  exportUser: "/export/users?", //用户信息导出
  statistic: "/statistic/finance", //获取资金概况
  statisticChart: "/statistic/financeChart", //获取盈利图表数据
  statisticPanel: "/statistic/firstChart", //首页数据看板数据
  noticeList: "/notification/tpl", //通知设置列表
  notification: "/notification/tpl/", //修改系统消息模版[通知设置]
  noticeConfigure: "/notification/tpl/", //通知配置列表,
  noticeDetail:"/notification/tpl/detail", // 通知
  sequence:"/sequence", // 智能排序数据
  randomUsers:"/random/users", // 推荐用户
  randomTopics:"/random/topics", // 推荐话题
  adminactionlog: "/adminactionlog", // 操作日志
  switchskin: "/switchskin", // 皮肤切换

  wxPcUrl: "/oauth/wechat/web/user", //获取微信pcUrl
  wxLoginStatus: "/oauth/wechat/web/user/serach", //获取微信扫码用户状态
  topics: "/topics", //话题管理列表
  deleteTopics:'/topics/batch',//删除话题

  reports: '/reports', //举报列表
  reportsBatch: '/reports/batch', //删除举报
  clearCache: '/cache', // 缓存相关
  checkQcloud: '/checkQcloud', // 判断腾讯云云api是否配置

  // v3新接口
  settings_post_v3: '/backAdmin/settings.create', // 全局-站点设置
  permission_get_v3: '/backAdmin/groups.resource', // 用户组权限获取
  permission_update_v3: '/backAdmin/permission.update', // 用户组权限修改

  // 首页
  siteinfo_get_v3: '/backAdmin/siteinfo', // 站点信息
  firstChart_get_v3: '/backAdmin/statistic/firstChart', // 数据看板

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

  stopwords_batch_v3: '/backAdmin/stopwords.batch', // 创建/修改敏感词接口(批量)
  stopwords_get_v3: '/backAdmin/stopwords.list', // 查询敏感词(列表) 
  stopwords_delete_v3: '/backAdmin/stopwords.delete', // 删除敏感词(单个/批量)


  // 内容
  categories_get_v3: '/backAdmin/categories', // 分类列表
  categories_create_v3: '/backAdmin/categories.create', // 创建内容分类(批量)
  categories_update_v3: '/backAdmin/categories.update', // 修改内容分类(批量)
  categories_delete_v3: '/backAdmin/categories.delete', // 删除内容分类(批量)

  reports_get_v3: '/backAdmin/reports', // 举报反馈列表
  reports_update_v3: '/backAdmin/reports/batch', // 批量修改举报反馈
  reports_delete_v3: '/backAdmin/reports/delete', // 批量删除举报反馈

  thread_get_v3: '/backAdmin/check.thread.list', // 主题回收站
  posts_get_v3: '/backAdmin/check.posts.list', // 回复回收站
  check_sub_post_v3: '/backAdmin/check.sub', // 内容审核 主题审核
  threads_batch_post_v3: '/backAdmin/threads.batch',  // 修改主题

  topics_list_get_v3: '/backAdmin/topics.list',  // 话题管理列表
  topic_delete_post_v3: '/backAdmin/topics.batch.delete', // 删除话题
  topics_update_post_v3: '/backAdmin/topics.batch.update', // 话题修改

  // 用户
  users_update_post_v3: '/backAdmin/users/update.user',  // 用户资料修改
  users_avatar_post_v3: '/backAdmin/users/avatar', // 上传用户头像
  groups_list_get_v3: '/backAdmin/groups.list', // 用户组列表
  groups_create_post_v3: '/backAdmin/groups.create', // 创建用户组
  groups_batchupdate_post_v3: '/backAdmin/groups.batchupdate', // 用户组修改（批
  groups_batchdelete_post_v3: '/backAdmin/groups.batchdelete', // 删除用户组 (批)
};
