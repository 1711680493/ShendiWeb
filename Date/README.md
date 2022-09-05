# 日期工具

包含日期操作的一些常用函数封装



date.js是源码

date.min.js是压缩后的文件,实际应用使用这个

[date v1.0](https://1711680493.github.io) change in 2022-09-05



> 全局对象为 date



**引入此js后，Date类默认拥有 format函数，用于格式化**

```javascript
// 2022-09-05 00:00:00
new Date().format("yyyy-MM-dd HH:mm:ss")
```





# API



## get-通过字符串获取Date对象（兼容IOS）



| 参数名  | 描述                                               |
| ------- | -------------------------------------------------- |
| dateStr | 日期字符串，例如 2022-01-01 00:00:00，2022-01-01等 |



返回Date对象



示例

```javascript
var myDate = date.get("2022-01-01");
```





## before-获取在xxx之前格式的时间

| 参数名   | 描述 |
| -------- | ---- |
| datetime | 时间 |



响应字符串

示例

```javascript
var timeHint = date.before("2022-01-01 00:00:00");
// 当前时间为 2022-01-01 00:00:00,则 timeHint="刚刚"
// 当前时间为 2022-01-02 00:01:00,则 timeHint="1分钟前"
// 当前时间为 2022-01-02 00:00:00,则 timeHint="1天前"
// ...
```





