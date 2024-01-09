<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div
    class="d-flex flex-row app-options-bar align-items-center justify-content-between"
  >
    <div></div>
    <div v-if="selectedAnio">
      <button
        title="Descargar"
        class="btn btn-primary"
        type="button"
        @click="exportData"
      >
        Descargar
      </button>
    </div>
  </div>
  <TableReportComponent
    v-if="arrayReporte.length > 0"
    :data="arrayReporte"
    :dataBold="dataBold"
    keyBold="Clasificación"
  >
    <template v-slot:head>
      <tr class="table-gob">
        <th class="text-center" colspan="2"></th>
        <th class="text-center" colspan="3">Pavimentada</th>
        <th class="text-center" colspan="3"></th>
      </tr>
    </template>
  </TableReportComponent>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
/* import usePetition from "@/composables/usePetition"; */
/* import TableReportComponent from "@/components/TableReportComponent.vue"; */
import useAlert from "@/composables/useAlert";

/* const { arrayData: arrayDataAnios, getAniosReports } =
    usePetition("anios_datos/");
const { exportDoc: exportReport } = usePetition("reporte_red_carretera_por_tipo_red"); */

const { showAlertError, showAlertSuccess } = useAlert();

const arrayReporte = ref([]);

const selectedAnio = ref("");
const viewName =
  "1.1 Longitud y características de la Red Carretera por Tipo de Red según superficie de rodamiento";

/* const { getData } = usePetition("reporte_red_carretera_por_tipo_red/"); */

const dataBold = [
  "TOTAL",
  "RED FEDERAL DE CARRETERAS",
  "CARRETERAS LIBRES",
  "CARRETERAS DE CUOTA CONCESIONADAS A:",
  "RED ALIMENTADORA",
  "RED RURAL",
];

const exportData = async () => {
  try {
    /*     let queryParams = "excel=true";
    const nombre = obtenerNombre("REPORTE_1_1", getAnio); // Cambiar aquí
    await exportReport(selectedAnio.value, `${nombre}.xlsx`, queryParams); */
    showAlertSuccess("Archivo descargado correctamente");
  } catch (error) {
    showAlertError("No se pudo descargar el archivo");
  }
};

/* const handleSearch = async () => {
  const term = selectedAnio.value;
  try {
    const response = await getData(term);
    arrayReporte.value = response;
  } catch (error) {
    showAlertError("No se encontro información para el año seleccionado");
    console.log(error);
  }
}; */

onMounted(async () => {
  scrollTop();
});
</script>
