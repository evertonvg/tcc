import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: "about" */ '../views/CategoriesView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminView.vue')
  },
  {
    path: '/admin/items',
    name: 'admin itens',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminListView.vue')

  },
  {
    path: '/admin/animes',
    name: 'admin anime',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminAnimesView.vue')
  },
  {
    path: '/admin/categories',
    name: 'admin category',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminCategoriesView.vue')
  },
  {
    path: '/admin/comments',
    name: 'admin comments',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminCommentsView.vue')
  },
  {
    path: '/admin/evaluations',
    name: 'admin evaluations',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminEvaluationsView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "about" */ '../views/notfoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
