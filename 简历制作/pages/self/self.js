// pages/self/self.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assess:''
  },
  commit(){
    var that = this
    wx.cloud.callFunction({
      name: 'updateAssess',
      data: {
        assess: that.data.assess
      }
    }).then(res => {
      console.log("成功", res)
    }).catch(res => {
      console.log("失败", res)
    })
  },
  getInput11(e) {
    this.setData({
      assess: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'getData',
      success: res => {
        that.setData({
          assess: res.result.data[0].assess
        })
      },
      fail: err => {
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})