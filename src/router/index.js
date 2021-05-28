import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from "@/store/index"
import { getUserInfo } from '../api/login'
import {ElMessage} from 'element-plus'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Search.vue')
    }
  },
  {
    path: '/recommended',
    name: 'Recommended',
    component: function () {
      return import('../views/Recommended.vue')
    }
  },
  {
    path: '/editor',
    name: 'Editor',
    component: function () {
      return import('../views/Editor.vue')
    },
    beforeEnter(to, from, next) {
      if(!store.state.isLogin) {
        ElMessage.error("请先登录")
        next('/')
      }
      else next()
    }
  },
  {
    path: '/article',
    name: 'Article',
    component: function () {
      return import('../views/Article.vue')
    }
  },
  {
    path: '/user',
    name: 'User',
    component: function () {
      return import('../views/User.vue')
    }
  },
  {
    path: '/useredit',
    name: 'UserEdit',
    component: function () {
      return import('../views/UserEdit.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const token = document.cookie
  if(!store.state.isLogin && token) {
    const res = await getUserInfo()
    if(res.code === 200) store.commit('initUser', res.data)
  }
  next()
})

export default router
