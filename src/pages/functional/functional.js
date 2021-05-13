// pages/functional/functional.js

import {
  DRAW_TYPE_DICT,
} from "../../common-components/canvas-to-image/canvas-draw-behavior.js"

const assetsBasePath = 'https://crm.kungeek.com/cardgram/cardgram-assets/';

/**
 * 小慧客服名片绘制任务队列
 */
const XiaoHuiDrawTaskList = [
  // 背景图片
  {
    type: DRAW_TYPE_DICT.CTX_BG_IMAGE,
    shouldDownload: true, // 是否需要设置头信息去获取
    url: assetsBasePath + 'images/poster_bg@2x.png',
  },
  // 名片卡片的白色背景
  {
    type: DRAW_TYPE_DICT.CTX_RECT,
    // 此处定位(top, right, bottom, left)只设置位置参照边的相对距离
    sizeObj: {
      width: 702,
      height: 400,
      radius: 20,
      bottom: 24,
      left: 24
    },
    styleObj: {
      fillStyle: 'rgba(255, 255, 255, 1)'
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `关注客户需求`,
    styleObj: {
      bottom: 357,
      left: 62,
      fontSize: 28,
      color: '#999999',
      lineHeight: 28,
      bold: false,
      lineMaxWidth: 0
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `为您提供最适合的财税服务`,
    styleObj: {
      bottom: 313,
      left: 62,
      fontSize: 28,
      color: '#999999',
      lineHeight: 28,
      bold: false,
      lineMaxWidth: 0
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `专业、专注、省心、省力`,
    styleObj: {
      bottom: 242,
      left: 62,
      fontSize: 40,
      color: '#1A1A1A',
      lineHeight: 40,
      bold: true,
      lineMaxWidth: 0
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `400-017-2000`,
    styleObj: {
      bottom: 158,
      left: 100,
      fontSize: 26,
      color: '#999999',
      lineHeight: 26,
      bold: false,
      lineMaxWidth: 0
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `北京公瑾科技有限公司`,
    styleObj: {
      bottom: 118,
      left: 100,
      fontSize: 26,
      color: '#999999',
      lineHeight: 26,
      bold: false,
      lineMaxWidth: 0
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `北京海龙大厦11层`,
    styleObj: {
      bottom: 78,
      left: 100,
      fontSize: 26,
      color: '#999999',
      lineHeight: 26,
      bold: false,
      lineMaxWidth: 0
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_TEXT,
    text: `长按了解更多`,
    styleObj: {
      bottom: 47,
      left: 542,
      fontSize: 22,
      color: '#999999',
      lineHeight: 22,
      bold: false,
      lineMaxWidth: 0,
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_IMAGE,
    shouldDownload: false,
    url: assetsBasePath + 'images/card_phone2@2x.png',
    sizeObj: {
      bottom: 158,
      left: 62,
      width: 24,
      height: 24
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_IMAGE,
    shouldDownload: false, 
    url: assetsBasePath + 'images/icon_company2@2x.png',
    sizeObj: {
      bottom: 118,
      left: 62,
      width: 24,
      height: 24
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_IMAGE,
    shouldDownload: false, 
    url: assetsBasePath + 'images/card_location2@2x.png',
    sizeObj: {
      bottom: 78,
      left: 62,
      width: 24,
      height: 24
    }
  },
  {
    type: DRAW_TYPE_DICT.CTX_IMAGE,
    shouldDownload: false, 
    url: assetsBasePath + 'images/logo_2017@2x.png',
    sizeObj: {
      bottom: 329,
      right: 74,
      width: 150,
      height: 52
    }
  },
];

Component({

  /**
   * 组件的初始数据
   */
  data: {
    taskList: XiaoHuiDrawTaskList,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLoad(options) {
      let kind = options.kind;
      this.setData({
        kind,
      })
    }
  }
})
