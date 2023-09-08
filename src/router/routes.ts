import { cat_tipoProyectoRoutes } from "@/router/exportFile.ts";

import { isAuthenticated } from "@/utils/helpers/authenticationHelper";

export const routes = [
  {
    path: "/saop/",
    component: () => import("@/layouts/LayoutComponent.vue"),
    children: [
      {
        path: "/saop/bitacora",
        name: "bitacora",
        component: () => import("@/views/BitacoraMovimientos/Index.vue"),
      },
      {
        path: "cat_tipoProyecto",
        name: "cat_tipoProyecto",
        children: cat_tipoProyectoRoutes,
      },
    ],
    beforeEnter: () => {
      if (!isAuthenticated()) {
        return "/saop/login";
      }
      return true;
    },
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
