<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="container">
        <form class="form-inline justify-content-center" role="form">
            <div class="form-check form-check-inline col-md-2 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="1" class="form-check-input" v-model="selectedRadiusInput" />
                    RECURSOS
                </label>
            </div>
            <div class="form-check form-check-inline col-md-2 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="2" class="form-check-input" v-model="selectedRadiusInput" />
                    METAS
                </label>
            </div>
            <div class="form-check form-check-inline col-md-3 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="3" class="form-check-input" v-model="selectedRadiusInput" />
                    COSTOS ANUALES
                </label>
            </div>
            <div class="form-check form-check-inline col-md-3 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="4" class="form-check-input" v-model="selectedRadiusInput" />
                    BENEFICIOS ANUALES
                </label>
            </div>
        </form>
        <div class="container">
            <DataTableComponent v-if="selectedRadiusInput === '1'" rowId="clave" :columns="dynamicColumns"
                :data="dataTableDataRecursos" :pagination="1" :hideActions="true" />
            <DataTableComponent v-if="selectedRadiusInput === '2'" rowId="clave" :columns="dynamicColumns"
                :data="dataTableDataMeta" :pagination="1" :hideActions="true" />
            <DataTableComponent v-if="selectedRadiusInput === '3'" rowId="clave" :columns="dynamicColumns"
                :data="dataTableDataCostoAnual" :pagination="1" :hideActions="true" />
            <DataTableComponent v-if="selectedRadiusInput === '4'" rowId="clave" :columns="dynamicColumns"
                :data="dataTableDataBeneficioAnual" :pagination="1" :hideActions="true" />
        </div>
        <div class="container">
            <form role="form" @submit.prevent="saveForm">
                <div class="row justify-content-center">
                    <div class="col-md-4 col-sm-12">
                        <InputText title="No. Solicitud:" placeholder="No. Solicitud" name="clave" id="clave" />
                    </div>
                    <div class="col-md-4 col-sm-12">
                        <InputText title="Clave del Proyecto:" placeholder="Clave" name="descripcion" id="descripcion" />
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-6 col-sm-12">
                        <SelectComponent title="Año Base:" placeholder="Seleccione..." name="anio_base" id="anio_base"
                            class="mb-5" :options="YEARS" :optionText="'value'" />
                        <SelectComponent title="Origen Recursos:" placeholder="Seleccione..." name="anio_base"
                            id="anio_base" class="mb-5" :options="YEARS" :optionText="'value'" />
                        <InputText title="RECURSOS:" placeholder="1.000" name="descripcion" id="descripcion"
                            type="number" />
                    </div>
                </div>
                <div class="modal-footer mt-3">
                    <button type="button" class="btn btn-secondary" @click="handleCancel">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        </div>

    </div>
</template>
  

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import { useRouter } from "vue-router";
import DataTableComponent from '@/components/DataTableComponent.vue'
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { YEARS } from "@/utils/constants/exampleYears";



//const route = useRoute();
const router = useRouter();

const viewName = "Calendario Anual Del Proyecto";

const handleCancel = () => router.push({ name: "listar-proyecto_de_inversion" });
const saveForm = () => {
    router.push({ name: "listar-proyecto_de_inversion" })
    console.log('Se guarda la info');
}

const selectedRadiusInput = ref("1")

const dynamicColumns = ref([
    { title: "No. Solicitud", data: "id" },
    { title: "Año Base", data: "year" },
    { title: "Origen Recursos", data: "origin" },
    { title: "RECURSOS", data: "recurso" },
]);

const dataTableDataRecursos = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', recurso: '1234124' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', recurso: '5342345' },
]);
const dataTableDataMeta = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', meta: '048219' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', meta: '978543' },
]);
const dataTableDataCostoAnual = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', costo_anual: '3248753' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', costo_anual: '5432345' },
]);
const dataTableDataBeneficioAnual = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', beneficio_anual: '234523' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', beneficio_anual: '356346' },
]);

watch(selectedRadiusInput, (newValue) => {
    switch (newValue) {
        case "1":
            dynamicColumns.value[3].title = "RECURSOS";
            dynamicColumns.value[3].data = "recurso";
            break;
        case "2":
            dynamicColumns.value[3].title = "META";
            dynamicColumns.value[3].data = "meta";
            break;
        case "3":
            dynamicColumns.value[3].title = "COSTO ANUAL";
            dynamicColumns.value[3].data = "costo_anual";
            break;
        case "4":
            dynamicColumns.value[3].title = "BENEFICIO ANUAL";
            dynamicColumns.value[3].data = "beneficio_anual";
            break;
    }
});
onMounted(async () => { });
onBeforeUnmount(() => { });
</script>
