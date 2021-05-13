/**
 * @module chat
 * @description 聊天组件
 * @property {Object} chatter         聊天对方信息，包括姓名name和头像avatar
 * @property {Object} owner           聊天自己信息，同上
 * @property {Object} chatRecords     聊天记录，包括发送时间sendTime、文本内容content和是否本人发送self
 * @property {Object} socketOpts      Socket连接选项参数，如url
 * @fires send            发送消息分发事件
 * @fires getChatRecords  获取聊天记录分发事件
 */

import {
  TIME,
  debounce,
  isContainEmojiChar,
} from "./util.js";

// app对象
let app = getApp();
// 暂存的最近带有时间的消息记录
let tmpLastMsgRecordWithTime = 0;
// 暂存的最久带有时间的消息记录
let tmpFarthestRecordWithTime = 0;
// 是否首次获取聊天记录分页
let isFirstGotChatRecords = true;

// socket任务
let socketTask;

Component({

  options: {
    pureDataPattern: /^_/,
  },

  properties: {
    // 聊天对方信息
    chatter: {
      type: {
        name: String,
        avatar: String,
      },
      value: {
        name: '不想透露昵称的客户',
        avatar: '',
      },
    },
    // 聊天自己信息
    owner: {
      type: {
        name: String,
        avatar: String,
      },
      value: {
        name: '',
        avatar: '',
      },
    },
    // 聊天记录
    chatRecords: {
      type: Array,
      value: [],
    },
    // socket连接选项参数
    socketOpts: {
      type: Object,
      value: null,
    }
  },


  observers: {
    "chatRecords": function(newValue) {

      let len = newValue.length;
      let records = this.data.chatMsgList;

      if (len > 0) {

        let timeArr = [];
        let lastTime = 0;
        let i = 0;

        //当下一个时间点跟上一个时间点不超过5分钟，就将上一个时间点删除，否则直接存入时间点
        for (let item of newValue) {
          // 无论后端传时间戳还是日期字符串，都统一转化为时间戳
          let sendTime = new Date(item.sendTime).getTime();
          if (i !== 0 && lastTime - sendTime < 1000 * 60 * 5) {
            timeArr[i - 1] = "";
          }
          timeArr.push(sendTime);
          lastTime = sendTime;
          i++;
        }

        // 每次请求分页时需判断当前分页的最晚时间与新分页的最早时间是否小于5min，若是则隐藏当前分页的最晚时间
        if (records.length > 0) {
          let newLastRecordWithTime = timeArr.find((value) => {
            return value !== '';
          });
          if (tmpFarthestRecordWithTime - newLastRecordWithTime < 1000 * 60 * 5) {
            records[0].time = '';
          }
        }
        // 暂存最久带有时间的消息
        tmpFarthestRecordWithTime = timeArr[timeArr.length - 1];

        i = 0;
        for (let item of newValue) {
          let {
            content,
            self,
          } = item;
          let thumb = self ? this.data.owner.avatar : this.data.chatter.avatar;
          let time = timeArr[i] && TIME.transformTime(timeArr[i]) || '';
          // 暂存最近一条带有时间的消息记录
          if (tmpLastMsgRecordWithTime === '' && time !== '') {
            tmpLastMsgRecordWithTime = timeArr[i];
          }
          records.unshift({
            content,
            self,
            thumb,
            time
          });
          i++;
        }
      }

      this.setData({
        chatMsgList: records,
        _pageNum: ++this.data._pageNum,
      });

      if (isFirstGotChatRecords) {
        // 第一次进入页面时要滚动到最新的聊天信息
        this._scrollToBottom();
        isFirstGotChatRecords = false;
      } else {
        this.setData({
          msgId: 'msg-' + len,
        });
      }

    },
  },

  data: {

    // 聊天记录
    chatMsgList: [],
    // 当前分页数
    _pageNum: 1,

    // 当前输入的内容
    content: '',

    // 键盘弹起处理相关
    inputBottom: 10,
    inputTop: 5,

    // 兼容vivo
    _sendTimer: null,
  },

  lifetimes: {
    attached() {

      this._setChatterMsgs();

      this._getChatRecords(this.data._pageNum);

      this._connectSocket(this.data.socketOpts);

    }
  },

  methods: {

    // 设置聊天人信息
    _setChatterMsgs() {
      wx.setNavigationBarTitle({
        title: this.data.chatter.name,
      });
    },

    // 获取聊天记录
    _getChatRecords(pageNum) {
      // 当前分页是否超过总数，外部自行判断
      this.triggerEvent('getChatRecords', pageNum);
    },

    // 连接socket
    _connectSocket(opts) {

      if (!(opts && opts.url)) return;

      /*
       * readyState: WebSocket状态。
       * 0：CONNECTING
       * 1：OPEN
       * 2：CLOSING
       * 3：CLOSED
       */
      if (!socketTask || socketTask.readyState == socketTask.CLOSED) {
        socketTask = wx.connectSocket(opts);
      }

      socketTask.onMessage((res) => {
        console.log("socket receive a message...");
        // 回调处理
        socketCallback(res);
      });

      socketTask.onOpen(() => {
        console.log("socket open....");
      });

      socketTask.onError((err) => {
        console.log("socket error...", err);
      });

      socketTask.onClose((res) => {
        console.log("app socket close...");

        // 系统认定为正常关闭，则不重连Socket
        if (res.code === 1000) {
          return;
        }
        // 重连Socket
        this.connectSocket();

      });

    },

    // 关闭socket，用于外部调用
    closeSocket() {
      wx.closeSocket();
      socketTask = null;
    },

    // 滚到底部
    _scrollToBottom: function() {
      this.setData({
        scrollHeight: 9999
      })
    },

    // 滚到顶部，分页获取聊天记录
    getChatRecords(e) {
      this._getChatRecords(this.data._pageNum);
    },

    // 发送消息
    send() {

      // 1.获取内容
      let content = this.data.content;
      if (!content.trim()) return;
      if (isContainEmojiChar(content)) {
        wx.showToast({
          icon: "none",
          title: "目前只能输入文本信息，不支持表情哦。",
        });
        return;
      }

      // 2.设置聊天记录
      let records = this.data.chatMsgList;
      let item = {
        self: true,
        content,
        thumb: this.data.owner.avatar,
      };
      let now = new Date().getTime();
      if (records.length === 0 || now - tmpLastMsgRecordWithTime >= 1000 * 60) {
        // 暂存最近带时间的消息
        tmpLastMsgRecordWithTime = now;
        item.time = TIME.transformTime(now);
      }

      // 3.获取网络状态,判断是否断网了
      wx.getNetworkType({
        success: res => {

          // 如果没有网络,设置发送失败,显示感叹号
          if (res.networkType === 'none') {
            item.isFail = true;
          }

          records.push(item);
          this.setData({
            chatMsgList: records,
            content: ''
          });

          this.data._sendTimer = setTimeout(() => {
            this.data._sendTimer = null;
          }, 50);

          this._scrollToBottom();

          // 没有网络就不往下执行了
          if (item.isFail) return;

          // 4.调起发送接口发送消息
          this.triggerEvent('send', content);
        }
      })
    },

    // 通知发送失败，用于外部调用
    notifySendFail() {
      // 设置消息为失败，显示感叹号
      let records = this.data.chatMsgList;
      let item = records[records.length - 1];
      item.isFail = true;
      records.splice(records.length - 1, 1, item);
      this.setData({
        chatMsgList: records
      });
    },

    onInput: debounce(function(e) {

      if (this.data.content === e.detail.value || this.data._sendTimer) return;

      this.setData({
        content: e.detail.value,
      })

    }),

    onFocus(e) {

      let h = e.detail && e.detail.height;
      if (void 0 !== h) {
        this.setData({
          inputTop: h,
          inputBottom: h,
        });
        this._scrollToBottom();
      }

    },

    onBlur(e) {

      this.setData({
        inputBottom: 10,
        inputTop: 5,
      })

    },

  },

});
