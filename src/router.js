import Vue from 'vue'
import Router from 'vue-router'
import EveryDay from './views/EveryDay.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/everyday',
      name: 'everyday',
      component: EveryDay
    },
    {
      path: '/news',
      name: 'news',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/News.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video.vue')
    },
    {
      path: '/articledetail/:date',
      name: 'articledetail',
      component: () => import('./views/ArticleDetail.vue')
    },
    {
      path: '/videoDetail/:id',
      name: 'videoDetail',
      component: () => import('./views/VideoDetail.vue')
    },
    {
      path: '/newsdetail/:id',
      name: 'newsdetail',
      component: () => import('./views/NewsDetail.vue')
    }
  ]
})
