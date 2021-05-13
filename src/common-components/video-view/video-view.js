/**
 * @module video-view
 * @description 视频组件
 * @property {string}   videoUrl  视频链接
 * @property {string}   poster    视频封面
 * @property {boolean}   play     是否播放，默认为false
 * @property {number}   index     作为该视频的id标识，如video-{{index}}
 * @property {string}   width     视频屏幕的宽度，默认为343px
 * @property {string}   height    视频屏幕的高度，默认为192px
 * @fires controlPlay 控制播放分发事件
 */

Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    videoUrl: {
      type: String,
      value: "",
    },
    poster: {
      type: String,
      value: "",
    },
    play: {
      type: Boolean,
      value: false,
    },
    index: {
      type: Number,
      value: 0,
    },
    width: {
      type: String,
      value: "343px",
    },
    height: {
      type: String,
      value: "192px",
    },
  },


  observers: {
    'play': function(value) {
      if (!value) {
        this.videoContext && this.videoContext.pause();
      }
    }
  },

  data: {
    index: 0,
  },

  methods: {

    controlPlay: function(e) {
      // console.log(e);
      this.triggerEvent("controlPlay", {
        index: this.data.index
      });
    },

    init: function() {
      this.videoContext.seek(0);
      this.videoContext.stop();
    },

    videoErrorCb(e) {
      console.log("视频错误信息：", e);
    },

    click() {
      let self = this;
      self.setData({
        play: true
      }, () => {
        self.videoContext.play();
      })
    },

  },

  lifetimes: {
    attached() {
      this.videoContext = wx.createVideoContext("video-" + this.data.index, this);
    }
  },
})
