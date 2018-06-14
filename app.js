//app.js
import h from '/utils/url.js'
// const AV = require('./utils/av-weapp.js');
const appId = "wx6a30d2c0aea74559";
const appKey = "9f4fd8ce7a2f074b313630412d6caca7";

App({
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },

  onShow: function () {
    console.log('App Show')
   

  },
  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: (a) => {
        var code = a.code;
        console.log(code + "*******************")
        wx.getUserInfo({
          success: (res) => {
            var encryptedData = encodeURIComponent(res.encryptedData);
            var iv = res.iv;
            that.globalData.userInfo = res.userInfo
            that.globalData.code = code
            that.globalData.encryptedData = encryptedData
            that.globalData.iv = res.i
            wx.request({
              url: h.main + "/page/openid.do",
              data: {
                code: code,
                realname: that.globalData.userInfo.nickName,
                head_img: that.globalData.userInfo.avatarUrl
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              }, // 设置请求的 header
              success: (res) => {
                console.log('登录信息backInfo-----');
                // success
                console.log(res);
                that.globalData.ifSigned = res.data.status;
                that.globalData.oppenid = res.data.oppen_id;

                if (res.data.custom) {
                  that.globalData.fname = res.data.custom.fname;
                  that.globalData.fmobile = res.data.custom.fmobile;
                  that.globalData.userRole = res.data.custom.frole;
                }
                
                console.log(that.globalData.fname);
                console.log(that.globalData.fmobile);
                console.log(that.globalData.userRole);
                console.log(that.globalData.ifSigned);
              },
              fail: function (res) {
                // fail
                console.log(res);
              },
              complete: function (res) {
                // complete
                console.log(+res);
              }
            })
          }
        })
      }
    })
    //  wx.login({
    //     success: function (a) {
    //       var code = a.code;
    //       console.log(code+"*******************")
    //       wx.getUserInfo({
    //         success: function (res) {
    //           var encryptedData = encodeURIComponent(res.encryptedData);
    //            var iv = res.iv;
    //           that.globalData.userInfo = res.userInfo
    //           that.globalData.code = code
    //           that.globalData.encryptedData = encryptedData
    //           that.globalData.iv = res.iv
    //         Login(code,encryptedData,iv);
    //           typeof cb == "function" && cb(that.globalData.userInfo)
    //         }
    //       })
    //     }
    //   })
  },

  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    ifLogined:0,
    userInfo: null,
    code: "",
    encryptedData: "",
    iv: "",
    // oppenid: '',
    oppenid:'o5ybw0H7IOTw_vpyxAihnxQInPOE',
    userRole:0,  
    accountName:'',
    signMobile:'',
    fname:'',
    fmobile:'',
    ifSigned:''
  },

})



  //是否注册判断
  // function ifSigned(){
  //   var app = getApp();
  //   wx.request({
  //     url: h.main + '/page/openid.do',
  //     data: {
  //       oppen_id: app.globalData.oppenid
  //     },
  //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //       'Accept': 'application/json',
  //     }, // 设置请求的 header
  //     success: (res) => {
  //       console.log('是否注册判断backInfo---=')
  //       console.log(res)
  //       // this.setData({
  //       //   realSignCode: res.data
  //       // })
  //     },
  //     fail: (res) => {
  //     },
  //     complete: (res) => {
  //     }
  //   })
  // }


//Login-----
function Login(code, encryptedData, iv) {
  console.log('开始登录----');
  var app = getApp();
  console.log(app.globalData.userInfo);
  console.log(code)
  console.log(app.globalData.userInfo.nickName)
  console.log(app.globalData.userInfo.avatarUrl)
  //请求服务器
  wx.request({
    url: h.main + "/page/openid.do",
    data: {
      code: code,
      realname: app.globalData.userInfo.nickName,
      head_img: app.globalData.userInfo.avatarUrl
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }, // 设置请求的 header
    success: function (res) {
      console.log('登录信息backInfo-----');
      // success
      console.log(res);
      app.globalData.oppenid = res.data.oppen_id;
      app.globalData.fname = res.data.custom.fname;
      app.globalData.fmobile = res.data.custom.fmobile;
      app.globalData.userRole = res.data.custom.frole;
      app.globalData.ifSigned = res.data.status;
      app.globalData.oppenid = res.data.oppen_id;
      console.log(app.globalData.fname);
      console.log(app.globalData.fmobile);
      console.log(app.globalData.userRole);
      console.log(app.globalData.ifSigned);
      // console.log(app.globalData.oppenid);
    },
    fail: function (res) {
      // fail
      console.log(res);
    },
    complete: function (res) {
      // complete
      console.log(+res);
    }
  })
}