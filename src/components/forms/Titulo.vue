<template>
    <div>
        <InputText v-model.trim="data.descripcion" title="Descripción:" placeholder="Ingresa un titulo..." name="titulo"
            id="titulo" class="col-sm-12 mt-4" />{{ saveTrigger }}
        <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary">
                Cerrar
            </button>
            <button type="button" class="btn btn-primary active" @click="emit('onSaveButton')">
                Agregar
            </button>
        </div> -->
    </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, watch } from "vue";

const props = defineProps({
  saveTrigger: {
    type: Boolean
  },
});

const data = ref({
    descripcion: "",
});

const emit = defineEmits(["onSaveButton"]);

watch(
  () => props.saveTrigger,
  () => {
    console.log('savetrigger')
  },
  {
      deep: true,
  }
);
</script>