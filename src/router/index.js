import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import LoginComponent from '../views/login.vue'
import SecureComponent from '../views/secure.vue'
import MoreSecureComponent from '../views/more_secure.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent
  },
  {
    path: '/secure',
    name: 'secure',
    component: SecureComponent
  },
  {
    path: '/moresecure',
    name: 'moreSecure',
    component: MoreSecureComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
