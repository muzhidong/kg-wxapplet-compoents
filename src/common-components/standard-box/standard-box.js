/**
 * @module standard-box
 * @description 标准盒
 * @property {string}  title           标题
 * @property {boolean} hiddenLine      是否隐藏标题的左边竖线，默认为true
 * @property {boolean} bgWhite         是否背景设置为白色，默认为true
 * @property {number}  titleClass      标题样式选择，默认为0，表示普通标题样式，非0表示推荐标题样式
 * @param {slot} rightBtn 提供rightBtn沟槽，设置右侧按钮
 * @param {slot} body     提供body沟槽，设置内容
 */
Component({

  options: {
    addGlobalClass: true, // 是否应用 app.wxss 样式
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    // 标题
    title: {
      type: String,
      value: ''
    },
    // 是否隐藏标题的左边竖线
    hiddenLine: {
      type: Boolean,
      value: true,
    },
    // 是否背景设置为白色
    bgWhite: {
      type: Boolean,
      value: true,
    },
    // 样式选择
    titleClass: {
      type: Number,
      value: 0,
    }
  },

  data: {},

  methods: {

  },

  lifetimes: {
    attached: function() {},
  },
});
