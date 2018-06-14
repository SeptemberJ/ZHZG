var app = getApp()
import h from '../../../utils/url.js'
import util from '../../../utils/util.js'
Page({
    data: {
      nowDate:'',
      dateS:'',
      timeS:'',
      dateE: '',
      timeE: '',
      duration:'',
      canChange:1,
        
    },
    onShow: function(){
      //自动加上一小时
      this.nextOneHour(new Date())
      this.calculateTime(this.data.dateS, this.data.timeS, this.data.dateE,this.data.timeE)
      //设置开始时间必须是现在以后的时间
      this.setData({
        nowDate: new Date()
      })
    },
    // 前往预约列表
    toOrderList: function(){
      wx.navigateTo({
        url: '../orderList/index',
      })
    },
    //开始时间修改
    bindDateSChange: function (e) {
      var now = e.detail.value + ' ' + this.data.timeS
      var strNow = now.toString().replace("/-/g", "/")
      //自动加上一小时
      this.nextOneHour(new Date(strNow))
      this.setData({
        duration: 60
      })
    },
    bindTimeSChange: function (e) {
      var now = this.data.dateS +' '+ e.detail.value
      var strNow = now.toString().replace("/-/g", "/")
      //自动加上一小时
      this.nextOneHour(new Date(strNow))
      this.setData({
        duration: 60
      })
    },
    //结束时间修改
    bindDateEChange: function (e) {
      let cando = this.calculateTime(this.data.dateS, this.data.timeS, e.detail.value, this.data.timeE)
      if (cando){
        this.setData({
          dateE: e.detail.value
        })
      }else{
        return
      }
    },
    bindTimeEChange: function (e) {
      let cando = this.calculateTime(this.data.dateS, this.data.timeS, this.data.dateE, e.detail.value)
      if (cando) {
        this.setData({
          timeE: e.detail.value
        })
      } else {
        return
      }
    },
    //计算时间间隔
    calculateTime: function (DateS, TimeS, DateE,TimeE){
      var meetingStart = DateS + ' ' + TimeS
      var formatMeetingStart = new Date(meetingStart.toString().replace("/-/g", "/"))
      var meetingEnd = DateE + ' ' + TimeE
      var formatMeetingEnd = new Date(meetingEnd.toString().replace("/-/g", "/"))
      var start = formatMeetingStart.getTime()
      var end = formatMeetingEnd.getTime()
      if (end - start <=0) {
        wx.showModal({
          title: '提示',
          content: '开始时间不能小于结束时间！',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              return false
            }
          }
        })
        return false
      } else {
        this.setData({
          duration: (end - start) / 60000
        })
        return true
      }
    },
    //toOrderMeeting
    toOrderMeeting: function(){
      var canDo = this.calculateTime(this.data.dateS, this.data.timeS, this.data.dateE, this.data.timeE)
      if (!canDo){ //结束时间小于开始时间-重新选择
        return
      }else{
        wx.showModal({
          title: '提示',
          content: '确认预约时间为：' + this.data.dateS + ' ' + this.data.timeS + ' 至 ' + this.data.dateE + ' ' + this.data.timeE + '？',
          success: (res) => {
            if (res.confirm) {
              wx.setStorage({
                key: "orderTime",
                data: {
                  'fbegintime': this.data.dateS + ' ' + this.data.timeS,
                  'fendtime': this.data.dateE + ' ' + this.data.timeE
                }
              })
              wx.navigateTo({
                url: '../inforList/index',
              })

            }
          }
        })
      }
    },
    // 自动加上一小时,支持跨天
    nextOneHour: function(DATA){ //date为标准时间
      console.log('DATA----')
      console.log(DATA)
      var formatNowDate = util.whole_formatTime(DATA)
      // 秒数加上一小时，不管是否跨天
      var afterOneHour = DATA.getTime() + 3600000
      var formatAfterOneHour = util.whole_formatTime(new Date(afterOneHour))
      this.setData({
        dateS: formatNowDate.substring(0, 10),
        dateE: formatAfterOneHour.substring(0, 10),
        timeS: formatNowDate.substring(11),
        timeE: formatAfterOneHour.substring(11),
      })
    }
   
})