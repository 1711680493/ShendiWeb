/**
 * 封装了对 ajax 的操作
 * ajax v1.0 (https://1711680493.github.io)
 * changed in 2021-1-21
 * @author Shendi
 */
var ajax = {
	/** @return 一个新的原生 ajax 对象 */
	xhr : function () {
		return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	},
	/**
	 * 执行 ajax 请求.
	 * @param {String} type 请求的类型
	 * @param {String} url 请求的路径
	 * @param {function} callback 请求状态为4时回调的函数,其中会传递三个参数,分别为响应数据,响应状态,xhr.
	 * @param {boolean} async true异步,false同步
	 * @param {String} data 请求的数据,一般用于POST请求
	 * @param {boolean} crossDomain 是否允许跨域
	 */
	req : function (type, url, callback, async, data, crossDomain) {
		var xhr = ajax.xhr();
		xhr.withCredentials = crossDomain == true;
		if (callback != null) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					callback(xhr.response, xhr.status, xhr);
				}
			};
		}
		xhr.open(type, url, async == null ? true : async);
		xhr.send(data);
	},
	/**
	 * 执行 ajax 的 post 请求
	 * @param {Object} url 请求路径
	 * @param {Object} data 请求数据
	 * @param {Object} callback 回调方法
	 * @param {Object} async 是否异步 true异步
	 * @param {Object} crossDomain 是否跨域
	 */
	post : function (url, data, callback, async, crossDomain) {
		var xhr = ajax.xhr();
		xhr.withCredentials = crossDomain == true;
		if (callback != null) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					callback(xhr.response, xhr.status, xhr);
				}
			};
		}
		xhr.open("POST", url, async == null ? true : async);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(data);
	},
	/**
	 * 自定义ajax操作
	 * @param {Object} obj
	 */
	$ : function (obj) {
		var xhr = ajax.xhr();

		// 默认值
		var type = "GET";
		var url = "";
		var async = true;
		var param;
		var heads;
		var uname;
		var pwd;
		// 当POST请求,且参数为JSON/字符串,需要增加请求头时,为true
		var isAddHead;
		
		if (obj != null) {
			// 初始化 xhr
			if (obj.type) type = obj.type;
			if (obj.url) url = obj.url;
			async = obj.async == null ? true : obj.async;
			if (obj.uname) uname = obj.uname;
			if (obj.pwd) pwd = obj.pwd;
			param = obj.param;
			if (obj.heads) heads = obj.heads;
			xhr.withCredentials = obj.crossDomain == null ? true: obj.crossDomain;
			if (obj.timeout && obj.async) xhr.timeout = obj.timeout;
			if (obj.respType) xhr.responseType = obj.respType;

			// 参数添加在url上还是内容里,true为url,false为内容
			var paramPos = type.toUpperCase() != "POST";

			// post 请求增加请求头 Content-Type,在参数为JSON/字符串时调用
			function postAddHead () {
				if (type.toUpperCase() == "POST") {
					// 有Content-Type请求头则不能替换
					if (heads) {
						for (key in heads) {
							if (key.toUpperCase() == "CONTENT-TYPE") {
								return;
							}
						}
						isAddHead = true;
					} else {
						isAddHead = true;
					}
				}
			}

			// param 为 Object 格式处理
			if (param) {
				if (typeof(param) == "object" && Object.prototype.toString.call(param).toLowerCase() == "[object object]" && !param.length) {
					var tmp;

					var keys = Object.keys(param);

					// 遍历,改成字符串形式
					if (keys.length > 0) {
						tmp = keys[0]+ '=' + param[keys[0]];

						for (var i = 1; i <  keys.length; i++) {
							var value = param[keys[i]];
							if (Object.prototype.toString.call(value).toLowerCase() == "[object Array]") {
								var key = keys[i];
								for (j in value) {
									tmp += '&' + key + '=' + value[j];
								}
							} else {
								tmp += '&' + keys[i] + '=' + value;
							}
						}
					}
					param = tmp;

					postAddHead();
				} else if (typeof(param) == "string") {
					postAddHead();
				}
			}

			// 回调函数赋值
			xhr.onreadystatechange = function () {
				if (obj.callback) obj.callback(xhr);
				if (xhr.readyState == 4) {
					if (obj.finish) obj.finish(xhr.response, xhr.status, xhr);

					// error 回调
					if (obj.error && xhr.status >= 500) {
						obj.error(xhr.response, xhr.status, xhr.statusText, xhr);
					}
				}
			};

			// 网络错误和超时回调
			if (obj.netErr) {
				xhr.onerror = function (env) {
					obj.netErr(xhr, env);
				};
			}
			if (obj.ontimeout) {
				xhr.ontimeout = function (env) {
					obj.ontimeout(xhr, env);
				};
			}

			// 完成回调部分
			xhr.onload = function () {
				if (obj.success && (xhr.status == 200 || xhr.status == 304)) {
					obj.success(xhr.response, xhr.status, xhr);
				}
				if (obj.onload) obj.onload(xhr.response, xhr.status, xhr);
			};

			// 下载上传回调部分
			if (obj.down) {
				xhr.onprogress = function (env) {
					obj.down(env, xhr);
				};
			}
			if (obj.up) {
				xhr.upload.onprogress = function (env) {
					obj.up(env.loaded, env.total, env.lengthComputable, env, xhr);
				};
			}
		}
		
		try {
			if (param && paramPos) {
				xhr.open(type, url + '?' + param, async, uname, pwd);
				param = null;
			} else xhr.open(type, url, async, uname, pwd);

			if (isAddHead) xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			if (heads) {
				for (key in heads) xhr.setRequestHeader(key, heads[key]);
			}

			xhr.send(param);
		} catch (e) {
			console.log("ajax error: " + e);
		}
	}
};
