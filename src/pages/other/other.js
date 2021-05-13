// pages/other/other.js
Component({

  /**
   * 组件的初始数据
   */
  data: {
    btnList: [{
      name: '复制文字',
      icon: '/images/icon_copy@2x.png',
      event: 'one',
    }, {
      name: '保存图文',
      icon: '/images/icon_download@2x.png',
      event: 'two',
    }, {
      name: '转发分享',
      icon: '/images/icon_share@2x.png',
      event: 'share',
    }, ],
    btnList2: [{
      name: '复制文字',
      icon: '/images/icon_copy@2x.png',
      event: 'one',
    }, {
      name: '保存图文',
      icon: '/images/icon_download@2x.png',
      event: 'two',
    }, ],

    navlist: [{
      text: "导航一",
      number: 0,
    }, {
      text: "导航二",
      number: 0,
    }, {
      text: "导航三",
      number: 0,
    }, {
      text: "导航四",
      number: 0,
    }],
    navlist2: [{
      text: "导航一",
      number: 1,
    }, {
      text: "导航二",
      number: 2,
    }, {
      text: "导航三",
      number: 3,
    }, ],


    textContent: '这是一条链接',
    imgUrl: 'https://www.huisuanzhang.cn/images/common_imgs/jz_head_logo.png',
    textContent2: '这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接这是另外一条链接',

    textList: ['暂时没有客户线索', '转发名片可以吸引更多的客户'],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLoad(options) {
      let kind = options.kind;
      this.setData({
        kind,
      }, () => {
        if (kind == 9) {
          this.selectComponent('#discount').render({
            name: '我是客服某某某',
            phone: '13888888888',
            portrait: 'https://www.huisuanzhang.cn/images/common_imgs/jz_head_logo.png',
          });
        }
      })
    },

    one() {
      wx.showToast({
        title: '点了第一个按钮',
        icon: 'none',
      });
    },

    two() {
      wx.showToast({
        title: '点了第二个按钮',
        icon: 'none',
      });
    },

    three() {
      wx.showToast({
        title: '点了第三个按钮',
        icon: 'none',
      });
    },

    goBack() {

      if (this.data.kind != 5) {
        wx.navigateBack({
          delta: 1
        });
        return;
      }

      wx.showToast({
        title: '点击了返回键',
        icon: 'none',
        duration: 2000,
        success: (result) => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 2000)
        },
        fail: () => {},
        complete: () => {}
      });
    },

    open() {
      wx.showToast({
        title: '点击了',
        icon: 'none',
      });
    },

    change() {
      wx.showToast({
        title: '切换了',
        icon: 'none',
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
})
