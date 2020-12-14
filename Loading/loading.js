/**
 * 加载效果.
 * cookie v1.0 (https://1711680493.github.io)
 * changed in 2020-12-11
 * @author Shendi
 */
var loading;
{
	var loadingDiv = document.createElement("div");
	loadingDiv.style.position = "fixed";
	loadingDiv.style.top = 0;
	loadingDiv.style.width = "100%";
	loadingDiv.style.height = "100%";
	loadingDiv.style.background = "rgba(0,0,0,0.6)";
	loadingDiv.style.zIndex = 9999;
	
	var loadingImg = document.createElement("img");
	loadingImg.className = "loadingImg";
	loadingDiv.appendChild(loadingImg);
	
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = ".loadingImg {position: absolute; top: 50%; left: 50%; width: 20%; transform: translate(-50%, -50%);}" +
			"@media screen and (max-width: 720px) { .loadingImg {width : 50%;}}";
	
	loading = {
		// 设置遮罩图
		setImg : function (img) {
			loadingImg.src = img;
		},
		// 显示遮罩
		show : function () {
			if (loadingImg.src == "") loadingImg.src = "/img/loading.gif";
			document.head.appendChild(style);
			document.body.appendChild(loadingDiv);
		},
		// 隐藏遮罩
		hide : function () {
			document.body.removeChild(loadingDiv);
			document.head.removeChild(style);
		},
		// 遮罩块
		getLoadingDiv : loadingDiv,
		// 遮罩图
		getLoadingImg : loadingImg
	};
};
