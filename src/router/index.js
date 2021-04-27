import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'

import CreateItem from '../views/admin/CreateItem.vue'
import EditItem from '../views/admin/EditItem.vue'
import ManageKitchen from '../views/admin/ManageKitchen.vue'
import ProcessSubmission from '../views/admin/ProcessSubmission.vue'
import AdminControls from '../views/admin/AdminControls.vue'
import Shop from '../views/general/Shop.vue'
import OrderHistory from '../views/general/OrderHistory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create_item',
    name: 'CreateItem',
    component: CreateItem
  },
  {
    path: '/edit_item',
    name: 'EditItem',
    component: EditItem
  },
  {
    path: '/manage_kitchen',
    name: 'ManageKitchen',
    component: ManageKitchen
  },
  {
    path: '/process_submission',
    name: 'ProcessSubmission',
    component: ProcessSubmission
  },
  {
    path: '/admin_controls',
    name: 'AdminControls',
    component: AdminControls
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/order_history',
    name: 'OrderHistory',
    component: OrderHistory
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
