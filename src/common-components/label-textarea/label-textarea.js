/**
 * @module label-textarea
 * @description 文本区域组件
 * @property {string}  label          标签文本
 * @property {string}  placeholder    默认提示文本
 * @property {string}  text           值
 * @property {boolean} required       是否必输，默认false
 * @property {boolean} validate       是否校验，默认false
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
    // 默认提示文字
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

  observers: {
    'text': function(value) {
      if (value) {
        this.setData({
          words: value.length,
        })
      }
    },
  },

  data: {
    words: 0,
    // 控制虚拟的textarea显示隐藏
    isBlur: false,
    content: "",
    hasContent: false,
  },

  methods: {
    onWordsNumChange: function(e) {
      this.setData({
        words: e.detail.cursor
      });
      // 分发事件
      this.triggerEvent('valueChange', {
        index: this.data.index,
        value: e.detail.value
      });
    },
    blur: function(e) {
      //将textarea内容复制到view里，并切换到虚拟的textarea
      let hasContent, content;
      if (e.detail.value) {
        hasContent = true;
        content = e.detail.value;
      } else {
        hasContent = false;
        content = this.data.placeholder;
      }
      this.setData({
        content: content,
        hasContent: hasContent,
        isBlur: false,
      })
    },
    change: function() {
      // 将view内容复制到textarea里，切换到真实的textarea，并聚焦
      this.setData({
        isBlur: true,
      })
    },
  },

  lifetimes: {
    ready: function() {

      let self = this;
      let hasContent = false;
      let content = "";

      if (this.data.text) {
        hasContent = true;
        content = this.data.text;
      } else {
        content = this.data.placeholder;
      }
      self.setData({
        hasContent: hasContent,
        content: content,
      });
    }
  }
})
