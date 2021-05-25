/**
 * 提供对字符串的简易操作.
 * text v1.0 (https://1711680493.github.io)
 * changed in 2021-2-20
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
    }
};