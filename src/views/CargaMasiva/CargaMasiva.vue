<template>
  <div class="margin-head">
    <div class="row">
      <div class="col-12 col-sm-6">
        <h4 style="margin-left: 15px">Carga masiva de datos</h4>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-xs-12 col-lg-12 col-xl-12">
      <hr class="red" />
    </div>
    <!-- BOTONES -->
    <Modal
      title="Información de carga de archivo"
      saveButtonTitle="Aceptar"
      openButtonTittle="Info"
      :large-modal="true"
    >
      <label>Reglas</label>
      <small class="text-muted">
        <div class="overflow-auto" style="max-height: 250px">
          <ul
            class="list-group list-group-item list-group-flush lh-sm overflow-auto"
          >
            <li class="lh-sm">
              <b
                >Las celdas del archivo excel deben contener exclusivamente
                valores numéricos y no se permiten celdas vacías.</b
              >
            </li>
          </ul>
        </div>
      </small>
    </Modal>
    <!-- DATOS CORRECTOS -->
    <div
      class="table-responsive"
      v-if="
        finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        !wrongData
      "
    >
      <table class="table">
        <thead class="table-gob">
          <tr>
            <th v-for="col in columnsClasificacion" class="text-center">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="estadoData in datosDePrueba">
            <template v-for="value in estadoData.data">
              <tr>
                <template v-for="col in columnsClasificacion">
                  <td :class="getClass(value.clasificacion)">
                    <template
                      v-if="
                        showInput(value.clasificacion, col.data) &&
                        col.data !== 'total' &&
                        col.data !== 'clasificacion'
                      "
                    >
                      <SelectInputTable
                        v-if="col.data === 'prioridad'"
                        v-model="value[col.data]"
                        name="prioridad"
                        id="prioridad"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataPrioridad.data"
                        :optionText="'tipo_prioridad'"
                      />
                      <SelectInputTable
                        v-if="col.data === 'factibilidad_obra'"
                        v-model="value[col.data]"
                        name="factibilidad_obra"
                        id="factibilidad_obra"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataFactibilidad.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'area'"
                        v-model="value[col.data]"
                        name="area"
                        id="area"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataArea.data"
                        optionText="nombre"
                      />
                      <SelectInputTable
                        v-if="col.data === 'tipo_proyecto'"
                        v-model="value[col.data]"
                        name="tipo_proyecto"
                        id="tipo_proyecto"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataProyecto.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'estatus_proyecto'"
                        v-model="value[col.data]"
                        name="estatus_proyecto"
                        id="estatus_proyecto"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataEstatus.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'cartera_estatus'"
                        v-model="value[col.data]"
                        name="cartera_estatus"
                        id="cartera_estatus"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataEstatus.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'entidad_federativa'"
                        v-model="value[col.data]"
                        name="entidad_federativa"
                        id="entidad_federativa"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataEntidadFederativa.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'unidad_responsable'"
                        v-model="value[col.data]"
                        name="unidad_responsable"
                        id="unidad_responsable"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataUnidadResponsable.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'fase'"
                        v-model="value[col.data]"
                        name="fase"
                        id="fase"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataFase.data"
                        optionText="descripcion"
                      />
                      <SelectInputTable
                        v-if="col.data === 'tipo_obra'"
                        v-model="value[col.data]"
                        name="tipo_obra"
                        id="tipo_obra"
                        class="SelectComponent"
                        :class="{ 'input-error': value[col.data] === '' }"
                        :options="arrayDataTipoObra.data"
                        optionText="descripcion"
                      />
                      <input
                        v-if="!excludedSelectData.includes(col.data)"
                        class="form-control"
                        type="text"
                        maxlength="15"
                        v-model="value[col.data]"
                        @copy="$event.preventDefault()"
                        @paste="$event.preventDefault()"
                        @cut="$event.preventDefault()"
                        @focus="
                          value[col.data] =
                            value[col.data] === '-' ? '' : value[col.data]
                        "
                        @blur="
                          () => {
                            if (value[col.data] === '') {
                              // Modifico aquí para asegurarme de que 'value[col.data]' sea una cadena
                              value[col.data] = '-';
                            } else if (value[col.data] === '-') {
                              value[col.data] = '-';
                            } else if (value[col.data] === '.') {
                              value[col.data] = '0.00';
                            } else {
                              // Modifico aquí para convertir a cadena antes de parseFloat
                              value[col.data] = parseFloat(
                                String(value[col.data])
                              ).toFixed(2);
                            }
                          }
                        "
                      />
                    </template>
                    <template v-else>
                      {{ transformData(value, col.data) }}
                    </template>
                  </td>
                </template>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
      <div class="d-flex flex-row">
        <PaginationTable
          :pagination="pagination"
          @onPaginate="handlePaginate"
          style="margin-top: auto; margin-bottom: auto"
          class="mr-auto ml-auto"
        />
        <div class="form-group mr-5">
          <label class="control-label" for="select-itemes">
            Elementos por página
          </label>
          <select
            v-model="itemsPerPage"
            style="
              width: 100px;
              margin-left: auto;
              margin-right: auto;
              margin-top: auto;
              margin-bottom: auto;
            "
            class="form-select form-control"
            id="select-itemes"
            name="select-itemes"
          >
            <option :value="7">7</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="1000">Todos</option>
          </select>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <!-- DROPZONE -->
      <DropZone
        v-if="!finishedProcess && !loadingData && !errorTypeDocument"
        class="disabled"
        @drop.prevent="drop($event, 'drop')"
        @change="drop($event, 'selected')"
        :style="dropZoneStyle"
      />
    </div>
    <!--BOTONES-->
    <div
      v-if="
        finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        !wrongData
      "
    >
      <button class="btn btn-primary pull-right" @click="sendData">
        Aprobar
      </button>
      <button class="btn btn-danger pull-right mr-2" @click="reset">
        Restablecer
      </button>
    </div>
    <!-- ALERTAS DE ERRORES -->
    <AlertSection
      :errorTypeDocument="errorTypeDocument"
      :finishedProcess="finishedProcess"
      :loadingData="loadingData"
      :globalError="globalError"
      :wrongData="wrongData"
      @reset="reset"
    ></AlertSection>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import DropZone from "@/components/DropZone.vue";
