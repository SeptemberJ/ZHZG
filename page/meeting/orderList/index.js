var app = getApp()
import h from '../../../utils/url.js'
import util from '../../../utils/util.js'
Page({
    data: {
      orderList: [],
      loadingHidden:false   
    },
    onShow: function(){
      //获取预约列表
      this.getOrderList()
    },
    // 去预约
    toOrder: function(){
      wx.navigateTo({
        url: '../orderMeeting/index',
      })
    },
    // 获取预约列表
    getOrderList: function(){
      wx.request({
        url: h.main+'/selectorder.do',
        data: {
          openid: app.globalData.oppenid //'o5ybw0H7IOTw_vpyxAihnxQInPOE'
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }, // 设置请求的 header
        success: (res) => {
          console.log('我的预定列表backInfo---=')
          console.log(res.data)
          this.setData({
            orderList: res.data
          })
        },
        fail: (res) => {
        },
        complete: (res) => {
          this.setData({
            loadingHidden: true
          })
        }
      })
    }
      
   
})