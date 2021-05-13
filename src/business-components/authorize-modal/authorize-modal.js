/**
 * @module authorize-modal
 * @description 授权对话框
 * @property  {boolean} hidden   对话框是否隐藏，默认为false
 * @property  {string}  title    对话框标题文本
 * @property  {string}  content  对话框内容文本
 * @fires getUserInfo 获取用户信息完成分发事件
 * @fires close       关闭窗口分发事件
 */
Component({

  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    hidden: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    }
  },

  data: {

  },

  methods: {

    getUserInfo(e) {
      this.triggerEvent('getUserInfo', e);
      this.selectComponent('#modal').toggle(true);
    },

    close() {
      this.triggerEvent('close');
    },
  },

});
