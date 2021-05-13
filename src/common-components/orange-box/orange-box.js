/**
 * @module orange-box
 * @description 橘色盒。橘色标题样式，内容自定义
 * @property {string} title 标题文本
 * @param {slot} slot  单独提供一个插槽
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    title: {
      value: '',
      type: String,
    }
  },

  data: {

  },

  methods: {

  }
})
