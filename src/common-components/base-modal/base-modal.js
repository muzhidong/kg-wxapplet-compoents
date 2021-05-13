/**
 * @module base-modal
 * @description 基础弹窗组件
 * @property {boolean} hidden         弹窗是否隐藏，默认为true
 * @property {string}  title          弹窗标题
 * @property {boolean} showCloseBtn   弹窗关闭按钮是否显示，默认为false
 * @param {slot} body    提供body插槽
 * @param {slot} buttons 提供buttons插槽
 * @fires toggle 弹窗显隐处理完成分发事件
 */

Component({

  options: {
    multipleSlots: true,
  },

  properties: {
    hidden: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: ''
    },
    showCloseBtn: {
      type: Boolean,
      value: false
    }
  },

  data: {

  },

  methods: {

    toggle(state) {
      this.setData({
        hidden: state === void 0 ? !this.data.hidden : !!state,
      }, () => {
        this.triggerEvent('toggle');
      });
    },

    stopScroll() {
      return;
    },

  }
})
