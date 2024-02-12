<template>
    <div>
        <InputText  v-model.trim="data.descripcion"
                    title="Capituylo:" placeholder="0.00" name="financiamiento_adicional"
                    id="financiamiento_adicional" class="col-sm-12 mt-4" />
    </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref } from "vue";

const data = ref({
  descripcion: "",
});
</script>