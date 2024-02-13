<template>
  <div>
    <InputText
      v-model.trim="data.descripcion"
      title="Descripción:"
      placeholder="Ingresa una descripción..."
      name="tipo_Titulo"
      id="tipo_Titulo"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, defineEmits } from "vue";
import { ITitulo, defaultValues as defaultValuesTitulo } from "@/utils/models/cat_titulos";

const data = ref<ITitulo>(defaultValuesTitulo);

const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};
</script>