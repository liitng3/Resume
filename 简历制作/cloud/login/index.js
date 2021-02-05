// // 云函数入口文件
// const cloud = require('wx-server-sdk')

// // cloud.init()
// cloud.init({
//   env: "resume-dbcdg"
// })

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }

const cloud = require('wx-server-sdk')
const md5 = require('md5-node')
// cloud.init()
cloud.init({
  env: "resume-dbcdg"
})
const db = cloud.database()
const usersTable = db.collection("user")
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext()
  //更新当前信息
  if (event.update == true) {
    try {
      return await usersTable.doc(md5(wxContext.OPENID)).update({
        data: {
          userData: _.set(event.userData)
        },
      })
    } catch (e) {
      console.error(e)
    }
  } else if (event.getSelf == true) {
    //获取当前用户信息
    try {
      return cloud.database().collection("user").where({
        openid: wxContext.OPENID
      }).get()
      // return await usersTable.doc(md5(wxContext.OPENID)).field({
      //   openid: false
      // }).get()
    } catch (e) {
      console.error(e)
    }
  } else if (event.setSelf == true) {
    //添加当前用户信息
    try {
      console.log(event.userData);
      return await usersTable.add({
        data: {
          id: md5(wxContext.OPENID),
          openid: wxContext.OPENID,
          name: "",
          age: 12,
          email: "",
          face: "",
          marry: "",
          nation: "",
          sex: "",
          tel: "",
          // userData: event.userData
          // boughtList: [],
          // messageList: [],
          // ontransList: []
        }
      })
    } catch (e) {
      console.log(e)
    }
  } else if (event.getOthers == true) {
    //获取指定用户信息
    try {
      return await usersTable.doc(event.userId).field({
        userData: true
      }).get()
    } catch (e) {
      console.error(e)
    }
  }
}