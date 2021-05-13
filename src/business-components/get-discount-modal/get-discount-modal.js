/**
 * @module get-discount-modal
 * @description 优惠对话框
 * @property  {string}  title        弹框标题，默认值为‘千元补贴申请’
 * @property  {number}  type         弹框类型，0为未获取优惠类型，1为获取过优惠类型
 * @fires close                      关闭弹框分发事件
 * @fires open                       打开弹框分发事件
 * @fires submit                     点击提交分发事件
 */

const PHONE_REG = "^1(3[0-9]|4[579]|5[0-35-9]|6[67]|8[0-9]|7[0-9]|9[189])\\d{8}$";

Component({

  options: {
    pureDataPattern: /^_/,
  },

  properties: {
    // 弹框标题
    title: {
      type: String,
      value: '千元补贴申请',
    },
    // 弹框类型，0为未获取优惠类型，1为获取过优惠类型
    type: {
      type: Number,
      value: 0,
    },
  },

  data: {
    // 填写的手机号码
    discountPhone: '',
    // 填写的姓名
    discountName: '',
  },

  methods: {

    // 关闭弹框
    close: function() {
      this.selectComponent("#modal").toggle(true);
      this.triggerEvent('close');
    },

    // 打开弹框
    open: function() {
      this.selectComponent('#modal').toggle(false);
      this.triggerEvent('open');
    },

    // 监听名字输入
    nameInput: debounce(function(e) {
      this.setData({
        discountName: e.detail.value,
      })
    }),

    // 监听电话输入
    phoneInput: debounce(function(e) {
      this.setData({
        discountPhone: e.detail.value,
      })
    }),

    // 提交
    submit: function() {

      let {
        discountName,
        discountPhone,
      } = this.data;

      if (discountPhone === '') {
        wx.showToast({
          title: "请输入手机号码",
          icon: "none",
        });
        return
      } else if (!new RegExp(PHONE_REG).test(discountPhone)) {
        wx.showToast({
          title: "请输入正确的手机号码",
          icon: "none",
        });
        return
      }

      this.selectComponent("#modal").toggle(true);
      this.setData({
        discountPhone: '',
        discountName: ''
      }, () => {
        this.triggerEvent('submit', {
          name: this.data.discountName,
          phone: this.data.discountPhone
        });
      })

    },

  }
})

function debounce(func, time, immediate) {
  let timeout;
  time = time || 300;

  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      if (callNow) {
        func.apply(context, args);
        timeout = setTimeout(function() {
          timeout = null;
        }, time);
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, time);
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, time);
    }
  }
}
