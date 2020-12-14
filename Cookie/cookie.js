/**
 * 封装了对 cookie 的操作
 * cookie v1.0 (https://1711680493.github.io)
 * changed in 2020-12-8
 * @author Shendi
 */
var cookie = {
	/** 添加Cookie */
	add : function (key, value, time, path, domain, more) {
		var s = escape(btoa(key)) + "=" + escape(btoa(value));
		if (time != null) {
			var date = new Date();
			date.setTime(date.getTime() + time);
			s += ";expires=" + date.toGMTString();
		}
		if (path != null) {
			s += ";path=" + path;
		}
		if (domain != null) {
			s += ";domain=" + domain;
		}
		if (more != null) {
			s += ";" + more;
		}
		document.cookie = s;
	},
	/**
	 * 获取Cookie
	 * @param isEncode 如果不为null,则返回的cookie值不会被编码
	 */
	get : function (key, isEncode) {
		var c = document.cookie;
		if (c != "") {
			var cookies = c.split(";");
			for (let i = 0; i < cookies.length; i++) {
				let map = cookies[i].split("=");
				if (key == atob(unescape(map[0]))) {
					return isEncode == null ? escape(atob(unescape(map[1]))) : atob(unescape(map[1]));
				}
			}
		}
	},
	/** 删除指定Cookie */
	del : function (key) {
		var c = document.cookie;
		if (c != "") {
			var cookies = c.split(";");
			for (let i = 0; i < cookies.length; i++) {
				let map = cookies[i].split("=");
				if (key == atob(unescape(map[0]))) {
					var date = new Date();
					date.setTime(date.getTime()-1);
					document.cookie = escape(btoa(key)) + "=;expires=" + date.toGMTString();
				}
			}
		}
	},
	/** 判断指定 key 是否存在 */
	exists : function (key) {
		var c = document.cookie;
		if (c == "") return false;
		var cookies = c.split(";");
		for (let i = 0; i < cookies.length; i++) {
			if (key == atob(unescape(cookies[i].split("=")[0]))) {
				return true;
			}
		}
		return false;
	},
	/** Cookie是否存在 */
	cookieExists : function () {
		return document.cookie != "";
	},
	/** 清除Cookie */
	clear : function () {
		var date=new Date();
		date.setTime(date.getTime() - 1);
		var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (var i =  keys.length; i--;) document.cookie=keys[i] + "=; expires=" + date.toGMTString();
		}
	}
}
