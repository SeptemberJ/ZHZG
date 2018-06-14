import h from '../../utils/url.js'
import util from '../../utils/util.js'
var app = getApp()
Page({
  data:{
    // userRole:0,
    // ifSigned: true,
    // type:0,
    // counts:{},
    // date:'',
    // attachImg:[],
    // attachVideo: [],
    // fattachImg:'',
    // fattachVideo:'',
    // serviceWay:'电话咨询',
    // probelmDetail:'',
    // signPhone:'',
    // signCode:'',
    // realSignCode:'',
    // timerCount:'获取验证码',
    // waysArray:['电话咨询','上门服务','远程服务'],
    // wayIndex:0,
    // disabled:true,
    loadingHidden:true
  },
  onLoad:function(options){
  },
  onShow: function(){
        //若为工程师调用计数接口
        wx.request({
          url: h.main + '/page/count.do',
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
            console.log('获取工程师计数backInfo---=')
            console.log(res)
            this.setData({
              counts: res.data
            })

          },
          fail: (res) => {
          },
          complete: (res) => {
          }
        })


  },
  //查看对应工单
  goOrderList: function (e) {
    var kind = e.currentTarget.dataset.class
    wx.navigateTo({
      url: '../orderList/index?kind=' + kind,
    })
  },
  //查看全部工单
  goAllOrder: function () {
    wx.navigateTo({
      url: '../order/index',
    })
  },


  
})
