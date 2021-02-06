// pages/cloud/cloud.js
Page({
  onLoad() {
    wx.cloud.callFunction({
      name: 'openid',
      success: res => {
        this.setData({
          openid:res.result.openid
        })
      },
      fail: err => {
      }
    })
  }
})