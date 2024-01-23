export const presupuestoEgreso = [
  {
    path: "",
    name: "listar-presupuestoEgreso",
    component: () => import("@/views/PresupuestoEgresos/Index.vue"),
  },
  {
    path: "crear",
    name: "crear-presupuestoEgreso",
    component: () => import("@/views/PresupuestoEgresos/Create.vue"),
  },
  {
    path: ":id/ver",
    name: "ver-presupuestoEgreso",
    component: () => import("@/views/ProyectoDeInversion/Create.vue"),
  },
  {
    path: ":id/editar",
    name: "editar-presupuestoEgreso",
    component: () => import("@/views/PresupuestoEgresos/Create.vue"),
  },
  {
    path: ":id/eliminar",
    name: "eliminar-presupuestoEgreso",
    component: () => import("@/views/ProyectoDeInversion/Delete.vue"),
  },
];
