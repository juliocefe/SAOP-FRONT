<template>
    <div>
        <InputText v-model.trim="data.etiqueta" title="Etiqueta:" placeholder="Ingresa una descripción..." name="etiqueta"
            id="etiqueta" class="col-sm-12 mt-4" @input="emitData" />
        <SelectComponent v-model="data.vista" title="Vista:" placeholder="Selecciona..." name="vista" id="vista"
            class="col-sm-12 mt-4" :options="vistas" :optionText="'vista'" optionValue="id" @input="emitData" />
        <div class="form-check col-sm-6 mt-4">
            <input v-model.trim="data.usa_imagen" type="checkbox" :checked="data.usa_imagen" id="usa_imagen" @change="emitData"/>
            <label class="form-check-label pl-4" for="usa_imagen"> Maneja imagenes </label>
        </div>
        <div class="form-check col-sm-6 mt-4">
            <input v-model.trim="data.antes_descripcion" type="checkbox" :checked="data.antes_descripcion" id="antes_descripcion" @change="emitData"/>
            <label class="form-check-label pl-4" for="antes_descripcion"> Colocar antes de descripción </label>
        </div>
    </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, defineEmits, onBeforeMount } from "vue";
import { IEtiqueta } from "@/utils/models/cat_etiquetas";
import SelectComponent from "@/components/SelectComponent.vue";

const props = defineProps(["existingData", "dataIds"]);
const data = ref<IEtiqueta>({ ...props.existingData });

const emit = defineEmits(["update-data"]);

const emitData = () => {
    // Emitir el evento 'update-data' con una copia de los datos actualizados
    emit("update-data", { ...data.value, ...props.dataIds });
};
// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
    console.log(props);
    if (props.existingData) {
        // Inicializa los datos del formulario con los datos existentes
        data.value = { ...props.existingData };
    }
});
const vistas = [{ id: 1, vista: 'Juego de radios' }, { id: 2, vista: 'Combo de selección' }, { id: 3, vista: 'Opción lógica' }, { id: 4, vista: 'Lista de selección' }, { id: 5, vista: 'Campo de captura' }, { id: 6, vista: 'Sin vista' }]
</script>