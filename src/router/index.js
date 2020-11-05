import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Cart from "../views/cart/Cart";
import Profile from "../views/profile/Profile";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component:Home,
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "about" */ '../views/category/Category')
  },
  {
    path: '/cart',
    name: 'Cart',
    component:Cart,

  },
  {
    path: '/profile',
    name: 'Profile',
    Component:Profile

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
