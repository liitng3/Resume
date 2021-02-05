// pages/write/write.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    age: 18,
    email: "",
    face: '',
    marry: "",
    nation: '',
    sex: "",
    tel: "",
    items: [{
        value: '男',
        name: '男'
      },
      {
        value: '女',
        name: '女'
      }
    ],
    casArray: ['请选择','已婚', '未婚'],
    casIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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

  },
  getInput1(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getInput2(e) {
    this.setData({
      age: e.detail.value
    })
  },
  getInput3(e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  getInput4(e) {
    this.setData({
      email: e.detail.value
    })
  },
  getInput5(e) {
    this.setData({
      nation: e.detail.value
    })
  },
  getInput7(e) {
    this.setData({
      tel: e.detail.value
    })
  },
  getInput8(e) {
    this.setData({
      face: e.detail.value
    })
  },

  postForm(f) {
    var that = this;
    //邮箱验证
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.email))) {
      wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
      });
      return false
    }
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.tel))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return false
    }

    wx.cloud.callFunction({
      name: 'addDate',
      data: {
        name: that.data.name,
        age: that.data.age,
        email: that.data.email,
        face: that.data.face,
        marry: that.data.marry,
        nation: that.data.nation,
        sex: that.data.sex,
        tel: that.data.tel
        
      }
    }).then(res => {
      console.log("成功", res)
    }).catch(res => {
      console.log("失败", res)
    })
  },

  bindCasPickerChange(e) {
    this.setData({
      casIndex: e.detail.value
    })
    this.setData({
      marry: this.data.casArray[e.detail.value]
    })
    console.log('乔丹选的是', this.data.marry)
  },
})