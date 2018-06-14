import h from '../../utils/url.js'
import util from '../../utils/util.js'
var app = getApp()
Page({
  data: {
    userRole:'',
    tabListC: ['待接单', '待上门', '已完成', '全部'],
    tabListE: ['待接单', '今日待修', '已完成', '全部'],
    cur: 0,
    orderList:[],
    urls:[],
    loadingHidden: false
  },
  onReady: function () {
    
  },

  onLoad: function (options) {
    this.setData({
      userRole: app.globalData.userRole
    })
    console.log(this.data.userRole)
    
  },
  onShow: function () {
    console.log('order------')
    console.log(app.globalData.userRole)
    var tempUrl = []
    if (app.globalData.userRole==0){
      //客户接口地址
      tempUrl = ['/page/Pendingorders1.do', '/page/Confirmedorders1.do', '/page/Completedorders1.do', '/page/orders1.do']
    }else{
      //工程师接口地址
      tempUrl = ['/page/Pendingorders.do', '/page/Confirmedorders.do', '/page/Completedorders.do', '/page/orders.do']
    }
    this.setData({
      urls: tempUrl
    })
    if (app.globalData.userRole==0){
      //客户
      this.getOrderListByClassC()
    }else{
      //工程师
      this.getOrderListByClassE()
    }
    

  },
  //工程师获取订单列表
  getOrderListByClassE: function () {
    this.setData({
      loadingHidden: false
    })
    //获取对应的订单列表
    wx.request({
      url: h.main + this.data.urls[this.data.cur],
      data: {
        fclerk: app.globalData.fname,
        fclerktel: app.globalData.fmobile
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }, // 设置请求的 header
      success: (res) => {
        console.log('获取对应的订单列表backInfo---=')
        console.log(res.data)
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
        this.setData({
          loadingHidden: true
        })
      }
    })
  },
  //客户获取订单列表
  getOrderListByClassC: function(){
    this.setData({
      loadingHidden: false
    })
    //获取对应的订单列表
    wx.request({
      url: h.main + this.data.urls[this.data.cur],
      data: {
        oppen_id: app.globalData.oppenid,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }, // 设置请求的 header
      success: (res) => {
        console.log('获取对应的订单列表backInfo---=')
        console.log(res.data)
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
        this.setData({
          loadingHidden: true
        })
      }
    })
  },
  changeTab: function (e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      cur: id
    })
    if (app.globalData.userRole == 0) {
      //客户
      this.getOrderListByClassC()
    } else {
      //工程师
      this.getOrderListByClassE()
    }
  },
  toDetail: function (e) {
    var fbillno = e.currentTarget.dataset.fbillno
    wx.navigateTo({
      url: '../orderDetail/index?fbillno=' + fbillno,
    })

  },
  // 下拉刷新
  onPullDownRefresh() {
    //获取对应的订单列表
    if (app.globalData.userRole == 0) {
      //客户
      this.getOrderListByClassC()
    } else {
      //工程师
      this.getOrderListByClassE()
    }
  },
})