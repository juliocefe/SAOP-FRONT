<template>
  <div>
    <InputText v-model.trim="data.descripcion" title="Descripción capitulo:" placeholder="Agrega una descripción..."
      name="desc_capitulo" id="desc_capitulo" class="col-sm-12 mt-4" @input="emitData" />
    <SelectComponent v-model="data.anio" title="Año:" placeholder="Selecciona..." name="anio" id="anio" class="col-sm-4"
      :options="years()" :optionText="'year'" @input="emitData" />
    <SelectComponent v-model="data.tipo_escalatoria" title="Escalatoria:" placeholder="Selecciona..." name="escalatoria"
      id="escalatoria" class="col-sm-8" :options="years()" :optionText="'year'" @input="emitData" />
    <TextAraComponent v-model="data.descripcion_concepto" :title="'Descripción concepto:'"
      :placeholder="'Agrega una descripción...'" :name="'desc_concepto'" :id="'desc_concepto'"
      class="col-sm-12" @input="emitData" />
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { ref, defineEmits, onBeforeMount } from "vue";
import { ICapitulo } from "@/utils/models/cat_capitulos";
import TextAraComponent from "@/components/TextAraComponent.vue";

const props = defineProps(["existingData"]);
const data = ref<ICapitulo>({ ...props.existingData });

const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};

const years = () => {
  let years = []
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  for (let year = currentYear; year >= startYear; year--) {
    years.push({ year: year });
  }
  return years
}
// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
  console.log(props);
  if (props.existingData) {
    // Inicializa los datos del formulario con los datos existentes
    data.value = { ...props.existingData };
  }
});

</script>