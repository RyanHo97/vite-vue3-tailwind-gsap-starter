import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/threeTest',
    name: 'ThreeTest',
    component: () => import('../views/ThreeTest.vue')
  },
  {
    path: '/gsapTest',
    name: 'GsapTest',
    component: () => import('../views/GsapTest.vue')
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router