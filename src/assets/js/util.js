/**
 * 解析 url 参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a:b}
 */
// 例如 http://localhost:8080/?id=12345#!/seller
export function urlParse () {
  let url = window.location.search
  let obj = {}
  // 用于匹配参数  包含?或&,后跟一个或多个 非?和&,=号后跟一个或多个 非?和&
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}
