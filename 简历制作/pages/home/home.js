// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  tapClick:function() {
    wx.cloud.callFunction({
      name: 'openid',
      success: res => {
        if (res.result.data.length!=0) {
          //如果成功获取到
          //将获取到的用户资料写入app.js全局变量
          console.log(res)
          wx.navigateTo({
            url: '/pages/write/write',
          })
        } else {
          //未成功获取到用户信息
          //调用注册方法
          wx.switchTab({
            url: '/pages/we/we'
          })
        }
      },
      fail: err => {
      }
    })
  },
  tapClick1:function() {
    wx.cloud.callFunction({
      name: 'openid',
      success: res => {
        if (res.result.data.length!=0) {
          //如果成功获取到
          //将获取到的用户资料写入app.js全局变量
          console.log(res)
          if(res.result.data[0].tel) {
            wx.navigateTo({
              url: '/pages/modle/modle',
            })
          } else {
            wx.navigateTo({
              url: '/pages/write/write',
            })
          }
        } else {
          //未成功获取到用户信息
          //调用注册方法
          wx.switchTab({
            url: '/pages/we/we'
          })
        }
      },
      fail: err => {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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