import { RouteRecordRaw } from 'vue-router';
import { backend } from 'src/config/config';
import { Cookies } from 'quasar'
import { api } from 'boot/axios'

const isAuthenticated = () => {
  const token = Cookies.get('token')
  api.post(
    `${backend}/api/User/authenticate`,
    {token: token})
    .then(response => {
      return response.data
    })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { 
        path: '',
        name: 'Home',
        component: () => import('src/pages/HomePage.vue'),
      },
      
      { 
        path: 'login', 
        name: 'Login',
        component: () => import('src/pages/LoginPage.vue'),
      },
      
      { 
        path: 'signup',
        name: 'SignUp', 
        component: () => import('src/pages/SignUpPage.vue'),
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
