﻿﻿﻿﻿﻿# Shendi Web 库
version 1.0

[sw v1.0.1](https://1711680493.github.io) change in 2023-02-27

<br>

>sw.js			未压缩整合文件
>
>sw.min.js	压缩整合文件

<br>

包含其他模块的引用,例如Ajax,可通过 ajax 直接使用

全局变量 sw,例如Ajax,可通过sw.ajax来使用

甚至可以直接使用其内函数/属性,例如ajax.$, 可通过 sw.$ 使用

<br>

## [Ajax](Ajax)
封装了对 ajax 的操作

>提供默认请求,post请求,可选是否跨域,以及自定义Ajax
>
>支持上传与下载进度监控



简单的示例，获取当前页的html代码

```javascript
ajax.$({
	success : function (data) {
		console.log(data);
	}
});
```





## [Cookie](Cookie)
封装了对 Cookie 的操作

>Cookie加密存储



简单的示例

```javascript
cookie.add("key", "value");
var value = cookie.get("key");
if (cookie.exists("key")) {}
cookie.del("key");
cookie.clear();
```





## [Loading](Loading)

>加载效果的封装



## [Win](Win)
封装了对窗口的操作

>在新窗口以Post请求打开页面等



简单的示例

```javascript
// 打开新窗口
win.open("http://www.baidu.com", "GET", "wd=搜索&key=value");
// 获取url参数
var param = win.getUrlParam("key");
```





## [Text](Text)

字符串工具

>可将字符串转json，字符串复制到剪切板等





## [File](File)

封装了关于文件的一些操作



简单的示例

```javascript
// 点击元素上传文件
var ele = document.getElementById("ele");
ele.onclick = function () {
    file.upFile(function (files) {
        // 获取对象url
        var url = file.getObjectURL(files[0]);
        // 下载链接,例如 blob:// 链接
        file.downUrl(url, files[0].name);
        // 可将文件上传至服务器,files为文件信息
    }, true);
};

// 将文本以文件的形式下载
var str = "字符串123";
file.downTxt(str, "字符串.txt");
```



## [Date](Date)

关于时间的一些操作

<br>

简单的示例

```javascript
var myDate = date.get("2022-01-01");
var timeHint = date.before(myDate);
// 当前时间为 2022-01-02 则 timeHint="1天前"
```



