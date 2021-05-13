/**
 * @module image-swiper
 * @description 图片轮播图
 * @property {boolean} showDot     是否显示面板指示点，默认true
 * @property {string}  height      轮播图高度，默认300rpx
 * @property {Array}   imageList   图片资源URI列表
 * @property {boolean} autoplay    自动播放，默认false
 * @property {number} interval     间隔时长，默认3000，单位ms
 * @property {boolean} circular    是否衔接滑动，默认true
 */
Component({

  properties: {
    // 是否显示面板指示点
    showDot: {
      type: Boolean,
      value: true,
    },
    // swiper 高度
    height: {
      type: String,
      value: '300rpx',
    },
    // 图片列表
    imageList: {
      type: Array,
      value: ['1', '2', '3'],
      observer: function(newVal, oldVal) {
        this.setData({
          swiperIndex: 0
        })
      }
    },
    autoplay: {
      type: Boolean,
      value: false,
      observer: function() {
        this.setData({
          swiperIndex: 0
        })
      }
    },
    interval: {
      type: Number,
      value: 3000,
    },
    circular: {
      type: Boolean,
      value: true,
    }
  },

  data: {

    // 当前 swiper 下标
    swiperIndex: 0,

    currentIndex: 0

  },


  methods: {

    /**
     * 监听 swiper 切换
     */
    change(e) {
      let obj = e.detail;
      this.setData({
        swiperIndex: obj.current
      }, () => {
        // 值改变之后
      })
    },

  }

});
