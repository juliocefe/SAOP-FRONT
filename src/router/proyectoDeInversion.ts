export const proyectoDeInversiones = [
    {
        path: '',
        name: 'listar-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Index.vue'),
    }, 
    {
        path: 'crear',
        name: 'crear-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Create.vue')
    },
    {
        path: ':id/ver',
        name: 'ver-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Create.vue')
    },
    {
        path: ':id/editar',
        name: 'editar-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Create.vue')
    },
    {
        path: ':id/eliminar',
        name: 'eliminar-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/Delete.vue')
    } ,
    {
        path: ':id/ficha_tecnica',
        name: 'ficha_tecnica-proyecto_de_inversion',
        component: () => import('@/views/ProyectoDeInversion/FichaTecnica.vue')
    } 
]