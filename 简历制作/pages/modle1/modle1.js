// pages/modle1/modle1.js
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
    imgUrl:"",
    assess:'',
    hobby:'',
    intend:'',
    bgImgPath:''
  },
  
  save(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 400,
      destWidth: 300,
      destHeight: 400,
      canvasId: 'myCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
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
          imgUrl:res.result.data[0].imgUrl,
          name: res.result.data[0].name,
          age: res.result.data[0].age,
          email: res.result.data[0].email,
          face: res.result.data[0].face,
          marry: res.result.data[0].marry,
          nation: res.result.data[0].nation,
          sex: res.result.data[0].sex,
          tel: res.result.data[0].tel,
          assess: res.result.data[0].assess,
          hobby: res.result.data[0].hobby,
          intend: res.result.data[0].intend
        })
        const ctx = wx.createCanvasContext('myCanvas');
        ctx.setFillStyle('#b8b4cb')
        ctx.fillRect(0, 0, 100, 400)
        ctx.beginPath()
        ctx.moveTo(0, 122.5)
        ctx.lineTo(100, 122.5)
        ctx.setStrokeStyle('#748ca6')
        // ctx.setLineCap('round')
        ctx.setLineWidth(3)
        ctx.setFillStyle('#748ca6')
        // ctx.globalAlpha=0.4;
        ctx.closePath()

        ctx.fillRect(18, 130, 64, 18)
        ctx.setFillStyle('black')
        ctx.setFontSize(12)
        ctx.fillText('个人信息',25,143)
        ctx.setFontSize(8)
        ctx.fillText('姓名：'+that.data.name,6,160)
        ctx.fillText('年龄：'+that.data.age,6,170)
        ctx.fillText('性别：'+that.data.sex,6,180)
        ctx.fillText('民族：'+that.data.nation,6,190)
        ctx.fillText('手机号：'+that.data.tel,6,200)
        ctx.fillText('婚姻状况：'+that.data.marry,6,210)
        ctx.fillText('政治面貌：'+that.data.face,6,220)
        ctx.fillText('邮箱：'+that.data.email.split(".")[0],6,230)
        ctx.fillText('.'+that.data.email.split(".")[1],6,240)
       
        ctx.setFillStyle('#748ca6')
        ctx.fillRect(18, 270, 64, 18)
        ctx.setFillStyle('black')
        ctx.setFontSize(12)
        ctx.fillText('求职意向',25,283)

        
        ctx.setFontSize(8)
        ctx.fillStyle = '#000';
        var text =that.data.intend;
        var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
        var temp = "";
        var row = [];
        for (var a = 0; a < chr.length; a++) {
          if (ctx.measureText(temp).width < 80) {
            temp += chr[a];
          }
          else {
            a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
            row.push(temp);
            temp = "";
          }
        }
        row.push(temp);

        //如果数组长度大于2 则截取前两个
        if (row.length > 2) {
          var rowCut = row.slice(0, 2);
          var rowPart = rowCut[1];
          var test = "";
          var empty = [];
          for (var a = 0; a < rowPart.length; a++) {
            if (ctx.measureText(test).width < 220) {
              test += rowPart[a];
            }
            else {
              break;
            }
          }
        }
        for (var b = 0; b < row.length; b++) {
          ctx.fillText(row[b], 6, 300 + b * 10);
        }
        ctx.stroke()
        // ctx.beginPath()
        // ctx.arc(150,30, 8, 0, Math.PI * 2,true);
        // ctx.closePath()
        // ctx.stroke()
        // ctx.beginPath()
        // ctx.arc(200,200, 50, 0, Math.PI * 2,true);
        // ctx.closePath()
        // ctx.stroke()
   

        const grd = ctx.createCircularGradient(120, 20, 10)
        grd.addColorStop(0, '#748ca6')
        grd.addColorStop(1, 'white')
        ctx.setFillStyle(grd)
        ctx.fillRect(100, 0, 200, 100)
        ctx.stroke()
       
        const grd1 = ctx.createCircularGradient(120, 120, 10)
        grd1.addColorStop(0, '#748ca6')
        grd1.addColorStop(1, 'white')
        ctx.setFillStyle(grd1)
        ctx.fillRect(100, 100, 200, 40)
        ctx.stroke()

        const grd2 = ctx.createCircularGradient(120, 160, 10)
        grd2.addColorStop(0, '#748ca6')
        grd2.addColorStop(1, 'white')
        ctx.setFillStyle(grd2)
        ctx.fillRect(100, 140, 200, 40)
        ctx.stroke()

        const grd3 = ctx.createCircularGradient(120, 200, 10)
        grd3.addColorStop(0, '#748ca6')
        grd3.addColorStop(1, 'white')
        ctx.setFillStyle(grd3)
        ctx.fillRect(100, 180, 200, 40)
        ctx.stroke()

        const grd4 = ctx.createCircularGradient(120, 240, 10)
        grd4.addColorStop(0, '#748ca6')
        grd4.addColorStop(1, 'white')
        ctx.setFillStyle(grd4)
        ctx.fillRect(100, 220, 200, 40)
        ctx.stroke()

        const grd5 = ctx.createCircularGradient(120, 280, 10)
        grd5.addColorStop(0, '#748ca6')
        grd5.addColorStop(1, 'white')
        ctx.setFillStyle(grd5)
        ctx.fillRect(100, 260, 200, 40)
        ctx.stroke()


        wx.getImageInfo({
          src: that.data.imgUrl,
          success(res){
            ctx.drawImage(res.path,18,18,64,86.5)
            ctx.draw()
          }
        })
      },
      fail: err => {
      }
    })

    // wx.downloadFile({
    //   url: 'cloud://resume-dbcdg.7265-resume-dbcdg-1304912994/1612597421452.png',//网络路径
    //   success: function (res3) {
    //     //背景图
    //     that.setData({
    //       bgImgPath: res3.tempFilePath
    //     })
    //     console.log(that.data.bgImgPath)
    //   }
    // })
    // console.log(that.data.bgImgPath)
    // console.log(that.data.imgUrl)
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