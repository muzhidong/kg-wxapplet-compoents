/**
 * @module get-discount
 * @description 获取优惠组件
 * @property  {boolean} hidden       是否隐藏，默认为false
 * @property  {string}  btnText      自定义按钮文本值，默认值为‘千元补贴申请’
 * @property  {string}  btnOpenType  自定义按钮开放类型值
 * @fires toCard                     去名片页分发事件
 * @fires toChat                     去聊天页分发事件
 * @fires call                       打电话分发事件
 * @fires openDiscountDialog         打开优惠框分发事件
 */
Component({

  options: {
    pureDataPattern: new RegExp('^_'),
  },

  properties: {
    // 组件是否隐藏
    hidden: {
      type: Boolean,
      value: false,
    },
    // 自定义按钮文本值
    btnText: {
      type: String,
      value: '千元补贴申请',
    },
    // 自定义按钮开放类型值
    btnOpenType: {
      type: String,
      value: '',
    },
  },

  data: {
    name: '',
    _phone: '',
    portrait: '',
    isImgErr: false,
  },

  methods: {

    // 父组件手动调用该方法，渲染组件数据
    render(data) {

      if (!data) return;

      let {
        name = '',
          phone = '',
          portrait = '',
      } = data;

      this.setData({
        hidden: false,
        name,
        _phone: phone,
        portrait,
      })

    },

    toCard: function() {
      this.triggerEvent('toCard');
    },

    toChat: function() {
      this.triggerEvent('toChat');
    },

    call: function() {

      if (!this.data.phone) return;

      this.triggerEvent('call');

      wx.makePhoneCall({
        phoneNumber: this.data.phone,
      });

    },

    openDiscountDialog: function(e) {
      this.triggerEvent('openDiscountDialog', e);
    },

    onImageLoadError() {
      this.setData({
        portrait: '',
        isImgErr: true,
      })
    }
  }
})
