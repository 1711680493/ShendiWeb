/**
 * 封装了对文件的操作
 * file v1.0.1 (https://1711680493.github.io)
 * changed in 2022-09-08
 * @author Shendi
 */
var file = {
    /**
     * 上传文件,执行此函数会弹出文件选择框,用户选择文件后会执行回调函数
     * @param callback 回调函数
     * @param multiple 是否多选,true多选
     */
    upFile : function (callback, multiple) {
        var file = document.createElement("input");
        file.type = "file";
        if (multiple == true) {
            file.multiple = "multiple";
        }
        file.style.display = "none";
    
        file.onchange = function (e) {
            callback(e.currentTarget.files);
            document.body.removeChild(file);
        };
        document.body.appendChild(file);
    
        file.click();
    },
    /**
     * 获取文件对象地址
     * @param file 用户上传的文件
     * @returns 文件对象地址
     */
    getObjectURL : function (file) {
        let url = null ; 
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    },
    /**
     * 下载指定链接.
     * @param url   链接
     * @param name  下载的文件名称
     */
    downUrl : function (url, name) {
        var a = document.createElement("a");
        var event = new MouseEvent("click");
        a.download = name;
        a.href = url;
        a.dispatchEvent(event);
    },
    /**
     * 下载文本.
     * @param txt   文本
     * @param name  文件名
     */
    downTxt : function (txt, name) {
        var a = document.createElement('a');
        a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt);
        a.download = name;

        a.style.display = 'none';
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
    }
};