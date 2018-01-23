import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index.js'

import Article from '@/components/Article'
import ArticleDetail from '@/components/detail'
import Labelarticle from '@/components/labelarticle'

import Admin from '@/admin/admin.vue'
import Login from '@/admin/login.vue'
import AddArticle from '@/admin/AddArticle'
import ArticleList from '@/admin/articleList'
import ArticleType from '@/admin/articleType'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Article',
      component: Article
    },
    {
      path: '/article/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '/labelarticle/:val/:title',
      name: 'labelarticle',
      component: Labelarticle
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'addArticle',
          name: 'addArticle',
          meta: {
            requireAuth: true
          },
          component: AddArticle
        },
        {
          path: 'articleList',
          name: 'articleList',
          meta: {
            requireAuth: true
          },
          component: ArticleList
        },
        {
          path: 'articleType',
          name: 'articleType',
          meta: {
            requireAuth: true
          },
          component: ArticleType
        }
      ],
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.meta.reqireAuth)
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    console.log(store.state.loginState)
    // store.state.loginState
    if (window.sessionStorage.getItem('user')) {
      next()
    } else {
      // console.log(to.meta)
      // console.log(1)
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    // console.log(2)
    next()
  }
})
export default router
