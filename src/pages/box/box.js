// pages/box/box.js
Component({

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {

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
