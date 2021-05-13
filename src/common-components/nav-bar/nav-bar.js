/**
 * @module nav-bar
 * @description 自定义导航栏
 * @param {slot} slot 单独提供插槽
 * @fires goBack 点击返回按钮分发事件
 */
Component({

  options: {
    addGlobalClass: true,
    pureDataPattern: new RegExp('^_'),
  },

  properties: {
    title: {
      type: String,
      value: '这是标题',
    }
  },

  data: {
    // 导航栏高度
    navBarHeight: 0,
    // 状态栏高度
    statusBarHeight: 0,
    // 设备类型
    isAndroid: true,
  },

  lifetimes: {
    attached() {

      const {
        statusBarHeight,
        navBarHeight,
      } = getRelatedHeight();

      const {
        system
      } = wx.getSystemInfoSync();
      const isAndroid = system.toLowerCase().indexOf('android') > -1;

      this.setData({
        navBarHeight,
        statusBarHeight,
        isAndroid,
      })
    }
  },

  methods: {
    goBack() {
      this.triggerEvent('goBack');
    }
  }
})

// 获取导航栏高度、状态栏高度、总高度
function getRelatedHeight() {
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
