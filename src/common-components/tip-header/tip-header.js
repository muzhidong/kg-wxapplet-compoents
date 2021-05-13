/**
 * @module tip-header
 * @description 带提示的区域头部
 * @property {string}   title                标题文本
 * @property {string}   tip                  提示文本，由提示文本text和标识id组成
 * @property {boolean}  isShowQuestionMark   是否在提示文本前显示疑问号，默认为false
 * @property {boolean}  isCloseToTitle       提示文本是否靠近提示文本，默认为false
 * @fires onTapTip      点击提示分发事件 
 */
Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    title: {
      type: String,
      value: '',
    },
    tip: {
      type: {
        text: String,
        id: Number,
      },
      value: {},
    },
    isShowQuestionMark: {
      type: Boolean,
      value: false,
    },
    isCloseToTitle: {
      type: Boolean,
      value: false,
    },
  },

  data: {

  },

  methods: {

    onTapTip: function(e) {
      let _tapId = e.currentTarget.dataset.param;
      this.triggerEvent('onTapTip', {
        id: _tapId,
      });
    },

  }
})
