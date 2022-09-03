/**
 * 封装了对 cookie 的操作
 * cookie v1.0.1 (https://1711680493.github.io)
 * changed in 2022-03-07
 * @author Shendi
 */
var cookie = {
	/** 添加Cookie */
	add : function (key, value, time, path, domain, more) {
		if (!key) return;

		var s;

		// key如果为Object类型则进行格外操作
		if (typeof(key) == "object" && Object.prototype.toString.call(key).toLowerCase() == "[object object]" && !key.length) {
			if (!key.key || !key.value) return;
			s = escape(btoa(escape(key.key))) + "=" + escape(btoa(escape(key.value)));

			var keys = Object.keys(key);

			// 遍历,将其余参数添加
			for (var i = 0; i <  keys.length; i++) {
				var k = keys[i];
				var ku = k.toUpperCase();
				if (ku == "KEY" || ku == "VALUE") {
					continue;
				}

				var value = key[k];

				// 时间与路径做格外处理
				if (ku == "TIME") {
					var date = new Date();
					date.setDate(date.getTime + value);
					s += ";expires=" + date.toGMTString();
				} else if (ku == "PATH") {
					path = value;
				} else {
					s += ";" + k + "=" + value;
				}
			}

		} else {
			if (!value) return;

			s = escape(btoa(escape(key))) + "=" + escape(btoa(escape(value)));
			
			if (time) {
				var date = new Date();
				date.setTime(date.getTime() + time);
				s += ";expires=" + date.toGMTString();
			}
			
			if (domain) s += ";domain=" + domain;
			if (more) s += ";" + more;
		}

		// path 默认为 /
		if (!path) path = "/";
		s += ";path=" + path;

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
				try {
					if (key == unescape(atob(unescape(map[0])))) {
						return isEncode == null ? atob(unescape(map[1])) : unescape(atob(unescape(map[1])));
					}
				} catch (e) {}
			}
		}
	},
	/**
	 * 删除指定Cookie
	 * @param key
	 * @param domain 如果不为null则删除指定域的cookie,此域须为父子域.
	 */
	del : function (key, domain) {
		var c = document.cookie;
		if (c != "") {
			var cookies = c.split(";");
			for (let i = 0; i < cookies.length; i++) {
				let map = cookies[i].split("=");
				try {
					if (key == unescape(atob(unescape(map[0])))) {
						var date = new Date();
						date.setTime(date.getTime()-1);
						
						var cookieText = "=;expires=" + date.toGMTString();
						if (domain) cookieText += ";domain=" + domain;

						document.cookie = escape(btoa(escape(key))) + cookieText;
					}
				} catch (e) {}
			}
		}
	},
	/** 判断指定 key 是否存在 */
	exists : function (key) {
		var c = document.cookie;
		if (c == "") return false;
		var cookies = c.split(";");
		for (let i = 0; i < cookies.length; i++) {
			try {
				if (key == unescape(atob(unescape(cookies[i].split("=")[0])))) {
					return true;
				}
			} catch (e) {}
		}
		return false;
	},
	/** Cookie是否存在 */
	cookieExists : function () {
		return document.cookie != "";
	},
	/**
	 * 清除所有Cookie
	 * @param domain 如果不为null则清除指定域的cookie,且此域需为父子域
	 */
	clear : function (domain) {
		var date=new Date();
		date.setTime(date.getTime() - 1);

		var cookieText = "=;path=/;expires=" + date.toGMTString();
		if (domain) cookieText += ";domain=" + domain;

		var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (var i = keys.length; i--;) document.cookie=keys[i] + cookieText;
		}
	}
};
