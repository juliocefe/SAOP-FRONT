<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="container">
        <form class="form-inline justify-content-center" role="form">
            <div class="form-check form-check-inline col-md-2 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="opcion-01" class="form-check-input" />
                    RECURSOS
                </label>
            </div>
            <div class="form-check form-check-inline col-md-2 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="opcion-02" class="form-check-input" />
                    METAS
                </label>
            </div>
            <div class="form-check form-check-inline col-md-3 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="opcion-03" class="form-check-input" />
                    COSTOS ANUALES
                </label>
            </div>
            <div class="form-check form-check-inline col-md-3 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="opcion-03" class="form-check-input" />
                    BENEFICIOS ANUALES
                </label>
            </div>
        </form>
        <DataTableComponent rowId="clave" :columns="columns" :data="dataTableData" :pagination="1" :hideActions="true"/>
    </div>
</template>
  

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import DataTableComponent from '@/components/DataTableComponent.vue'
const viewName = "Calendario Anual Del Proyecto";

const columns = [
    { title: "No. Solicitud", data: "id" },
    { title: "Año Base", data: "year" },
    { title: "Origen Recursos", data: "origin" },
    { title: "Recursos", data: "recurso" },
];

const dataTableData = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', recurso: '1234124' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', recurso: '5342345' },
    // ...otras filas de datos
]);
onMounted(async () => { });
onBeforeUnmount(() => { });
</script>
