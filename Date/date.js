/**
 * 日期工具,引入此js则 Date类默认增加format函数用于格式化.
 * date v1.0.1 (https://1711680493.github.io)
 * changed in 2023-02-27
 * @author Shendi
 */
try {
    // 日期格式化
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    // 获取本周星期几
    Date.prototype.getWeek = function () {
        switch (this.getDay()) {
            case 0: return "星期日";
            case 1: return "星期一";
            case 2: return "星期二";
            case 3: return "星期三";
            case 4: return "星期四";
            case 5: return "星期五";
            case 6: return "星期六";
        }
    };
} catch (e) {console.log("当前浏览器不支持 prototype");}

var date = {
    /** 获取Date对象根据日期字符串(dateStr日期字符串) */
    get : function (dateStr) {
        dateStr = dateStr.replace(/-/g, "/");
        return new Date(dateStr);
    },
    /** 根据当前时间获取指定时间差,格式为xxx之前(Date或时间字符串) */
    before : function (datetime) {
        if (!datetime instanceof Date) {
            datetime = datetime.replace(/-/g, "/");
        }
        datetime = new Date(datetime).getTime();
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - datetime;
        if (diffValue < 0) return;
    
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            return "" + parseInt(monthC) + "个月前";
        } else if (weekC >= 1) {
            return "" + parseInt(weekC) + "周前";
        } else if (dayC >= 1) {
            return "" + parseInt(dayC) + "天前";
        } else if (hourC >= 1) {
            return "" + parseInt(hourC) + "小时前";
        } else if (minC >= 1) {
            return"" + parseInt(minC) + "分钟前";
        } else return "刚刚";
    },
};
