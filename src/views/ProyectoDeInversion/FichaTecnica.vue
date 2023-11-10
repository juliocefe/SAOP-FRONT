<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveProyectoDeInversion">
      <div class="row">
        <InputText
          v-model="data.clave_compromiso"
          title="Clave Compromiso:"
          placeholder="Clave Compromiso"
          name="clave_compromiso"
          id="clave_compromiso"
          :error="errors"
          class="col-sm-4"
        />
        <SelectComponent
          v-model="data.tipo_documento"
          title="Tipo Documento:"
          placeholder="Tipo Documento"
          name="tipo_documento"
          id="tipo_documento"
          :error="errors"
          class="col-sm-4"
          :options="arrayDataTipoDocumento.data"
          :optionText="'nombre'"
        />
        <div class="form-group col-sm-4">
          <label for="nombre-operacion">Documento</label>
          <input
          v-if="isEdit !== true"
            data.documento
            type="file"
            class="form-control"
            id="precidencial-prioridad"
            placeholder=""
            autocomplete="off"
            ref="fileInput"
            accept="application/pdf, image/*"
            @change="handleFileUpload"
          />
          <small class="form-text text-muted ml-5 " v-if="fileName">{{
            fileName[fileName.length - 1]
          }}</small>
          <small
            id="descripcion-nivel-small"
            class="form-text text-muted app-validation"
            v-if="errors && errors.documento"
            >{{ errors.documento }}</small
          >
        </div>
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.tipo_obra"
          title="Tipo de Obra:"
          placeholder="Tipo de Obra"
          name="tipo_obra"
          id="tipo_obra"
          :error="errors"
          class="col-sm-4"
          :options="arrayDataTipoObra.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.requerimiento_de_hacienda"
          title="Requerimiento de Hacienda:"
          placeholder="Requerimiento"
          name="requerimiento_de_hacienda"
          id="requerimiento_de_hacienda"
          :error="errors"
          class="col-sm-4"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.aforo"
          title="Aforo:"
          placeholder="Aforo"
          name="aforo"
          id="aforo"
          :error="errors"
          class="col-sm-4"
        />
      </div>
      <div class="row">
        <TextAraComponent
          v-model="data.situacion_actual"
          :title="'Situaccion Actual:'"
          :placeholder="'Ingresa la situacion...'"
          :name="'situacion_actual'"
          :error="errors"
          :id="'situacion_actual'"
          class="col-sm-12"
        />
        <TextAraComponent
          v-model="data.autorizacion_y_permisos"
          :title="'Autorizaciones y Permisos:'"
          :placeholder="'Ingresa autorizacion y permisos...'"
          :name="'autorizacion_y_permisos'"
          :error="errors"
          :id="'autorizacion_y_permisos'"
          class="col-sm-12"
        />
        <TextAraComponent
          v-model="data.alcance_del_proyecto"
          :title="'Alcance del Proyecto:'"
          :placeholder="'Ingresa un alcance del proyecto...'"
          :name="'alcance_del_proyecto'"
          :error="errors"
          :id="'alcance_del_proyecto'"
          class="col-sm-12"
        />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="Object.keys(errors).length !== 0 || isEdit === true"
        >
          <!-- :disabled="Object.keys(errors).length !== 0 || readOnlyView === true" -->
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/useForm";
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";
import { fichaTecnicaValidations } from "@/utils/validations/fichaTecnica";
import usePetition from "@/composables/usePetition";
import FichaTecnica from "@/utils/models/fichaTecnica";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const isEdit = ref(false);
const { getDataOutMesageModal, createFromData, updateFromData } =
  usePetition("ficha_tecnica/");

//Consultas para los selects
const { arrayData: arrayDataTipoObra, getDatas: getDatasTipoObra } =
  usePetition("cat_tipo_obra/");
const { arrayData: arrayDataTipoDocumento, getDatas: getDatasTipoDocumento } =
  usePetition("cat_tipo_documento/");

const data = ref<FichaTecnica>({
  requerimiento_de_hacienda: "",
  aforo: "",
  situacion_actual: "",
  autorizacion_y_permisos: "",
  alcance_del_proyecto: "",
  clave_compromiso: "",
  cartera_proyecto_inversion: "",
  tipo_obra: "",
  tipo_documento: "",
  documento: null,
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  fichaTecnicaValidations
);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length) {
    data.value.documento = target.files[0];
  }
};
const handleCancel = () =>
  router.push({ name: "listar-proyecto_de_inversion" });

async function saveProyectoDeInversion() {
  if (isValid.value) {
    try {
      const formData = new FormData();
      // Agregar campos del formulario
      formData.append("clave_compromiso", formState.value.clave_compromiso);
      formData.append(
        "requerimiento_de_hacienda",
        formState.value.requerimiento_de_hacienda
      );
      formData.append("aforo", formState.value.aforo);
      formData.append("situacion_actual", formState.value.situacion_actual);
      formData.append(
        "autorizacion_y_permisos",
        formState.value.autorizacion_y_permisos
      );
      formData.append(
        "alcance_del_proyecto ",
        formState.value.alcance_del_proyecto
      );
      formData.append(
        "cartera_proyecto_inversion  ",
        formState.value.cartera_proyecto_inversion
      );
      console.log(formState.value.cartera_proyecto_inversion);
      formData.append("tipo_obra   ", formState.value.tipo_obra);
      formData.append("tipo_documento    ", formState.value.tipo_documento);
      if (data.value.documento instanceof File) {
        formData.append("documento", formState.value.documento);
        console.log("aqui Entro");
      }

      if (fileName.value !== "") {
        delete data.value.documento;
        console.log("delete Documento");
      }
      /*  router.push({ name: "listar-proyecto_de_inversion" }); */
      if (isEdit.value === true) {
        await updateFromData(formData, itemId.value);
      } else {
        await createFromData(formData);
        router.push({ name: "listar-proyecto_de_inversion" });
      }
    } catch (error) {

    }
  } else {
    showErrors()
  }
}

const titulo = ref("Crear Proyecto de Inversión");
const fileName = ref("");

onMounted(() => {
  itemId.value = route.params.id.toString();
  titulo.value = "Crear Ficha Tecnica";
  data.value.cartera_proyecto_inversion = itemId.value;
  getDataOutMesageModal(itemId.value)
    .then((response: any) => {
      data.value.aforo = response.aforo;
      data.value.alcance_del_proyecto = response.alcance_del_proyecto;
      data.value.autorizacion_y_permisos = response.autorizacion_y_permisos;
      data.value.cartera_proyecto_inversion =
        response.cartera_proyecto_inversion;
      data.value.clave_compromiso = response.clave_compromiso;
      data.value.requerimiento_de_hacienda = response.requerimiento_de_hacienda;
      data.value.situacion_actual = response.situacion_actual;
      data.value.tipo_documento = response.tipo_documento;
      data.value.tipo_obra = response.tipo_obra;
      fileName.value = response.documento.split("/");
      isEdit.value = true;
    })
    .catch(() => {
      /* router.push({ name: "listar-proyecto_de_inversion" }); */
    });
  /* if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.clave = response.clave;
        data.value.no_solicitud = response.no_solicitud;
        
      })
      .catch(() => {
        router.push({ name: "listar-proyecto_de_inversion" });
      });
  } */

  getDatasTipoObra({ page: 1, size: 100 });
  getDatasTipoDocumento({ page: 1, size: 100 });
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
