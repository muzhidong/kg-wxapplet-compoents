/**
 * @module subscribe-modal
 * @description 订阅消息对话框
 * @property  {boolean}  hidden       是否显示，默认为true
 * @property  {string}   title        标题文本
 * @property  {string}   subtitle     副标题文本
 * @property  {Array}    tmplIds      模板id数组
 * @fires subscribe                   订阅操作成功分发事件
 */

Component({

  properties: {
    //是否显示
    hidden: {
      type: Boolean,
      value: true,
    },
    title: {
      type: String,
      value: '',
    },
    subTitle: {
      type: String,
      value: '',
    },
    tmplIds: {
      type: Array,
      value: [],
    }
  },

  data: {

  },

  methods: {

    subscribe: function() {

      this.setData({
        hidden: true,
      }, () => {
        // 请求订阅消息
        wx.requestSubscribeMessage({
          tmplIds: this.data.tmplIds,
          success(res) {
            // 发送订阅结果
            this.triggerEvent('subscribe', {
              res
            });
          },
          fail(err) {
            wx.showToast({
              title: "好像出现了点问题，请稍后再试。",
              icon: 'none'
            });
          },
          complete() {

          }
        });
      })

    }
  }
})
