// app.js
App({
  onLaunch() {
    console.log("程序启动");
    wx.cloud.init({
      env:"resume-dbcdg"
    })
  }
})
