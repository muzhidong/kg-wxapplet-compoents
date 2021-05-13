/*
 * @file canvas 绘制公用方法
 * @author xuzhuqiang@kungeek.com
 * @since 1.0
 * @createDate 2019-08-23
 *
 * 注意：不需要带有登录信息之类的图片资源下载，shouldDownload 应该传 false，这样能把下载的资源临时文件路径缓存起来
 *      避免二次下载；shouldDownload 为 true 的不缓存；
 */

// 绘制任务类型
export const DRAW_TYPE_DICT = {
  // 背景图片
  CTX_BG_IMAGE: 'canvasBgImage',
  // 矩形
  CTX_RECT: 'rect',
  // 文字
  CTX_TEXT: 'text',
  // 图片
  CTX_IMAGE: 'image',
  // 裁剪
  CTX_CLIP: 'clip',
  // 保存当前绘制的上下文
  CTX_SAVE: 'save',
  // 恢复上个保存的绘制上下文
  CTX_RESTORE: 'restore',
  // 线性渐变
  CTX_LINEAR_GRADIENT: 'linearGradient',
};

// canvas绘制公用行为
export const CanvasDrawBehavior = Behavior({

  data: {
    // canvas图片缓存列表
    bgTempCache: [],
    // 绘制任务列表，示例如下，
    /**
      [{
          type: DRAW_TYPE_DICT.CTX_BG_IMAGE, // 背景任务类型
          shouldDownload: false, // 是否需要设置头信息去获取
          url: assetsBasePath + 'images/poster_bg@2x.png',
      },
      {
          type: DRAW_TYPE_DICT.CTX_RECT, // 矩形任务类型
          // 此处定位(top, right, bottom, left)只设置位置参照边的相对距离
              width: 矩形宽, height: 矩形高, top|right|bottom|left: 矩形相对canvas上边|右边|下边|左边的距离, radius: 矩形圆角
          sizeObj: { width: 702, height: 400, radius: 20, bottom: 24, left: 24 },
          // 设置样式
              fillStyle {String | Object}: 矩形填充颜色, 值为对象时，为特殊填充模式（渐变）
                  type: linear|circular 线性渐变|径向渐变
                  colors: ['#aaaaaa', '#bbbbbb'], 渐变的颜色列表，起 -> 止
                  x0, y0: 线性渐变起点
                  x1, y1: 线性渐变终点
                  x, y: 径向渐变圆心坐标
                  r: 径向渐变半径
          styleObj: { fillStyle: 'rgba(255, 255, 255, 1)' }
      },
      {
          type: DRAW_TYPE_DICT.CTX_TEXT, // 文字任务类型
          text: `关注客户需求`, // 文字
          // 设置样式
              top|bottom|left: 文字相对canvas上边|下边|左边的距离（文字不能传right值）, fontSize: 文字大小, color: 文字颜色, lineHeight: 一行高度, bold: 是否加粗, lineMaxWidth: 一行最大宽度，不设置传0或不传, maxHeight: 文字区域最大高度，不设置传0或不传
              注：文字基线对齐都为top
          styleObj: { bottom: 357, left: 62, fontSize: 28, color: '#999999', lineHeight: 28, bold: false, lineMaxWidth: 0, maxHeight: 0 }
      },
      {
          type: DRAW_TYPE_DICT.CTX_IMAGE, // 图片任务类型
          shouldDownload: false, // 是否需要设置头信息去获取
          url: assetsBasePath + 'images/card_phone2@2x.png', // 图片资源链接，上传到crm项目中，如需用带请求头的，请设置shouldDownload为true
          // 设置样式
              top|right|bottom|left: 图片相对canvas上边|右边|下边|左边的距离, width: 图片绘制的宽, height: 图片绘制的高
              注：此任务默认按照展示宽高显示全图，有可能导致图片失真不等比
          sizeObj: { bottom: 158, left: 62, width: 24, height: 24 }
      },
      {
          type: DRAW_TYPE_DICT.CTX_CLIP, // 裁剪任务类型
      },
      {
          type: DRAW_TYPE_DICT.CTX_SAVE, // 保存当前绘制上下文任务类型
      },
      {
          type: DRAW_TYPE_DICT.CTX_RESTORE, // 恢复上次保存的绘制上下文任务类型
      }]
    */
    drawTaskList: [],
    // canvas 宽
    canvasWidth: 0,
    // canvas 高
    canvasHeight: 0,
    // canvas 绘图上下文 CanvasContex
    ctx: null,
    // 真实尺寸和设计稿(750)的比率（此比率需乘以缩放scale的值），所有固定大小的直接取设计稿尺寸乘以此比率即为绘制尺寸
    ratio: 375 / 750,
    // 是否绘制完成
    isDone: false,
    // 绘制完成的回调
    taskDone: null,
  },

  lifetimes: {

    // 在组件实例刚刚被创建时执行
    created: function() {
      // 读取图片缓存
      let localBgTempCache = wx.getStorageSync('bg_temp_cache');
      localBgTempCache && localBgTempCache.length > 0 && (this.data.bgTempCache = localBgTempCache);
    },

    // 每当组件方法抛出错误时执行
    error: function(err) {
      console.log(err);
    },

  },

  methods: {

    /**
     * 按照绘制任务绘制
     * @private
     */
    _drawTask() {
      let taskList = this.data.drawTaskList;
      if (taskList.length <= 0) {
        return;
      }
      let task = taskList.shift();
      switch (task.type) {
        case DRAW_TYPE_DICT.CTX_BG_IMAGE:
          // 绘制 canvas 背景
          this._drawCanvasBg(task)
            .then(() => {});
          break;
        case DRAW_TYPE_DICT.CTX_RECT:
          // 绘制矩形
          this._drawRect(task.sizeObj, task.styleObj);
          break;
        case DRAW_TYPE_DICT.CTX_TEXT:
          this._drawText(task.text, task.styleObj);
          break;
        case DRAW_TYPE_DICT.CTX_IMAGE:
          this._drawImage(task)
            .then(() => {});
          break;
        case DRAW_TYPE_DICT.CTX_CLIP:
          this._drawClip();
          break;
        case DRAW_TYPE_DICT.CTX_SAVE:
          this._drawSave();
          break;
        case DRAW_TYPE_DICT.CTX_RESTORE:
          this._drawRestore();
          break;
      }
    },

    /**
     * 获取网络图片
     * @param url 图片链接
     * @param canCache 能否缓存临时文件路径
     * @return {Promise<any>}
     * @private
     */
    _getImage(url, canCache = true) {
      let reUrl = '';
      let reIndex = 0;
      let bgTempCache = this.data.bgTempCache;
      for (let i = 0, len = bgTempCache.length; i < len; i++) {
        let item = bgTempCache[i];
        if (item.url === url) {
          reUrl = item.cacheUrl;
          reIndex = i;
          break;
        }
      }
      console.warn(url, reUrl);
      return this._wxGetImageInfo(reUrl || url)
        .then(res => {
          if (!reUrl && canCache) {
            bgTempCache.push({
              url,
              cacheUrl: res.path
            });
            wx.setStorageSync('bg_temp_cache', bgTempCache);
          }
          return res;
        })
        .catch((err) => {
          if (reUrl) {
            bgTempCache.splice(reIndex, 1);
            wx.setStorageSync('bg_temp_cache', bgTempCache);
            return this._getImage(url);
          } else {
            throw (err);
          }
        });
    },

    /**
     * 微信 getImageInfo to Promsie
     */
    _wxGetImageInfo(url) {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: url,
          success: function(res) {
            resolve(res);
          },
          fail: function(err) {
            reject(err);
          }
        });
      })
    },

    /**
     * 下载图片
     * @param url
     * @return {*}
     * @private
     */
    _downloadImage(url) {
      return download(url).then(res => {
        console.warn('=====================', res);
        return this._getImage(res, false);
      })
    },

    /**
     * 获取系统信息
     * @return {Promise<any>}
     */
    _getSystemInfo() {
      return new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: function(res) {
            resolve(res);
          },
          fail: function(err) {
            reject(err);
          }
        })
      })
    },

    /**
     * 整张背景绘制任务处理
     * @param task
     * @private
     */
    _drawCanvasBg(task) {

      if (!task.url) {
        return new Promise((resolve, reject) => {
          this._isDone();
        })
      }

      let canvasWidth = this.data.canvasWidth,
        canvasHeight = this.data.canvasHeight,
        ctx = this.data.ctx;

      if (task.shouldDownload) {
        // 是否需要带上请求头下载
        return this._downloadImage(task.url)
          .then(imageInfo => {
            // 为了保持原比例所需的原图片截取高度
            let sy = canvasHeight / canvasWidth * imageInfo.width;
            ctx.drawImage(imageInfo.path, 0, 0, imageInfo.width, sy, 0, 0, canvasWidth, canvasHeight);
            this._isDone();
          })
          .catch(err => {
            this._isDone();
            console.warn(err);
          })
      } else {
        // 不需要带上请求头参数的使用 getImage 来下载
        return this._getImage(task.url)
          .then(imageInfo => {
            // 为了保持原比例所需的原图片截取高度
            let sy = canvasHeight / canvasWidth * imageInfo.width;
            ctx.drawImage(imageInfo.path, 0, 0, imageInfo.width, sy, 0, 0, canvasWidth, canvasHeight);
            this._isDone();
          })
          .catch(err => {
            this._isDone();
            console.warn(err);
          });
      }
    },

    /**
     * 图片绘制任务处理
     * @param task
     * @private
     */
    _drawImage(task) {

      if (!task.url) {
        return new Promise((resolve, reject) => {
          this._isDone();
        })
      }

      let ctx = this.data.ctx;
      let sizeObj = this._handleSize(task.sizeObj);
      if (task.shouldDownload) {
        // 是否需要带上请求头下载
        return this._downloadImage(task.url)
          .then(imageInfo => {
            ctx.drawImage(imageInfo.path, 0, 0, imageInfo.width, imageInfo.height, sizeObj.x, sizeObj.y, sizeObj.width, sizeObj.height);
            this._isDone();
          })
          .catch(err => {
            this._isDone();
            console.warn(err);
          })
      } else {
        // 不需要带上请求头参数的使用 getImage 来下载
        return this._getImage(task.url)
          .then(imageInfo => {
            ctx.drawImage(imageInfo.path, 0, 0, imageInfo.width, imageInfo.height, sizeObj.x, sizeObj.y, sizeObj.width, sizeObj.height);
            this._isDone();
          })
          .catch(err => {
            this._isDone();
            console.warn(err);
          })
      }
    },

    /**
     * 绘制矩形
     * @private
     */
    _drawRect(sizeObj, styleObj) {
      // 全局的参数
      let ctx = this.data.ctx;

      ctx.beginPath();

      let rect = this._handleSize(sizeObj);
      let style = this._handleSize(styleObj);

      // 上边
      ctx.moveTo(rect.x + rect.radius, rect.y);
      ctx.lineTo(rect.x + rect.width - rect.radius, rect.y);
      // 右上圆角
      ctx.arcTo(rect.x + rect.width, rect.y, rect.x + rect.width, rect.y + rect.radius, rect.radius);
      // 右边
      ctx.lineTo(rect.x + rect.width, rect.y + rect.height - rect.radius);
      // 右下圆角
      ctx.arcTo(rect.x + rect.width, rect.y + rect.height, rect.x + rect.width - rect.radius, rect.y + rect.height, rect.radius);
      // 下边
      ctx.lineTo(rect.x + rect.radius, rect.y + rect.height);
      // 左下圆角
      ctx.arcTo(rect.x, rect.y + rect.height, rect.x, rect.y + rect.height - rect.radius, rect.radius);
      // 左边
      ctx.lineTo(rect.x, rect.y + rect.radius);
      // 左上圆角
      ctx.arcTo(rect.x, rect.y, rect.x + rect.radius, rect.y, rect.radius);

      ctx.closePath();

      // 设置填充样式
      if (style.fillStyle && typeof style.fillStyle === 'string') {
        // 普通填充
        ctx.fillStyle = style.fillStyle;
      } else {
        // 渐变填充
        let fillStyle = this._handleSize(style.fillStyle),
          grd;
        switch (fillStyle.type) {
          // 线性渐变
          case 'linear':
            grd = ctx.createLinearGradient(fillStyle.x0, fillStyle.y0, fillStyle.x1, fillStyle.y1)
            break;
            // 径向渐变
          case 'circular':
            grd = ctx.createCircularGradient(fillStyle.x, fillStyle.y, fillStyle.r);
            break;
        }
        for (let i = 0, len = fillStyle.colors.length; i < len; i++) {
          grd.addColorStop(i, fillStyle.colors[i]);
        }
        ctx.fillStyle = grd;
      }
      // 设置线条样式 TODO 等有传值再进行处理  

      ctx.fill();
      this._isDone();
    },

    /**
     * 绘制文本
     * @param text 文本变量对象
     * @param lineMaxWidth 一行最大字数，不换行传0
     * @param styleObj 文本样式
     * @private
     */
    _drawText(text, styleObj) {
      // 全局的参数
      let ctx = this.data.ctx;
      ctx.beginPath();
      // 处理样式
      let style = this._handleSize(styleObj);
      // 渲染文字队列
      let textArr = [text];
      // 设置文字对齐为顶端对齐
      ctx.setTextBaseline('top');
      // 设置字体大小
      // style.fontSize && ctx.setFontSize(style.fontSize);
      // 设置字体填充颜色
      if (style.color) {
        ctx.fillStyle = style.color;
        ctx.strokeStyle = style.color;
      }
      // 设置字体其他样式
      ctx.font = `${style.fontStyle || 'normal'} ${style.bold ? 'bold' : 'normal'} ${style.fontSize || 24}px ${style.fontFamily || 'normal'}`;
      // style.bold && ctx.setLineWidth(style.bold);
      let isOverflow = false;
      // 处理分行
      if (style.lineMaxWidth && style.lineMaxWidth > 0) {
        let arr = [];
        let item = '';
        let itemWidth = 0;
        for (let i = 0, len = text.length; i < len; i++) {
          let iw = ctx.measureText(text[i]).width;
          if (itemWidth + iw < style.lineMaxWidth) {
            item += text[i];
            itemWidth += iw;
            if (i === len - 1) {
              arr.push(item);
            }
          } else {
            arr.push(item);
            item = text[i];
            itemWidth = iw;
          }
          if (style.lineHeight && style.maxHeight && i < len - 1) {
            if (style.lineHeight * arr.length > style.maxHeight - style.lineHeight) {
              isOverflow = true;
              break;
            }
          }
        }
        textArr = arr;
      }

      let textHeight = 0;
      for (let i = 0, len = textArr.length; i < len; i++) {
        let item = textArr[i],
          iw = ctx.measureText(item).width,
          spaceW = ctx.measureText(' ').width;
        if (i === len - 1 && style.textOverflow && isOverflow) {
          let tow = ctx.measureText(style.textOverflow).width,
            fontsWidth = 0;
          for (let k = item.length - 1; k > 0; k--) {
            let kw = ctx.measureText(item[k]).width;
            if (kw < tow) {
              fontsWidth += kw;
            } else {
              item = item.slice(0, k + 1) + style.textOverflow;
              break;
            }
          }
        }
        ctx.fillText(item || '', style.x, style.y + style.lineHeight * i, style.maxWidth || undefined);
      }
      this._isDone();
    },

    /**
     * 处理文字换行
     * @private
     * @returns 返回分好的字符串数组
     */
    _handleTextWrap(text) {

    },

    /**
     * 保存当前绘制上下文
     * @private
     */
    _drawSave() {
      let ctx = this.data.ctx;
      ctx.save();
      this._isDone();
    },

    /**
     * 剪切上一步的图形
     * @private
     */
    _drawClip() {
      let ctx = this.data.ctx;
      ctx.clip();
      this._isDone();
    },

    /**
     * 恢复上一个保存的绘制上下文
     * @private
     */
    _drawRestore() {
      let ctx = this.data.ctx;
      ctx.restore();
      this._isDone();
    },

    _drawLinearGradient() {
      let ctx = this.data.ctx;
      this._isDone();
    },

    _isDone() {
      if (this.data.drawTaskList.length <= 0) {
        this.data.ctx.draw(false, () => {
          setTimeout(() => {
            this.data.isDone = true;
            this.taskDone();
          }, 200)
        });
      } else {
        this.data.isDone = false;
        this._drawTask();
      }
    },

    /**
     * 生成图片，获取临时路径
     * @return {Promise<any>}
     */
    getTempFilePath() {
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
          destWidth: this.data.canvasWidth * 3,
          destHeight: this.data.canvasHeight * 3,
          canvasId: 'drawCanvas',
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err);
          }
        }, this);
      });
    },

    /**
     * 处理尺寸为当前显示尺寸
     *    传入的 top, right, bottom, left 都会转换为当前 canvas 的 x, y 坐标值
     * @param sizeObj
     */
    _handleSize(sizeObj) {
      let ratio = this.data.ratio,
        canvasWidth = this.data.canvasWidth,
        canvasHeight = this.data.canvasHeight,
        newSizeObj = {};
      let keys = Object.keys(sizeObj);
      for (let key of keys) {
        let value = sizeObj[key];
        if (typeof value === 'number') {
          newSizeObj[key] = Math.floor(value * ratio);
        } else {
          switch (key) {
            // 单独处理宽高 100% 和 auto
            case 'width':
              if (value === 'auto' || value === '100%') {
                newSizeObj[key] = canvasWidth;
              }
              break;
            case 'height':
              if (value === 'auto' || value === '100%') {
                newSizeObj[key] = canvasHeight;
              }
              break;
            default:
              newSizeObj[key] = value;
              break;
          }
        }
      }
      return this._handlePositionSize(newSizeObj);
    },

    /**
     * 处理参照边，转换为x,y坐标
     * @param sizeObj
     * @return {*}
     * @private
     */
    _handlePositionSize(sizeObj) {
      let canvasWidth = this.data.canvasWidth,
        canvasHeight = this.data.canvasHeight,
        ctx = this.data.ctx;
      let keys = Object.keys(sizeObj);
      for (let key of keys) {
        switch (key) {
          case 'top':
            sizeObj.y = sizeObj[key];
            break;
          case 'right':
            if (typeof sizeObj.width === 'number') {
              sizeObj.x = canvasWidth - sizeObj[key] - sizeObj.width;
            } else {
              let width = ctx.measureText('Hello World');
              console.log(`---------------------- ${width} ------------------------`);
            }
            break;
          case 'bottom':
            sizeObj.y = canvasHeight - sizeObj[key] - (sizeObj.height || (sizeObj.lineHeight));
            break;
          case 'left':
            sizeObj.x = sizeObj[key];
            break;
          default:
            break;
        }
      }
      return sizeObj;
    },

  }

});

function download(url) {
  return new Promise((resolve, reject) => {

    let wxRequestTask = wx.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath);
        } else {
          reject({
            msg: res,
            status: 'fail',
            success: false,
          });
        }
      },
      fail: (err) => {
        reject({
          msg: err,
          status: 'fail',
          success: false,
        });
      },
      complete: (res) => {

      }
    })
  });
}
