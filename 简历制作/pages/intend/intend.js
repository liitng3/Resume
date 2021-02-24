// pages/intend/intend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intend:''
  },
  commit(){
    var that = this
    wx.cloud.callFunction({
      name: 'updateIntend',
      data: {
        intend: that.data.intend
      }
    }).then(res => {
      console.log("成功", res)
    }).catch(res => {
      console.log("失败", res)
    })
  },
  getInput9(e) {
    this.setData({
      intend: e.detail.value
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
          intend: res.result.data[0].intend
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