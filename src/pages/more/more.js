// pages/more/more.js

const CARD = 'wx010b64e7ae9e3eac';
const ASSISTANT = 'wx15d9777c24edd38b';

Component({


  /**
   * 组件的初始数据
   */
  data: {
    list: [{
      name: "慧算账助手小程序",
      src: "/images/assistant_applet_code.jpg",
    }, {
      name: "慧算账名片小程序",
      src: "/images/card_applet_code.jpg",
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {

    openApplet(e) {
      let idx = e.currentTarget.dataset.index;
      let appId = idx == 0 ? ASSISTANT : CARD;
      wx.navigateToMiniProgram({
        appId,
        success() {
          console.log('打开');
        },
        fail() {
          console.log('关闭');
        }
      })

    }
  }
})
