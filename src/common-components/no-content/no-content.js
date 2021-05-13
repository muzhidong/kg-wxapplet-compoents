/**
 * @module no-content
 * @description 空内容提示组件
 * @property {Array} textList 一段分行显示的文本数组
 */
Component({

  properties: {
    textList: {
      type: Array,
      value: []
    }
  },

  data: {
    show: false
  },

  lifetimes: {
    attached() {
      setTimeout(() => {
        this.setData({
          show: true
        })
      }, 500)
    }
  },

  methods: {

  }

})
