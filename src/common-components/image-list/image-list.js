/**
 * @module image-list
 * @description 图片列表视图，根据图片的不同数量展示不同的布局
 * @property {Array} imgList         图片资源URI数组
 * @fires preview                    预览图片成功分发事件
 */
Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    imgList: {
      type: Array,
      value: [],
    },
  },

  data: {
    //图片列表
    list: [],
    // 图片列表数量
    length: 0,

    onlyOneStyle: {
      width: '',
      height: '',
      mode: 'aspectFill'
    }
  },

  lifetimes: {

    attached: function() {
      let self = this;
      let res = self.data.imgList;
      self.setData({
        length: res.length,
        list: res,
      });
    },

  },

  methods: {

    // 预览图片
    previewPic(e) {
      let list = this.data.list;
      let idx = e.target.dataset.index;
      wx.previewImage({
        urls: list,
        current: list[idx],
        success: (res) => {
          console.log('预览图片api调用成功', res);
          this.triggerEvent("preview");
        },
        fail: (err) => {
          console.log('预览图片api调用失败', err)
        },
        complete: (cp) => {
          console.log('预览图片api调用完成', cp)
        },
      })
    },

    handleOnlyOne(e) {
      let {
        width,
        height
      } = e.detail;
      const self = this;
      if (this.data.list.length === 1) {
        const query = this.createSelectorQuery().in(this);
        query.select('.image-box').boundingClientRect((rect) => {

          let onlyWidth = '33.3333%';
          let onlyHeight = 'auto';
          let h = rect.width / width * height;
          if (width * 1.5 < height) {
            // 竖向长图
            let w = 200 / height * width;
            if (w > rect.width / 3) {
              onlyWidth = w.toFixed(2) + 'px';
            }
            onlyHeight = h > 200 ? '200px' : h.toFixed(2) + 'px';
          } else {
            // 横向长图
            onlyWidth = '100%';
            if (h > 200) {
              onlyHeight = '200px';
            } else {
              if (h < rect.width / 3) {
                onlyHeight = (rect.width / 3).toFixed(2) + 'px';
              } else {
                onlyHeight = h.toFixed(2) + 'px';
              }
            }
          }
          self.setData({
            onlyOneStyle: {
              mode: self.data.onlyOneStyle.mode,
              width: onlyWidth,
              height: onlyHeight
            }
          }, () => {})
        }).exec();
      }
    },

  },

});
