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
    bgImgPath:'',
    prize:[],
    school:[],
    skill:[],
    work:[],
    resumeImg:[]
  },
  
  save(){
    var that = this;
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
        }),
        wx.cloud.uploadFile({
          filePath: res.tempFilePath,
          // cloudPath: res.result.data[0].openid+'.jpg',
          cloudPath:new Date().getTime()+'.png',
          success:res=> {
            var img=[] 
            for(var i=0;i<that.data.resumeImg.length;i++) {
              img[i]=that.data.resumeImg[i]
            }
            img.push(res.fileID)
            that.setData({
              resumeImg:img
            })
            console.log(that.data.resumeImg)
            console.log("上传成功")
            wx.cloud.callFunction({
              name: 'updateResumeImg',
              data: {
                resumeImg: that.data.resumeImg,
              },
              success: res => {   
                console.log("成功", res)    
              },
              fail: err => {
                console.log("失败", err)
              }
            })
          },
          fail:err =>{
            console.log(err)
          }
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
          intend: res.result.data[0].intend,
          prize:res.result.data[0].prize.split(';'),
          school:res.result.data[0].school.split(';'),
          skill:res.result.data[0].skill.split(';'),
          work:res.result.data[0].work.split(';'),
          resumeImg:res.result.data[0].resumeImg
        })
        const ctx = wx.createCanvasContext('myCanvas');
        ctx.setFillStyle('white')
        ctx.fillRect(0, 0, 300, 80)
        ctx.beginPath()
        ctx.moveTo(0, 80)
        ctx.lineTo(300,80)
        ctx.setStrokeStyle('#0f4f8d')
        ctx.setLineWidth(0.5)
        ctx.closePath()
        ctx.setFontSize(8)
        ctx.setFillStyle('black')
        ctx.fillText('姓名：'+that.data.name,30,25)
        ctx.fillText('年龄：'+that.data.age,30,35)
        ctx.fillText('性别：'+that.data.sex,30,45)
        ctx.fillText('民族：'+that.data.nation,30,55)
        ctx.fillText('婚姻状况：'+that.data.marry,100,25)
        ctx.fillText('政治面貌：'+that.data.face,100,35)
        ctx.fillText('手机号：'+that.data.tel,100,45)
        ctx.fillText('邮箱：'+that.data.email,100,55)
        ctx.stroke()


        ctx.beginPath()
        ctx.moveTo(0, 100)
        ctx.lineTo(70,100)
        ctx.lineTo(100,80)
        ctx.lineTo(0,80)
        ctx.setFillStyle('#0f4f8d')
        ctx.setLineWidth(0.5)
        ctx.fill()
        ctx.closePath()
        ctx.stroke()
        ctx.setFontSize(13)
        ctx.setFillStyle('white')
        ctx.fillText('在校经历',15,95)
        ctx.stroke() 

        ctx.setFontSize(8)
        ctx.setFillStyle('black')
        var len = that.data.school.length;
        var arr1=[]
        for(var i=0;i<len;i++) {
          if(that.data.school[i] != 'undefined' && that.data.school[i] != '') {
            arr1.push(that.data.school[i])            
          }          
        }  
        for(var i=0;i<arr1.length;i++) {
          ctx.fillText('●'+arr1[i],15,120+i*11)
        }              
        ctx.stroke()



        ctx.beginPath()
        ctx.moveTo(0, 180)
        ctx.lineTo(300,180)
        ctx.setStrokeStyle('#0f4f8d')
        ctx.setLineWidth(0.5)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, 260)
        ctx.lineTo(300,260)
        ctx.setStrokeStyle('#0f4f8d')
        ctx.setLineWidth(0.5)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, 340)
        ctx.lineTo(300,340)
        ctx.setStrokeStyle('#0f4f8d')
        ctx.setLineWidth(0.5)
        ctx.closePath()
        ctx.stroke()
        
        wx.getImageInfo({
          src: that.data.imgUrl,
          success(res){
            ctx.drawImage(res.path,235,6,48,64.875)
            ctx.draw()
          }
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