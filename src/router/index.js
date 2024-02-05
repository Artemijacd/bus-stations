import Vue from 'vue'
import VueRouter from 'vue-router'
import RouteDetailsView from '../views/RouteDetailsView.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/route/:id(\\d+)',
    name: 'RouteDetails',
    component: RouteDetailsView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
