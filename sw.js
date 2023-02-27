/**
 * 整合了其他js的文件
 * sw v1.0.6 (https://1711680493.github.io)
 * changed in 2023-02-27
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
 * text v1.0.2 (https://1711680493.github.io)
 * changed in 2023-01-30
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
    },
    /**
     * 将内容原封不动的复制到剪切板.
     * @param txt 文本
     */
    copy : function (txt) {
        var copy = document.createElement("pre");
        copy.innerText = txt;
        copy.style.opacity = 0;
        document.body.appendChild(copy);
        var range = document.createRange();
        range.selectNode(copy);
        var selection = window.getSelection();
        if (selection) {
            if (selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand("copy");
        document.body.removeChild(copy);
    },
    /**
     * 从指定字符串去除指定字符串的前后空格
     * 例如 trimByChar("1 . 2   .  3", "."), 结果为 1.2.3
     */
    trimByChar : function(str, c) {
        if (str == null || str == "") return "";
    
        var result = "";
        var chars = str.split(c);
        for (var i = 0; i < chars.length; i++) {
            result += chars[i].trim() + c;
        }
    
        return result.substring(0, result.length-c.length);
    }
};

/**
 * 封装了对文件的操作
 * file v1.0.2 (https://1711680493.github.io)
 * changed in 2023-01-30
 * @author Shendi
 */
var file = {
    /**
     * 上传文件,执行此函数会弹出文件选择框,用户选择文件后会执行回调函数
     * @param callback 回调函数
     * @param multiple 是否多选,true多选
     * @param isDir    是否选择目录,不支持ie
     */
    upFile : function (callback, multiple, isDir) {
        var file = document.createElement("input");
        file.type = "file";
        if (multiple == true) {
            file.multiple = "multiple";
        }
        if (isDir == true) {
            file.webkitdirectory = true;
        }
        file.style.display = "none";
    
        file.onchange = function (e) {
            callback(e.currentTarget.files);
            document.body.removeChild(file);
        };
        document.body.appendChild(file);
    
        file.click();
    },
    /**
     * 获取文件对象地址
     * @param file 用户上传的文件
     * @returns 文件对象地址
     */
    getObjectURL : function (file) {
        let url = null ; 
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    },
    /**
     * 下载指定链接.
     * @param url   链接
     * @param name  下载的文件名称
     */
    downUrl : function (url, name) {
        var a = document.createElement("a");
        var event = new MouseEvent("click");
        a.download = name;
        a.href = url;
        a.dispatchEvent(event);
    },
    /**
     * 下载文本.
     * @param txt   文本
     * @param name  文件名
     */
    downTxt : function (txt, name) {
        var a = document.createElement('a');
        a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt);
        a.download = name;

        a.style.display = 'none';
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    }
};

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

sw = {
	// 所有模块引用
	loading : loading,
	cookie : cookie,
	win : win,
	ajax : ajax,
	file : file,
	date : date,

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
	tojson : text.tojson,
	copy : text.copy,
	trimByChar : text.trimByChar,
	
	// file
	upFile : file.upFile,
	getObjectURL : file.getObjectURL,
	downUrl : file.downUrl,
	downTxt : file.downTxt,

	// date
	before : date.before
};