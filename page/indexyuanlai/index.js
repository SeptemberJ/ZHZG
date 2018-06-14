import h from '../../utils/url.js'
import util from '../../utils/util.js'
var app = getApp()
Page({
  data:{
    userRole:0,
    ifSigned: true,
    type:0,
    counts:{},
    date:'',
    attachImg:[],
    attachVideo: [],
    fattachImg:'',
    fattachVideo:'',
    // touchStart:0,
    // touchMove: 0,
    serviceWay:'上门服务',
    probelmDetail:'',
    signPhone:'',
    signCode:'',
    realSignCode:'',
    timerCount:'获取验证码',
    waysArray:['上门服务', '自己送修'],
    wayIndex:0,
    disabled:true,
    canDo: false,
    loadingHidden:true
  },
  onLoad:function(options){
        //调用应用实例的方法获取全局数据
        // app.getUserInfo((userInfo)=> {
        //     this.setData({
        //         userInfo: userInfo,
        //         nickName:userInfo.nickName,
        //     })
        //     console.log(this.data.userInfo)
        // });
        this.setData({
          type: options.type
        })
  },
  onShow: function(){
    //获取当前时间作为预约上门时间
    var nowDate = new Date()
    this.setData({
      date: util.formatTime2(nowDate),
    })
    if (app.globalData.oppenid!=''){
      //注册与否
      this.setData({
        ifSigned: app.globalData.ifSigned
      })
      console.log('ifSigned------')
      console.log(this.data.ifSigned)


      this.setData({
        userRole: app.globalData.userRole
      })
      if (this.data.userRole == 1) {
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

      }

    }else{
      var that = this
      wx.login({
        success: (a) => {
          var code = a.code;
          console.log(code + "*******************")
          wx.getUserInfo({
            success: (res) => {
              var encryptedData = encodeURIComponent(res.encryptedData);
              var iv = res.iv;
              app.globalData.userInfo = res.userInfo
              app.globalData.code = code
              app.globalData.encryptedData = encryptedData
              app.globalData.iv = res.i
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
                success: (res) => {
                  console.log('登录信息backInfo-----');
                  // success
                  console.log(res);
                  app.globalData.ifLogined = 1
                  app.globalData.oppenid = res.data.oppen_id;
                  if (res.data.custom) {
                    app.globalData.fname = res.data.custom.fname;
                    app.globalData.fmobile = res.data.custom.fmobile;
                    app.globalData.userRole = res.data.custom.frole;
                  }
                  app.globalData.ifSigned = res.data.status;
                  app.globalData.oppenid = res.data.oppen_id;
                  console.log(app.globalData.fname);
                  console.log(app.globalData.fmobile);
                  console.log(app.globalData.userRole);
                  console.log(app.globalData.ifSigned);
                  console.log('onshow2------')
                  //注册与否
                  this.setData({
                    ifSigned: app.globalData.ifSigned
                  })
                  console.log('ifSigned------')
                  console.log(this.data.ifSigned)


               
                  this.setData({
                    userRole: app.globalData.userRole
                  })
                  if (this.data.userRole == 1) {
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

                  }
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

    }


  },
  //扫码
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        wx.showModal({
          title: '固定资产编号',
          content: res.result,
          showCancel: false,
          success: (res)=> {
            if (res.confirm) {
              //console.log('用户点击确定')    
            }
          }
        });
      }
    })
  },
  //工程师----------
  //查看对应工单
  goOrderList: function(e){
    var kind = e.currentTarget.dataset.class
    wx.navigateTo({
      url: '../orderList/index?kind='+kind,
    })
  },
  //
  goAllOrder: function(){
    wx.switchTab({
      url: '../order/index',
    })

  },
  // 下拉刷新
  onPullDownRefresh() {
    if (this.data.userRole == 1){
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
          wx.stopPullDownRefresh()

        },
        fail: (res) => {
        },
        complete: (res) => {
        }
      })

    }else{
      wx.stopPullDownRefresh()
    }

  },


  //客户端----------
  //获取手机验证码
  toGetCode: function(){
    console.log(this.data.signPhone)
    //验证手机格式
    if (!(/^1[34578]\d{9}$/.test(this.data.signPhone))){
      wx.showModal({
        title: '提示',
        content: '请填写正确的手机号码!',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击确定')    
          }
        }
      });
      return;
    }
    //是否允许再次点击
    if (!this.data.disabled){
      return
    }
    //接口获取验证码
    wx.request({
      url: h.main + '/page/send.do',
      data: {
        fmobile: this.data.signPhone
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }, // 设置请求的 header
      success: (res) => {
        console.log('获取验证码backInfo---=')
        console.log(res)
        this.setData({
          realSignCode: res.data
        })
      },
      fail: (res) => {
      },
      complete: (res) => {
      }
    })
    //倒计时
      var countdown = 60;
      var _this = this
      settime()
      function settime() {
        if (countdown == 0) {
          _this.setData({
            disabled: true,
            timerCount: '获取验证码',
          })
          countdown = 60;
        } else {
          _this.setData({
            disabled: false,
            timerCount: "重新发送(" + countdown + ")"
          })
          countdown--;
        }
        setTimeout(function () {
          if (_this.data.disabled == false){
            settime()
          }
          
        }, 1000)
      }


  },

  //输入手机号
  changePhone: function(e){
    this.setData({
      signPhone:e.detail.value
    })
  },
  //输入验证码
  changeCode: function (e) {
    this.setData({
      signCode: e.detail.value
    })
  },
  //比对验证码
  confirmTosign: function () {
    if (this.data.signCode == this.data.realSignCode){
      app.globalData.signMobile = this.data.signPhone
      wx.navigateTo({
        url: '../sign/index',
      })
    } else {
        wx.showModal({
          title: '提示',
          content: '验证码不正确！!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //console.log('用户点击确定')    
            }
          }
        });  
      }
  },
  //服务方式 
  // chooseServiceWay: function(e){
  //   this.setData({
  //     serviceWay: e.detail.value
  //   })
  // },
  bindPickerChange: function (e) {
    this.setData({
      wayIndex: e.detail.value,
      serviceWay: this.data.waysArray[e.detail.value]
    })
  },

  //上门时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //问题描述 
  chooseDetail: function (e) {
    this.setData({
      probelmDetail: e.detail.value
    })
  },
  // 选择图片
  chooseImage: function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: (res)=> {
        console.log(res)
        var attachImg = this.data.attachImg
        if (attachImg.length>0){
          attachImg.splice(0,1,res.tempFilePaths[0])
        }else{
          attachImg.push(res.tempFilePaths[0])
        }
        this.setData({
          attachImg: attachImg
        })
        //上传文件本地路径换取服务器路径
        wx.uploadFile({
          url: h.main + '/page/Insertimg.do',//仅为示例，非真实的接口地址
          filePath: attachImg[0],
          name: 'file',
          formData: {},
          header: {
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            console.log('图片上传backInfo-----')
            console.log(res)
            this.setData({
              fattachImg:res.data
            })

          },
          fail: (res) => {
            console.log('图片上传失败backInfo-----')
            console.log(res)
          },
          complete: (res) => {
          }
        })
      }
    })
  },

  // 图片预览
  previewImage: function (e){
    var currentImgUrl = e.currentTarget.dataset.url
    wx.previewImage({
      current: currentImgUrl,
      urls: this.data.attachImg,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //删除
  toDeleteImg: function (e) {
    var idx = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确定要删除该图片吗？',
      success: (res) => {
        if (res.confirm) {
          var tempt = this.data.attachImg
          tempt.splice(idx,1)
          this.setData({
            attachImg: tempt,
            fattachImg:''
          })
        }
      }
    })
  },
  // 选择视频
  chooseVideo: function () {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: (res)=> {
        console.log(res)
        var attachVideo = this.data.attachVideo
        if (attachVideo.length > 0) {
          attachVideo.splice(0, 1, res.tempFilePath)
        } else {
          attachVideo.push(res.tempFilePath)
        }
        this.setData({
          attachVideo: attachVideo
        })
        //上传文件本地路径换取服务器路径
        wx.uploadFile({
          url: h.main + '/page/Insertvideo.do',//仅为示例，非真实的接口地址
          filePath: attachVideo[0],
          name: 'file',
          formData: {},
          header: {
            'content-type': 'multipart/form-data',
          },
          success: (res) => {
            console.log('视屏上传成功backInfo-----')
            console.log(res)
            this.setData({
              fattachVideo: res.data
            })

          },
          fail: (res) => {
            console.log('视屏上传失败backInfo-----')
            console.log(res)
          },
          complete: (res) => {
          }
        })
      }
    })
  },
  //删除视频
  toDeleteVideo: function (e) {
    var idx = e.currentTarget.dataset.index
    wx.showModal({
      title: '提示',
      content: '确定要删除该视频吗？',
      success: (res) => {
        if (res.confirm) {
          var tempt = this.data.attachVideo
          tempt.splice(idx, 1)
          this.setData({
            attachVideo: tempt,
            fattachVideo:''
          })
        }
      }
    })
  },

  submitApply: function(){
    this.setData({
      canDo:true
    })
    //输入验证
    if (this.data.probelmDetail == '' || this.data.probelmDetail == null) {
      wx.showModal({
        title: '提示',
        content: '请填写问题描述!',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            this.setData({
              canDo: false
            })    
          }
        }
      });
      return;
    }
    if (!this.data.address){
      wx.showModal({
        title: '提示',
        content: '请选择联系信息!',
        showCancel: false,
        success: (res)=> {
          if (res.confirm) {
            this.setData({
              canDo: false
            })    
          }
        }
      });
      return;
    }


    //申请提交
    wx.request({
      url: h.main + '/page/Apply.do',
      data: {
        fcontact: this.data.address.fname,
        fmobile: this.data.address.fmobile,
        faddress: this.data.address.fprovince + this.data.address.fcity + this.data.address.farea + this.data.address.faddress,
        fservice: this.data.serviceWay,
        freserve_time: this.data.date,
        fproblem: this.data.probelmDetail,
        fpicture: this.data.fattachImg,
        fvideo: this.data.fattachVideo,
        oppen_id: app.globalData.oppenid
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }, // 设置请求的 header
      success: (res) => {
        console.log('申请提交backInfo---=')
        console.log(res)
        if (res.data=='success'){
          wx.showToast({
            title: '保存成功',
            duration: 500
          });
          wx.switchTab({
            url: '../order/index',
          })
          //客户提交成功后清空页面数据
          this.setData({
            attachImg: [],
            attachVideo: [],
            fattachImg: '',
            fattachVideo: '',
            serviceWay: '',
            probelmDetail: ''
          })
          
        }
      },
      fail: (res) => {
      },
      complete: (res) => {
        this.setData({
          canDo: false
        })   
      }
    })



  },

  // 传递地址type=0
  chooseAddress: function () {
    wx.navigateTo({
      url: '../my/address/list/list?type=0',
    })
  },
  //取栈内地址
  backAddress: function (info) {
    this.setData({
      address: info,
    })
  },
  
})
