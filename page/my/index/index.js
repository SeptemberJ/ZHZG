
var app = getApp()
Page( {
  data: {
    userInfo: {},
  
  },

  onLoad: function() {
    this.setData({
      userInfo:app.globalData.userInfo,
    });
    console.log(app.globalData.userInfo);
   
   
  },

  navigateToAddress:function(){
    wx.navigateTo({
			url: '../address/list/list'
		});
  },
  makeCall: function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  }
  

})