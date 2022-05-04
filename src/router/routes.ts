import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { 
        path: '',
        name: 'Home',
        component: () => import('pages/HomePage.vue'),
      },
      
      { 
        path: 'login', 
        name: 'Login',
        component: () => import('pages/LoginPage.vue'),
      },
      
      { 
        path: 'signup',
        name: 'SignUp', 
        component: () => import('pages/SignUpPage.vue'),
      },
        
    ],
    
  },

  {
    path: '/main',
    name: 'Main',
    component: () => import('layouts/MainLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
