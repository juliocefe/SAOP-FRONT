<template>
  <AlertComponent
    v-if="errorTypeDocument && !finishedProcess && !loadingData"
    title="Error en el formato del archivo!"
    @onConfirm="$emit('reset')"
    type="warning"
  >
    <template v-slot:body>
      <p>
        El formato de tu archivo no es valido favor de cargar un archivo con
        extensión .xlsx
      </p>
      <hr />
    </template>
  </AlertComponent>
  <!--CARGANDO DATOS-->
  <AlertComponent
    v-if="loadingData && !finishedProcess && !errorTypeDocument"
    title="Cargando Datos"
    :showButton="false"
  >
    <template v-slot:body>
      <div
        class="spinner-border text-success mb-10"
        style="width: 3rem; height: 3rem"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <p class="mb-0">
        <strong
          >Espere un momento mientras se terminan de procesar los datos</strong
        >
      </p>
    </template>
  </AlertComponent>
  <!--ERROR GLOBAL-->
  <AlertComponent
    v-if="globalError && finishedProcess && !loadingData"
    title="Error al cargar los datos!"
    @onConfirm="$emit('reset')"
    type="warning"
  >
    <template v-slot:body>
      <p>
        Ocurrio un error al subir tu archivo ,favor de verificar
        extensión/archivo.
      </p>
      <hr />
      <hr />
    </template>
  </AlertComponent>
  <!-- Datos Erroneos -->
  <AlertComponent
    v-if="
      finishedProcess &&
      !loadingData &&
      !errorTypeDocument &&
      !globalError &&
      wrongData &&
      getErrosByState
    "
    title="Datos Erroneos"
    @onConfirm="$emit('reset')"
    type="warning"
  >
    <template v-slot:body>
      <p>Se encontraron datos erroneos en el archivo.</p>
      <hr />
      <table class="table">
        <thead>
          <tr>
            <th>Hoja</th>
            <th>Red</th>
            <th>Campo</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="value in getErrosByState">
            <tr v-for="(values, index) in value.errors">
              <template v-if="index == 0">
                <td :rowspan="value.errors.length">
                  {{ value.estado }}
                </td>
              </template>
              <td>{{ values.red }}</td>
              <td>
                <ul class="list-group list-group-flush lh-sm overflow-auto">
                  <li class="lh-sm" v-for="error in values.errors">
                    {{ error.campo }}
                  </li>
                </ul>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </AlertComponent>
  <AlertComponent
    v-if="
      finishedProcess &&
      !loadingData &&
      !errorTypeDocument &&
      !globalError &&
      wrongData &&
      getErrosRedAutopistasCapufe
    "
    title="Datos Erroneos"
    @onConfirm="$emit('reset')"
    type="warning"
  >
    <template v-slot:body>
      <p>Se encontraron datos erroneos en el archivo.</p>
      <hr />
      <table class="table">
        <thead>
          <tr>
            <th>Fila</th>
            <th>Campo</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="value in getErrosRedAutopistasCapufe">
            <tr v-for="(error) in (value as any).errors">
              <td>{{ error.fila }}</td>
              <td>
                <ul class="list-group list-group-flush lh-sm overflow-auto">
                  <li
                    class="lh-sm"
                    v-for="(fieldValue, fieldName) in error"
                    :key="fieldName"
                  >
                    <template
                      v-if="
                        String(fieldName) !== 'id' &&
                        String(fieldName) !== 'fila'
                      "
                    >
                      {{ fieldName }}: {{ fieldValue }}
                    </template>
                  </li>
                </ul>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </AlertComponent>
</template>
<script setup lang="ts">
import AlertComponent from "@/components/AlertComponent.vue";

const emit = defineEmits(["reset"]);

defineProps({
  errorTypeDocument: {
    type: Boolean,
    required: true,
    default: false,
  },
  finishedProcess: {
    type: Boolean,
    required: true,
    default: false,
  },
  loadingData: {
    type: Boolean,
    required: true,
    default: false,
  },
  globalError: {
    type: Boolean,
    required: true,
    default: false,
  },
  wrongData: {
    type: Boolean,
    required: true,
    default: false,
  },
  getErrosByState: {
    type: Object,
    required: false,
  },
  getErrosRedAutopistasCapufe: {
    type: Array,
    required: false,
  },
});
</script>
