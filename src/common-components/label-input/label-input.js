/**
 * @module label-input
 * @description 输入组件
 * @property {string}  label          标签文本
 * @property {string}  placeholder    默认提示文本
 * @property {string}  inputType      输入类型，默认为text
 * @property {boolean} required       是否必输，默认false
 * @property {string}  text           值
 * @property {boolean} validate       是否校验，默认false
 * @property {number} index           在父组件中的标记索引，以便对应数据，默认-1
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
    // 默认提示文字
    placeholder: {
      type: String,
      value: "",
    },
    // input输入类型
    inputType: {
      type: String,
      value: "text",
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
    // 内容值
    text: {
      type: String,
      value: "",
    },
    // 用于标记数据的索引
    index: {
      type: Number,
      value: -1,
    }
  },

  data: {

  },

  methods: {
    blur: function(e) {
      let val = e.detail.value;
      this.triggerEvent('valueChange', {
        value: val,
        index: this.data.index
      });
    },
  },

})
