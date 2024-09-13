import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store';



const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue'),
    
  },
  {
    path: '/product/:prodID',
    name: 'product',
    component: () => import('../views/SingleProductView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    beforeEnter: (to, from, next) => {
      const userID = store.state.userID; // Assuming userRole is stored in Vuex
      if (userID === 60) {
        next(); // Allow access
      } else {
        next('/'); // Redirect to home or any other page
      }
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LogOutView.vue'),
    
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    props: route => ({ userID: route.query.userID })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router