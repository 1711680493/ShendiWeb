/**
 * 封装了对计算方面的操作
 * math v1.0 (https://1711680493.github.io)
 * create 2023-10-29
 * change 2023-10-29
 * @author Shendi
 */
var math = {

    /**
     * 单位转换.
     * @param {Array} names - 单位名，例如 ["厘米", "分米", "米"]
     * @param {number} decimal - 进制，例如厘米、分米、米的进制是10
     * @param {number} size - 需要转换的大小
     * @return {string} - 转换后的字符串表示形式
     * 
     * 示例：
     * 
     * unitConvert(["厘米", "分米", "米"], 10, 100); // "1米"
     * 
     * unitConvert(["厘米", "分米", "米"], 10, 100.1); // "1米0.1厘米"
     */
    unitConvert : function (names, decimal, size) {
        if (names == null || names.length == 0) return null;

        if (names.length == 1 || size < decimal) return size + names[0];
        else if (size == decimal) return (Number.isInteger(size) ? "1" : "1.0") + names[1];
        
        let data = "";
        let len = names.length - 1;
        for (let i = 0; i < names.length; i++) {
            if (size == 0) break;
            
            if (i == len) {
                data = size + names[i] + data;
                break;
            }
            
            let d = size % decimal;
            if (d != 0) {
                data = d.toFixed(Number.isInteger(size) ? 0 : 1) + names[i] + data;
            }
            size -= d;
            size /= decimal;
        }
        return data;  
    },

    decimalConvert : function (decimal, convert) {
        
    }
};
