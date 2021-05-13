/**
 * @module label-picker
 * @description 选择器组件
 * @property {string}  label          标签文本
 * @property {string}  placeholder    默认提示文本
 * @property {boolean} required       是否必输，默认false
 * @property {boolean} validate       是否校验，默认false
 * @property {number}  list           选择列表
 * @property {number}  selected       设置选择索引，默认-1
 * @property {number}  index          在父组件中的标记索引，以便对应数据，默认-1
 * @fires valueChange  失焦处理分发事件，向父元素传递值和在父组件中的标记索引
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    // 标签名
    label: {
      type: String,
      value: "",
    },
    // 显示文字（包括提示文字）
    placeholder: {
      type: String,
      value: "",
    },
    // 是否必输
    required: {
      type: Boolean,
      value: false,
    },
    // 校验标志
    validate: {
      type: Boolean,
      value: false,
    },
    // 选中的选项索引
    selected: {
      type: Number,
      value: -1,
    },
    // 用于标记数据的索引
    index: {
      type: Number,
      value: -1,
    },
    // 菜单列表
    list: {
      type: Array,
      value: [],
    }
  },

  data: {
    // 是否显示下拉框
    show: false,
  },

  methods: {

    switchPopup: function() {
      this.setData({
        show: !this.data.show,
      })
    },

    choose: function(e) {
      let self = this;
      let idx = e.currentTarget.dataset.index;
      this.setData({
        selected: idx + 1,
      });
      setTimeout(function() {
        self.setData({
          show: !self.data.show,
          placeholder: self.data.list[idx],
        });
        self.triggerEvent('valueChange', {
          index: self.data.index,
          value: self.data.list[idx]
        })
      }, 300);
    },

  },

})
