// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeImg:[],
    nowPgae:1,
    startX:0,
    slider:false,
    animationData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  touchstart(e){
    this.setData({
        startX: e.changedTouches[0].clientX,
    })
},
touchend(e) {
    let that=this;
    let startX = this.data.startX;
    let endX = e.changedTouches[0].clientX;
    if (this.data.slider)return;

    // 下一页(左滑距离大于30)
    if (startX - endX > 30){
        this.setData({
            slider: true
        });
        //尾页(当前页 等于 总页数)
        if (this.data.nowPgae == this.data.resumeImg.length){
            this.setData({
                slider: false
            });
            wx.showToast({title: '已经是最后一张了',icon:'none'});
            return;
        };

        //创建动画   5s将位置移动到-150%,-150%
        let animation = wx.createAnimation({
            duration: 500,
        });
        animation.translateX('-150%').translateY('-150%').rotate(60).step();
        this.setData({
            animationData: animation.export()
        });

        // 移动完成后
        setTimeout(function(){
            var resumeImg = that.data.resumeImg;
            var slidethis = that.data.resumeImg.shift(); //删除数组第一项
            that.data.resumeImg.push(slidethis); //将第一项放到末尾
            //创建动画   将位置归位
            let animation = wx.createAnimation({
                duration: 0,
            });
            animation.translateX('-53%').translateY('-50%').rotate(0).step();

            that.setData({
              resumeImg: that.data.resumeImg,
                animationData: animation.export(),
                slider:false,
                nowPgae:that.data.nowPgae+1
            });
        },500)
    }

    // 上一页
    if (endX-startX  > 30){
        this.setData({
            slider: true
        })
        //首页
        if (this.data.nowPgae == 1) {
            this.setData({
                slider: false
            })
            wx.showToast({title: '已经到第一张了',icon: 'none'})
            return;
        };

        //创建动画  移动到-150%,-150%
        let animation = wx.createAnimation({
            duration: 0,
        });
        animation.translateX('-150%').translateY('-150%').rotate(100).step();


        var resumeImg = that.data.resumeImg;
       
        var slidethis = that.data.resumeImg.pop(); //删除数组末尾项
        that.data.resumeImg.unshift(slidethis);//将删除的末尾项放到第一项
        that.setData({
            animationData: animation.export(),
            resumeImg: that.data.resumeImg,
        });
        
        setTimeout(function(){
            //创建动画   5s将位置移动到原位
            let animation2 = wx.createAnimation({
                duration: 500,
                // timingFunction: 'cubic-bezier(.8,.1,.2,0.8)',
            });
            animation2.translateX('-53%').translateY('-50%').rotate(0).step();
            that.setData({
                animationData: animation2.export()
            });
            that.setData({
                slider: false,
                nowPgae: that.data.nowPgae - 1
            });
        },50)
    }
},
  onLoad: function (options) {
    var that = this
    wx.cloud.callFunction({
      name: 'getData',
      success: res => {
        that.setData({
          resumeImg: res.result.data[0].resumeImg
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