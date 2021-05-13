/**
 * @module list-item
 * @description 推荐列表条目
 * @property {string}  icon      图标
 * @property {string}  title     标题
 * @property {string}  subtitle  副标题
 * @property {string}  path    点击跳转的页面路径
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    icon: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    subtitle: {
      type: String,
      value: ''
    },
    path: {
      type: String,
      value: ''
    },
  },

  data: {},

  methods: {
    openPage: function() {
      wx.navigateTo({
        url: this.data.path,
      })
    }
  },

  lifetimes: {
    attached: function() {},
  },
})
