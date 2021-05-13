// pages/card/card.js
Component({

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: {
      userName: '小度',
      userPhone: '820885321',
      userAvatar: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    },
    userInfo2: {
      userName: '小度',
    },
    userInfo3: {
      name: '小度',
      isOfficial: false,
      posName: '客服',
      phone: '820885321',
      label: ['勤奋', '积极', '主动'],
      company: '北京百度有限公司',
      avatar: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      canEditAvatar: false,
    },
    userInfo4: {
      name: '小度',
      isOfficial: true,
      posName: '客服',
      phone: '820885321',
      label: ['勤奋', '积极', '主动'],
      company: '北京百度有限公司',
      avatar: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      canEditAvatar: true,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {
      let kind = options.kind;
      this.setData({
        kind,
      })
    },

    onTapAvatar() {
      wx.showToast({
        title: '点击了',
        icon: 'none',
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    }
  }
})
