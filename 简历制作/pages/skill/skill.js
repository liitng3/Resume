// pages/school/school.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con:'',
    credentialList:[]
  },
  add() {
    var that=this;
    var context='';
    console.log(this.data.credentialList);
    var len=this.data.credentialList.length;
    for(var i=0;i<len;i++){
      context=context+this.data.credentialList[i].credentialName+';'
    }
    this.setData({
      con:context
    })
    wx.cloud.callFunction({
      name:"updateSkill",
      data: {
        skill: that.data.con,
      }
    }).then(res => {
      console.log("成功", res)
    }).catch(res => {
      console.log("失败", res)
    })
    
  },
  getInput(e) {
    this.setData({
      inputCon: e.detail.value
    })
  },
  addInput: function (e) {
    let credentialList = this.data.credentialList
    this.data.credentialList.push({})
    this.setData({
        credentialList: this.data.credentialList,
    })
  },
  credentialInput: function (e) {
      let index = e.currentTarget.dataset.index
      this.setData({
          ["credentialList[" + index + '].credentialName']: e.detail.value,
          
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var box=[];
    var arr=[];
    wx.cloud.callFunction({
      name: 'getData',
      success: res => {
        box=res.result.data[0].skill.split(";")
        var len=box.length;
        for(var i=len-1;i>0;i--){
          if(box[i]=="" || box[i]=="undefined"){
            box.splice(i, 1);
          }
        }
        len=box.length;
        for(var i=0;i<len;i++){
          var obj={};
          obj.index=i;
          obj.credentialName=box[i];
          console.log(obj);
          arr.push(obj)
        }
        console.log(arr);
        that.setData({
          credentialList:arr,
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