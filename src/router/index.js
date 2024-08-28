import { createRouter, createWebHistory } from 'vue-router'
import log from '../middleware/log';
import HomeView from '../views/HomeView.vue'
import PromotionView from '../views/PromotionView.vue'
import ReviewView from '../views/ReviewView.vue'
import IncomeView from '../views/IncomeView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import member from './member'
import code_hack from './code_hack'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "หน้าหลัก",
      }
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: PromotionView,
    },
    {
      path: '/review',
      name: 'review',
      component: ReviewView,
    },
    {
      path: '/income',
      name: 'income',
      component: IncomeView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        title: "สมัครสมาชิก",
        middleware: log
      }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "เข้าสู่ระบบ",
        middleware: log
      }
    },
    /*
    *
    * CONTACT
    * 
    Line Gold : https://lin.ee/bxhb3Nl
    Line Platinum : https://lin.ee/KW8THAz
    Line VIP : https://lin.ee/rrDXwMG
    */
    {
      path: "/c",
      component: HomeView,
      beforeEnter() {
        window.location.href = import.meta.env.VITE_LINE_URL;
      }
    },
    {
      path: "/c/g",
      component: HomeView,
      beforeEnter() {
        window.location.href = "https://lin.ee/2ittdER";
      }
    },
    {
      path: "/c/p",
      component: HomeView,
      beforeEnter() {
        window.location.href = "https://lin.ee/KW8THAz";
      }
    },
    {
      path: "/c/v",
      component: HomeView,
      beforeEnter() {
        window.location.href = "https://lin.ee/rrDXwMG";
      }
    },
    /** END CONTACT */

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("../views/404.vue"),
      meta: {
        title: "ไม่พบข้อมูล",
      },
    },
    ...member,
    ...code_hack
  ]
})

router.beforeEach((to, from, next) => {
  const title = import.meta.env.VITE_TITLE + ": " + to.meta.title
  document.title = (to.params.name) ? title + to.params.name[0].toUpperCase() + to.params.name.slice(1) : title;
  if (to.meta.middleware) {
    to.meta.middleware({ next });
  }
  else next()
});

export default router
