/**
 * @module panel
 * @description 面板。标题、内容可自定义
 * @property {boolean} isHiddenDivider 是否隐藏标题和内容的分割线，默认为false
 * @param {slot} title    提供title插槽
 * @param {slot} content  提供content插槽
 */
Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    isHiddenDivider: {
      type: Boolean,
      value: false,
    }
  },

  data: {},

  methods: {

  },

})
