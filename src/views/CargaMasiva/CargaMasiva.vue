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

const reset = () => {
  dropzoneFile.value = "";
  errorTypeDocument.value = false;
  finishedProcess.value = false;
  loadingData.value = false;
  globalError.value = false;
  wrongData.value = false;
  scrollTop();
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
  finishedProcess.value = true;
  loadingData.value = false;

  console.log("Process finished!");
  finishedProcess.value = false;
  loadingData.value = false;
  errorTypeDocument.value = false;
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
