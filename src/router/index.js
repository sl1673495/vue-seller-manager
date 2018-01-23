import Vue from 'vue'
import Router from 'vue-router'
import ratings from '@/components/ratings'
import goods from '@/components/goods/goods'
import seller from '@/components/seller'
import statistics from '@/components/statistics'
import order from '@/components/order/order'
import business from '@/components/business/business'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/statistics'
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/seller',
      component: seller
    },
    {
      path: '/statistics',
      component: statistics
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/business',
      component: business
    }
  ],
  linkActiveClass: 'active'
})
