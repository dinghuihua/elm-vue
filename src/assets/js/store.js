/*
  通用的存储方法
 */

// 存入localStorage
export function saveToLocal (id, key, val) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    seller = {}
    seller[id] = {}
  } else {
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }

  seller[id][key] = val

  window.localStorage.__seller__ = JSON.stringify(seller)
}
// 从localStorage读取
export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__
  if (!seller) {
    return def
  }
  seller = JSON.parse(seller)[id]
  if (!seller) {
    return def
  }
  let ret = seller[key]
  return ret || def
}
