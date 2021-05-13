/**
 * @module photo-identification
 * @description 拍照识别组件，通过拍照或选择相册图片进行OCR识别
 * @property {boolean} takingPhotoIsEnd 拍照或从相册选择的后续过程是否结束
 * @property {boolean} isCompressImage  图片是否压缩
 * @fires handleOCR  处理OCR分发事件
 */

// 相机控件上下文
let cameraContext;
// 文件系统管理器
let fsm;
// 图片base64编码格式
let base64;
// 图片最大尺寸
const maxSize = 4 * 1024 * 1024;

Component({

  options: {
    addGlobalClass: true,
    pureDataPattern: new RegExp('^_'),
  },

  properties: {
    // 拍照过程是否结束
    takingPhotoIsEnd: {
      type: Boolean,
      value: false,
    },
    // 是否压缩从拍摄或相册选择的图片
    isCompressImage: {
      type: Boolean,
      value: true,
    }
  },

  observers: {
    'takingPhotoIsEnd': function(value) {
      if (value) {
        this.data._isTakingPhoto && this.setData({
          _isTakingPhoto: false,
        })
      }
    }
  },

  data: {
    isSwitchOnLight: false,
    _isTakingPhoto: false,
    // 测试用
    // pic: "",
  },

  lifetimes: {

    ready() {

      // 获取相机上下文
      cameraContext = wx.createCameraContext && wx.createCameraContext();

      // 获取文件系统管理器
      fsm = wx.getFileSystemManager();
    },

  },

  methods: {

    // 切换灯开关
    toggleSwitch() {

      this.setData({
        isSwitchOnLight: !this.data.isSwitchOnLight,
      })

    },

    // 拍照
    takePhoto() {

      if (this.data._isTakingPhoto) return;

      let self = this;

      self.setData({
        _isTakingPhoto: true
      }, () => {

        cameraContext.takePhoto({
          quality: 'high',
          success(res) {

            console.log(res.tempImagePath);

            // 测试用
            // self.setData({
            //   pic: res.tempImagePath,
            // })

            self.next(res.tempImagePath, null, '');

          },
          error() {
            self.data._isTakingPhoto && self.setData({
              _isTakingPhoto: false,
            })
          }
        });

      })

    },

    // 选择相册
    choosePhoto() {

      let self = this;

      wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album'],
        success(res) {

          let {
            path,
            size
          } = res.tempFiles[0];

          console.log(path, size);

          // 测试用
          // self.setData({
          //   pic: path,
          // })

          self.next(path, size, 'album');

        },
      })

    },

    // 压缩图片
    _compressImage(path, size, cb) {

      let self = this;

      if (size) {

        if (size > maxSize) {
          wx.compressImage({
            src: path,
            quality: 80,
            success(res) {
              self._compressImage(res.tempFilePath, null, cb);
            }
          })
        } else {
          base64 = fsm.readFileSync(path, 'base64');
          cb && cb(base64);
        }

      } else {

        wx.getFileInfo({
          filePath: path,
          success(res) {
            if (res.size > maxSize) {
              wx.compressImage({
                src: path,
                quality: 80,
                success(res) {
                  self._compressImage(res.tempFilePath, null, cb);
                }
              })
            } else {
              base64 = fsm.readFileSync(path, 'base64');
              cb && cb(base64);
            }
          }
        });

      }
    },

    // 下一步处理
    next(imgPath, imgSize, imgSource) {

      if (this.data.isCompressImage) {
        this._compressImage(imgPath, imgSize, (base64) => {
          this.triggerEvent('handleOCR', {
            base64,
            imgSource,
          })
        });
      } else {
        base64 = fsm.readFileSync(imgPath, 'base64');
        this.triggerEvent('handleOCR', {
          base64,
          imgSource,
        })
      }

    },

  }
})
