import h from '../../utils/url.js'
import util from '../../utils/util.js'
var bmap = require('../../utils/bmap-wx.js');
var wxMarkerData = []; 
var app = getApp()
Page({
  data: {
    cur:0,
    imgUrls: ['http://gaopin-preview.bj.bcebos.com/133100669913.jpg@!100','http://gaopin-preview.bj.bcebos.com/133201810404.jpg@!100'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 1000,
    duration: 500,
    circular:true,
    text: '柏田服务通生活好帮手',
    marqueePace: 0.5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 25,
    orientation: 'left',//滚动方向
    // interval: 20, // 时间间隔
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {} ,
    userDefineds:['IT运维服务'],
    fservicetype:'IT运维服务',
    ServiceProvider:'',
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],
    circles: [],
    minDistance: {
    id: "2",
    latitude: 31.25,
    longitude: 121.4,
    width: 50,
    height: 50,
    // iconPath: "../../image/menu-dot.png",
    title: '柏田软件',
    callout: {
      content: '柏田软件',
      color: '#000',
      bgColor: '#fff',
      display: 'ALWAYS'
    }
    },
    loadingHidden: true,
    showLoading:true
  },
  onReady: function () {
    
  },


  onLoad: function (options) {

    // 清空本地存储
    //wx.clearStorage()
    //调用应用实例的方法获取全局数据
        // app.getUserInfo((userInfo)=> {
        //     console.log(this.data.userInfo)
        // });
        // this.loadInfo()
    //地图高度
        // wx.getSystemInfo({
        //   success: (res)=> {
        //     //设置map高度，根据当前设备宽高满屏显示
        //     this.setData({
        //       view: {
        //         Height: res.windowHeight
        //       }

        //     })
        //   }
        // })
        // 定位
        // wx.getLocation({
        //   type: 'wgs84',
        //   success: (res)=> {
        //     var latitude = res.latitude
        //     var longitude = res.longitude
        //     wx.setStorage({
        //       key: "curLocation",
        //       data: {
        //         'Tlatitude': res.latitude,
        //         'Tlongitude': res.longitude
        //       }
        //     })
        //   },
        //   fail: (res) => {
        //     // fail  
        //   },
        //   complete: (res) => {
        //     // complete  
        //   }
        // })

    
  },


  onShow: function () {
    console.log('onshow--=')
    // this.loadInfo()
    // 跑马灯
    // var vm = this;
    // var length = vm.data.text.length * vm.data.size;//文字长度
    // var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    // vm.setData({
    //   length: length,
    //   windowWidth: windowWidth,
    //   marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    // });
    // vm.run();// 第一个字消失后立即从右边出现
  },
  // run: function () {
  //   var vm = this;
  //   var interval = setInterval(function () {
  //     if (-vm.data.marqueeDistance2 < vm.data.length) {
  //       // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
  //       vm.setData({
  //         marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
  //         marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
  //       });
  //     } else {
  //       if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
  //         vm.setData({
  //           marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
  //         });
  //         clearInterval(interval);
  //         vm.run();
  //       } else {
  //         clearInterval(interval);
  //         vm.setData({
  //           marqueeDistance2: -vm.data.windowWidth
  //         });
  //         vm.run();
  //       }
  //     }
  //   }, vm.data.interval);
  // },
  //toChooseCity
  toChooseCity: function(e){
    var curCity = e.currentTarget.dataset.city
    wx.navigateTo({
      url: '../chooseCity/index?curCity=' + curCity,
    })

  },
  //扫码
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        wx.showModal({
          title: '固定资产编号',
          content: res.result,
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              //console.log('用户点击确定')    
            }
          }
        });
      }
    })
  },
  // 我的服务
  toMyService: function(){
    if (app.globalData.userRole == 0) {
      wx.navigateTo({
        url: '../serviceC/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '对不起，您没有权限查看该模块！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
  },
  //进度查询
  toProcess: function () {
    if (app.globalData.userRole == 0) {
      wx.navigateTo({
        url: '../order/index',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '对不起，您没有权限查看该模块！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
  },
  // 我的工单
  toEngineer: function () {
    if (app.globalData.userRole==1){
      wx.navigateTo({
        url: '../engineer/index',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '对不起，您没有权限查看该模块！',
        showCancel: false,
        success: (res) => {
          if (res.confirm) {

          }
        }
      })
    }
  },
  // 会议室预约
  toMeeting: function(){
    wx.navigateTo({
      url: '../meeting/orderMeeting/index',
    })
  },

  //商城订购
  toMall: function () {
    if (wx.navigateToMiniProgram) {
      console.log('tomall---')
      wx.navigateToMiniProgram({
        appId: 'wx6a30d2c0aea74559',
        path: '',
        extraData: {
        },
        envVersion: 'trial',
        success(res) {
          // 打开成功
          console.log(res)
        },
        fali(res) {
          // 打开失败
          console.log(res)
        },
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    
  },
  // 选择服务商类目
  chooseFservicetype: function (e) {
    var idx = e.currentTarget.dataset.index
    this.setData({
      fservicetype: this.data.userDefineds[idx],
      cur:idx,
      showLoading: true
      })
    this.loadInfo()

  },
    //  获取该类目下的服务商
   loadInfo: function () {
     wx.getStorage({
       key: 'curLocation',
       success: (res)=> {
         console.log('getStorage-----')
        console.log(res.data)
        var Tlatitude = res.data.Tlatitude
        var Tlongitude = res.data.Tlongitude
        this.setData({
          latitude: Tlatitude,
          longitude: Tlongitude
        })
        //获取该类目下的服务商
        wx.request({
          url: h.main + '/page/nearest.do',
          data: {
            lng: res.data.Tlongitude,
            lat: res.data.Tlatitude,
            fservicetype: this.data.fservicetype
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {
          //   'content-type': 'application/x-www-form-urlencoded',
          //   'Accept': 'application/json',
          // }, // 设置请求的 header
          success: (res) => {
            console.log('获取该类目下的服务商')
            console.log(res)
            if (res.data == '') {
              //没有服务商时
              wx.showModal({
                title: '提示',
                content: '对不起，该服务类型下暂时无服务商',
                showCancel: false,
                success: (res) => {
                  if (res.confirm) {
                  }
                }
              })
              var selfAddr = {
                distance: 0,
                duration: '0小时',
                fname: '您现在的位置',
                lat: Tlatitude,
                lng: Tlongitude
              }
              this.setData({
                ServiceProvider: selfAddr
              })

              //转换城市
              this.loadCity(Tlongitude, Tlatitude)

            } else {
              //有服务商时
              var temp = res.data
              temp.map(function (item, index) {
                item.distance = Number(item.distance.substr(0, item.distance.indexOf('公里')))
              })
              temp.sort(function (a, b) {
                return a.distance - b.distance
              });
              this.setData({
                ServiceProvider: temp[0]
              })
              this.loadCity(Tlongitude, Tlatitude)
            }
          },
          fail: (res) => {
          },
          complete: (res) => {
            wx.stopPullDownRefresh()
          }
        })


       }
     })
    // wx.getLocation({
    //   type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //   success: (res)=> {
    //     // success
    //     console.log(res)
    //     var Tlatitude = res.latitude
    //     var Tlongitude = res.longitude
    //     this.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     })
    //     //获取该类目下的服务商
    //     wx.request({
    //       url: h.main + '/page/nearest.do',
    //       data: {
    //         lng: res.longitude,
    //         lat: res.latitude,
    //         fservicetype: this.data.fservicetype
    //       },
    //       method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //       // header: {
    //       //   'content-type': 'application/x-www-form-urlencoded',
    //       //   'Accept': 'application/json',
    //       // }, // 设置请求的 header
    //       success: (res) => {
    //         console.log('获取该类目下的服务商')
    //         console.log(res)
    //         if(res.data==''){
    //           //没有服务商时
    //           wx.showModal({
    //             title: '提示',
    //             content: '对不起，该服务类型下暂时无服务商',
    //             showCancel:false,
    //             success: (res)=> {
    //               if (res.confirm) {
    //               } 
    //             }
    //           })
    //           var selfAddr = {
    //             distance: 0,
    //             duration: '0小时',
    //             fname: '您现在的位置',
    //             lat: Tlatitude,
    //             lng: Tlongitude
    //           }
    //           this.setData({
    //             ServiceProvider: selfAddr
    //           })

    //           //转换城市
    //           this.loadCity(Tlongitude, Tlatitude)
              
    //         }else{
    //           //有服务商时
    //           var temp = res.data
    //           temp.map(function (item, index) {
    //             item.distance = Number(item.distance.substr(0, item.distance.indexOf('公里')))
    //           })
    //           temp.sort(function (a, b) {
    //             return a.distance - b.distance
    //             });
    //           this.setData({
    //             ServiceProvider: temp[0]
    //           })
    //           this.loadCity(Tlongitude, Tlatitude)
    //         }
    //       },
    //       fail: (res) => {
    //       },
    //       complete: (res) => {
    //       }
    //     })

    //   },
    //   fail: function () {
    //     // fail  
    //   },
    //   complete: function () {
    //     // complete  
    //   }
    // })
  },
  //  经纬度对应城市
  loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=2ojY8H4BNgtoDyzXfNKTE87OCpNNm1yH&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: (res)=> {
        // success  
        console.log('城市----');
        console.log(res);
        var city = res.data.result.addressComponent.city;
        var tempMinDistance = res.data.minDistance
        this.setData({
          city: city,
        });
        this.setData({
          latitude: latitude,
          longitude: longitude,
          markers: [{
            id: "1",
            latitude: latitude,
            longitude: longitude,
            width: 50,
            height: 50,
            // iconPath: "../../image/icon/address.png",
            title: city,
            callout: {
              content: '您现在的位置',
              color: '#000',
              // fontSize:36, 
              bgColor: '#fb9c2c',
              display: 'ALWAYS'
            }
          }, 
          {
            id: "2",
            latitude: this.data.ServiceProvider.lat,
            longitude: this.data.ServiceProvider.lng,
            width: 50,
            height: 50,
            // iconPath: "../../image/menu-dot.png",
            title: this.data.ServiceProvider.fname,
            callout: {
              content: this.data.ServiceProvider.fname,
              color: '#000',
              // fontSize:36, 
              bgColor: '#fb9c2c',
              display: 'ALWAYS'
            }
          }],
          // polyline: [{
          //   points: [{
          //     latitude: this.data.ServiceProvider.lat,
          //     longitude: this.data.ServiceProvider.lng,
          //   }, {
          //     latitude: latitude,
          //     longitude: longitude,
          //   }],
          //   color: "#FF0000DD",
          //   width: 2,
          //   dottedLine: true
          // }],
          circles: [{
            latitude: this.data.ServiceProvider.lat,
            longitude: this.data.ServiceProvider.lng,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 1000,
            strokeWidth: 1
          }],
          loadingHidden:true,
          showLoading:false

        })
        console.log(this.data.markers)
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })

  },
  // 导航
  navigation: function () {
    this.setData({
      showLoading:true
    })
    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
    //   success: (res) => {
    //     console.log(res)
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: Number(this.data.ServiceProvider.lat),
    //       longitude: Number(this.data.ServiceProvider.lng),
    //       name: this.data.ServiceProvider.fname,
    //       scale: 28
    //     })
    //     this.setData({
    //       showLoading: false
    //     })
    //   }
    // })
    wx.openLocation({
      latitude: this.data.ServiceProvider.lat,
      longitude: this.data.ServiceProvider.lng,
      name: this.data.ServiceProvider.fname,
      scale: 28
    })
    this.setData({
      showLoading: false
    })
  },
  // 下拉刷新定位
  onPullDownRefresh: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.setStorage({
          key: "curLocation",
          data: {
            'Tlatitude': res.latitude,
            'Tlongitude': res.longitude
          }
        })
        this.loadInfo()
      },
      fail: (res) => {
        // fail  
      },
      complete: (res) => {
        // complete  
      }
    })
   
  }
})