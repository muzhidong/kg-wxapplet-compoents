/**
 * @module upload-image
 * @description 上传图片组件
 * @property  {number}   maxCount    最大上传数，默认为6张
 * @property  {number}   lineCount   单行显示的图片数，默认为3张
 * @property  {boolean}  canEdit     是否支持编辑，默认为true
 * @property  {Array}    files       图片列表，结构形如{url: string, fileId: string}，url表示可访问路径，fileId表示文件标识
 * @property  {boolean}  auto        是否自动上传，默认为true
 * @property  {boolean}  isBtnShownBefore 上传按钮显示在前还是在后，默认为false，显示在后
 * @property  {string}   apiUrl      上传api url
 * @property  {Object}   header      上传api header
 * @fires done 上传完成分发事件
 */

class FileItem {

  // 图片路径
  url = '';
  // 图片目前上传状态 0：上传失败 1：已上传 2：未上传 3：上传中
  // 图片目前上传状态 fail：上传失败 done：已上传 wait：未上传 ing：上传中
  state = '';
  // 文件id
  fileId = '';
  // 已上传数据的id
  id = '';
  // 上传进度 范围:0~100
  loadProgress = 0;

  constructor(url, state, fileId) {
    this.url = url;
    this.state = state;
    this.fileId = fileId;
  }

}

Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    // 最多可上传数，默认为6张
    maxCount: {
      type: Number,
      value: 6
    },
    // 一行最多显示数
    lineCount: {
      type: Number,
      value: 3
    },
    // 上传图片接口路径
    uploadUrl: {
      type: String,
      value: ''
    },
    // 是否能编辑
    canEdit: {
      type: Boolean,
      value: true
    },
    files: {
      type: Array,
      value: [],
    },
    auto: {
      type: Boolean,
      value: true,
    },
    // 上传按钮显示在前还是在后
    isBtnShownBefore: {
      type: Boolean,
      value: false,
    },
    // 上传api url
    apiUrl: {
      type: String,
      value: '',
    },
    // 上传api header
    header: {
      type: Object,
      value: {},
    }
  },

  observers: {
    'files': function(newVal) {
      this.handleInputFilesChange(newVal);
    },
    'auto': function(newVal) {
      if (newVal) {
        this.startUpload();
      }
    }
  },

  data: {
    /**
     * item: {url: String, state: String, fileId: String, loadProgress: Number}
     *    url: 图片路径
     *    state: 目前状态 fail：上传失败 done：已上传 wait：未上传 ing：上传中
     *    fileId: 文件id
     *    loadProgress: 上传进度
     */
    // 展示图片列表
    showFiles: [],
    // 等待上传图片列表
    waitFiles: [],
    // 已上传图片列表
    doneFiles: [],
    /**
     * 上传状态
     *    'wait': 待上传上传文件队列刚增加但未开始上传
     *    'uploading': 有上传任务正在上传中
     *    'done': 已完成（待上传队列为空）
     */
    uploadState: 'done',
  },

  methods: {

    /**
     * 选择图片接口
     */
    chooseImage() {
      wx.chooseImage({
        count: this.data.maxCount - this.data.showFiles.length,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {

          console.log('选择图片api调用成功', res);

          let files = res.tempFilePaths;
          let state = 'wait';

          for (let item of files) {
            let data = new FileItem(item, state, '');
            this.data.showFiles.push(data);
            this.data.waitFiles.push(data)
          }

          this.setData({
            showFiles: this.data.showFiles,
            waitFiles: this.data.waitFiles
          }, () => {
            let uploadState = 'wait';
            if (this.data.auto) {
              uploadState = 'uploading';
              this.startUpload();
            }
            this.setData({
              uploadState: uploadState
            })
          })

        },
        fail: (err) => {
          console.log('选择图片api出错', err)
        },
        complete: (cp) => {
          console.log('选择图片api完成', cp)
        }
      })
    },

    /**
     * 预览图片
     */
    previewImage(e) {
      let list = this.data.showFiles.map(item => item.url)
      let currentUrl = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: list,
        current: currentUrl,
        success: (res) => {
          console.log('预览图片api调用成功', res)
        },
        fail: (err) => {
          console.log('预览图片api调用失败', err)
        },
        complete: (cp) => {
          console.log('预览图片api调用完成', cp)
        },
      })
    },

    /**
     * 删除图片
     */
    del(e) {
      let url = e.currentTarget.dataset.url;
      let showIndex = e.currentTarget.dataset.index,
        waitIndex = this.data.waitFiles.indexOf(this.data.waitFiles.find(item => item.url === url)),
        doneIndex = this.data.doneFiles.indexOf(this.data.doneFiles.find(item => item.url === url));
      this.data.showFiles.splice(showIndex, 1);
      this.data.waitFiles.splice(waitIndex, 1);
      this.data.doneFiles.splice(doneIndex, 1);
      console.log('doneFiles', this.data.doneFiles)
      this.setData({
        showFiles: this.data.showFiles,
        waitFiles: this.data.waitFiles,
        doneFiles: this.data.doneFiles
      })
    },

    /**
     * 处理传入的files变化
     */
    handleInputFilesChange(newVal) {
      let _files = this.handleInputFiles(newVal);
      this.data.uploadTask && this.data.uploadTask.abort();
      this.setData({
        showFiles: [..._files],
        doneFiles: [..._files]
      })
    },

    /**
     * 传入的文件列表数据转换为组件数据列表
     */
    handleInputFiles(data) {
      let arr = [],
        state = 'done';
      if (data instanceof Array) {
        for (let item of data) {
          let file = new FileItem(item.url, state, item.fileId);
          file.id = item.id || '';
          arr.push(file);
        }
      } else {
        arr.push(new FileItem(data.url, state, data.fileId));
      }
      return arr;
    },

    /**
     * 开始上传
     */
    startUpload() {

      if (!this.data.waitFiles || this.data.waitFiles.length <= 0) {
        this.setData({
          uploadState: 'done'
        }, () => {
          // 抛出完成上传事件
          this.triggerEvent('done', {
            files: this.data.doneFiles
          });
        });
        this.data.uploadTask = null;
        return;
      }

      this.setData({
        uploadState: 'uploading'
      })

      let current = this.data.waitFiles.pop();
      let showItem = this.data.showFiles.find(item => item.url === current.url);
      let showItemIndex = this.data.showFiles.indexOf(showItem);
      showItem.state = 'ing';
      this.setData({
        [`showFiles[${ showItemIndex }]`]: showItem
      });

      this._upload(current.url, showItem, showItemIndex);

    },

    _upload(filePath, ...otherParams) {

      let {
        showItem,
        showItemIndex,
      } = otherParams;

      if (!this.data.apiUrl) return;

      let task = wx.uploadFile({

        url: this.data.apiUrl,
        filePath: filePath,
        name: 'file',
        header: this.data.header,

        success: (res) => {
          let data = res.data;
          showItem.state = 'done';
          if (this.data.showFiles.find(item => item.url === showItem.url)) {
            showItem.fileId = JSON.parse(data).fileId;
            this.data.doneFiles.push(showItem);
            this.setData({
              [`showFiles[${ showItemIndex }]`]: showItem,
              doneFiles: this.data.doneFiles
            }, () => {
              this.startUpload();
            })
          } else {
            this.startUpload();
          }
        },

        fail: (err) => {
          // 上传失败的图片只能先删除然后在选择上传
          console.log(err);
          showItem.state = 'fail';
          this.setData({
            [`showFiles[${ showItemIndex }]`]: showItem
          }, () => {
            this.startUpload();
          })
        },

        complete: (cp) => {

        }
      });

      task.onProgressUpdate((progress, totalBytesSent, totalBytesExpectedToSend) => {
        showItem.loadProgress = progress.progress;
        this.setData({
          [`showFiles[${ showItemIndex }]`]: showItem
        });
      });

    },

  }
});
