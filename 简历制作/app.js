// app.js
App({
  globalData: {
    //用户ID
    userId: '',
    //用户信息
    userInfo: null,
    //授权状态
    auth: {
      'scope.userInfo': false
    },
    //登录状态
    logged: false
  },
  onLaunch() {
    // console.log("程序启动");
    if (!wx.cloud) {
      console.error('请升级')
    } else {
      wx.cloud.init({
        env: "resume-dbcdg",
        traceUser: true
      })
    }
    this.globalData = {
      // 用户Id
      userId: '',
      // 用户信息
      userInfo: null,
      // 登录状态
      logged: false
    }


  }
})