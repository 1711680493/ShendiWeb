/**
 * 主题插件.
 * theme v1.0.0 (https://1711680493.github.io)
 * changed in 2023-05-10
 * @author Shendi
 */
var theme = {
    // 主题文件路径列表
    CSS_PATH : [],
    // 主题列表
    list : [],
    /**
     * 增加主题文件路径
     * @param {*} path 路径字符串或路径字符串数组
     */
    addPath : function (path) {
        if (Array.isArray(path)) {
            for (var i = 0; i < path.length; i++) {
                theme.CSS_PATH[theme.CSS_PATH.length + i] = path[i];
            }
        } else {
            theme.CSS_PATH[theme.CSS_PATH.length] = path;
        }
    },
    /**
     * 初始化当前的主题，此函数应在addPath和设置完list后调用.
     * @param tName 主题名称,可选
     */
    init : function (tName) {
        if (tName == null || tName == "") {
            // 本地获取当前主题,-1代表默认主题
            var curThemeIndex = localStorage.getItem("_sw_theme_cur");
            if (curThemeIndex != null && curThemeIndex != "") {
                curThemeIndex = parseInt(curThemeIndex);
                if (curThemeIndex != -1) {
                    tName = theme.list[curThemeIndex];
                }
            }
        }

        if (tName != null) {
            for (var i = 0; i < theme.CSS_PATH.length; i++) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = theme.CSS_PATH[i] + "-" + tName + ".css";
                link.setAttribute("sw-theme", "");
                document.body.appendChild(link);
            }
        }
    },
    /**
     * 切换主题
     * @param {String} tName 指定切换的主题名称,不指定则默认循环
     */
    switchT : function (tName) {
        var tIndex = 0;
        if (tName == null || tName == "") {
            // 本地获取当前主题,-1代表默认主题
            var curThemeIndex = localStorage.getItem("_sw_theme_cur");
            if (curThemeIndex != null && curThemeIndex != "") {
                curThemeIndex = parseInt(curThemeIndex);
                if (curThemeIndex == -1) {
                    tName = theme.list[tIndex];
                } else {
                    tIndex = curThemeIndex + 1;
                    if (tIndex >= theme.list.length) tIndex = 0;
                    tName = theme.list[tIndex];
                }
            }
        } else {
            for (var i = 0; i < theme.list.length; i++) {
                if (theme.list[i] == tName) {
                    tIndex = i;
                    break;
                }
            }
        }

        // 移除主题css
        document.querySelectorAll("[sw-theme]").forEach(function (e) {e.parentNode.removeChild(e);});
        
        localStorage.setItem("_sw_theme_cur", tIndex);
        theme.init();
    }
};