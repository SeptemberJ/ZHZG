var app = getApp()
import h from '../../../../utils/url.js'
import util from '../../../../utils/util.js'
Page({
    data: {
      nowDate:'',
      dateS:'',
      timeS:'',
      dateE: '',
      timeE: '',
      duration:'',
      canChange:1,
      loadingHidden:false   
    },
    onShow: function(){
      var nowDate = new Date()
      var formatNowDate = util.formatTime2(nowDate)
      var hourS = nowDate.getHours()
      var minuteS = nowDate.getMinutes()
      //前加0
      var formatHourS = util.formatNumber(hourS)    
      var formatMinuteS = util.formatNumber(minuteS) 
      var formatHourS2 = util.formatNumber(hourS + 1)  
      //格式化后的时间
      var timeS = formatHourS + ':' + formatMinuteS
      var timeE = formatHourS2 + ':' + formatMinuteS  //默认后一小时
     
      this.setData({
        dateS: formatNowDate,
        dateE: formatNowDate,
        timeS: timeS,
        timeE: timeE,
        nowDate: nowDate
      })
      this.calculateTime(timeS, timeE)

      // var nextMinute = util.getNextDay(nowDate)
      // var formatNextDate = util.formatTime2(nowDate)
      // var hourE = nextMinute.getHours()
      // var minuteE = nextMinute.getMinutes()
      // var timeE = hourE + ':' + minuteE

      
    },
    // 前往预约列表
    toOrderList: function(){
      wx.navigateTo({
        url: '../orderList/index',
      })
    },
    //开始时间修改
    bindDateSChange: function (e) {
      this.setData({
        dateS: e.detail.value,
        dateE: util.formatTime2(new Date(e.detail.value))
      })
    },
    bindTimeSChange: function (e) {
      this.setData({
        timeS: e.detail.value,
        timeE: e.detail.value,
      })
      var canChange=this.calculateTime(e.detail.value, this.data.timeE)
      // if (canChange){
      //   this.setData({
      //     timeS: e.detail.value
      //   })
      // }else{
      //   return
      // }
    },
    //结束时间修改
    bindDateEChange: function (e) {
      this.setData({
        // dateS: e.detail.value,
        dateE: e.detail.value
      })
    },
    bindTimeEChange: function (e) {
      var canChange=this.calculateTime(this.data.timeS, e.detail.value)
      if (canChange) {
        this.setData({
          timeE: e.detail.value
        })
      } else {
        return
      }
    },
    //计算时间间隔
    calculateTime: function (timeS, timeE){
      var arrTimeS = timeS.split(':')
      var arrTimeE = timeE.split(':')
      var start=Number(arrTimeS[0]) * 60 * 60 + Number(arrTimeS[1]) * 60
      var end=Number(arrTimeE[0]) * 60 * 60 + Number(arrTimeE[1]) * 60
      if (end - start<0){
        wx.showModal({
          title: '提示',
          content: '开始时间不能小于结束时间！',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
            }
          }
        })
        return false
      }else{
        this.setData({
          duration: (end - start) / 60
        })
        return true
      }
    },
    //toOrderMeeting
    toOrderMeeting: function(){
      wx.showModal({
        title: '提示',
        content: '确认预约时间为：' + this.data.dateS + ' ' + this.data.timeS + ' 至 ' + this.data.dateE + ' ' + this.data.timeE +'？',
        success: (res) => {
          if (res.confirm) {
            wx.setStorage({
              key: "orderTime",
              data: {
                'fbegintime': this.data.dateS + ' ' + this.data.timeS,
                'fendtime': this.data.dateE + ' ' + this.data.timeE
              }
              //this.data.dateS + ' ' + this.data.timeS + ' 至 ' + this.data.dateE + ' ' + this.data.timeE
            })
            wx.navigateTo({
              url: '../inforList/index',
            })

          }
        }
      })
    }
   
})