# 文件封装

关于文件操作的封装



file.js是源码

file.min.js是压缩后的文件,实际应用使用这个

[file v1.0](https://1711680493.github.io) change in 2022-09-03





# API



## upFile-上传文件

调用此函数将打开文件选择框（等同于文件输入框 input 被点击）



| 参数名          | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| callback(files) | 回调函数，当用户选择了文件后触发，其中files为用户选择的文件列表 |
| multiple        | 是否可以多选，true为可以多选，默认false                      |
| isDir           | 是否选择文件夹，true则相当于input加上了webkitdirectory属性，不支持IE，默认false |



示例

```javascript
upFile(function (files) {
    // 此处可通过ajax将文件上传到服务器
    console.log(files);
}, true);
```





## getObjectURL-获取对象url

可以将用户上传的文件转为对象url，供直接访问

| 参数名 | 描述 |
| ------ | ---- |
| file   | 文件 |



>最终结果为 blob:// 的url





## downUrl-下载指定链接

| 参数名 | 描述             |
| ------ | ---------------- |
| url    | 链接             |
| name   | 下载显示的文件名 |



## downTxt-将文本以文件形式下载

| 参数名 | 描述             |
| ------ | ---------------- |
| txt    | 文本             |
| name   | 下载显示的文件名 |





