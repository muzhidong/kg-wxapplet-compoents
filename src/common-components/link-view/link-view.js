/**
 * @module link-view
 * @description 链接视图
 * @property {string}  imgUrl 链接视图中的图片资源URI
 * @property {string}  textContent   链接视图中的文本内容
 * @fires onTapLink   点击链接分发事件
 */
Component({

  options: {
    addGlobalClass: true, // 是否应用 app.wxss 样式
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    imgUrl: {
      type: String,
      value: ''
    },
    textContent: {
      type: String,
      value: '',
    }
  },

  data: {

  },

  methods: {

    onTapLink: function() {
      this.triggerEvent('onTapLink');
    }

  },

})
