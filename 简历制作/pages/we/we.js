// // pages/we/we.js
// // var util = require('../tools/tools.js')
// const app = getApp();
// const db = wx.cloud.database()
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {

//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function(options) {

//     var that = this;

//     //查看是否授权

//     wx.getSetting({

//       success: function(res) {

//         if (res.authSetting['scope.userInfo']) {

//           console.log("用户授权了");

//         } else {

//           //用户没有授权

//           console.log("用户没有授权");

//         }

//       }

//     });

//   },

//   bindGetUserInfo: function(res) {

//     if (res.detail.userInfo) {

//       //用户按了允许授权按钮

//       var that = this;

//       // 获取到用户的信息了，打印到控制台上看下

//       console.log("用户的信息如下：");

//       console.log(e.detail.userInfo);

//       //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来

//       that.setData({

//         isHide: false

//       });

//     } else {

//       //用户按了拒绝按钮

//       wx.showModal({

//         title: '警告',

//         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',

//         showCancel: false,

//         confirmText: '返回授权',

//         success: function(res) {

//           // 用户没有授权成功，不需要改变 isHide 的值

//           if (res.confirm) {

//             console.log('用户点击了“返回授权”');

//           }

//         }

//       });

//     }

//      
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function() {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function() {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function() {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function() {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function() {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function() {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function() {

//   }
// })



const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenButton: true
  },

  /**
   *从云端获取资料
   *如果没有获取到则尝试新建用户资料
   */
  onGotUserInfo: function (e) {
    console.log(e);
    var _this = this
    //需要用户同意授权获取自身相关信息
    if (e.detail.errMsg == "getUserInfo:ok") {
      //将授权结果写入app.js全局变量
      app.globalData.auth['scope.userInfo'] = true
      //尝试获取云端用户信息
      wx.cloud.callFunction({
        name: 'login',
        data: {
          getSelf: true
        },
        success: res => {
          if (res.errMsg == "cloud.callFunction:ok")
            console.log(res);
            if (res.result.data.length!=0) {
              //如果成功获取到
              //将获取到的用户资料写入app.js全局变量
              console.log(res)
              app.globalData.userInfo = res.result.data.userData
              app.globalData.userId = res.result.data._id
              _this.setData({
                hiddenButton: true
              })
              wx.switchTab({
                url: '/pages/home/home'
              })
            } else {
              //未成功获取到用户信息
              //调用注册方法
              console.log("未注册")
              _this.register({
                nickName: e.detail.userInfo.nickName,
                gender: e.detail.userInfo.gender,
                avatarUrl: e.detail.userInfo.avatarUrl,
                // region: ['none', 'none', 'none'],
                // campus: "none",
                // studentNumber: "none",
              })
            }
        },
        fail: err => {
          wx.showToast({
            title: '请检查网络您的状态',
            duration: 800,
            icon: 'none'
          })
          console.error("get_setUserInfo调用失败", err.errMsg)
        }
      })
    } else
      console.log("未授权")
  },

  /**
   * 注册用户信息
   */
  register: function (e) {
    let _this = this
    console.log(e);
    wx.cloud.callFunction({
      name: 'login',
      data: {
        setSelf: true,
        // userData: e
      },
      success: res => {
        console.log(res)
        if (res.errMsg == "cloud.callFunction:ok" && res.result) {
          _this.setData({
            hiddenButton: true
          })
          app.globalData.userInfo = e //e=userdata
          app.globalData.userId = res.result._id
          _this.data.registered = true
          console.log(res)
          wx.switchTab({
            url: '/pages/home/home'
          })
        } else {
          console.log("注册失败", res)
          wx.showToast({
            title: '请检查网络您的状态',
            duration: 800,
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.showToast({
          title: '请检查网络您的状态',
          duration: 800,
          icon: 'none'
        })
        console.error("get_setUserInfo调用失败", err.errMsg)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let _this = this
    //需要用户同意授权获取自身相关信息
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          //将授权结果写入app.js全局变量
          app.globalData.auth['scope.userInfo'] = true
          //从云端获取用户资料
          wx.cloud.callFunction({
            name: 'login',
            data: {
              getSelf: true
            },
            success: res => {
              if (res.errMsg == "cloud.callFunction:ok" && res.result) {
                //如果成功获取到
                //将获取到的用户资料写入app.js全局变量
                console.log(res)
                app.globalData.userInfo = res.result.data.userData
                app.globalData.userId = res.result.data._id
                wx.switchTab({
                  url: '/pages/home/home'
                })
              } else {
                _this.setData({
                  hiddenButton: false
                })
                console.log("未注册")
              }
            },
            fail: err => {
              _this.setData({
                hiddenButton: false
              })
              wx.showToast({
                title: '请检查网络您的状态',
                duration: 800,
                icon: 'none'
              })
              console.log("get_setUserInfo调用失败", err.errMsg)
            }
          })
        } else {
          _this.setData({
            hiddenButton: false
          })
          console.log("未授权")
        }
      },
      fail(err) {
        _this.setData({
          hiddenButton: false
        })
        wx.showToast({
          title: '请检查网络您的状态',
          duration: 800,
          icon: 'none'
        })
        console.log("wx.getSetting调用失败")
      }
    })
  }
})