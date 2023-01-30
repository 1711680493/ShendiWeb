# 字符串数据操作
text.js是源码<br>
text.min.js是压缩后的文件,实际应用使用这个
[text v1.0.2](https://1711680493.github.io) changed in 2023-01-30

<br>

# API
对象为 text

<br>

## tojson(txt)
将字符串转化为JSON(JavaScript对象/数组),通常用于接收到服务端的json数据后转化<br>
处理了json数据中出现换行的情况

<br>

## copy(txt)

将字符串（txt）复制到剪切板

<br>

## trimByChar(str, c)

将指定字符/字符串在指定字符串内去除前后空白

```javascript
var result = trimByChar("1 . 2 . 3. 4", ".");
// result = 1.2.3.4
```



