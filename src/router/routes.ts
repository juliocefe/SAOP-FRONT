import {
  cat_tipoProyectoRoutes,
  cat_tipoDocumentoRoutes,
  cat_PaisRoutes,
  cat_FaseRoutes,
} from "@/router/exportFile.ts";
import { isAuthenticated } from "@/utils/helpers/authenticationHelper";
import { constructionTypesRoutes } from "./constructionTypesRoutes";
import { prioritiesRoutes } from "./prioritiesRoutes";
import { levelsByAreaRoutes } from "./levelsByAreaRoutes";
import { statusRoutes } from "./statusRoutes";
import { feasibilityRoutes } from "./feasibilityRoutes";

export const routes = [
  {
    path: "/saop/",
    component: () => import("@/layouts/LayoutComponent.vue"),
    children: [
      {
        path: "saop/table",
        name: "table",
        component: () => import("@/views/BitacoraMovimientos/Index.vue"),
      },
      {
        path: "tipo_obra",
        name: "tipo-obra",
        children: constructionTypesRoutes,
      },
      {
        path: "prioridades",
        name: "prioridades",
        children: prioritiesRoutes,
      },
      {
        path: "niveles_area",
        name: "niveles-area",
        children: levelsByAreaRoutes,
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
      {
        path: "esatus-proyecto",
        name: "esatus-proyecto",
        children: statusRoutes,
      },
      {
        path: "factibilidad-obra",
        name: "factibilidad-obra",
        children: feasibilityRoutes,
      },
      {
        path: "cat_Pais",
        name: "cat_Pais",
        children: cat_PaisRoutes,
      },
      {
        path: "cat_Fase",
        name: "cat_Fase",
        children: cat_FaseRoutes,
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
