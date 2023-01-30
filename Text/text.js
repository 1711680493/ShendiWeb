/**
 * 提供对字符串的简易操作.
 * text v1.0.2 (https://1711680493.github.io)
 * changed in 2023-01-30
 * @author Shendi
 */
var text = {
    /**
     * 将字符串内的 HTML 代码转义,用于防止 xxs 攻击.
     * @param {string} txt 字符串
     */
    tohtml : function (txt) {
        
    },
    /**
     * 将字符串转为 JSON/JSONArray,会将 \r\n 等特殊字符转义.
     * @param {string} txt 字符串
     */
    tojson : function (txt) {
        if (txt == null) return null;
        return txt.trim().indexOf[0] == '['
            ? eval(txt.replace(/\r/g, "\\r").replace(/\n/g, "\\n"))
            : eval('(' + txt.replace(/\r/g, "\\r").replace(/\n/g, "\\n") + ')');
    },
    /**
     * 将内容原封不动的复制到剪切板.
     * @param txt 文本
     */
    copy : function (txt) {
        var copy = document.createElement("pre");
        copy.innerText = txt;
        copy.style.opacity = 0;
        document.body.appendChild(copy);
        var range = document.createRange();
        range.selectNode(copy);
        var selection = window.getSelection();
        if (selection) {
            if (selection.rangeCount > 0) selection.removeAllRanges();
            selection.addRange(range);
        }
        document.execCommand("copy");
        document.body.removeChild(copy);
    },
    /**
     * 从指定字符串去除指定字符串的前后空格
     * 例如 trimByChar("1 . 2   .  3", "."), 结果为 1.2.3
     */
    trimByChar : function(str, c) {
        if (str == null || str == "") return "";
    
        var result = "";
        var chars = str.split(c);
        for (var i = 0; i < chars.length; i++) {
            result += chars[i].trim() + c;
        }
    
        return result.substring(0, result.length-c.length);
    }
};