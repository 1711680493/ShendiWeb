# Cookie 封装类
>cookie.js是源码<br>
>cookie.min.js是压缩后的文件,实际应用使用这个<br>
>已对cookie进行加密编码处理,什么样的数据都能存入<br>
>[cookie v1.0 ](https://1711680493.github.io) changed in 2021-08-12

## API
#### cookie.add(key, value, time, path, domain, more);
>添加Cookie

<table>
	<tr>
		<th>参数</th>
		<th>描述</th>
		<th>默认值</th>
	</tr>
	<tr>
		<td>key</td>
		<td>键</td>
		<td>必要的</td>
	</tr>
	<tr>
		<td>value</td>
		<td>值</td>
		<td>必要的</td>
	</tr>
	<tr>
		<td>time</td>
		<td>可选,有效时间,单位毫秒</td>
		<td>浏览器关闭后失效</td>
	</tr>
	<tr>
		<td>path</td>
		<td>可选,有效路径</td>
		<td>/</td>
	</tr>
	<tr>
		<td>domain</td>
		<td>可选,跨域共享地址 例如子域名的根域名</td>
		<td>null</td>
	</tr>
	<tr>
		<td>more</td>
		<td>可选,更多参数,遵循document.cookie = "",例如 expires=time;path=/</td>
	</tr>
</table>

>为了明确调用,可以传递 Object 的形式,参数与上一致,例如

<pre>
	cookie.add({
		key : "cookie name",
		value : "cookie value",
		// 86400000毫秒为一天
		time : 86400000,
		path : "/html",
		domain : "localhost",
		// 可扩展参数,会自动追加到cookie后,参考 document.cookie
	});
</pre>

#### cookie.get(key, isEncode);
>获取对应Cookie<br>
>key为cookie的键,返回键对应的值<br>
>isEncode为可选<br>
>>如果为空,则返回的cookie是编码的,通常用于请求服务器<br>
>>如果不为空,返回的是没有编码的(如果是用于服务器数据传递,则可能会出编码问题)<br>
#### cookie.del(key, domain);
删除对应Cookie

key为cookie的键,无返回

domain为要删除的cookie所在域，如果在添加时未指定则此参数可忽略，指定域应与当前域为父子域

#### cookie.exists(key);
>判断指定键是否存在<br>
>key为cookie的键,存在则返回true,否则false
#### cookie.clear(domain);
清除cookie

domain为要清除的cookie所在域，如果在添加时未指定则此参数可忽略，指定域应与当前域为父子域

> 例如 github.io 与 1711680493.github.io 是父子关系

