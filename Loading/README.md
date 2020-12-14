# Web 加载效果
>loaidng.js是源码<br>
>loading.min.js是压缩后的文件,实际应用使用这个

## API
#### loading.setImg(url);
>设置加载效果的图片.<br>
>如果未设置,默认的加载图片路径为 /img/loading.gif

#### loading.show();
>显示遮罩,加载图.

#### loading.hide();
>隐藏遮罩,加载图.

#### loading.getLoadingDiv;
>遮罩块,默认为全屏透明黑遮罩<br>
>可通过此属性来设置自定义样式,loading.getLoadingDiv.style="";

#### loading.getLoadingImg;
>加载图,默认为居中,大小适应<br>
>可通过此属性来设置自定义样式,loading.getLoadingImg.style="";
