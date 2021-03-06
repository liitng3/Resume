// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: "resume-dbcdg"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return cloud.database().collection("user").where({
    openid:event.id
  }).update({
    data: {
      isMember: true
    }
  })  
}