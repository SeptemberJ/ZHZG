const MD5 = require('../../utils/md5.js')
import h from '../../utils/url.js'
var app = getApp()
Page( {
  data: {
    emailId:'',
    loadingHidden:true
  },

  onLoad: function() {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) => {
      this.setData({
        userInfo: userInfo,
        nickName: userInfo.nickName,
      })
      console.log(this.data.userInfo)
    })
    
   
  },
  emailId: function (e) {
    this.setData({
      emailId: e.detail.value
    })
  },
  submitLogin: function(){
    console.log(this.data.emailId)
    wx.switchTab({
      url: '../index/index',
    })
    // this.setData({
    //   loadingHidden:false
    // })
    ////用户注册
    // wx.request({
    //   url: h.main + '/checkLog',
    //   data: {
    //     oppen_id: app.globalData.oppenid,
    //     username: this.data.userName,
    //     password: this.data.psd
    //     // password: MD5.hexMD5(this.data.psd)

    //   },
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'Accept': 'application/json',
    //   }, // 设置请求的 header
    //   success: (res) => {
    //     console.log('登录信息backInfo---=')
    //     console.log(res)
    //   },
    //   fail: (res) => {
    //   },
    //   complete: (res) => {
    //     this.setData({
    //       loadingHidden: true
    //     })
       
    //   }
    // })
  }
  
})