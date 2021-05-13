export const TIME = {

  // 获取今天的时间戳
  getToday(now) {
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    return new Date(year, month, day, 0, 0, 0).getTime();
  },

  // 获取昨天的时间戳
  getYesterDay(now) {
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let yesterday = -1;
    if (day === 1) {
      if (month === 0) {
        yesterday = new Date(year - 1, 11, this.getLastDay(year - 1, 11), hour, minute, second).getTime();
      } else {
        yesterday = new Date(year, month - 1, this.getLastDay(year, month - 1), hour, minute, second).getTime();
      }
    } else {
      yesterday = new Date(year, month, day - 1, hour, minute, second).getTime();
    }
    return yesterday;
  },

  // 获取距离现在一周的时间戳
  getLastWeek(now) {

    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let lastWeek = -1;
    if (day <= 7) {
      if (month === 0) {
        lastWeek = new Date(year - 1, 11, this.getLastDay(year - 1, 11) -
          (7 - day), hour, minute, second).getTime();
      } else {
        lastWeek = new Date(year, month - 1, this.getLastDay(year, month - 1) - (7 - day), hour, minute, second).getTime();
      }
    } else {
      lastWeek = new Date(year, month, day - 7, hour, minute, second).getTime();
    }
    return lastWeek;
  },

  // 根据数字映射出是星期几
  getWeekDay(num) {
    switch (num) {
      case 0:
        return "日";
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      case 6:
        return "六";
      default:
        break;
    }
  },

  // 获取某年某月的最后一天是几号
  getLastDay(year, month) {
    // 判断是哪一月
    // 1，3，5，7，8，10，12  最后一天是31号
    // 4，6，9，11           最后一天是30号
    // 2                    若为闰年则29号，若为平年则28号
    switch (month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
      case 1:
        return this.isLeapYear(year) ? 29 : 28;
    }
  },

  // 判断某年是否是闰年
  isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  },

  // 转化符合聊天的时间显示
  transformTime(timeStamp) {
    // 规则：
    // 今天显示 时分
    // 昨天显示 昨天
    // 一个星期内显示 星期几
    // 一个星期前显示 年月日
    if (!timeStamp) return '';
    if (typeof timeStamp === 'string') {
      timeStamp = timeStamp.split('-').join('/');
    }

    // 1.获取今天、昨天、一个星期
    let now = new Date();
    let today = this.getToday(now);
    let yesterday = this.getYesterDay(now);
    let lastWeek = this.getLastWeek(now);

    // 2.判断是否在今天、昨天、一星期
    let time = null;
    // 无论后端传时间戳还是日期字符串，都统一转化为时间戳
    timeStamp = new Date(timeStamp).getTime();
    if (timeStamp >= today) {
      time = this.formatTime(timeStamp, "HH:mm");
    } else if (timeStamp >= yesterday && timeStamp < today) {
      time = "昨天";
    } else if (timeStamp >= lastWeek && timeStamp < yesterday) {
      time = "星期" + this.getWeekDay(new Date(timeStamp).getDay());
    } else {
      time = this.formatTime(timeStamp, "yyyy-MM-dd");
    }
    return time;
  },

  formatTime(time, fmt = 'yyyy-MM-dd HH:mm:ss') {

    let date = null;
    if (typeof time === 'number') {
      date = new Date(time);
    } else if (typeof time === 'string') {
      date = new Date(time.replace(new RegExp('\\-', 'g'), '/'));
    } else {
      date = new Date();
    }

    var o = {
      "M+": date.getMonth() + 1, //月份   
      "d+": date.getDate(), //日   
      "H+": date.getHours(), //小时   
      "m+": date.getMinutes(), //分   
      "s+": date.getSeconds(), //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds() //毫秒   
    };

    if (new RegExp('(y+)').test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;

  },

};
