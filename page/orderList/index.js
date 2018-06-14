import h from '../../utils/url.js'
import util from '../../utils/util.js'
var app = getApp()
Page({
  data:{
    orderList:[
      {"id":0,"orderNum":"OR201701","submitDate":"2017-07-06"},
      { "id": 1, "orderNum": "OR201702", "submitDate": "2017-07-07" },
      { "id": 2, "orderNum": "OR201703", "submitDate": "2017-07-08" }
    ],
    kind:1,
    kindTit:'',
    loadingHidden:true
  },
  onLoad:function(options){
    this.setData({
      kind: options.kind
    })

  },
  onShow: function(){
    this.getOrderList()
  },

  toDetail: function (e) {
    var fbillno = e.currentTarget.dataset.fbillno
    wx.navigateTo({
      url: '../orderDetail/index?fbillno=' + fbillno,
    })
  },
  // 获取该类订单列表
  getOrderList: function(){
    var urls = ['/page/Pendingorders.do', '/page/Confirmedorders.do', '/page/Completedorders.do']
    //获取订单列表
    wx.request({
      url: h.main + urls[this.data.kind],
      data: {
        fclerk: app.globalData.fname,
        fclerktel: app.globalData.fmobile,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }, // 设置请求的 header
      success: (res) => {
        console.log('订单列表backInfo---=')
        console.log(res)
        var temp = res.data
        temp.map(function (item, index) {
          item.fdate = util.secondToFormat(item.fdate)
        })
        this.setData({
          orderList: temp
        })
      },
      fail: (res) => {
      },
      complete: (res) => {
        wx.stopPullDownRefresh()
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getOrderList()
  }
})