import {
  cat_tipoProyectoRoutes,
  cat_tipoDocumentoRoutes,
  cat_PaisRoutes,
  cat_FaseRoutes,
  cat_Unidad_Responsable,
  proyectoDeInversiones,
  cargaMasiva,
  reportsRoutes,
  presupuestoEgreso,
  cat_Conceptos,
} from "@/router/exportFile.ts";
import { isAuthenticated } from "@/utils/helpers/authenticationHelper";
import { constructionTypesRoutes } from "./constructionTypesRoutes";
import { prioritiesRoutes } from "./prioritiesRoutes";
import { levelsByAreaRoutes } from "./levelsByAreaRoutes";
import { statusRoutes } from "./statusRoutes";
import { federalEntityRoutes } from "./federalEntityRoutes";
import { feasibilityRoutes } from "./feasibilityRoutes";

export const routes = [
  {
    path: "/saop/",
    component: () => import("@/layouts/LayoutComponent.vue"),
    children: [
      {
        path: "saop/Home",
        name: "HomePage",
        component: () => import("@/views/HomeView.vue"),
      },
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
        path: "estatus-proyecto",
        name: "estatus-proyecto",
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
      {
        path: "entidad-federativa",
        name: "entidad-federativa",
        children: federalEntityRoutes,
      },
      {
        path: "cat_unidad_responsable",
        name: "cat_unidad_responsable",
        children: cat_Unidad_Responsable,
      },
      {
        path: "cartera_proyectos_inversion",
        name: "proyecto_de_inversiones",
        children: proyectoDeInversiones,
      },
      {
        path: "carga-masiva",
        name: "cargamasiva",
        children: cargaMasiva,
      },
      {
        path: "reportes",
        name: "reportes",
        children: reportsRoutes,
      },
      {
        path: "presupuestoEgreso",
        name: "presupuestoEgreso",
        children: presupuestoEgreso,
      },
      {
        path: "cat_conceptos",
        name: "cat_conceptos",
        children: cat_Conceptos,
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
