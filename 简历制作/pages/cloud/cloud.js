// pages/cloud/cloud.js
Page({
  onLoad() {
    wx.cloud.database().collection('user').get()
      .then((res) => {
        console.log('获取数据成功', res)
      })
      .catch((res) => {
        console.log('获取数据失败', res)
      })
  }
})