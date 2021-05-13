// pages/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    type: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {
      this.setData({
        kind: options.kind,
      }, () => {
        if (this.data.kind == 3) {
          this.selectComponent('#discount').open();
        }
      })
    },

    onChange(e) {
      // console.log(e);
      let val = e.detail.value;
      this.setData({
        type: val,
      }, () => {
        this.selectComponent('#discount').open();
      })
    },

    toggle() {
      wx.showToast({
        title: '关闭了',
        icon: 'none',
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
})
