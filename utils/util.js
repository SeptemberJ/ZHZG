function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}

// 完整格式化-
function whole_formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + '/' + [hour, minute].map(formatNumber).join(':')
}


function secondToFormat(second){
  var oDate = new Date(second),
  oYear = oDate.getFullYear(),
  oMonth = oDate.getMonth() + 1,
  oDay = oDate.getDate(),
  oHour = oDate.getHours(),
  oMin = oDate.getMinutes(),
  oSen = oDate.getSeconds(),
  oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay);//最后拼接时间
  // oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen);//最后拼接时间
  return oTime;
};

  function getzf(num) {
    if (parseInt(num) < 10) {
      num = '0' + num;
    }
    return num;
  }  


  function getNextDay(date) {
    var nextDate;
    nextDate = +date + 1000 * 60 * 60 * 24;
    var nextDate2 = new Date(nextDate);
    //return d;
    //格式化
    return nextDate2;

  }



module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  secondToFormat: secondToFormat,
  getNextDay: getNextDay,
  formatNumber: formatNumber,
  whole_formatTime: whole_formatTime
}
