// 设置url query字符串
export function getQuery (query) {
  const url = location.search; // 获取url中"?"符后的字串
  const queryObject = {};
  if (url.indexOf("?") !== -1) {
    var strs = url.substr(1).split("&");
    for (var i = 0, len = strs.length; i < len; i++) {
      queryObject[strs[i].split("=")[0]] = strs[i].split("=")[1];
    }
  }
  return query ? queryObject[query] : queryObject;
}
