# Cookie 封装类
>cookie.js是源码<br>
>cookie.min.js是压缩后的文件,实际应用使用这个<br>
>已对cookie进行加密编码处理,什么样的数据都能存入

## API
#### cookie.add(key, value, time, path, domain, more);
>添加Cookie<br>
<table>
	<tr>
		<th>参数</th>
		<th>描述</th>
	</tr>
	<tr>
		<td>key</td>
		<td>键</td>
	</tr>
	<tr>
		<td>value</td>
		<td>值</td>
	</tr>
	<tr>
		<td>time</td>
		<td>可选,有效时间,单位毫秒</td>
	</tr>
	<tr>
		<td>path</td>
		<td>可选,有效路径,默认为/</td>
	</tr>
	<tr>
		<td>domain</td>
		<td>可选,跨域共享地址 例如子域名的根域名</td>
	</tr>
	<tr>
		<td>more</td>
		<td>可选,更多参数,遵循document.cookie = "",例如 expires=time;path=/</td>
	</tr>
</table>

#### cookie.get(key, isEncode);
>获取对应Cookie<br>
>key为cookie的键,返回键对应的值<br>
>isEncode为可选<br>
>>如果为空,则返回的cookie是编码的,通常用于请求服务器<br>
>>如果不为空,返回的是没有编码的(如果是用于服务器数据传递,则可能会出编码问题)<br>
#### cookie.del(key);
>删除对应Cookie<br>
>key为cookie的键,无返回
#### cookie.exists(key);
>判断指定键是否存在<br>
>key为cookie的键,存在则返回true,否则false
#### cookie.clear();
>清除cookie,无参数.
