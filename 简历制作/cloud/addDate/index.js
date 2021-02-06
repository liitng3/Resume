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
    openid:wxContext.OPENID
  }).update({
    data: {
      name: event.name,
      age: event.age,
      email: event.email,
      face: event.face,
      marry: event.marry,
      nation: event.nation,
      sex: event.sex,
      tel: event.tel,
      imgUrl:event.imgUrl
    }
  })
  
}