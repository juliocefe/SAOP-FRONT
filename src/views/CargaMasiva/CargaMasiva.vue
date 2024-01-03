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

    <div class="d-flex justify-content-center">
      <!--DROPZONE-->
      <DropZone
        v-if="!finishedProcess && !loadingData && !errorTypeDocument"
        class="disabled"
        @drop.prevent="drop($event, 'drop')"
        @change="drop($event, 'selected')"
        :style="dropZoneStyle"
      />
    </div>
    <!--BOTONES-->
    <Modal title="Información de carga de archivo">
      <template v-slot:body>
        <div class="modal-body">
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
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DropZone from "@/components/DropZone.vue";
//import AlertSection from "./AlertSection.vue";
import router from "@/router";
import Modal from "@/components/Modals.vue";

/* Modal */
const modalTitle: string = "Subir Archivo";
const saveButtonTitle: string = "Guardar";
const openButtonTittle: string = "Agregar";

/* Upload file */
const dropzoneFile = ref<any>("");
const errorTypeDocument = ref<boolean>(false);
const finishedProcess = ref(false);
const loadingData = ref(false);
const globalError = ref(false);
const wrongData = ref(false);

/* onMounted(async () => {}); */

/* const dropZoneStyle = computed(() => {
  return {
    pointerEvents: areOptionsSelected.value ? "auto" : "none",
    opacity: areOptionsSelected.value ? "1" : "0.5",
  };
}); */

const drop = async (e: any, type: string) => {
  dropzoneFile.value =
    type === "drop" ? e.dataTransfer.files[0] : e.target.files[0];

  const isSpreadsheet =
    dropzoneFile.value.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

  if (!isSpreadsheet) {
    errorTypeDocument.value = true;
    finishedProcess.value = false;
    return;
  }

  errorTypeDocument.value = false;
  loadingData.value = true;

  const formData = new FormData();
  formData.append("file", dropzoneFile.value);
  formData.append("anio", selectedOptions.value.anio);

  const token = localStorage.getItem("sie-token");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}carreteras_upload_excel/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response) return;

    const json = await response.json();

    if (response.status === 200 && json.error > 0 && json.errores_celdas) {
      groupedErrorsRef.value = getErrors(json.errores_celdas);
      selectedEstadoError.value = groupedErrorsRef.value[0]?.estado || "";
      wrongData.value = true;

      return;
    } else if (response.status === 200 && json.error === 0 && json.data) {
      jsonOriginal.value = json.data;
      groupedDataRef.value = getData(json.data);
      selectedEstadoData.value = groupedDataRef.value[0]?.estado || "";
      typeDocument.value = json.documento_cargado;
      return;
    } else {
      globalError.value = true;
    }
  } catch (error) {
    globalError.value = true;
  } finally {
    finishedProcess.value = true;
    loadingData.value = false;
  }
};

/* Grouped errors */
const groupedErrorsRef = ref<
  {
    estado: string;
    errors: {
      red: any;
      errors: { red: any; campo: string }[];
    }[];
  }[]
>([]);
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
