import Vue from 'vue'
import Router from 'vue-router'
import ProductDetails from '@/components/ProductDetails'
import Items from '@/components/Items'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/items',
    },
    {
      path: '/item-details/:itemID',
      name: 'itemDetails',
      component: ProductDetails
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    }
  ]
})
