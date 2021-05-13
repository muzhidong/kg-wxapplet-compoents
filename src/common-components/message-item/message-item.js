/**
 * @module message-item
 * @description 消息记录条目
 * @property {string}  avatar        消息头像
 * @property {string}  userName      消息用户名
 * @property {string}  message       消息内容
 * @property {string}  messageTime   消息时间戳或时间字符串
 * @property {number}  noticeInt     未读消息数
 * @property {number}  index  表示该条目在父组件列表中的索引
 * @fires onTapItem   点击分发事件
 */
import {
  TIME,
} from './time.util.js';

Component({

  properties: {
    avatar: {
      type: String,
      value: '',
    },
    userName: {
      type: String,
      value: '',
    },
    message: {
      type: String,
      value: '',
    },
    messageTime: {
      type: String | Number,
      value: '',
    },
    noticeInt: {
      type: Number,
      value: -1,
    },
    index: {
      type: Number,
      value: -1,
    },
  },

  observers: {
    'avatar': function(value) {
      this.setData({
        _imgUrl: value,
      })
    },
    'userName': function(value) {
      this.setData({
        _userName: value || '不想透露昵称的客户',
      })
    },
    'message': function(value) {
      this.setData({
        _message: value,
      })
    },
    'messageTime': function(value) {
      console.log(value);
      this.setData({
        _messageTime: TIME.transformTime(value),
      })
    },
    'noticeInt': function(value) {
      this.setData({
        _noticeInt: value > -1 ? value : -1,
      })
    },
  },

  data: {
    _imgUrl: "",
    _userName: "",
    _message: "",
    _messageTime: "",
    _noticeInt: -1,
  },

  methods: {

    onTapItem() {

      this.triggerEvent('onTapItem', {
        index: this.data.index
      });

    },

  },
});
