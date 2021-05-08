var app = getApp()
Page({
 data: {
  currentTab: 0,
  list:[],
  list1:[]
 },
 onLoad: function (options) {
  // 页面初始化 options为页面跳转所带来的参数
  var that = this;
  wx.cloud.callFunction({
    name: 'getAll',
    success: res => {
      that.setData({
        list: res.result.data
      })
    },
    fail: err => {
    }
  })
 },
 del:function(event){
  console.log(event.currentTarget.dataset.num)
  wx.cloud.callFunction({
    name: 'delData',
    data: {
      id: event.currentTarget.dataset.num,
    }
  }).then(res => {
    console.log("成功", res)
  }).catch(res => {
    console.log("失败", res)
  })
  if (getCurrentPages().length != 0) {
    //刷新当前页面的数据
    getCurrentPages()[getCurrentPages().length - 1].onLoad()
  }
},
update1: function(event) {
  wx.cloud.callFunction({
    name: 'update1',
    data: {
      id: event.currentTarget.dataset.num,
    }
  }).then(res => {
    console.log("成功", res)
  }).catch(res => {
    console.log("失败", res)
  })
  if (getCurrentPages().length != 0) {
    //刷新当前页面的数据
    getCurrentPages()[getCurrentPages().length - 1].onLoad()
  }
},
update2: function(event) {
  console.log(event.currentTarget.dataset.num)
  wx.cloud.callFunction({
    name: 'update2',
    data: {
      id: event.currentTarget.dataset.num,
    }
  }).then(res => {
    console.log("成功", res)
  }).catch(res => {
    console.log("失败", res)
  })
  if (getCurrentPages().length != 0) {
    //刷新当前页面的数据
    getCurrentPages()[getCurrentPages().length - 1].onLoad()
  }
},
 //滑动切换
 swiperTab: function (e) {
  var that = this;
  that.setData({
   currentTab: e.detail.current
  });
 },
 //点击切换
 clickTab: function (e) {
  var that = this;
  if (this.data.currentTab === e.target.dataset.current) {
   return false;
  } else {
   that.setData({
    currentTab: e.target.dataset.current
   })
  }
 }
})
