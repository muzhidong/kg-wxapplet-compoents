/**
 * @module nav-pager
 * @description 导航指示器
 * @property {Array} navList 导航列表，每个元素包含本导航文本text和通知数number
 * @property {number} selectedIndex 当前选中的导航索引
 * @fires change 导航变化时分发事件
 */
Component({

  options: {
    addGlobalClass: true, // 是否应用 app.wxss 样式
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    navList: {
      type: Array,
      value: [],
    },
    selectedIndex: {
      type: Number,
      value: 0,
    }
  },

  data: {
    length: 0,
  },

  methods: {

    changeIndex: function(e) {
      this.setData({
        selectedIndex: e.currentTarget.dataset.index,
      }, () => {
        this.triggerEvent('change', {
          selectedIndex: this.data.selectedIndex
        })
      });
    },

  },

  lifetimes: {
    attached: function() {
      this.setData({
        length: this.data.navList.length,
      })
    },
  },
})
