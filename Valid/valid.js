/**
 * 提供对参数校验的操作.
 * valid v1.0.1 (https://1711680493.github.io)
 * changed in 2024-01-10
 * @author Shendi
 */
var valid = {
    /**
     * 校验邮箱.
     * @param {string} email 邮箱字符串
     * @returns 邮箱是否有效
     */
    email : function (email) {
        return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
    },
    /**
     * 校验手机号
     * @param {string} phone 
     * @returns 手机号是否有效
     */
    phone : function (phone) {
        return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);;
    },
    /**
     * 校验金额
     * @param {string} money
     * @returns 金额是否有效
     */
    money : function (money) {
        return /^-?\d+(\.\d{1,2})?$/.test(money);
    },
    /**
     * 校验数字
     * @param {string} number 
     * @returns 是否为数字
     */
    number : function (number) {
        return /^\d+(\.\d+)?$/.test(number);
    }
};