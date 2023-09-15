import {
  cat_tipoProyectoRoutes,
  cat_tipoDocumentoRoutes
} from "@/router/exportFile.ts";
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
                path: 'saop/table',
                name: 'table',
                component: () => import('@/views/BitacoraMovimientos/Index.vue'),
            }, 
            {
              path: 'tipo_obra',
              name: 'tipo-obra',
              children: constructionTypesRoutes
            }, 
            {
                path: 'prioridades',
                name: 'prioridades',
                children: prioritiesRoutes
            }, 
            {
                path: 'niveles_area',
                name: 'niveles-area',
                children: levelsByAreaRoutes
            }, 
            {
                path: "bitacora",
                name: "bitacora",
                component: () => import("@/views/BitacoraMovimientos/Index.vue"),
              },
              {
                path: "cat_tipoProyecto",
                name: "cat_tipoProyecto",
                children: cat_tipoProyectoRoutes,
              },
              {
                path: "cat_tipoDocumento",
                name: "cat_tipoDocumento",
                children: cat_tipoDocumentoRoutes,
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
    path: "/saop/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    beforeEnter: () => {
      if (isAuthenticated()) {
        return "/saop";
      }
      return true;
    },
  },
];

export default routes;
