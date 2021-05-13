/**
 * @module image-cropper
 * @description 图片裁剪器
 * @property {string} imgSrc         图片路径
 * @property {number} height         裁剪框高度，默认200
 * @property {number} width          裁剪框宽度，默认200
 * @property {number} minWidth      裁剪框最小宽度，默认100
 * @property {number} minHeight     裁剪框最小高度，默认100
 * @property {number} maxWidth      裁剪框最大宽度，默认300
 * @property {number} maxHeight     裁剪框最大高度，默认300
 * @property {boolean} disableWidth  裁剪框横向禁止拖动，默认false
 * @property {boolean} disableHeight 裁剪框纵向禁止拖动，默认false
 * @property {boolean} disableRatio  锁定裁剪框比例，默认false
 * @property {number} exportScale    生成的图片尺寸相对剪裁框的比例，默认为3
 * @property {number} quality         生成的图片质量，值范围为0-1
 * @property {number} cutTop         剪裁框Y轴偏移量  
 * @property {number} cutLeft        剪裁框X轴偏移量
 * @property {number} canvasTop      canvasY轴偏移量 ，不设置默认不显示
 * @property {number} canvasLeft     canvasX轴偏移量，不设置默认不显示
 * @property {number} imgWidth       图片宽度
 * @property {number} imgHeight      图片高度
 * @property {number} scale           图片缩放比，默认为1
 * @property {number} angle           图片旋转角度，默认为0
 * @property {boolean} minScale      最小缩放比，默认为0.5
 * @property {boolean} maxScale      最大缩放比，默认为2
 * @property {boolean} disableRotate 是否禁用旋转，默认false
 * @property {boolean} limitMove     是否限制移动范围(剪裁框只能在图片内)，默认false
 * @fires init       初始化完成分发事件
 * @fires imageLoad  图片加载完成分发事件
 * @fires cutComplete     图片裁剪完成分发事件
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    /**     
     * 图片路径
     */
    'imgSrc': {
      type: String
    },
    /**
     * 裁剪框高度
     */
    'height': {
      type: Number,
      value: 200
    },
    /**
     * 裁剪框宽度
     */
    'width': {
      type: Number,
      value: 200
    },
    /**
     * 裁剪框最小尺寸
     */
    'minWidth': {
      type: Number,
      value: 100
    },
    'minHeight': {
      type: Number,
      value: 100
    },
    /**
     * 裁剪框最大尺寸
     */
    'maxWidth': {
      type: Number,
      value: 300
    },
    'maxHeight': {
      type: Number,
      value: 300
    },
    /**
     * 裁剪框禁止拖动
     */
    'disableWidth': {
      type: Boolean,
      value: false
    },
    'disableHeight': {
      type: Boolean,
      value: false
    },
    /**
     * 锁定裁剪框比例
     */
    'disableRatio': {
      type: Boolean,
      value: false
    },
    /**
     * 生成的图片尺寸相对剪裁框的比例
     */
    'exportScale': {
      type: Number,
      value: 3
    },
    /**
     * 生成的图片质量0-1
     */
    'quality': {
      type: Number,
      value: 1
    },
    'cutTop': {
      type: Number,
      value: null
    },
    'cutLeft': {
      type: Number,
      value: null
    },
    /**
     * canvas上边距（不设置默认不显示）
     */
    'canvasTop': {
      type: Number,
      value: null
    },
    /**
     * canvas左边距（不设置默认不显示）
     */
    'canvasLeft': {
      type: Number,
      value: null
    },
    /**
     * 图片宽度
     */
    'imgWidth': {
      type: null,
      value: null
    },
    /**
     * 图片高度
     */
    'imgHeight': {
      type: null,
      value: null
    },
    /**
     * 图片缩放比
     */
    'scale': {
      type: Number,
      value: 1
    },
    /**
     * 图片旋转角度
     */
    'angle': {
      type: Number,
      value: 0
    },
    /**
     * 最小缩放比
     */
    'minScale': {
      type: Number,
      value: 0.5
    },
    /**
     * 最大缩放比
     */
    'maxScale': {
      type: Number,
      value: 2
    },
    /**
     * 是否禁用旋转
     */
    'disableRotate': {
      type: Boolean,
      value: false
    },
    /**
     * 是否限制移动范围(剪裁框只能在图片内)
     */
    'limitMove': {
      type: Boolean,
      value: false
    }
  },

  data: {

    el: 'image-cropper', //暂时无用

    info: wx.getSystemInfoSync(),
    INIT_IMGWIDTH: 0, //图片设置尺寸,此值不变（记录最初设定的尺寸）
    INIT_IMGHEIGHT: 0, //图片设置尺寸,此值不变（记录最初设定的尺寸）

    _canvas_overflow: true, //canvas缩略图是否在屏幕外面
    _canvas_width: 200,
    _canvas_height: 200,

    TIME_BG: null, //背景变暗定时器
    TIME_CUT_CENTER: null, // 自动居中定时器

    MOVE_THROTTLE: null, //节流定时器
    MOVE_THROTTLE_FLAG: true, //节流标识

    _touch_img_relative: [{
      x: 0,
      y: 0
    }], //鼠标和图片中心的相对位置
    _flag_cut_touch: false, //是否是拖动裁剪框
    _hypotenuse_length: 0, //双指触摸时斜边长度
    _flag_img_endtouch: false, //是否结束触摸
    _flag_bright: true, //背景是否亮

    origin_x: 0.5, //图片旋转中心
    origin_y: 0.5, //图片旋转中心
    _cut_animation: false, //是否开启图片和裁剪框过渡
    _img_top: wx.getSystemInfoSync().windowHeight / 2, //图片上边距
    _img_left: wx.getSystemInfoSync().windowWidth / 2, //图片左边距

    watch: {
      //监听截取框宽高变化
      width(value, that) {
        if (value < that.data.minWidth) {
          that.setData({
            width: that.data.minWidth
          });
        }
        that._computeCutSize();
      },
      height(value, that) {
        if (value < that.data.minHeight) {
          that.setData({
            height: that.data.minHeight
          });
        }
        that._computeCutSize();
      },
      angle(value, that) {
        //停止居中裁剪框，继续修改图片位置
        that._moveStop();
        if (that.data.limitMove) {
          if (that.data.angle % 90) {
            that.setData({
              angle: Math.round(that.data.angle / 90) * 90
            });
            return;
          }
        }
      },
      _cut_animation(value, that) {
        //开启过渡300毫秒之后自动关闭
        clearTimeout(that.data._cut_animation_time);
        if (value) {
          that.data._cut_animation_time = setTimeout(() => {
            that.setData({
              _cut_animation: false
            });
          }, 300)
        }
      },
      limitMove(value, that) {
        if (value) {
          if (that.data.angle % 90) {
            that.setData({
              angle: Math.round(that.data.angle / 90) * 90
            });
          }
          that._imgMarginDetectionScale();
          !that.data._canvas_overflow && that._draw();
        }
      },
      canvasTop(value, that) {
        that._canvasDetectionPosition();
      },
      canvasLeft(value, that) {
        that._canvasDetectionPosition();
      },
      imgSrc(value, that) {
        that._pushImg();
      },
      cutTop(value, that) {
        that._cutDetectionPosition();
        if (that.data.limitMove) {
          !that.data._canvas_overflow && that._draw();
        }
      },
      cutLeft(value, that) {
        that._cutDetectionPosition();
        if (that.data.limitMove) {
          !that.data._canvas_overflow && that._draw();
        }
      }
    }

  },

  attached() {

    //监听数据
    this._watcher();

    // 设置画布大小与裁剪框大小一致
    this.setData({
      _canvas_height: this.data.height,
      _canvas_width: this.data.width,
    });
    this._initCanvas();

    // ？
    this.data.imgSrc && (this.data.imgSrc = this.data.imgSrc);

    // 记录图片初始大小
    this.data.info = wx.getSystemInfoSync();
    this.data.INIT_IMGWIDTH = this.data.imgWidth;
    this.data.INIT_IMGHEIGHT = this.data.imgHeight;
    this._initImageSize();

    //根据窗口大小调整裁剪框大小
    this._computeCutSize();

    //根据调整裁剪框位置
    this._cutDetectionPosition();

    //检查canvas是否在范围内
    this._canvasDetectionPosition();

    //初始化完成
    this.triggerEvent('init', {
      cropper: this
    });

  },

  methods: {

    /*** 供外部调用 start   */

    /**
     * 返回图片信息
     */
    getImg(getCallback) {
      this._draw(() => {
        wx.canvasToTempFilePath({
          width: this.data.width * this.data.exportScale,
          height: Math.round(this.data.height * this.data.exportScale),
          destWidth: this.data.width * this.data.exportScale,
          destHeight: Math.round(this.data.height) * this.data.exportScale,
          fileType: 'png',
          quality: this.data.quality,
          canvasId: this.data.el,
          success: (res) => {
            getCallback({
              url: res.tempFilePath,
              width: this.data.width * this.data.exportScale,
              height: this.data.height * this.data.exportScale
            });
          }
        }, this)
      });
    },

    /**
     * 设置图片动画
     * {
     *    x:10,//图片在原有基础上向下移动10px
     *    y:10,//图片在原有基础上向右移动10px
     *    angle:10,//图片在原有基础上旋转10deg
     *    scale:0.5,//图片在原有基础上增加0.5倍
     * }
     */
    setTransform(transform) {
      if (!transform) return;
      if (!this.data.disableRotate) {
        this.setData({
          angle: transform.angle ? this.data.angle + transform.angle : this.data.angle
        });
      }
      var scale = this.data.scale;
      if (transform.scale) {
        scale = this.data.scale + transform.scale;
        scale = scale <= this.data.minScale ? this.data.minScale : scale;
        scale = scale >= this.data.maxScale ? this.data.maxScale : scale;
      }
      this.data.scale = scale;
      let cutX = this.data.cutLeft;
      let cutY = this.data.cutTop;
      if (transform.cutX) {
        this.setData({
          cutLeft: cutX + transform.cutX
        });
        this.data.watch.cutLeft(null, this);
      }
      if (transform.cutY) {
        this.setData({
          cutTop: cutY + transform.cutY
        });
        this.data.watch.cutTop(null, this);
      }
      this.data._img_top = transform.y ? this.data._img_top + transform.y : this.data._img_top;
      this.data._img_left = transform.x ? this.data._img_left + transform.x : this.data._img_left;
      //图像边缘检测,防止截取到空白
      this._imgMarginDetectionScale();
      //停止居中裁剪框，继续修改图片位置
      this._moveDuring();
      this.setData({
        scale: this.data.scale,
        _img_top: this.data._img_top,
        _img_left: this.data._img_left
      });
      !this.data._canvas_overflow && this._draw();
      //可以居中裁剪框了
      this._moveStop(); //结束操作
    },

    /**
     * 设置剪裁框位置
     */
    setCutXY(x, y) {
      this.setData({
        cutTop: y,
        cutLeft: x
      });
    },

    /**
     * 设置剪裁框尺寸
     */
    setCutSize(w, h) {
      this.setData({
        width: w,
        height: h
      });
      this._computeCutSize();
    },

    /**
     * 设置剪裁框宽度-即将废弃
     */
    setWidth(width) {
      this.setData({
        width: width
      });
      this._computeCutSize();
    },

    /**
     * 设置剪裁框高度-即将废弃
     */
    setHeight(height) {
      this.setData({
        height: height
      });
      this._computeCutSize();
    },

    /**
     * 是否锁定旋转
     */
    setDisableRotate(value) {
      this.data.disableRotate = value;
    },

    /**
     * 是否限制移动
     */
    setLimitMove(value) {
      this.setData({
        _cut_animation: true,
        limitMove: !!value
      });
    },

    /**
     * 初始化图片，包括位置、大小、旋转角度
     */
    imgReset() {
      this.setData({
        scale: 1,
        angle: 0,
        _img_top: wx.getSystemInfoSync().windowHeight / 2,
        _img_left: wx.getSystemInfoSync().windowWidth / 2,
      })
    },

    /**
     * 设置图片放大缩小
     */
    setScale(scale) {
      if (!scale) return;
      this.setData({
        scale: scale
      });
      !this.data._canvas_overflow && this._draw();
    },

    /**
     * 设置图片旋转角度
     */
    setAngle(angle) {
      if (!angle) return;
      this.setData({
        _cut_animation: true,
        angle: angle
      });
      this._imgMarginDetectionScale();
      !this.data._canvas_overflow && this._draw();
    },

    /*** 供外部调用 end   */





    /**
     * 选择图片
     */
    _chooseImage() {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths[0];
          that._pushImg(tempFilePaths);
          // wx.showLoading({
          //   title: '加载中...'
          // })
        }
      })
    },

    /**
     * 设置剪裁框和图片居中
     */
    _setCenter() {
      let cutTop = (this.data.info.windowHeight - this.data.height) * 0.5;
      let cutLeft = (this.data.info.windowWidth - this.data.width) * 0.5;
      //顺序不能变
      this.setData({
        _img_top: this.data._img_top - this.data.cutTop + cutTop,
        cutTop: cutTop, //截取的框上边距
        _img_left: this.data._img_left - this.data.cutLeft + cutLeft,
        cutLeft: cutLeft, //截取的框左边距
      });
    },

    _setCutCenter() {
      let cutTop = (this.data.info.windowHeight - this.data.height) * 0.5;
      let cutLeft = (this.data.info.windowWidth - this.data.width) * 0.5;
      this.setData({
        cutTop: cutTop, //截取的框上边距
        cutLeft: cutLeft, //截取的框左边距
      });
    },

    /**
     * 加载（更换）图片
     */
    _pushImg(src) {

      if (src) {
        this.setData({
          imgSrc: src
        });
        //发现是手动赋值直接返回，交给watch处理
        return;
      }

      // getImageInfo接口传入 src: '' 会导致内存泄漏

      if (!this.data.imgSrc) return;
      wx.getImageInfo({
        src: this.data.imgSrc,
        success: (res) => {
          this.data.imageObject = res;
          //图片非本地路径需要换成本地路径
          if (this.data.imgSrc.search(/tmp/) == -1) {
            this.setData({
              imgSrc: res.path
            });
          }
          //计算最后图片尺寸
          this._imgComputeSize();
          if (this.data.limitMove) {
            //限制移动，不留空白处理
            this._imgMarginDetectionScale();
          }
          this._draw();
        },
        fail: (err) => {
          this.setData({
            imgSrc: ''
          });
        }
      });
    },

    imageLoad(e) {
      setTimeout(() => {
        this.triggerEvent('imageLoad', this.data.imageObject);
      }, 1000)
    },

    _initCanvas() {
      //初始化canvas
      if (!this.data.ctx) {
        this.data.ctx = wx.createCanvasContext("image-cropper", this);
      }
    },

    /**
     * 根据开发者设置的图片目标尺寸计算实际尺寸
     */
    _initImageSize() {

      //处理宽高特殊单位 %>px
      if (this.data.INIT_IMGWIDTH && typeof this.data.INIT_IMGWIDTH == "string" && this.data.INIT_IMGWIDTH.indexOf("%") != -1) {
        let width = this.data.INIT_IMGWIDTH.replace("%", "");
        this.data.INIT_IMGWIDTH = this.data.imgWidth = this.data.info.windowWidth / 100 * width;
      }

      if (this.data.INIT_IMGHEIGHT && typeof this.data.INIT_IMGHEIGHT == "string" && this.data.INIT_IMGHEIGHT.indexOf("%") != -1) {
        let height = this.data.imgHeight.replace("%", "");
        this.data.INIT_IMGHEIGHT = this.data.imgHeight = this.data.info.windowHeight / 100 * height;
      }

    },

    /**
     * 检测剪裁框位置是否在允许的范围内(屏幕内)
     */
    _cutDetectionPosition() {

      let _cutDetectionPositionTop = () => {
        //检测上边距是否在范围内
        if (this.data.cutTop < 0) {
          this.setData({
            cutTop: 0
          });
        }
        if (this.data.cutTop > this.data.info.windowHeight - this.data.height) {
          this.setData({
            cutTop: this.data.info.windowHeight - this.data.height
          });
        }
      };

      let _cutDetectionPositionLeft = () => {
        //检测左边距是否在范围内
        if (this.data.cutLeft < 0) {
          this.setData({
            cutLeft: 0
          });
        }
        if (this.data.cutLeft > this.data.info.windowWidth - this.data.width) {
          this.setData({
            cutLeft: this.data.info.windowWidth - this.data.width
          });
        }
      };

      //裁剪框坐标处理（如果只写一个参数则另一个默认为0，都不写默认居中）
      if (this.data.cutTop == null && this.data.cutLeft == null) {
        this._setCutCenter();
      } else if (this.data.cutTop != null && this.data.cutLeft != null) {
        _cutDetectionPositionTop();
        _cutDetectionPositionLeft();
      } else if (this.data.cutTop != null && this.data.cutLeft == null) {
        _cutDetectionPositionTop();
        this.setData({
          cutLeft: (this.data.info.windowWidth - this.data.width) / 2
        });
      } else if (this.data.cutTop == null && this.data.cutLeft != null) {
        _cutDetectionPositionLeft();
        this.setData({
          cutTop: (this.data.info.windowHeight - this.data.height) / 2
        });
      }

    },

    /**
     * 检测canvas位置是否在允许的范围内(屏幕内)如果在屏幕外则不开启实时渲染
     * 如果只写一个参数则另一个默认为0，都不写默认超出屏幕外
     */
    _canvasDetectionPosition() {
      if (this.data.canvasTop == null && this.data.canvasLeft == null) {
        this.data._canvas_overflow = false;
        this.setData({
          canvasTop: -5000,
          canvasLeft: -5000
        });
      } else if (this.data.canvasTop != null && this.data.canvasLeft != null) {
        if (this.data.canvasTop < -this.data.height || this.data.canvasTop > this.data.info.windowHeight) {
          this.data._canvas_overflow = true;
        } else {
          this.data._canvas_overflow = false;
        }
      } else if (this.data.canvasTop != null && this.data.canvasLeft == null) {
        this.setData({
          canvasLeft: 0
        });
      } else if (this.data.canvasTop == null && this.data.canvasLeft != null) {
        this.setData({
          canvasTop: 0
        });
        if (this.data.canvasLeft < -this.data.width || this.data.canvasLeft > this.data.info.windowWidth) {
          this.data._canvas_overflow = true;
        } else {
          this.data._canvas_overflow = false;
        }
      }
    },

    /**
     * 图片边缘检测-位置
     */
    _imgMarginDetectionPosition(scale) {

      if (!this.data.limitMove) return;

      let left = this.data._img_left;
      let top = this.data._img_top;
      var scale = scale || this.data.scale;

      let imgWidth = this.data.imgWidth;
      let imgHeight = this.data.imgHeight;
      if (this.data.angle / 90 % 2) {
        imgWidth = this.data.imgHeight;
        imgHeight = this.data.imgWidth;
      }

      left = this.data.cutLeft + imgWidth * scale / 2 >= left ? left : this.data.cutLeft + imgWidth * scale / 2;
      left = this.data.cutLeft + this.data.width - imgWidth * scale / 2 <= left ? left : this.data.cutLeft + this.data.width - imgWidth * scale / 2;
      top = this.data.cutTop + imgHeight * scale / 2 >= top ? top : this.data.cutTop + imgHeight * scale / 2;
      top = this.data.cutTop + this.data.height - imgHeight * scale / 2 <= top ? top : this.data.cutTop + this.data.height - imgHeight * scale / 2;

      this.setData({
        _img_left: left,
        _img_top: top,
        scale: scale
      })
    },

    /**
     * 图片边缘检测-缩放
     */
    _imgMarginDetectionScale() {

      if (!this.data.limitMove) return;

      let scale = this.data.scale;
      let imgWidth = this.data.imgWidth;
      let imgHeight = this.data.imgHeight;

      if (this.data.angle / 90 % 2) {
        imgWidth = this.data.imgHeight;
        imgHeight = this.data.imgWidth;
      }

      if (imgWidth * scale < this.data.width) {
        scale = this.data.width / imgWidth;
      }

      if (imgHeight * scale < this.data.height) {
        scale = Math.max(scale, this.data.height / imgHeight);
      }

      this._imgMarginDetectionPosition(scale);
    },

    /**
     * 计算图片尺寸
     */
    _imgComputeSize() {
      let imgWidth = this.data.imgWidth,
        imgHeight = this.data.imgHeight;
      if (!this.data.INIT_IMGHEIGHT && !this.data.INIT_IMGWIDTH) {
        //默认按图片最小边 = 对应裁剪框尺寸
        imgWidth = this.data.imageObject.width;
        imgHeight = this.data.imageObject.height;
        if (imgWidth / imgHeight > this.data.width / this.data.height) {
          imgHeight = this.data.height;
          imgWidth = this.data.imageObject.width / this.data.imageObject.height * imgHeight;
        } else {
          imgWidth = this.data.width;
          imgHeight = this.data.imageObject.height / this.data.imageObject.width * imgWidth;
        }
      } else if (this.data.INIT_IMGHEIGHT && !this.data.INIT_IMGWIDTH) {
        imgWidth = this.data.imageObject.width / this.data.imageObject.height * this.data.INIT_IMGHEIGHT;
      } else if (!this.data.INIT_IMGHEIGHT && this.data.INIT_IMGWIDTH) {
        imgHeight = this.data.imageObject.height / this.data.imageObject.width * this.data.INIT_IMGWIDTH;
      }
      this.setData({
        imgWidth: imgWidth,
        imgHeight: imgHeight
      });
    },

    //改变截取框大小
    _computeCutSize() {

      if (this.data.width > this.data.info.windowWidth) {
        this.setData({
          width: this.data.info.windowWidth,
        });
      } else if (this.data.width + this.data.cutLeft > this.data.info.windowWidth) {
        this.setData({
          cutLeft: this.data.info.windowWidth - this.data.cutLeft,
        });
      };

      if (this.data.height > this.data.info.windowHeight) {
        this.setData({
          height: this.data.info.windowHeight,
        });
      } else if (this.data.height + this.data.cutTop > this.data.info.windowHeight) {
        this.setData({
          cutTop: this.data.info.windowHeight - this.data.cutTop,
        });
      }

      !this.data._canvas_overflow && this._draw();

    },

    //图片开始触摸
    start(event) {

      this.data._flag_img_endtouch = false;

      if (event.touches.length == 1) {
        //单指拖动
        this.data._touch_img_relative[0] = {
          x: (event.touches[0].clientX - this.data._img_left),
          y: (event.touches[0].clientY - this.data._img_top)
        }
      } else {
        //双指放大
        let width = Math.abs(event.touches[0].clientX - event.touches[1].clientX);
        let height = Math.abs(event.touches[0].clientY - event.touches[1].clientY);
        this.data._touch_img_relative = [{
          x: (event.touches[0].clientX - this.data._img_left),
          y: (event.touches[0].clientY - this.data._img_top)
        }, {
          x: (event.touches[1].clientX - this.data._img_left),
          y: (event.touches[1].clientY - this.data._img_top)
        }];
        this.data._hypotenuse_length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      }

      !this.data._canvas_overflow && this._draw();

    },

    _move_throttle() {
      //安卓需要节流
      if (this.data.info.platform == 'android') {
        clearTimeout(this.data.MOVE_THROTTLE);
        this.data.MOVE_THROTTLE = setTimeout(() => {
          this.data.MOVE_THROTTLE_FLAG = true;
        }, 1000 / 40)
        return this.data.MOVE_THROTTLE_FLAG;
      } else {
        this.data.MOVE_THROTTLE_FLAG = true;
      }
    },

    // 图片触摸移动
    move(event) {

      if (this.data._flag_img_endtouch || !this.data.MOVE_THROTTLE_FLAG) return;

      this.data.MOVE_THROTTLE_FLAG = false;
      this._move_throttle();

      this._moveDuring();

      if (event.touches.length == 1) {
        //单指拖动
        let left = (event.touches[0].clientX - this.data._touch_img_relative[0].x),
          top = (event.touches[0].clientY - this.data._touch_img_relative[0].y);

        //图像边缘检测,防止截取到空白
        this.data._img_left = left;
        this.data._img_top = top;
        this._imgMarginDetectionPosition();
        this.setData({
          _img_left: this.data._img_left,
          _img_top: this.data._img_top
        });

      } else {
        //双指放大
        let width = (Math.abs(event.touches[0].clientX - event.touches[1].clientX)),
          height = (Math.abs(event.touches[0].clientY - event.touches[1].clientY)),
          hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)),
          scale = this.data.scale * (hypotenuse / this.data._hypotenuse_length),
          current_deg = 0;
        scale = scale <= this.data.minScale ? this.data.minScale : scale;
        scale = scale >= this.data.maxScale ? this.data.maxScale : scale;

        //图像边缘检测,防止截取到空白
        this.data.scale = scale;
        this._imgMarginDetectionScale();

        //双指旋转(如果没禁用旋转)
        let _touch_img_relative = [{
          x: (event.touches[0].clientX - this.data._img_left),
          y: (event.touches[0].clientY - this.data._img_top)
        }, {
          x: (event.touches[1].clientX - this.data._img_left),
          y: (event.touches[1].clientY - this.data._img_top)
        }];

        if (!this.data.disableRotate) {
          let first_atan = 180 / Math.PI * Math.atan2(_touch_img_relative[0].y, _touch_img_relative[0].x);
          let first_atan_old = 180 / Math.PI * Math.atan2(this.data._touch_img_relative[0].y, this.data._touch_img_relative[0].x);
          let second_atan = 180 / Math.PI * Math.atan2(_touch_img_relative[1].y, _touch_img_relative[1].x);
          let second_atan_old = 180 / Math.PI * Math.atan2(this.data._touch_img_relative[1].y, this.data._touch_img_relative[1].x);
          //当前旋转的角度
          let first_deg = first_atan - first_atan_old,
            second_deg = second_atan - second_atan_old;
          if (first_deg != 0) {
            current_deg = first_deg;
          } else if (second_deg != 0) {
            current_deg = second_deg;
          }
        }

        this.data._touch_img_relative = _touch_img_relative;
        this.data._hypotenuse_length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

        //更新视图
        this.setData({
          angle: this.data.angle + current_deg,
          scale: this.data.scale
        });

      }

      !this.data._canvas_overflow && this._draw();

    },

    //图片触摸结束
    end(event) {
      this.data._flag_img_endtouch = true;
      this._moveStop();
    },

    //点击裁剪器上传图片或生成图片
    choose(event) {

      if (!this.data.imgSrc) {
        //调起选择图片
        this._chooseImage();
        return;
      }

      this._draw(() => {
        let x = event.detail ? event.detail.x : event.touches[0].clientX;
        let y = event.detail ? event.detail.y : event.touches[0].clientY;
        if ((x >= this.data.cutLeft && x <= (this.data.cutLeft + this.data.width)) && (y >= this.data.cutTop && y <= (this.data.cutTop + this.data.height))) {
          //生成图片并回调
          wx.canvasToTempFilePath({
            width: this.data.width * this.data.exportScale,
            height: Math.round(this.data.height * this.data.exportScale),
            destWidth: this.data.width * this.data.exportScale,
            destHeight: Math.round(this.data.height) * this.data.exportScale,
            fileType: 'png',
            quality: this.data.quality,
            canvasId: this.data.el,
            success: (res) => {
              this.triggerEvent('cutComplete', {
                url: res.tempFilePath,
                width: this.data.width * this.data.exportScale,
                height: this.data.height * this.data.exportScale
              });
            }
          }, this)
        }
      });
    },

    //渲染
    _draw(callback) {

      if (!this.data.imgSrc) return;

      let draw = () => {
        //图片实际大小
        let imgWidth = this.data.imgWidth * this.data.scale * this.data.exportScale;
        let imgHeight = this.data.imgHeight * this.data.scale * this.data.exportScale;
        //canvas和图片的相对距离
        var xpos = this.data._img_left - this.data.cutLeft;
        var ypos = this.data._img_top - this.data.cutTop;
        //旋转画布
        this.data.ctx.translate(xpos * this.data.exportScale, ypos * this.data.exportScale);
        this.data.ctx.rotate(this.data.angle * Math.PI / 180);
        this.data.ctx.drawImage(this.data.imgSrc, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        this.data.ctx.draw(false, () => {
          callback && callback();
        });
      }

      if (this.data.ctx.width != this.data.width || this.data.ctx.height != this.data.height) {
        //优化拖动裁剪框，所以必须把宽高设置放在离用户触发渲染最近的地方
        this.setData({
          _canvas_height: this.data.height,
          _canvas_width: this.data.width,
        }, () => {
          //延迟40毫秒防止点击过快出现拉伸或裁剪过多
          setTimeout(() => {
            draw();
          }, 40);
        });
      } else {
        draw();
      }

    },

    //触摸移动事件，拖拽裁剪框
    cutTouchMove(e) {
      if (this.data._flag_cut_touch && this.data.MOVE_THROTTLE_FLAG) {

        if (this.data.disableRatio && (this.data.disableWidth || this.data.disableHeight)) return;

        //节流
        this.data.MOVE_THROTTLE_FLAG = false;
        this._move_throttle();

        let width = this.data.width,
          height = this.data.height,
          cutTop = this.data.cutTop,
          cutLeft = this.data.cutLeft,
          size_correct = () => {
            width = width <= this.data.maxWidth ? width >= this.data.minWidth ? width : this.data.minWidth : this.data.maxWidth;
            height = height <= this.data.maxHeight ? height >= this.data.minHeight ? height : this.data.minHeight : this.data.maxHeight;
          },
          size_inspect = () => {
            if ((width > this.data.maxWidth || width < this.data.minWidth || height > this.data.maxHeight || height < this.data.minHeight) && this.data.disableRatio) {
              size_correct();
              return false;
            } else {
              size_correct();
              return true;
            }
          };

        height = this.data.CUT_START.height + ((this.data.CUT_START.corner > 1 && this.data.CUT_START.corner < 4 ? 1 : -1) * (this.data.CUT_START.y - e.touches[0].clientY));

        switch (this.data.CUT_START.corner) {
          case 1:
            width = this.data.CUT_START.width + this.data.CUT_START.x - e.touches[0].clientX;
            if (this.data.disableRatio) {
              height = width / (this.data.width / this.data.height)
            }
            if (!size_inspect()) return;
            cutLeft = this.data.CUT_START.cutLeft - (width - this.data.CUT_START.width);
            break
          case 2:
            width = this.data.CUT_START.width + this.data.CUT_START.x - e.touches[0].clientX;
            if (this.data.disableRatio) {
              height = width / (this.data.width / this.data.height)
            }
            if (!size_inspect()) return;
            cutTop = this.data.CUT_START.cutTop - (height - this.data.CUT_START.height)
            cutLeft = this.data.CUT_START.cutLeft - (width - this.data.CUT_START.width)
            break
          case 3:
            width = this.data.CUT_START.width - this.data.CUT_START.x + e.touches[0].clientX;
            if (this.data.disableRatio) {
              height = width / (this.data.width / this.data.height)
            }
            if (!size_inspect()) return;
            cutTop = this.data.CUT_START.cutTop - (height - this.data.CUT_START.height);
            break
          case 4:
            width = this.data.CUT_START.width - this.data.CUT_START.x + e.touches[0].clientX;
            if (this.data.disableRatio) {
              height = width / (this.data.width / this.data.height)
            }
            if (!size_inspect()) return;
            break
        }

        if (!this.data.disableWidth && !this.data.disableHeight) {
          this.setData({
            width: width,
            cutLeft: cutLeft,
            height: height,
            cutTop: cutTop,
          })
        } else if (!this.data.disableWidth) {
          this.setData({
            width: width,
            cutLeft: cutLeft
          })
        } else if (!this.data.disableHeight) {
          this.setData({
            height: height,
            cutTop: cutTop
          })
        }
        this._imgMarginDetectionScale();
      }
    },

    // 触摸开始事件
    cutTouchStart(e) {
      let currentX = e.touches[0].clientX;
      let currentY = e.touches[0].clientY;

      let cutbox_top4 = this.data.cutTop + this.data.height - 30;
      let cutbox_bottom4 = this.data.cutTop + this.data.height + 20;
      let cutbox_left4 = this.data.cutLeft + this.data.width - 30;
      let cutbox_right4 = this.data.cutLeft + this.data.width + 30;

      let cutbox_top3 = this.data.cutTop - 30;
      let cutbox_bottom3 = this.data.cutTop + 30;
      let cutbox_left3 = this.data.cutLeft + this.data.width - 30;
      let cutbox_right3 = this.data.cutLeft + this.data.width + 30;

      let cutbox_top2 = this.data.cutTop - 30;
      let cutbox_bottom2 = this.data.cutTop + 30;
      let cutbox_left2 = this.data.cutLeft - 30;
      let cutbox_right2 = this.data.cutLeft + 30;

      let cutbox_top1 = this.data.cutTop + this.data.height - 30;
      let cutbox_bottom1 = this.data.cutTop + this.data.height + 30;
      let cutbox_left1 = this.data.cutLeft - 30;
      let cutbox_right1 = this.data.cutLeft + 30;

      if (currentX > cutbox_left4 && currentX < cutbox_right4 && currentY > cutbox_top4 && currentY < cutbox_bottom4) {
        this._moveDuring();
        this.data._flag_cut_touch = true;
        this.data._flag_img_endtouch = true;
        this.data.CUT_START = {
          width: this.data.width,
          height: this.data.height,
          x: currentX,
          y: currentY,
          corner: 4
        }
      } else if (currentX > cutbox_left3 && currentX < cutbox_right3 && currentY > cutbox_top3 && currentY < cutbox_bottom3) {
        this._moveDuring();
        this.data._flag_cut_touch = true;
        this.data._flag_img_endtouch = true;
        this.data.CUT_START = {
          width: this.data.width,
          height: this.data.height,
          x: currentX,
          y: currentY,
          cutTop: this.data.cutTop,
          cutLeft: this.data.cutLeft,
          corner: 3
        }
      } else if (currentX > cutbox_left2 && currentX < cutbox_right2 && currentY > cutbox_top2 && currentY < cutbox_bottom2) {
        this._moveDuring();
        this.data._flag_cut_touch = true;
        this.data._flag_img_endtouch = true;
        this.data.CUT_START = {
          width: this.data.width,
          height: this.data.height,
          cutTop: this.data.cutTop,
          cutLeft: this.data.cutLeft,
          x: currentX,
          y: currentY,
          corner: 2
        }
      } else if (currentX > cutbox_left1 && currentX < cutbox_right1 && currentY > cutbox_top1 && currentY < cutbox_bottom1) {
        this._moveDuring();
        this.data._flag_cut_touch = true;
        this.data._flag_img_endtouch = true;
        this.data.CUT_START = {
          width: this.data.width,
          height: this.data.height,
          cutTop: this.data.cutTop,
          cutLeft: this.data.cutLeft,
          x: currentX,
          y: currentY,
          corner: 1
        }
      }
    },

    // 触摸结束事件
    cutTouchEnd(e) {
      this._moveStop();
      this.data._flag_cut_touch = false;
    },

    // 定时器触发
    _moveStop() {

      //清空之前的自动居中延迟函数并添加最新的
      clearTimeout(this.data.TIME_CUT_CENTER);
      this.data.TIME_CUT_CENTER = setTimeout(() => {
        //动画启动
        if (!this.data._cut_animation) {
          this.setData({
            _cut_animation: true
          });
        }
        this._setCenter();
      }, 1000)

      //清空之前的背景变化延迟函数并添加最新的
      clearTimeout(this.data.TIME_BG);
      this.data.TIME_BG = setTimeout(() => {
        if (this.data._flag_bright) {
          this.setData({
            _flag_bright: false
          });
        }
      }, 2000)
    },

    // 定时器清空，背景高亮
    _moveDuring() {
      //清空之前的自动居中延迟函数
      clearTimeout(this.data.TIME_CUT_CENTER);
      //清空之前的背景变化延迟函数
      clearTimeout(this.data.TIME_BG);
      //高亮背景
      if (!this.data._flag_bright) {
        this.setData({
          _flag_bright: true
        });
      }
    },

    //监听数据变化
    _watcher() {
      Object.keys(this.data).forEach(v => {
        this._observe(this.data, v, this.data.watch[v]);
      })
    },

    _observe(obj, key, watchFun) {
      var val = obj[key];
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set: (value) => {
          val = value;
          watchFun && watchFun(val, this);
        },
        get() {
          if (val && '_img_top|img_left||width|height|minWidth|maxWidth|minHeight|maxHeight|exportScale|cutTop|cutLeft|canvasTop|canvasLeft|imgWidth|imgHeight|scale|angle|minScale|maxScale'.indexOf(key) != -1) {
            let ret = parseFloat(parseFloat(val).toFixed(3));
            if (typeof val == "string" && val.indexOf("%") != -1) {
              ret += '%';
            }
            return ret;
          }
          return val;
        }
      })
    },

    //阻止默认行为
    preventTouchMove() {},
  }
});
