import Vue from 'vue'
import Router from 'vue-router'
import EveryDay from './views/EveryDay.vue'
import news from './views/News.vue'
import video from './views/Video.vue'
import articledetail from './views/ArticleDetail.vue'
import videoDetail from './views/VideoDetail.vue'
import newsdetail from './views/NewsDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'everyday',
      component: EveryDay
    },
    {
      path: '/news',
      name: 'news',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: news
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/articledetail/:date',
      name: 'articledetail',
      component: articledetail
    },
    {
      path: '/videoDetail/:id',
      name: 'videoDetail',
      component: videoDetail
    },
    {
      path: '/newsdetail/:id',
      name: 'newsdetail',
      component: newsdetail
    }
  ]
})
