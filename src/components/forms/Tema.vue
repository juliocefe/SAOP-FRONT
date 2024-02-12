<template>
  <div>
    <InputText
      v-model.trim="data.tema"
      title="Tipo:"
      placeholder="Tipo"
      name="tipo_Publicacion"
      id="tipo_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
    <InputText
      v-model.trim="data.descripcion"
      title="Descripcion Tema:"
      placeholder="Descripcion"
      name="descripcion_Publicacion"
      id="descripcion_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, defineEmits } from "vue";
import { ITema } from "@/utils/models/cat_temas";

const data = ref<ITema>({
  descripcion: "",
  libro: "",
  publicacion: "",
  tema: "",
});

const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};
</script>
