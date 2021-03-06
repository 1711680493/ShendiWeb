/**
 * 整合了其他js的文件
 * sw v1.0 (https://1711680493.github.io)
 * changed in 2021-5-25
 * @author Shendi
 */
var sw;

/**
 * 加载效果.
 * cookie v1.0 (https://1711680493.github.io)
 * changed in 2020-12-11
 * @author Shendi
 */
var loading;
{
	var loadingDiv = document.createElement("div");
	loadingDiv.style.position = "fixed";
	loadingDiv.style.top = 0;
	loadingDiv.style.width = "100%";
	loadingDiv.style.height = "100%";
	loadingDiv.style.background = "rgba(0,0,0,0.6)";
	loadingDiv.style.zIndex = 9999;
	
	var loadingImg = document.createElement("img");
	loadingImg.className = "loadingImg";
	loadingDiv.appendChild(loadingImg);
	
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".loadingImg {position: absolute; top: 50%; left: 50%; width: 20%; transform: translate(-50%, -50%);}" +
			"@media screen and (max-width: 720px) { .loadingImg {width : 50%;}}";
	
	loading = {
		// 设置遮罩图
		setImg : function (img) {
			loadingImg.src = img;
		},
		// 显示遮罩
		show : function () {
			if (loadingImg.src == "") loadingImg.src = "/img/loading.gif";
			document.head.appendChild(style);
			document.body.appendChild(loadingDiv);
		},
		// 隐藏遮罩
		hide : function () {
			document.body.removeChild(loadingDiv);
			document.head.removeChild(style);
		},
		// 遮罩块
		getLoadingDiv : loadingDiv,
		// 遮罩图
		getLoadingImg : loadingImg
	};
};

/**
 * 封装了对 cookie 的操作
 * cookie v1.0 (https://1711680493.github.io)
 * changed in 2021-5-25
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
				if (key == unescape(atob(unescape(map[0])))) {
					return isEncode == null ? atob(unescape(map[1])) : unescape(atob(unescape(map[1])));
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
				if (key == unescape(atob(unescape(map[0])))) {
					var date = new Date();
					date.setTime(date.getTime()-1);
					document.cookie = escape(btoa(escape(key))) + "=;expires=" + date.toGMTString();
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
			if (key == unescape(atob(unescape(cookies[i].split("=")[0])))) {
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
			for (var i = keys.length; i--;) document.cookie=keys[i] + "=;path=/;expires=" + date.toGMTString();
		}
	}
};

/**
 * 封装了对窗口的操作.
 * win v1.0 (https://1711680493.github.io)
 * changed in 2021-5-14
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
	}
};


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
			xhr.withCredentials = obj.crossDomain == null ? true : obj.crossDomain;
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

/**
 * 提供对字符串的简易操作.
 * text v1.0 (https://1711680493.github.io)
 * changed in 2021-2-20
 * @author Shendi
 */
var text = {
    /**
     * 将字符串内的 HTML 代码转义,用于防止 xxs 攻击.
     * @param {string} txt 字符串
     */
    tohtml : function (txt) {
        
    },
    /**
     * 将字符串转为 JSON/JSONArray,会将 \r\n 等特殊字符转义.
     * @param {string} txt 字符串
     */
    tojson : function (txt) {
        if (txt == null) return null;
        return txt.trim().indexOf[0] == '['
            ? eval(txt.replace(/\r/g, "\\r").replace(/\n/g, "\\n"))
            : eval('(' + txt.replace(/\r/g, "\\r").replace(/\n/g, "\\n") + ')');
    }
};

sw = {
	// 所有模块引用
	loading : loading,
	cookie : cookie,
	win : win,
	ajax : ajax,

	// 直接引用
	// loading
	setImg : loading.setImg,
	show : loading.show,
	hide : loading.hide,
	getLoadingDiv : loading.getLoadingDiv,
	getLoadingImg : loading.getLoadingImg,

	// cookie
	add : cookie.add,
	get : cookie.get,
	del : cookie.del,
	exists : cookie.exists,
	cookieExists : cookie.cookieExists,
	clear : cookie.clear,

	// win
	open : win.open,
	getUrlParam : win.getUrlParam,

	// ajax
	xhr : ajax.xhr,
	req : ajax.req,
	post : ajax.post,
	$ : ajax.$,

	// text
	tojson : text.tojson
};