// pages/list/list.js
import {
  PATH,
} from "../../module";

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    item: {
      icon: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      title: '百度',
      subtitle: '点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下',
      path: `${PATH.LIST}?kind=1`,
    },
    recommendList: [{
      thumb: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      title: '百度',
      subtitle: '点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下',
    }, {
      thumb: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      title: '百度',
      subtitle: '点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下',
    }, {
      thumb: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      title: '百度',
      subtitle: '点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下',
    }, {
      thumb: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      title: '百度',
      subtitle: '点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下,点我百度一下',
    }],
    message: {
      avatar: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
      userName: 'AngelBabyAngelBabyAngelBabyAngelBabyAngelBabyAngelBabyAngelBabyAngelBaby',
      message: '最近好吗最近好吗最近好吗最近好吗最近好吗最近好吗最近好吗最近好吗最近好吗最近好吗',
      messageTime: new Date().getTime(),
      noticeInt: 10,
    },
    list: ['云南新增确诊病例11例热', '武汉重启一周年', '疫情防控失职 瑞丽市委书记被撤职', '美国正准备解除对伊朗制裁', '国航一航班因乘客谎称有炸弹返航新', '韩国N号房创建人获刑34年', '酒店回应游客堵房间地漏蓄水玩', '伍兹车祸因严重超速', '农民砍掉自己种的杨树后被判刑', '海霞用两个词谈武汉浴火重生'],
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

    onTapMsgItem() {
      wx.showToast({
        title: '点了我一下',
        icon: 'none',
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    },

    onTapRecommendItem(e) {
      console.log(e);
      wx.showToast({
        title: `点了第${e.detail.index + 1}个条目`,
        icon: 'none',
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });
    },

  }
})
