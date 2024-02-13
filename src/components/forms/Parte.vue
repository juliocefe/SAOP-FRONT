<template>
  <div>
    <InputText
      v-model.trim="data.descripcion"
      title="Descripcion Parte:"
      placeholder="Descripcion"
      name="descripcion_Publicacion"
      id="descripcion_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import InputText from "@/components/InputText.vue";
import { IParte } from "@/utils/models/cat_partes";

const props = defineProps(["existingData"]);
const data = ref<IParte>({ ...props.existingData });
const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};

// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
  console.log(props);
  if (props.existingData) {
    // Inicializa los datos del formulario con los datos existentes
    data.value = { ...props.existingData };
  }
});
</script>
