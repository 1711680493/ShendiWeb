# Shendi Web 库
>version 1.0<br>
>[sw v1.0](https://1711680493.github.io) change in 2020-1-2<br>

>sw.js		未压缩整合文件<br>
>sw.min.js	压缩整合文件<br>

>包含其他模块的引用,例如Ajax,可通过 ajax 直接使用<br>
>全局变量 sw,例如Ajax,可通过sw.ajax来使用<br>
>甚至可以直接使用其内函数/属性,例如ajax.$, 可通过 sw.$ 使用

#### [Ajax](Ajax)
>封装了对 ajax 的操作
>>提供默认请求,post请求,可选是否跨域,以及自定义Ajax

#### [Cookie](Cookie)
>封装了对 Cookie 的操作
>>Cookie加密存储

#### [Loading](Loading)
>加载效果的封装

#### [Win](Win)
>封装了对窗口的操作
>>在新窗口以Post请求打开页面等
