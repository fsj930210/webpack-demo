const Resource = require('./create-api')
const stringify = require('qs').stringify
const { api } = Resource

// ===========================主题相关========================

// 获取主题列表
export function getTopics (params) {
  return api.get('/topics', { params: params })
}

// 获取主题详情
export function getTopicById (topicId) {
  return api.get(`/topic/${topicId}`)
}

// =========================用户相关=========================

export function createTopic (params = {}) {
  return api.post('topics', stringify(params))
}
