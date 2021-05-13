/**
 * @module image-collect
 * @description 图片采集，上传操作需在外部自行实现
 * @property {number} maxCount        图片最大采集数，默认是9
 * @property {Array} images           图片资源URI数组
 * @fires onImagesCollectComplete     图片采集完成分发事件
 */
Component({

  properties: {
    maxCount: {
      type: Number,
      value: 9,
    },
    images: {
      type: Array,
      value: [],
    },
  },

  observers: {
    "maxCount,images": function(maxCount, images) {
      console.log(maxCount, images.length);
      this.setData({
        hiddenChoose: images.length >= maxCount,
      })
    }
  },

  data: {
    images: [],
    hiddenChoose: false,
    maxCount: 9,
  },

  methods: {

    chooseImageFromPhone: function(e) {
      let imageMaxCount = this.data.maxCount;
      let canChooseCount = imageMaxCount - this.data.images.length;
      wx.chooseImage({
        count: canChooseCount,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (result) => {
          console.log("获取图片", result.tempFilePaths);
          let imageArr = this.data.images;
          result.tempFilePaths.forEach(imagePath => {
            imageArr.push(imagePath);
          });
          this.setData({
            images: imageArr,
          })
          this.triggerEvent('onImagesCollectComplete', imageArr);
        },
        fail: () => {},
        complete: () => {}
      });
    },

    deleteImage: function(e) {
      let imageSet = new Set([...this.data.images]);
      imageSet.delete(e.currentTarget.dataset.param);
      let imageArr = Array.from(imageSet);
      this.setData({
        images: imageArr,
      })
      this.triggerEvent('onImagesCollectComplete', imageArr);
    },

    bindtapImage: function(e) {
      wx.previewImage({
        current: e.currentTarget.dataset.param,
        urls: this.data.images,
        success: (result) => {

        },
        fail: () => {},
        complete: () => {}
      });

    },
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
  },

  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
  },

})
