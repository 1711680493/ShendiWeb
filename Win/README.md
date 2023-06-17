# 窗口封装类
>win.js是源码<br>
>win.min.js是压缩后的文件,实际应用使用这个<br>
>[win v1.0.1](https://1711680493.github.io) change in 2023-06-17

## API
### win.open(url, type, param)
在新窗口中打开指定链接<br>
参数url为链接地址,type为HTTP请求类型,param为请求参数(key=value&key=value)

<br>

### win.getUrlParam(name)
获取url的指定参数

<br>

### win.hasUrlParam(name)
url参数是否存在,有的url参数没有值，例如&a.

<br>

### win.delUrlParam(names, param)

删除url的参数，names为参数列表，可传递字符串或Array。

param为url参数，可选，当url为hash(#)需要自行设置url时使用

**返回值：** 删除后的参数字符串内容

```javascript
// 删除url的test参数
win.delUrlParam("test");
// 删除test与test2
win.delUrlParam(["test", "test2"]);
// 从传递的参数中删除参数
var result = win.delUrlParam(["test", "test2"], "test=123&a=b&test2=456");
// result = "?a=b";
```

