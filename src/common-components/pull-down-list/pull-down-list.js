/**
 * @module pull-down-list
 * @description 下拉列表
 * @property {Array}   list             要展示的下拉列表数据数组
 * @property {string}  bottomText       下拉列表额外的底部文字
 * @property {number}  selected         设置初始时选中的索引，默认为0
 * @property {boolean} useCustomNavBar  使用组件的当前页面是否使用了自定义导航栏，默认为false
 * @fires onSelect         选中下拉列表某选项分发事件，传递数组索引给父组件
 * @fires onTapBottom      点击底部文字分发事件
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    selected: {
      type: Number,
      value: 0,
    },
    list: {
      type: Array,
      value: [],
    },
    bottomText: {
      type: String,
      value: '',
    },
    useCustomNavBar: {
      type: Boolean,
      value: false,
    }
  },

  observers: {
    'list': function(value) {
      if (value.length > 0) {
        this.setData({
          selectedText: value[this.data.selected || 0],
        })
      }
    }
  },

  data: {
    isExpand: false,
    selectedText: '',
    offsetTop: 0,
  },

  lifetimes: {
    attached() {
      if (this.data.useCustomNavBar) {
        const {
          totalHeight
        } = this.getRelatedHeight();
        this.setData({
          offsetTop: 44 + totalHeight
        });
      }
    }
  },

  methods: {

    onSwitch() {
      this.setData({
        isExpand: !this.data.isExpand,
      })
    },

    onSelect(e) {
      let idx = e.currentTarget.dataset.index;
      this.setData({
        selected: idx,
        isExpand: false,
        selectedText: this.data.list[idx],
      }, () => {
        this.triggerEvent('onSelect', {
          index: idx,
        });
      })
    },

    onTapBottom() {
      this.setData({
        isExpand: false,
      }, () => {
        this.triggerEvent('onTapBottom');
      })
    },

    getRelatedHeight() {
      const {
        statusBarHeight,
      } = wx.getSystemInfoSync();

      const {
        top,
        height,
      } = wx.getMenuButtonBoundingClientRect();

      const navBarHeight = (top - statusBarHeight) * 2 + height;

      const totalHeight = navBarHeight + statusBarHeight;

      return {
        navBarHeight,
        statusBarHeight,
        totalHeight
      };
    }
  },
})
