/**
 * @module select-box
 * @description 选择框
 * @property {boolean} hiddenUnderLine     是否隐藏下划线，默认为false  
 * @property {string}  value               选项值  
 * @param {slot} left    提供left沟槽，设置靠近选择框的左侧内容
 * @param {slot} right   提供right沟槽，设置远离选择框的右侧内容
 * @param {slot} addOn   提供addOn沟槽，设置开进选择框的左下侧内容
 * @fires onSwitch    开关变化分发事件
 */

Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    hiddenUnderLine: {
      type: Boolean,
      value: false,
    },
    value: {
      type: String,
      value: "",
    }
  },

  data: {
    selected: false,
  },


  methods: {
    onSwitch() {
      this.setData({
        selected: !this.data.selected,
      }, () => {
        this.triggerEvent('onSwitch', {
          value: this.data.value,
          checked: this.data.selected,
        })
      })
    }
  }
})