import Modal from "@/components/Modals.vue";
import AlertSection from "./AlertSection.vue";
import PaginationTable from "@/components/TableInputs/Pagination.vue";
import SelectInputTable from "@/components/TableInputs/SelectInput.vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

/* PETICIONES */
const { arrayData: arrayDataPrioridad, getDatas: getDatasPrioridad } =
  usePetition("cat_prioridad/");
const { arrayData: arrayDataFactibilidad, getDatas: getDatasFactibilidad } =
  usePetition("cat_factibilidad/");
const { arrayData: arrayDataArea, getDatas: getDatasArea } =
  usePetition("cat_nivel_area/");
const { arrayData: arrayDataProyecto, getDatas: getDatasProyecto } =
  usePetition("cat_tipo_proyecto/");
const { arrayData: arrayDataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const {
  arrayData: arrayDataUnidadResponsable,
  getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/");
const { arrayData: arrayDataFase, getDatas: getDatasFase } =
  usePetition("cat_fase/");
const { arrayData: arrayDataTipoObra, getDatas: getDatasTipoObra } =
  usePetition("cat_tipo_obra/");

const excludedSelectData = [
  "prioridad",
  "factibilidad_obra",
  "area",
  "tipo_proyecto",
  "estatus_proyecto",
  "cartera_estatus",
  "entidad_federativa",
  "unidad_responsable",
  "fase",
  "tipo_obra",
];

const dropzoneFile = ref<any>("");
const errorTypeDocument = ref<boolean>(false);
const finishedProcess = ref(false);
const loadingData = ref(false);
const globalError = ref(false);
const wrongData = ref(false);

const columnsClasificacion = [
  { data: "clave", title: "Clave" },
  { data: "no_solicitud", title: "Número de Solicitud" },
  { data: "nombre", title: "Nombre" },
  { data: "descripcion", title: "Descripción" },
  { data: "municipio", title: "Municipio" },
  { data: "beneficios", title: "Beneficios" },
  { data: "fecha_inicial", title: "Fecha Inicial" },
  { data: "fecha_final", title: "Fecha Final" },
  { data: "ejercicio_presupuestal", title: "Ejercicio Presupuestal" },
  { data: "comentarios", title: "Comentarios" },
  { data: "clave_compromiso", title: "Clave Compromiso" },
  { data: "factibilidad_obra", title: "Factibilidad de la Obra" },
  { data: "prioridad", title: "Prioridad" },
  { data: "tipo_proyecto", title: "Tipo de Proyecto" },
  { data: "estatus_proyecto", title: "Estatus del Proyecto" },
  { data: "cartera_estatus", title: "Estatus de Cartera" },
  { data: "pais", title: "País" },
  { data: "entidad_federativa", title: "Entidad Federativa" },
  { data: "fase", title: "Fase" },
  { data: "tipo_obra", title: "Tipo de Obra" },
  { data: "tipo_documento", title: "Tipo de Documento" },
  { data: "unidad_responsable", title: "Unidad Responsable" },
  { data: "area", title: "Área" },
];

interface DatosDePruebaItem {
  clasificacion: string;
  carriles_mas4: number;
  carriles4: number;
  carriles2: number;
  revestidas: number;
  terraceria: number;
  total: number;
  [key: string]: string | number;
}

interface DatosDePruebaEstado {
  estado: string;
  siglas: string;
  data: DatosDePruebaItem[];
}

const datosDePrueba: DatosDePruebaEstado[] = [
  {
    estado: "Estado de Ejemplo 1",
    siglas: "EE1",
    data: [
      {
        clasificacion: "Categoría A", // Agrega la propiedad "clasificacion" aquí
        clave: "001",
        no_solicitud: 1,
        nombre: "Ejemplo 1",
        descripcion: "Descripción 1",
        municipio: "Municipio 1",
        beneficios: "Beneficio 1",
        fecha_inicial: "2022-01-01",
        fecha_final: "2022-12-31",
        ejercicio_presupuestal: 2022,
        comentarios: "Comentario 1",
        clave_compromiso: "CC001",
        factibilidad_obra: "Factibilidad 1",
        prioridad: "Alta",
        tipo_proyecto: "Tipo 1",
        estatus_proyecto: "En Progreso",
        cartera_estatus: "Activa",
        pais: "México",
        entidad_federativa: "Estado 1",
        fase: "Fase 1",
        tipo_obra: "Obra Tipo 1",
        tipo_documento: "Documento Tipo 1",
        unidad_responsable: "Unidad 1",
        area: "Área 1",
        carriles_mas4: 10,
        carriles4: 20,
        carriles2: 30,
        revestidas: 40,
        terraceria: 50,
        total: 150,
      },
      // Agrega más datos de muestra según sea necesario...
    ],
  },
  {
    estado: "Estado de Ejemplo 2",
    siglas: "EE2",
    data: [
      {
        clasificacion: "Categoría B", // Agrega la propiedad "clasificacion" aquí
        clave: "002",
        no_solicitud: 2,
        nombre: "Ejemplo 2",
        descripcion: "Descripción 2",
        municipio: "Municipio 2",
        beneficios: "Beneficio 2",
        fecha_inicial: "2022-02-01",
        fecha_final: "2022-11-30",
        ejercicio_presupuestal: 2023,
        comentarios: "Comentario 2",
        clave_compromiso: "CC002",
        factibilidad_obra: "Factibilidad 2",
        prioridad: "Media",
        tipo_proyecto: "Tipo 2",
        estatus_proyecto: "Completado",
        cartera_estatus: "Inactiva",
        pais: "México",
        entidad_federativa: "Estado 2",
        fase: "Fase 2",
        tipo_obra: "Obra Tipo 2",
        tipo_documento: "Documento Tipo 2",
        unidad_responsable: "Unidad 2",
        area: "Área 2",
        carriles_mas4: 15,
        carriles4: 25,
        carriles2: 35,
        revestidas: 45,
        terraceria: 55,
        total: 175,
      },
      // Agrega más datos de muestra según sea necesario...
    ],
  },
  // Agrega más estados de muestra según sea necesario...
];

const itemsPerPage = ref(7);
const inicio = ref(0);

watch(
  () => itemsPerPage.value,
  () => {
    inicio.value = 0;
  }
);

const handlePaginate = (page: number) => {
  inicio.value = (page - 1) * Number(itemsPerPage.value);
};

const getPaginatedData = (data: any[]) => {
  const fin = Number(inicio.value) + Number(itemsPerPage.value);
  return data.slice(inicio.value, fin);
};

const pagination = computed(() => {
  const data = datosDePrueba;
  const paginatedData = getPaginatedData(data);
  const totalPages = Math.ceil(data.length / itemsPerPage.value);
  const currentPage = Math.floor(inicio.value / itemsPerPage.value) + 1;
  return {
    page_size: itemsPerPage.value,
    page: Math.floor(inicio.value / itemsPerPage.value) + 1,
    total: data.length,
    total_pages: totalPages,
    previous_page: Math.max(currentPage - 1, 1),
    next_page: Math.min(currentPage + 1, totalPages),
    data: paginatedData,
  };
});

const getClass = (clasificacion: string) => {
  const clasificaciones = [
    "RED FEDERAL DE CARRETERAS",
    "RED ALIMENTADORA",
    "RED RURAL",
    "BRECHAS",
  ];
  const semiClasificaciones = [
    "CARRETERAS LIBRES",
    "CARRETERAS DE CUOTA CONCESIONADAS A:",
  ];

  return clasificaciones.includes(clasificacion)
    ? "table-important"
    : semiClasificaciones.includes(clasificacion)
    ? "table-semi-important"
    : "";
};

const showInput = (clasificacion: string, key: string) => {
  const keysToDisableBrechas = ["carriles_mas4", "carriles4", "carriles2"];
  const keysToDisableOther = [
    "carriles_mas4_otras",
    "carriles4_otras",
    "carriles2_otras",
  ];
  const keysToDisableRedFederal = ["revestidas", "terraceria"];
  const disabledClasificaciones = new Set([
    "RED FEDERAL DE CARRETERAS",
    "RED ALIMENTADORA",
    "RED RURAL",
    "CARRETERAS DE CUOTA CONCESIONADAS A:",
    "TOTAL",
  ]);

  // Verificar si la clasificación es "BRECHAS"
  if (clasificacion === "BRECHAS") {
    return !keysToDisableBrechas.includes(key);
  }

  if (
    clasificacion === "CARRETERAS LIBRES" ||
    clasificacion === "CAPUFE" ||
    clasificacion === "FONADIN" ||
    clasificacion === "INSTITUCIONES FINANCIERAS" ||
    clasificacion === "INICIATIVA PRIVADA" ||
    clasificacion === "GOBIERNOS ESTATALES" ||
    clasificacion === "ESTATALES DE CUOTA"
  ) {
    return !keysToDisableRedFederal.includes(key);
  }

  // Verificar si la clasificación está en disabledClasificaciones
  // y la clave está en keysToDisableOther
  return (
    !disabledClasificaciones.has(clasificacion) &&
    !keysToDisableOther.includes(key)
  );
};

const transformData = (data: any, col: string) => {
  const keysToNotChange = ["revestidas", "terraceria"];
  if (
    data.clasificacion === "RED FEDERAL DE CARRETERAS" ||
    data.clasificacion === "CARRETERAS DE CUOTA CONCESIONADAS A:"
  ) {
    return !keysToNotChange.includes(col)
      ? data[col].toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "-";
  } else {
    return data[col].toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
};

const reset = () => {
  dropzoneFile.value = "";
  errorTypeDocument.value = false;
  finishedProcess.value = false;
  loadingData.value = false;
  globalError.value = false;
  wrongData.value = false;
  scrollTop();
};

const sendData = () => {
  console.log("Se envian los datos");
};

const dropZoneStyle = computed(() => {
  return {
    pointerEvents:
      finishedProcess.value || loadingData.value || errorTypeDocument.value
        ? "none"
        : "auto",
    opacity:
      finishedProcess.value || loadingData.value || errorTypeDocument.value
        ? "0.5"
        : "1",
  };
});

const drop = async (e: any, type: string) => {
  dropzoneFile.value =
    type === "drop" ? e.dataTransfer.files[0] : e.target.files[0];
  // Validación para asegurar que el archivo es un documento de hoja de cálculo
  const isSpreadsheet =
    dropzoneFile.value.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  if (!isSpreadsheet) {
    // Manejar el caso en el que el archivo no es una hoja de cálculo
    errorTypeDocument.value = true;
    return;
  }

  console.log("File selected or dropped:", dropzoneFile.value);

  // Simulación de la solicitud al backend
  errorTypeDocument.value = false;
  loadingData.value = true;

  console.log("Simulating backend request...");

  // Simulación de la respuesta del backend
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulación de un retraso
  console.log("Simulating backend response...");

  // Simulación de la finalización del proceso
  loadingData.value = false;

  console.log("Process finished!");
  finishedProcess.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Agregar un pequeño retraso si es necesario
  /* finishedProcess.value = false;
  errorTypeDocument.value = false; */

  console.log("finishedProcess:", finishedProcess.value);
  console.log("loadingData:", loadingData.value);
  console.log("errorTypeDocument:", errorTypeDocument.value);
  console.log("globalError:", globalError.value);
  console.log("wrongData:", wrongData.value);
};

onMounted(async () => {
  // Realizar las llamadas a las funciones getDatas en el bloque onMounted
  getDatasPrioridad({ page: 1, size: 100 });
  getDatasFactibilidad({ page: 1, size: 100 });
  getDatasArea({ page: 1, size: 100 });
  getDatasProyecto({ page: 1, size: 100 });
  getDatasEstatus({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasUnidadResponsable({ page: 1, size: 100 });
  getDatasFase({ page: 1, size: 100 });
  getDatasTipoObra({ page: 1, size: 100 });
  scrollTop();
});
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .margin-head {
    margin-top: 18rem;
  }
}

.table-gob {
  background-color: #691c32;
  color: #fff;
}

.table-important {
  background-color: #c0c0c0;
  color: #000;
  font-weight: bold;
}

.table-semi-important {
  background-color: #f2f2f2;
  color: #000;
}
</style>
