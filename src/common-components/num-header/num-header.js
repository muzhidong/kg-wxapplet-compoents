/**
 * @module num-header
 * @description 带提示的区域头部
 * @property {number} num     设置头部序号数字，默认为1 
 * @property {string} title   设置头部标题文本
 * @param {slot} des  提供des插槽
 */
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {

    num: {
      type: String,
      value: 1
    },
    title: {
      type: String,
      value: ''
    }
  },

  data: {

  },

  methods: {

  }
})
