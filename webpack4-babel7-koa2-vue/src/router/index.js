import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/topic/:topicId',
      name: 'TopicDetail',
      component: () => import('@/views/TopicDetail')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '*',
      name: 'Exception',
      component: () => import('@/views/Exception')
    }
  ]
})
