<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveProyectoDeInversion">
      <div class="row">
        <InputText :disabled="itemId !== ''" v-model="data.no_solicitud" title="Numero de Solicitud:"
          placeholder="Numero de Solicitud" name="clave" id="clave" :error="errors" class="col-sm-6" />
        <SelectComponent v-model="data.prioridad" title="Prioridad:" placeholder="Prioridad" name="prioridad"
          id="prioridad" :error="errors" class="col-sm-6" :options="arrayDataPrioridad.data"
          :optionText="'descripcion'" />
      </div>
      <div class="row">
        <InputText v-model="data.clave" title="Clv Cartera:" placeholder="Clv Cartera" name="clave" id="clave"
          :error="errors" class="col-sm-6" />
        <SelectComponent v-model="data.factibilidad_obra" title="Factibilidad de la obra :"
          placeholder="Factibilidad de la obra" name="Factibilidad_de_la_obra" id="Factibilidad_de_la_obra"
          :error="errors" class="col-sm-6" :options="arrayDataFactibilidad.data" :optionText="'descripcion'" />
      </div>
      <div class="row">
        <SelectComponent v-model="data.area" title="Area:" placeholder="Area" name="area" id="area" :error="errors"
          class="col-sm-12" :options="arrayDataArea.data" :optionText="'nombre'" />
        <SelectComponent v-model="data.tipo_proyecto" title="Tipo de Proyecto:" placeholder="Tipo de Proyecto"
          name="tipo_de_proyecto" id="tipo_de_proyecto" :error="errors" class="col-sm-12"
          :options="arrayDataProyecto.data" :optionText="'descripcion'" />
        <SelectComponent v-model="data.estatus_proyecto" title="Estatus de Proyecto:" placeholder="Estatus de Proyecto"
          name="estatus_de_proyecto" id="estatus_de_proyecto" :error="errors" class="col-sm-12"
          :options="arrayDataEstatus.data" :optionText="'descripcion'" />
        <SelectComponent v-model="data.cartera_estatus" title="Estatus:" placeholder="Estatus" name="estatus" id="estatus"
          :error="errors" class="col-sm-12" :options="arrayDataEstatus.data" :optionText="'descripcion'" />
        <InputText v-model="data.nombre" title="Nombre del Proyecto:" placeholder="Nombre del Proyecto"
          name="nombre_del_proyecto" id="nombre_del_proyecto" :error="errors" class="col-sm-12" />
      </div>
      <div class="row">
        <TextAraComponent v-model="data.descripcion" :title="'Descripcion:'" :placeholder="'Ingresa una descripcion...'"
          :name="'descripcion'" :error="errors" :id="'descripcion'" class="col-sm-12" />
      </div>
      <div class="row">
        <SelectComponent v-model="data.pais" title="Pais:" placeholder="Pais" name="pais" id="pais" :error="errors"
          class="col-sm-6" :options="arrayDataPais.data" :optionText="'nombre_oficial'" />
        <SelectComponent v-model="data.entidad_federativa" title="Entidad Federativa:" placeholder="Entidad Federativa"
          name="entidad_federativa" id="entidad_federativa" :error="errors" class="col-sm-6"
          :options="arrayDataEntidadFederativa.data" :optionText="'descripcion'" />
      </div>
      <div class="row">
        <SelectComponent v-model="data.unidad_responsable" title="Unidad Responsable:" placeholder="Unidad Responsable"
          name="unidad_responsable" id="unidad_responsable" :error="errors" class="col-sm-12"
          :options="arrayDataUnidadResponsable.data" :optionText="'descripcion'" />
        <InputText v-model="data.municipio" title="Localizacion/Municipio:" placeholder="Localizacion/Municipio"
          name="localizacion_municipio" id="localizacion_municipio" :error="errors" class="col-sm-12" />
        <TextAraComponent v-model="data.beneficios" :title="'Beneficios:'" :placeholder="'Ingresa los beneficios...'"
          :name="'beneficios'" :error="errors" :id="'beneficios'" class="col-sm-12" />
      </div>
      <div class="row">
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Fecha Inicial</label>
          <input v-model="data.fecha_inicial" type="date" class="form-control" id="precidencial-prioridad" placeholder=""
            autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_prioridad">{{ errors.fecha_prioridad }}</small>
        </div>
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Fecha Final</label>
          <input v-model="data.fecha_final" type="date" class="form-control" id="precidencial-prioridad" placeholder=""
            autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_prioridad">{{ errors.fecha_prioridad }}</small>
        </div>
        <InputText v-model="data.ejercicio_presupuestal" title="Ejercicio Presupuestal:"
          placeholder="Ejercicio Presupuestal" name="ejercicio_presupuestal" id="ejercicio_presupuestal" :error="errors"
          class="col-sm-6" />
        <SelectComponent v-model="data.fase" title="Fase:" placeholder="Fase" name="fase" id="fase" :error="errors"
          class="col-sm-6" :options="arrayDataFase.data" :optionText="'descripcion'" />
        <TextAraComponent v-model="data.comentarios" :title="'Comentarios:'" :placeholder="'Ingresa los beneficios...'"
          :name="'comentarios'" :error="errors" :id="'comentarios'" class="col-sm-12" />
        <InputText v-model="data.clave_compromiso" title="Clave Compromiso:" placeholder="Fase" name="fase" id="fase"
          :error="errors" class="col-sm-12" />
        <SelectComponent v-model="data.tipo_obra" title="Tipo de Obra:" placeholder="Fase" name="fase" id="fase"
          :error="errors" class="col-sm-12" :options="arrayDataTipoObra.data" :optionText="'descripcion'" />
      </div>
      <div class="row">
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Anexa Documentos</label>
        </div>
      </div>
      <div class="row">
        <SelectComponent v-model="data.tipo_documento" title="Tipo Documento:" placeholder="Fase" name="fase" id="fase"
          :error="errors" class="col-sm-6" :options="arrayDataTipoDocumento.data" :optionText="'nombre'" />
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Documento</label>
          <input type="file" class="form-control" id="precidencial-prioridad" placeholder="" autocomplete="off"
            />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_prioridad">{{ errors.fecha_prioridad }}</small>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">Guardar</button>
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
import { cat_faseValidations } from "@/utils/validations/cat_faseValidations";
import usePetition from "@/composables/usePetition";
import ProyectoDeInversion from "@/utils/models/ProyectoDeInversion";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition(
  "cartera_proyectos_inversion/"
);

