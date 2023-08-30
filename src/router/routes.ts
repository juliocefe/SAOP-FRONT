
import { isAuthenticated } from '@/utils/helpers/authenticationHelper'

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
        ],
        beforeEnter: (to:any) => {
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
        beforeEnter: (to:any) => {
            if (isAuthenticated()) {
                return '/saop'
            }
            return true
        }
    }, 
]

export default routes