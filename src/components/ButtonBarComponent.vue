<template>
    <div class="dt-buttons">
        <button v-if="props.showCreate" title="Crear" class="dt-button btn btn-primary active btn-crear" type="button"
            @click="emit('onCreate')">
            <span><i class="bi bi-plus"></i> <b>Crear</b></span>
        </button>
        <button title="Exportar PDF" class="dt-button buttons-pdf buttons-html5 btn btn-light btn-pdf" type="button" disabled
            @click="emit('onPdf')">
            <span><i class="bi bi-file-earmark-pdf"></i></span>
        </button>
        <button title="Exportar Excel" class="dt-button buttons-excel buttons-html5 btn btn-light btn-excel" disabled
            type="button" @click="emit('onExcel')">
            <span><i class="bi bi-file-earmark-excel"></i></span>
        </button>
        <button title="Imprimir" class="dt-button buttons-print btn btn-light btn-imprimir" type="button" disabled
            @click="emit('onPrint')">
            <span><i class="bi bi-printer"></i></span>
        </button>
        <button title="Copiar" class="dt-button buttons-copy buttons-html5 btn btn-light btn-copiar" disabled
            @click="emit('onCopy')">
            <span><i class="bi bi-clipboard"></i></span>
        </button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['onCopy', 'onPrint', 'onExcel', 'onPdf', 'onCreate']);
const props = defineProps({
    showCreate: {
        type: Boolean,
        default: true
    }
})
</script>
<style lang="scss" scoped>
.dt-buttons {
    display: inline-block;
}

button {
    margin-left: 2px;
    margin-right: 2px;
}

.btn-crear {
    background-color: #691C32 !important;
}

@media (max-width: 800px) {

    .btn-pdf,
    .btn-excel,
    .btn-imprimir,
    .btn-copiar {
        display: none;
    }

    .dt-buttons {
        width: 100%;
    }

    .btn-crear {
        width: 100%;
    }
}</style>
