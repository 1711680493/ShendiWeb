/**
 * 封装了对窗口的操作.
 * win v1.0.1 (https://1711680493.github.io)
 * changed in 2021-06-17
 * @author Shendi
 */
var win = {
	/**
	 * 在新窗口中打开一个连接
	 * @param url 请求路径
	 * @param type 请求类型
	 * @param param 请求参数,格式为name=value&name=value...
	 */
	open : function (url, type, param) {
		var form = document.createElement("form");
		form.action = url;
		form.target = "_blank";
		form.method = type;
		form.style.display = "none";
		
		var params = param.split("&");
		for (var i = 0;i < params.length; i++) {
			var input = document.createElement("input");
			var map = params[i].split("=");
			input.name = map[0];
			input.value= map[1];
			form.appendChild(input);
		}
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	},

	/**
	 * 获取url的参数.
	 * @param {string} name 
	 * @returns 指定参数的值
	 */
	getUrlParam : function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
	},
	/**
	 * url参数是否存在,有的url参数没有值，例如&a.
	 * @param {string} name 参数名
	 * @returns true存在，false不存在
	 */
	hasUrlParam : function (name) {
		return location.href.indexOf("?" + name) != -1 || location.href.indexOf("&" + name) != -1;
	},
	/**
	 * 删除url的参数,会改变url但不刷新
	 * @param names 参数列表
	 * @param param 当不为空时，将在此参数上进行删除参数，格式应为 url 参数格式，例如 a=b&b=c
	 * @returns param不为空时返回字符串
	 */
	delUrlParam : function (names, param) {
		let p = param == null ? location.search : param;
		if (p.charAt(0) == "?") p = p.substring(1);
		if (p == "") return "";
		p = p.split("&");

		if (typeof names == "string") {
			names = [names];
		}

		let result = "";
		w:for (var i = 0; i < p.length; i++) {
			var kv = p[i].split("=");
			for (var j = 0; j < names.length; j++) {
				if (kv[0] == names[j]) {
					continue w;
				}
			}
			result += "&" + p[i];
		}

		result = result.length == 0 ? "" : "?" + result.substring(1);

		if (param == null) {
			window.history.replaceState({}, "", location.pathname + result + location.hash);
		}
		return result;
	}
};
