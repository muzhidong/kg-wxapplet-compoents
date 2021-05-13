/**
 * @module canvas-to-image
 * @description 绘制单页全屏图片。手动在外部获取此组件进行调用生成图片方法，不另外抛出方法。
 *    注意：1、所有用到的图片均上传到服务器
 *         2、编写 task 队列时，注意绘制顺序
 *         3、默认使用宽为 750px 的设计稿尺寸
 *         4、需要自动适应计算处理的尺寸必须传入 number 类型，对于需要覆盖整个canvas宽高的尺寸请设置为100%{String}或者auto{String}（目前仅支持width、height）
 *         5、目前默认导出 canvas 的3倍宽高的图片
 *
 *    TODO: 后续尝试使用1倍图片，再生成导出高倍像素图片（待确认可行性）
 * @property {number}  scale              图片缩放比例
 * @property {boolean} autoGenerateImage  是否自动生成图片
 * @property {Array}   taskList           任务列表
 * @property {number}  index              当在同页有多张图片同时生成时有效，表示在父组件中图片列表的索引
 */

import {
  CanvasDrawBehavior,
  DRAW_TYPE_DICT
} from './canvas-draw-behavior.js';

Component({

  behaviors: [CanvasDrawBehavior],

  properties: {

    scale: {
      type: Number,
      value: 1,
      observer: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.initCanvas();
        }
      }
    },

    autoGenerateImage: {
      type: Boolean,
      value: true,
    },

    taskList: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.data.drawTaskList = [...newVal];
          this.startDrawTask();
        }
      }
    },

    // 用于同时生成多张图片时有对应的索引
    index: {
      type: Number,
      value: -1,
    }
  },

  data: {

    startTimer: null,

    nTimeOut: 0,

    endTimeOut: 3000,
  },

  lifetimes: {

    // 在组件在视图层布局完成后执行
    ready: function() {
      this.initCanvas();
    },

    // 每当组件方法抛出错误时执行
    error: function(err) {
      console.log(err);
    },

  },

  methods: {

    initCanvas() {
      let _this = this;
      this.data.isDone = false;
      const query = this.createSelectorQuery().in(this);
      wx.getSystemInfo({
        success(res) {
          query.select('.canvas-box').boundingClientRect((rect) => {
            console.log('card-to-image canvas-box rect info:', rect);
            _this.data.canvasWidth = rect.width * _this.data.scale;
            _this.data.canvasHeight = rect.height * _this.data.scale;
            _this.data.ratio = (res.windowWidth || 750) / 750 * _this.data.scale;
            _this.setData({
              canvasWidth: _this.data.canvasWidth,
              canvasHeight: _this.data.canvasHeight,
              ratio: _this.data.ratio
            })
          }).exec();
        }
      })

    },

    startDrawTask() {
      const time = 20;
      this.data.startTimer && clearTimeout(this.data.startTimer);
      this.data.startTimer = null;
      this.data.ctx = wx.createCanvasContext('drawCanvas', this);
      if (!this.data.canvasWidth || !this.data.canvasHeight) {
        if (this.data.nTimeOut >= this.data.endTimeOut) {
          console.warn('canvas 渲染超时 ---------------------------');
          return;
        }
        this.data.startTimer = setTimeout(() => {
          this.data.nTimeOut += time;
          this.startDrawTask();
        }, time);
      } else {
        this.initDraw();
      }
    },
    initDraw() {
      // 清除画板
      if (!this.data.drawTaskList || this.data.drawTaskList.length <= 0) return;
      this.data.ctx.clearRect(0, 0, this.data.canvasWidth, this.data.canvasHeight);
      console.log('绘制任务流', this.data.drawTaskList);
      this._drawTask();
    },

    canvasError(e) {
      console.log(e);
    },

    taskDone() {
      this.triggerEvent('drawDone', {});
      if (this.data.autoGenerateImage) {
        this.getTempFilePath()
          .then(url => {
            this.triggerEvent('generateDone', {
              url,
              idx: this.data.index
            });
          })
          .catch(err => {
            this.triggerEvent('generateError', err);
          })
      }
    },

  }
});
