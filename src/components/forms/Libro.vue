<template>
  <div>
    <InputText
      v-model.trim="data.libro"
      title="Tipo:"
      placeholder="Tipo"
      name="tipo_Publicacion"
      id="tipo_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
    <InputText
      v-model.trim="data.descripcion"
      title="Descripcion Libro:"
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
import { ILibro } from "@/utils/models/cat_libros";

const data = ref<ILibro>({
  descripcion: "",
  libro: "",
  publicacion: "",
});

const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};
</script>
