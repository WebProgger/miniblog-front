import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import store from "@/store";
import ProfileView from "@/views/ProfileView";
import SettingsView from "@/views/SettingsView";
import PostView from "@/views/PostView";
import ForgotPasswordView from "@/views/ForgotPasswordView";
import ResetPasswordView from "@/views/ResetPasswordView";

Vue.use(VueRouter)

const isNotAuthenticated = (to, from, next) => {
  if(!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
}

const isAuthenticated = (to, from, next) => {
  if(store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
}

const routes = [
  {
    path: '*',
    name: 'all',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: isAuthenticated
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    beforeEnter: isAuthenticated
  },
  {
    path: '/profile/:id',
    name: 'profile_id',
    component: ProfileView,
  },
  {
    path: '/post/:id',
    name: 'post_id',
    component: PostView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: isNotAuthenticated
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: isNotAuthenticated
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPasswordView,
    beforeEnter: isNotAuthenticated
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: ResetPasswordView,
    beforeEnter: isNotAuthenticated
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
