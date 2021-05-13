/**
 * @module button-group
 * @description 按钮组
 * @property {boolean} hiddenUnderline  是否隐藏下划线，默认false
 * @property {Array}   btnArr           按钮数组，每个元素包含按钮图标icon、按钮名称name、按钮触发事件名event这三个属性。当event值为share时表示转发按钮
 * @property {number}  idx              当按钮数组中包含转发按钮时有效，表示该按钮组在父组件的按钮组列表的下标
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    hiddenUnderline: {
      type: Boolean,
      value: false
    },
    btnArr: {
      type: Array,
      value: [],
    },
    idx: {
      type: Number,
      value: -1,
    }
  },

  data: {

  },

  methods: {
    dispatch: function(e) {
      let index = e.currentTarget.dataset.index;
      this.triggerEvent(this.data.btnArr[index].event);
    }
  },

})
