import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order.vue')
  },
  {
    path: '/order/:session',
    name: 'orderList',
    component: () => import('../views/order-list.vue'),
    props: true
  },
  {
    path: '/order/:session/:queue',
    name: 'orderItem',
    component: () => import('../views/order-item.vue'),
    props: true
  },
  {
    path: '/event-register',
    name: 'event-register',
    component: () => import('../views/event-register.vue')
  },
  {
    path: '/event-register-full-search',
    name: 'event-register-full-search',
    component: () => import('../views/event-register-full-search.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
