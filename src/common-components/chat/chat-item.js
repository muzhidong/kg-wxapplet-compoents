Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    // 是否自己的聊天记录
    isSelf: {
      type: Boolean,
      value: false
    },
    // 聊天内容
    inner: {
      type: String,
      value: ''
    },
    // 是否发送失败
    isFail: {
      type: Boolean,
      value: false
    },
    // 日期
    date: {
      type: String,
      value: ''
    },
    // 头像
    thumb: {
      type: String,
      value: ''
    }
  },

})
