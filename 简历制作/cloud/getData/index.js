// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env:"resume-dbcdg"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection('user').get()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}