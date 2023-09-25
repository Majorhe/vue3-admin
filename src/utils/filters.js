import moment from "moment";

/**
 * 金额格式化
 * fmtMonty(2,'.', ',')后两个可省略
 */
export function thousandFormat(number, decimals, thousndsStp, decPoint, roundtag) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    roundtag = (typeof thousndsStp === 'undefined') ? 'ceil' : roundtag
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
    let sep = (typeof thousndsStp === 'undefined') ? ',' : thousndsStp
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

/**
 * 日期格式化
 * @param date      时间
 * @param format    格式
 */
export function dateFormat(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(format)
}

export function replace(str, frontLen, endLen, placeStr) {
    if (str == '' || str == undefined || str == null) return ''
    return str.substring(0, frontLen) + placeStr + str.substring(str.length - endLen);
}