import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/index')
    },
    {
      path: '/company',
      title: '公司简介',
      component: () => import('@/views/company')
    },
    {
      path: '/business',
      title: '业务',
      component: () => import('@/views/business')
    },
    {
      path: '/business/detail',
      title: '业务详情',
      component: () => import('@/views/business-detail')
    },
    {
      path: '/news',
      title: '新闻',
      component: () => import('@/views/news')
    },
    {
      path: '/news/detail',
      title: '新闻详情',
      component: () => import('@/views/news-detail')
    },
    {
      path: '/contactUs',
      title: '联系我们',
      component:() => import('@/views/contact-us')
    }
  ]
})
