import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/ProductCase.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'productCase',
      component: Home
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
      path: '/everyday',
      name: 'everyday',
      component: () => import('./views/EveryDay.vue')
    },
    {
      path: '/articledetail/:date',
      name: 'articledetail',
      component: () => import('./views/ArticleDetail.vue')
    }
  ]
})
