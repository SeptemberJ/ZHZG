import h from '../../utils/url.js'
import util from '../../utils/util.js'
var app = getApp()
Page({
  data:{
    userRole: '',
    fbillno:'',
    AttachInfo:'',
    loadingHidden:true,
    canDo:false
  },
  onLoad:function(options){
    this.setData({
      fbillno: options.fbillno
    })
  },
  onShow: function(){
    this.setData({
      userRole:app.globalData.userRole
    })
    console.log(this.data.userRole)
    //订单详情
    wx.request({
      url: h.main + '/page/orderdetail.do',
      data: {
        fbillno: this.data.fbillno
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }, // 设置请求的 header
      success: (res) => {
        console.log('获取订单详情backInfo---=')
        console.log(res)
        var temp = res.data[0]
        temp.fdate = util.secondToFormat(res.data[0].fdate)
        if (res.data[0].fpicture!=''){
          temp.fpicture = h.main + res.data[0].fpicture
        }
        if (res.data[0].fvideo != '') {
          temp.fvideo = h.main + res.data[0].fvideo
        }
        console.log(temp)
        this.setData({
          orderInfor: temp
        })
      },
      fail: (res) => {
      },
      complete: (res) => {
      }
    })
    
  },
  // 图片预览
  previewImage: function (e) {
    var currentImgUrl = e.currentTarget.dataset.url
    var imgArray = [currentImgUrl]
    console.log(currentImgUrl)
    wx.previewImage({
      current: currentImgUrl,
      urls: imgArray,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 工程师端
  confirm: function(e){
    wx.showModal({
      title: '提示',
      content: '确认接单？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            loadingHidden: false
          })
          //确认接单
          wx.request({
            url: h.main + '/page/orderconfirm.do',
            data: {
              fbillno: this.data.fbillno
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded',
            //   'Accept': 'application/json',
            // }, // 设置请求的 header
            success: (res) => {
              this.setData({
                loadingHidden: true
              })
              console.log('确认接单backInfo---=')
              console.log(res)
              if (res.data == 'success') {
                wx.showToast({
                  title: '接单成功！',
                  duration: 500
                });
                // 等待半秒，toast消失后返回上一页
                setTimeout(function () {
                  wx.navigateBack();
                }, 500);
              }

            },
            fail: (res) => {
            },
            complete: (res) => {
            }
          })

        }
      }
    })
  },
  changeAttachInfo: function(e){
    this.setData({
      AttachInfo: e.detail.value
    })
    console.log(this.data.AttachInfo)
  },
  //确认完成订单
  finish: function(){
    wx.showModal({
      title: '提示',
      content: '确认订单已完成？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            loadingHidden: false,
            canDo:true
          })
          //确认接单
          wx.request({
            url: h.main + '/page/ordercomplete.do',
            data: {
              fbillno: this.data.fbillno,
              fserverdetail: this.data.AttachInfo
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {
            //   'content-type': 'application/x-www-form-urlencoded',
            //   'Accept': 'application/json',
            // }, // 设置请求的 header
            success: (res) => {
              this.setData({
                loadingHidden: true
              })
              console.log('确认订单完成backInfo---=')
              console.log(res)
              if (res.data == 'success') {
                wx.showToast({
                  title: '确认成功！',
                  duration: 500
                });
                // 等待半秒，toast消失后返回上一页
                setTimeout(function () {
                  wx.navigateBack();
                }, 500);
              }

            },
            fail: (res) => {
            },
            complete: (res) => {
            }
          })

        }
      }
    })

  },
  // 客户端
  cancel: function () {
    wx.showModal({
      title: '提示',
      content: '确认取消该订单？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            loadingHidden: false
          })
          //订单取消
          wx.request({
            url: h.main + '/page/ordercancel.do',
            data: {
              fbillno: this.data.fbillno
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            }, // 设置请求的 header
            success: (res) => {
              this.setData({
                loadingHidden: true
              })
              console.log('订单取消backInfo---=')
              console.log(res)
              if (res.data=='success'){
                wx.showToast({
                  title: '订单取消成功！',
                  duration: 500
                });
                // 等待半秒，toast消失后返回上一页
                setTimeout(function () {
                  wx.navigateBack();
                }, 500);
              }
              
            },
            fail: (res) => {
            },
            complete: (res) => {
            }
          })

        }
      }
    })
  },
})