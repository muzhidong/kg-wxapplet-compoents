/**
 * @module card
 * @description 微信名片
 * @property {Object}  userInfo      用户信息，由userName、userPhone、userAvatar三部分组成
 * @property {boolean} isBindPhone   是否绑定手机
 * @fires bindPhone  获取手机号分发事件
 */

Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    userInfo: {
      type: {
        userName: String,
        userPhone: String,
        userAvatar: String,
      },
      value: {
        userName: '',
        userPhone: '',
        userAvatar: '',
      },
    },
    // 是否绑定手机
    isBindPhone: {
      type: Boolean,
      value: true,
    }
  },

  observers: {
    'userInfo': function(value) {
      this.setData({
        userName: value.userName,
        userPhone: value.userPhone,
        userAvatar: value.userAvatar,
      })
    }
  },

  data: {
    userName: "",
    userPhone: "",
    userAvatar: ""
  },

  methods: {

    getPhoneNumber: function(e) {

      if (e.detail.errMsg.includes("fail")) return;

      this.triggerEvent('bindPhone', e);
    },
  },

})
