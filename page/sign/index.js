import h from '../../utils/url.js'
var app = getApp()
Page({
  data:{
    fname:'',
    fsex:'',
    faddress:'',
    fenterprise:'',
    loadingHidden:true
  },
  onLoad:function(options){
  },
  onShow: function(){
  },
  changeFname: function (e) {
    this.setData({
      fname:e.detail.value
    })
  },
  changeFsex: function (e) {
    this.setData({
      fsex: e.detail.value
    })
  },
  changeFaddress: function (e) {
    this.setData({
      faddress: e.detail.value
    })
  },
  chooseLocation: function (e) {
      wx.chooseLocation({
        success: (res) => {
          // success
          console.log('选择的位置位置---')
          console.log(res)
          console.log(res.address)
          this.setData({
            faddress: res.address
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
  },
  changeFenterprise: function (e) {
    this.setData({
      fenterprise: e.detail.value
    })
  },
  //提交补充信息
  toSign: function () {
    if (this.data.fname == '' || this.data.fsex == '' || this.data.faddress == '' || this.data.fenterprise == '' || app.globalData.signMobile == '' ){
      wx.showModal({
        title: '提示',
        content: '信息不全！!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')    
          }
        }
      }); 
      return
    }else{
      //提交补充信息
      wx.request({
        url: h.main + '/page/register.do',
        data: {
          fname: this.data.fname,
          fgender: this.data.fsex,
          faddress: this.data.faddress,
          fcomname: this.data.fenterprise,
          fmobile: app.globalData.signMobile,
          realname: app.globalData.userInfo.nickName,
          head_img: app.globalData.userInfo.avatarUrl,
          oppen_id: app.globalData.oppenid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }, // 设置请求的 header
        success: (res) => {
          console.log('补充信息backInfo---=')
          console.log(res)
          if(res.data=='success'){
            wx.showToast({
              title: '提交成功！',
              duration: 500
            });
            wx.switchTab({
              url: '../index/index?type=1',
            })
          }
          
        },
        fail: (res) => {
        },
        complete: (res) => {
        }
      })
    }
    
  },
})