//Consultas para los selects
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
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");
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
const { arrayData: arrayDataTipoDocumento, getDatas: getDatasTipoDocumento } =
  usePetition("cat_tipo_documento/");

const data = ref<ProyectoDeInversion>({
  clave: "",
  no_solicitud: "",
  nombre: "",
  descripcion: "",
  municipio: "",
  beneficios: "",
  fecha_inicial: "",
  fecha_final: "",
  ejercicio_presupuestal: "",
  comentarios: "",
  clave_compromiso: "",
  factibilidad_obra: "",
  prioridad: "",
  tipo_proyecto: "",
  estatus_proyecto: "",
  cartera_estatus: "",
  pais: "",
  entidad_federativa: "",
  fase: "",
  tipo_obra: "",
  tipo_documento: "",
  unidad_responsable: "",
  area: "",
  documento: null,
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_faseValidations
);


const handleCancel = () => router.push({ name: "crear-proyecto_de_inversion" });

async function saveProyectoDeInversion() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {

        await createData(formState);
      }
      /* router.push({ name: "listar-cat_Fase" }); */
    } catch (error) { }
  } else {
    showErrors();
  }

}

const titulo = ref("Crear Proyecto de Inversión");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value
    ? "Editar Fase"
    : "Crear Crear Proyecto de Inversión";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.descripcion = response.descripcion;
        data.value.clave = response.clave;
      })
      .catch(() => {
        router.push({ name: "listar-cat_Fase" });
      });
  }
  getDatasPrioridad({ page: 1, size: 100 });
  getDatasFactibilidad({ page: 1, size: 100 });
  getDatasArea({ page: 1, size: 100 });
  getDatasProyecto({ page: 1, size: 100 });
  getDatasEstatus({ page: 1, size: 100 });
  getDatasPais({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasUnidadResponsable({ page: 1, size: 100 });
  getDatasFase({ page: 1, size: 100 });
  getDatasTipoObra({ page: 1, size: 100 });
  getDatasTipoDocumento({ page: 1, size: 100 });
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
