import {
  PATH,
} from "../../module";

Page({

  data: {

    funcCommonComp: {
      title: '功能型组件',
      items: [{
        codeName: 'canvas-to-image',
        name: '画布生成图片',
        path: `${PATH.FUNCTIONAL}?kind=1`,
      }, {
        codeName: 'photo-identification',
        name: '选择拍照或从相册上传',
        path: `${PATH.FUNCTIONAL}?kind=2`,
      }, {
        codeName: 'chat',
        name: '实时聊天',
        path: `${PATH.FUNCTIONAL}?kind=3`,
      }, ]
    },

    uiFormCommonComp: {
      title: 'UI型表单处理组件',
      items: [{
        codeName: 'label-input',
        name: '输入框',
        path: `${PATH.FORM}?kind=1`,
      }, {
        codeName: 'label-picker',
        name: '选择器',
        path: `${PATH.FORM}?kind=2`,
      }, {
        codeName: 'label-textarea',
        name: '文本区域',
        path: `${PATH.FORM}?kind=3`,
      }, {
        codeName: 'select-box',
        name: '复选框',
        path: `${PATH.FORM}?kind=4`,
      }, {
        codeName: '[模板] kg-text',
        name: '文本框',
        path: `${PATH.FORM}?kind=5`,
      }, {
        codeName: '[模板] kg-input',
        name: '输入框',
        path: `${PATH.FORM}?kind=6`,
      }, {
        codeName: '[模板] kg-picker',
        name: '选择器',
        path: `${PATH.FORM}?kind=7`,
      }, {
        codeName: '[模板] kg-switch',
        name: '开关',
        path: `${PATH.FORM}?kind=8`,
      }, {
        codeName: '[模板] kg-search-input',
        name: '搜索输入框',
        path: `${PATH.FORM}?kind=9`,
      }, {
        codeName: '[模板] kg-expandable-text',
        name: '可展开的文本',
        path: `${PATH.FORM}?kind=10`,
      }, {
        codeName: '[模板] kg-expandable-picker',
        name: '可展开的选择器',
        path: `${PATH.FORM}?kind=11`,
      }, ],
    },

    uiImageCommonComp: {
      title: 'UI型图片处理组件',
      items: [{
        codeName: 'image-collect',
        name: '图片上传（上传逻辑自行实现）',
        path: `${PATH.IMAGE}?kind=1`,
      }, {
        codeName: 'image-cropper',
        name: '图片裁剪器',
        path: `${PATH.IMAGE}?kind=2`,
      }, {
        codeName: 'image-list',
        name: '图片列表',
        path: `${PATH.IMAGE}?kind=3`,
      }, {
        codeName: 'image-swiper',
        name: '图片轮播',
        path: `${PATH.IMAGE}?kind=4`,
      }, {
        codeName: 'upload-image',
        name: '图片上传（支持单图片即时上传）',
        path: `${PATH.IMAGE}?kind=5`,
      }, {
        codeName: 'preview-image',
        name: '图片预览',
        path: `${PATH.IMAGE}?kind=6`,
      }, ],
    },

    uiTextCommonComp: {
      title: 'UI型文本处理组件',
      items: [{
        codeName: 'abbreviation-text',
        name: '支持展开折叠的多行文本',
        path: `${PATH.TEXT}?kind=1`,
      }, {
        codeName: 'text-identification',
        name: '文本识别',
        path: `${PATH.TEXT}?kind=2`,
      }, ],
    },

    uiDialogCommonComp: {
      title: 'UI型对话框组件',
      items: [{
        codeName: 'base-modal',
        name: '基本模态框',
        path: `${PATH.MODAL}?kind=1`,
      }, ],
    },

    uiListCommonComp: {
      title: 'UI型列表、条目组件',
      items: [{
        codeName: 'list-item',
        name: '列表条目',
        path: `${PATH.LIST}?kind=1`,
      }, {
        codeName: 'message-item',
        name: '消息条目',
        path: `${PATH.LIST}?kind=2`,
      }, {
        codeName: 'recommend-list',
        name: '推荐列表',
        path: `${PATH.LIST}?kind=3`,
      }, {
        codeName: 'pull-down-list',
        name: '下拉列表',
        path: `${PATH.LIST}?kind=4`,
      }, {
        codeName: 'two-column-list',
        name: '双列列表',
        path: `${PATH.LIST}?kind=5`,
      }, ],
    },

    uiTableCommonComp: {
      title: 'UI型表格组件',
      items: [{
        codeName: 'table',
        name: '表格',
        path: `${PATH.TABLE}?kind=1`,
      }, ],
    },

    uiCardCommonComp: {
      title: 'UI型名片组件',
      items: [{
        codeName: 'card',
        name: '微信名片',
        path: `${PATH.CARD}?kind=1`,
      }, {
        codeName: 'personal-card',
        name: '个人名片',
        path: `${PATH.CARD}?kind=2`,
      }, ],
    },

    uiBoxCommonComp: {
      title: 'UI型盒组件',
      items: [{
        codeName: 'standard-box',
        name: '标准盒',
        path: `${PATH.BOX}?kind=1`,
      }, {
        codeName: 'panel',
        name: '面板',
        path: `${PATH.BOX}?kind=2`,
      }, {
        codeName: 'orange-box',
        name: '橘色盒',
        path: `${PATH.BOX}?kind=3`,
      }, ],
    },

    uiOtherCommonComp: {
      title: 'UI型其他通用组件',
      items: [{
        codeName: 'button-group',
        name: '按钮组',
        path: `${PATH.OTHER}?kind=1`,
      }, {
        codeName: 'tip-header',
        name: '带提示的区域头部',
        path: `${PATH.OTHER}?kind=2`,
      }, {
        codeName: 'nav-pager',
        name: '导航分页器',
        path: `${PATH.OTHER}?kind=3`,
      }, {
        codeName: 'link-view',
        name: '链接',
        path: `${PATH.OTHER}?kind=4`,
      }, {
        codeName: 'nav-bar',
        name: '导航栏',
        path: `${PATH.OTHER}?kind=5`,
      }, {
        codeName: 'no-content',
        name: '空内容提示',
        path: `${PATH.OTHER}?kind=6`,
      }, {
        codeName: 'num-header',
        name: '带数字序号的区域头部',
        path: `${PATH.OTHER}?kind=7`,
      }, {
        codeName: 'video-view',
        name: '视频',
        path: `${PATH.OTHER}?kind=8`,
      }, ],
    },

    businessComp: {
      title: '业务组件',
      items: [{
        codeName: 'authorize-modal',
        name: '授权对话框',
        path: `${PATH.MODAL}?kind=2`,
      }, {
        codeName: 'get-discount',
        name: '优惠',
        path: `${PATH.OTHER}?kind=9`,
      }, {
        codeName: 'get-discount-modal',
        name: '优惠对话框',
        path: `${PATH.MODAL}?kind=3`,
      }, {
        codeName: 'subscribe-modal',
        name: '模板订阅框',
        path: `${PATH.MODAL}?kind=4`,
      }, ],
    },

  },

  openPage(e) {
    // console.log(e);
    let {
      currentTarget: {
        dataset: {
          path,
        }
      }
    } = e;
    wx.navigateTo({
      url: path,
    });
  },

  openOfficialApplet() {
    wx.navigateToMiniProgram({
      appId: 'wxe5f52902cf4de896',
      success() {},
      fail() {}
    })
  }

})
