var config = {
  apiHost: "https://cnodejs.org/api/v1"
}
if (typeof window !== 'undefined' && window.document) {
  window.__gConf = config
} else {
  module.exports = config
}
