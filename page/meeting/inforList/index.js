var app = getApp()
import h from '../../../utils/url.js'
import util from '../../../utils/util.js'
Page({
    data: {
      orderTime:'',
      meetingList:[],
      loadingHidden: false    
    },
    onShow: function(){
      wx.getStorage({
        key: 'orderTime',
        success: (res)=> {
          console.log(res)
          this.setData({
            orderTime:res.data
          })
          //可预约会议室列表
          wx.request({
            url: h.main+'/selecttime.do',
            data: {
              fbegintime: res.data.fbegintime,
              fendtime: res.data.fendtime
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            }, // 设置请求的 header
            success: (res) => {
              console.log('可预约会议室列表backInfo---=')
              console.log(res.data)
              var meetingList = []
                for (let i = 0; res.data.length > 0;i++){
                  let tempArray = res.data.splice(0,8)
                  let obj = {
                    'FID': tempArray[3],
                    'FNAME': tempArray[2],
                    'Fbegintime1': tempArray[0].substring(0,16),
                    'Fendtime1': tempArray[1].substring(0, 16),
                    'FCODE': tempArray[4],
                    'FADDRESS': tempArray[5],
                    'FPRICE': tempArray[6],
                    'FIMG': tempArray[7],
                  }
                  meetingList.push(obj)
                }
                console.log(meetingList)
              
              this.setData({
                loadingHidden: true, 
                meetingList: meetingList
              })
              
            },
            fail: (res) => {
            },
            complete: (res) => {
            }
          })

        },
      })
      
      
    },
    //预定
    toOrder: function(e){
      var ID = e.currentTarget.dataset.id
      wx.request({
        url: h.main +'/insertorder.do',
        data: {
          id: ID,
          openid: app.globalData.oppenid
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }, // 设置请求的 header
        success: (res) => {
          console.log('预定backInfo---=')
          console.log(res.data)
          if (res.data==1){
            wx.showToast({
              title: '预定成功!',
              icon: 'success',
              duration: 500
            })
            wx.navigateTo({
              url: '../orderList/index',
            })
          }
        },
        fail: (res) => {
        },
        complete: (res) => {
        }
      })

    } 
   
})