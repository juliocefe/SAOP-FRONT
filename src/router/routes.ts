
export const routes = [
    {
        path: '/saop/',
        component: () => import('@/layouts/LayoutComponent.vue'),
        children: []
    },
    {
        path: '/saop/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        // TODO: Implement autentication 
        // beforeEnter: (to:any) => {
        //     if (isAuthenticated()) {
        //         return '/siasp'
        //     }
        //     return true
        // }
    }, 
    {
        path: '/saop/table',
        name: 'table',
        component: () => import('@/views/BitacoraMovimientos/Index.vue'),
        // TODO: Implement autentication 
        // beforeEnter: (to:any) => {
        //     if (isAuthenticated()) {
        //         return '/siasp'
        //     }
        //     return true
        // }
    }, 
]

export default routes