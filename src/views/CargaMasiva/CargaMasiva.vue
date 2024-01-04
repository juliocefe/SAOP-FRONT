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
                      <input
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
import { ref, computed } from "vue";
import DropZone from "@/components/DropZone.vue";
import Modal from "@/components/Modals.vue";
import AlertSection from "./AlertSection.vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";

const dropzoneFile = ref<any>("");
const errorTypeDocument = ref<boolean>(false);
const finishedProcess = ref(false);
const loadingData = ref(false);
const globalError = ref(false);
const wrongData = ref(false);

const columnsClasificacion = [
  { data: "clasificacion", title: "Clasificación" },
  { data: "carriles_mas4", title: "Más de 4 Carriles" },
  { data: "carriles4", title: "4 Carriles" },
  { data: "carriles2", title: "2 Carriles" },
  { data: "revestidas", title: "Revestidas" },
  { data: "terraceria", title: "Terracerias" },
  { data: "total", title: "Total" },
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
        clasificacion: "Categoría A",
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
        clasificacion: "Categoría B",
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
