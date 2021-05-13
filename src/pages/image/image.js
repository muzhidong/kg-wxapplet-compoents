// pages/image/image.js
const imgPath = '/images/sunyanzi.jpg';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let kind = options.kind || 0;

    let list1, list2, list4, list9;
    if (['3', '4', '6'].includes(kind)) {
      list1 = [imgPath];
      list2 = [].concat(list1, list1);
      list4 = [].concat(list2, list2);
      list9 = [].concat(list1, list4, list4);
    }

    this.setData({
      kind,
      list1,
      list2,
      list4,
      list9
    });

  },

  onComplete() {
    wx.showToast({
      title: '图片收集完成',
      icon: 'none',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
