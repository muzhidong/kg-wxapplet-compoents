/**
 * @module preview-image
 * @description 图片预览组件，支持图片放大、缩小、移动、横屏查看
 * @property {string} src 要预览的图片地址
 */

// 参数调优：
// 两指最大距离阈值
const maxDistance = Number.MAX_VALUE;
// 两指最小距离阈值
const minDistance = 20;
// 最短移动距离阈值
const minMoveDistance = 40;
// 缩放范围
const minScaleRange = 0.8;
const maxScaleRange = 6;
// 距离最大有效比例
const maxValidRatio = 60;

// 放大缩小涉及参数：
// 两指初始距离
let initialDistance = 0;
// 两指当前距离
let currentDistance = 0;
// 算出放大增量与距离比例的比
let k = (maxScaleRange - 1) / (maxValidRatio - 1);

// 移动涉及参数：
// 起点位置
let startX;
let startY;
// 终点位置
let endX;
let endY;
// 移动距离
let moveDistance = 0;

// 操作状态：移动状态move、缩放状态scale
let state = '';

// 当前是否正在渲染中
let isRendering = false;

// 窗口宽、高
let {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync();

Component({

  options: {
    addGlobalClass: true,
    pureDataPattern: new RegExp('^_'),
  },

  properties: {
    // 图片地址
    src: {
      type: 'string',
      value: ''
    }
  },

  observers: {
    'src': function(newValue) {

      if (!newValue) return;

      let self = this;
      wx.getImageInfo({
        src: newValue,
        success(res) {
          let {
            width,
            height,
          } = res;
          self.setData({
            _picWidth: windowWidth,
            _picHeight: windowWidth * height / width,
          })
        },
      })

    }
  },

  data: {
    // 当前方向
    orientation: 'portrait',
    // x轴方向移动偏移量
    offsetX: 0,
    // y轴方向移动偏移量
    offsetY: 0,
    // 放大缩小倍数
    scale: 1,
    // 图片宽、高
    _picWidth: 0,
    _picHeight: 0,
  },

  pageLifetimes: {
    resize(res) {
      // console.log('resize...', res);
      this.setData({
        orientation: res.deviceOrientation,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
      }, () => {
        initialDistance = 0;
        currentDistance = 0;
        startX = 0;
        startY = 0;
        endX = 0;
        endY = 0;
        moveDistance = 0;
      })
    }
  },

  methods: {

    onTouchstart(e) {

      // console.log('start...', e);
      let {
        touches
      } = e;
      if (touches.length === 2) {
        state = 'scale';
        // 两根手指同时按下，获取两指起始位置，计算二者距离，作为初始距离
        initialDistance = this._calcDistance(touches[0].pageX, touches[0].pageY, touches[1].pageX, touches[1].pageY);
      } else if (touches.length === 1) {
        state = 'move';
        // 单指按下，记录当前位置
        startX = touches[0].pageX;
        startY = touches[0].pageY;
      }
    },

    onTouchmove(e) {

      // console.log('move...', e);
      if (isRendering) return;

      let {
        touches
      } = e;
      if (state === 'scale' && touches.length === 2) {

        // 两根手指同时移动，获取两指移动时移动位置，计算二者距离，如果比上次距离大，则放大图片，如果小，则缩小图片，注意当大于某个距离不再放大，小于某个距离不再缩小
        currentDistance = this._calcDistance(touches[0].pageX, touches[0].pageY, touches[1].pageX, touches[1].pageY);

        let absDiff = Math.abs(currentDistance - initialDistance);
        if (absDiff > minDistance && absDiff < maxDistance) {

          // console.log('scale...', currentDistance, initialDistance);
          isRendering = true;

          // scale是增量变化，使用全量变化的话下次放大不是基于上次进行放大。
          if (currentDistance > initialDistance) {
            // 距离比例>1 放大
            this.setData({
              scale: this.data.scale + k * (currentDistance / initialDistance - 1)
            }, () => {
              isRendering = false;
            })
          } else {
            // 距离比例<1 缩小
            this.setData({
              scale: Math.max(this.data.scale - minScaleRange * (1 - currentDistance / initialDistance), minScaleRange)
            }, () => {
              isRendering = false;
            })
          }
        }
      } else if (state === 'move' && touches.length === 1) {
        // 单指移动，获取当前位置，计算二者距离，进行偏移
        endX = touches[0].pageX;
        endY = touches[0].pageY;
        moveDistance = this._calcDistance(startX, startY, endX, endY);

        if (moveDistance > minMoveDistance) {

          // console.log('move...',startX,endX);
          // console.log('move...',startY,endY);
          // console.log('move...',moveDistance);
          isRendering = true;

          //计算图片宽、高与窗口宽、高的差绝对值，再除以2
          let deltaX = Math.abs(windowWidth - this.data._picWidth * this.data.scale) / 2;
          let deltaY = Math.abs(windowHeight - this.data._picHeight * this.data.scale) / 2;

          let offsetX = this.data.offsetX + endX - startX;
          let offsetY = this.data.offsetY + endY - startY;
          if (offsetX > 0) {
            // 右移，取当前计算偏移量与deltaX的最小值
            offsetX = Math.min(offsetX, deltaX);
          } else {
            // 左移，取当前计算偏移量与deltaX的最大值
            offsetX = Math.max(offsetX, -deltaX);
          }
          if (offsetY > 0) {
            // 下移,取当前计算偏移量与deltaY的最小值
            offsetY = Math.min(offsetY, deltaY);
          } else {
            // 上移,取当前计算偏移量与deltaY的最大值
            offsetY = Math.max(offsetY, -deltaY);
          }

          this.setData({
            offsetX,
            offsetY,
          }, () => {
            startX = endX;
            startY = endY;
            isRendering = false;
          })
        }
      }
    },

    onTouchend(e) {
      // console.log('end...', e);
      if (state === 'scale') {
        if (this.data.scale === minScaleRange) {
          this.setData({
            scale: 1,
          });
        } else if (this.data.scale > maxScaleRange) {
          this.setData({
            scale: maxScaleRange,
          })
        }
      }
      state = '';
    },

    // 计算两点间绝对距离
    _calcDistance(startX, startY, endX, endY) {
      return Math.round(Math.sqrt(Math.pow(Math.abs(startX - endX), 2) + Math.pow(Math.abs(startY - endY), 2)));
    },

    onPreviewImage(e) {

      // console.log('longpress...', e);

      if (state === 'scale') return;

      let {
        pageX,
        pageY
      } = e.touches[0];
      if (pageX === startX && pageY === startY) {
        wx.previewImage({
          urls: [this.data.src],
        });
        state = '';
      }

    }
  }
})
