// 云函数入口文件
const cloud = require('wx-server-sdk')

// cloud.init()
cloud.init({
  env: "resume-dbcdg"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("user").add({
    data: {
      name: event.name,
      age: event.age,
      email: event.email,
      face: event.face,
      marry: event.marry,
      nation: event.nation,
      sex: event.sex,
      tel: event.tel,
      // id: md5(wxContext.OPENID),
      // openid: wxContext.OPENID,
    }
  })
  
}