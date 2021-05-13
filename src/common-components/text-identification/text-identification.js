/**
 * @module text-identification
 * @description 文本识别
 * @property {string}  title         顶部标题文本
 * @property {string}  placeholder   区域框提示文本 
 * @property {number}  maxLength     区域框最大字符长度
 * @param {slot} slot  提供一个插槽，用于自定义顶部
 * @fires handleIdentifyText   处理识别文本分发事件
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    title: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '',
    },
    maxLength: {
      type: Number,
      value: 70,
    }
  },

  data: {
    identifyEnabled: false,
    errorTipHidden: true,
    value: '',
  },

  methods: {

    //处理textarea中正在编辑
    handleAreaInput: debounce(function(e) {

      let val = e.detail.value;
      this.setData({
        value: val,
        identifyEnabled: val.length > 0,
      });

    }),

    //点击清空
    handleClearTextArea() {

      this.setData({
        value: '',
        identifyEnabled: false,
      });

    },

    //点击识别
    handleIdentifyTextArea() {

      const val = this.data.value;

      if (!val) return;

      this.triggerEvent('handleIdentifyText', {
        value: val
      });
    },

    // 显示提示
    showErrorTip() {
      this.setData({
        errorTipHidden: false,
      })
    }

  }
})


/*
 * @desc 函数防抖
 * @param func 函数
 * @param time 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
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
