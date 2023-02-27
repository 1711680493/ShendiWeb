# 日期工具

包含日期操作的一些常用函数封装

<br>

date.js是源码

date.min.js是压缩后的文件,实际应用使用这个

[date v1.0.1](https://1711680493.github.io) change in 2023-02-27

<br>

> 全局对象为 date

<br>

<br>

# 全局

**引入此js后，Date类默认新增以下函数**

```javascript
// 格式化,2022-09-05 00:00:00
format("yyyy-MM-dd HH:mm:ss");
// 获取本周星期几
getWeek();
```

<br>

<br>

# API

<br>

## get-通过字符串获取Date对象（兼容IOS）

<br>

| 参数名  | 描述                                               |
| ------- | -------------------------------------------------- |
| dateStr | 日期字符串，例如 2022-01-01 00:00:00，2022-01-01等 |

<br>

返回Date对象

<br>

示例

```javascript
var myDate = date.get("2022-01-01");
```

<br>

<br>

## before-获取在xxx之前格式的时间

| 参数名   | 描述 |
| -------- | ---- |
| datetime | 时间 |

<br>

响应字符串

示例

```javascript
var timeHint = date.before("2022-01-01 00:00:00");
// 当前时间为 2022-01-01 00:00:00,则 timeHint="刚刚"
// 当前时间为 2022-01-02 00:01:00,则 timeHint="1分钟前"
// 当前时间为 2022-01-02 00:00:00,则 timeHint="1天前"
// ...
```





