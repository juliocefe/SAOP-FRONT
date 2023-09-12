
import { isAuthenticated } from '@/utils/helpers/authenticationHelper'
import { constructionTypesRoutes } from './constructionTypesRoutes'
import { prioritiesRoutes } from './prioritiesRoutes'
import { levelsByAreaRoutes } from './levelsByAreaRoutes'

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
            {
                path: '/saop/prioridades',
                name: 'prioridades',
                children: prioritiesRoutes
            }, 
            {
                path: '/saop/niveles_area',
                name: 'niveles-area',
                children: levelsByAreaRoutes
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