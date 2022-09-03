/**
 * 封装了对 storageLocal 的操作.
 * 提供设置超时时间,分组,数据已满自动删除最先存入数据的功能.
 * storageL v1.0 (https://1711680493.github.io)
 * changed in 2021-11-10
 * @author Shendi
 */
var storageL = {
    /**
     * 分组.
     * 当此项不为空,设置数据超过最大数据限制则会删除此组最先存入的数据然后再存入.
     * 当此项为空,设置数据超过最大数据限制则清除所有数据中最先存入的数据后再存入.
     */
    group : "default",
    /** 支持的最大存储数量,5M */
    maxSize : 5242880,
    get : function () {
        
    },
    set : function (key, value, timeout) {
        var size = 0;
        localStorage.setItem();
    },
    keys : function () {
        
    },
    /**
     * 清除所有组的超时的数据,可主动在页面加载等地方调用.
     */
    clearTimeout : function () {
        
    }
};