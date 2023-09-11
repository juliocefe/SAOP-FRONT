
import { isAuthenticated } from '@/utils/helpers/authenticationHelper'
import { constructionTypesRoutes } from './constructionTypesRoutes'

export const routes = [
    {
        path: '/saop/',
        component: () => import('@/layouts/LayoutComponent.vue'),
        children: [
            {
                path: '/saop/table',
                name: 'table',
                component: () => import('@/views/BitacoraMovimientos/Index.vue'),
            }, 
            {
              path: '/saop/tipo_obra',
              name: 'tipo-obra',
              children: constructionTypesRoutes
          }, 
        ],
        beforeEnter: () => {
            if (!isAuthenticated()) {
                return '/saop/login'
            }
            return true
        }
    },
    {
        path: '/saop/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        beforeEnter: () => {
            if (isAuthenticated()) {
                return '/saop'
            }
            return true
        }
    }, 
]

export default routes