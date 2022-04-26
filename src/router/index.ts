import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BankSlipView from '../views/BankSlipView.vue'
import InfoView from '../views/InfoView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/boleto',
    name: 'boletos',
    component: BankSlipView
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
