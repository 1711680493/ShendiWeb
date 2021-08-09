# Ajax 封装类
>ajax.js是源码<br>
>ajax.min.js是压缩后的文件,实际应用使用这个<br>
>[ajax v1.0](https://1711680493.github.io) change in 2021-1-2

## API
#### ajax.xhr();
>获取 ajax 对象(原生xhr)

#### ajax.req(type, url, callback, async, data, crossDomain)
>执行 ajax 请求<br>
>type为请求类型,url为请求路径,callback为响应的回调接口<br>
>>其中,callback(txt, status, xhr);第一个参数为响应数据,第二个参数为响应状态,第三个参数为ajax对象<br>
>async可选,true为异步 ajax,默认true<br>
>data为可选,如果是POST请求则参数放入data中,使用与传统ajax一致,例如 a=b&c=d<br>
>crossDomain可选,true为允许执行跨域ajax,默认false

#### ajax.post(url, data, callback, async, crossDomain)
>执行 post 请求<br>
>参数同 ajax.req()<br>

####  ajax.$(obj)
>自定义ajax请求<br>
>其中obj 为 js 对象,使用示例如下<br>

<pre>
    ajax.$({
        url : "/hello",
        type : "POST",
        param : {
            "key":"value",
            "key1":[value1,value2]
        },
        heads : {
            "key":"value",
        },
        finish : function (data, status, xhr) {
            switch (status) {
                case 200:
                case 500:
            }
        },
        // 文件上传进度监控
        up : function (len, all, isLen, env, xhr) {
            console.log("已上传 " + len ", 总 " + all + "进度 " + (len / all * 100) + "%");
        }
    });
</pre>
>参数大全如下<br>
>属性

<table>
	<tr>
		<th>名称</th>
		<th>描述</th>
        <th>值描述</th>
        <th>默认值</th>
	</tr>
	<tr>
		<td>type</td>
		<td>请求的类型</td>
        <td>参考 HTTP 类型,例如GET/POST/HEAD...</td>
        <td>GET</td>
	</tr>
	<tr>
		<td>url</td>
		<td>访问地址</td>
        <td>与浏览器URL一致</td>
        <td>#</td>
	</tr>
	<tr>
		<td>async</td>
		<td>是否异步</td>
        <td>true异步,false同步,同步时浏览器页面将停止</td>
        <td>true</td>
	</tr>
	<tr>
		<td>param</td>
		<td>
            请求参数(GET请求直接添加在url后),内容为直接字符串,Object,FormData等,参考 xhr.send();<br>
            对于字符串形式,格式为 k=v&k=v&k=v<br>
            对于Object格式,一键对多值可传递数组 {key:[value1,value2]}
        </td>
        <td>与浏览器的参数一致</td>
        <td>null</td>
	</tr>
	<tr>
		<td>crossDomain</td>
		<td>是否允许跨域 true 允许</td>
        <td>当ajax请求不在同一个域的资源就会出现跨域问题,就需要设置此</td>
        <td>true</td>
	</tr>
	<tr>
		<td>timeout</td>
		<td>单位毫秒,0为不超时,async必须为true才能设置</td>
        <td>当操作可能遇到不可预知的情况而连接长时间不关闭可设置此属性</td>
        <td>0</td>
	</tr>
    <tr>
		<td>heads</td>
		<td>
            设置请求头,格式为Object,如果类型为 POST 且 param 类型为 Object/String<br>
            则默认会设置请求头 Content-Type为 application/x-www-form-urlencoded
        </td>
        <td>HTTP请求头<(注:请求头不允许中文等字符,请使用编码函数进行编码,例如 encodeURI())</td>
        <td>null</td>
	</tr>
    <tr>
		<td>respType</td>
		<td>
            规定响应数据类型,默认为DOMString<br>
            值可以如下内容<br>
            <ul>
                <li>text(DOMString)</li>
                <li>arraybuffer(ArrayBuffer)</li>
                <li>blob(Blob)</li>
                <li>document(Document)</li>
                <li>json(JSON转换为Object,可直接使用)</li>
            </ul>
        </td>
        <td>服务器响应的数据类型</td>
        <td>text</td>
	</tr>
    <tr>
		<td>uname</td>
		<td>请求用户名(一般不用)</td>
        <td>HTTP需要登录验证</td>
        <td>null</td>
	</tr>
    <tr>
		<td>pwd</td>
		<td>请求密码(一般不用)</td>
        <td>HTTP需要登录验证</td>
        <td>null</td>
	</tr>
</table>


>事件

<table>
    <tr>
		<th>名称</th>
		<th>描述</th>
        <th>回调参数</th>
	</tr>
    <tr>
		<td>callback</td>
		<td>回调函数,参考 XHR.onreadystatechange,几乎所有ajax操作都能通过此函数</td>
        <td>
            接收一个参数 xhr,参数为 XMLHttpRequest<br>
            这里列举一些常见属性,具体请参考 XHR.onreadystatechange<br>
            <ul>
                <li>
                    readyState(追踪当前请求的状态,有五种状态)<br>
                    每一种状态都会调用一次callback,值如下<br>
                    0 请求未初始化<br>
                    1 服务器连接已建立<br>
                    2 请求已接收<br>
                    3 请求处理中<br>
                    4 请求已完成 且响应已就绪
                </li>
                <li>status(响应状态,只有readyState为4才会有,例如200等)</li>
                <li>statusText(响应状态描述,只有readyState为4才会有,例如200后一般会有 OK 等)</li>
                <li>responseText(获得字符串形式的响应数据,4才有)</li>
                <li>responseXML(获得XML形式的响应数据,4才有)</li>
            </ul>
        </td>
	</tr>
    <tr>
		<td>onload,finish,success</td>
		<td>
            onload 请求正确完成后触发,也就是readyState == 4,status=20*,304,404等,详情参考 XHR.onload<br>
            finish 请求完成后触发,readyState == 4<br>
            success 请求正确完成后触发,readyState == 4 且 status == 200或304
        </td>
        <td>data(响应的数据,类型根据respType,默认为字符串),status(响应状态码),xhr(XMLHttpRequest)</td>
	</tr>
    <tr>
		<td>down 和 up</td>
		<td>
            down 下载阶段触发 readyState == 3,每50ms触发一次,详情参考 XHR.onprogress<br>
            up 上传阶段触发 readyState == 2之前,每50ms触发一次,详情参考 XHR.upload.onprogress
        </td>
        <td>
            <ul>
                <li>len(已接收或上传的字节数)</li>
                <li>all(总字节数)</li>
                <li>isLen(资源是否有可计算的长度)</li>
                <li>env(包含以上三个属性的对象,对应为loaded,total,lengthComputable)</li>
                <li>xhr(一般不用)</li>
            </ul>
        </td>
	</tr>
    <tr>
		<td>netErr</td>
		<td>netErr 发生网络错误时触发,参考XHR.onerror事件</td>
        <td>
            xhr(XMLHttpRequest)<br>
            env(错误事件)
        </td>
	</tr>
    <tr>
		<td>error</td>
		<td>error 服务端出错时触发,status == 50*</td>
        <td>
            data(响应数据)<br>
            status(响应状态)<br>
            info(错误信息)<br>
            xhr(XMLHttpRequest)<br>
        </td>
	</tr>
    <tr>
		<td>ontimeout</td>
		<td>如果设置了timeout,超时时触发</td>
        <td>
            xhr(XMLHttpRequest)<br>
            env(错误事件)
        </td>
	</tr>
</table>
