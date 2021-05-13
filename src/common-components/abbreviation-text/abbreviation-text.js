/**
 * @module abbreviation-text
 * @description 文本展开缩起组件，根据字数控制显隐
 * @property {string} textContent  文本内容
 * @property {number} maxLength    文本显示最大字数，默认为150
 */
Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    textContent: {
      type: String,
      value: '',
    },
    maxLength: {
      type: Number,
      value: 150,
    }
  },

  observers: {
    "textContent,maxLength": function(textContent, maxLength) {
      this.init();
    }
  },

  data: {
    inner: '',
    // 是否显示全文
    showAll: false,
  },

  methods: {

    init() {
      if (this.data.maxLength && this.data.textContent.length > this.data.maxLength) {
        this.setData({
          inner: this.data.textContent.slice(0, this.data.maxLength),
          showAll: false,
        })
      } else {
        this.setData({
          inner: this.data.textContent,
          showAll: false,
        })
      }
    },

    toggleShowAll() {
      if (this.data.showAll && this.data.maxLength) {
        this.data.inner = this.data.textContent.slice(0, this.data.maxLength);
      } else {
        this.data.inner = this.data.textContent;
      }
      this.setData({
        inner: this.data.inner,
        showAll: !this.data.showAll
      })
    },

  }

});
