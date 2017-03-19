export function formatDate (date, fmt) {
  // 将传过来的格式 'yyyy-MM-dd hh:mm' 替换成对应的日期
  // 匹配以y开头的一个或多个
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 就是 yyyy , 将它替换成真实年份  ps:substr(startIndex)截取
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 定义一个正则表达式对象
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      // 例如: 匹配'MM' 则 RegExp.$1.length为2, 小于2位前面需要补0
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1 ? str : padLeftZero(str)))
    }
  }
  return fmt
}
// 前面补0函数
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
