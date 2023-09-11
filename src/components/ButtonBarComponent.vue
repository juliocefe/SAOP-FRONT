<template>
  <div class="dt-buttons">
    <button
      v-if="props.showCreate"
      title="Crear"
      class="dt-button btn btn-primary active btn-crear"
      type="button"
      @click="emit('create')"
    >
      <span><i class="bi bi-plus"></i> Crear</span>
    </button>
    <button
      v-if="props.showPdf"
      title="Exportar PDF"
      class="dt-button buttons-pdf buttons-html5 btn btn-secondary btn-pdf"
      type="button"
      @click="emit('exportPDF', 'pdf')"
    >
      <span><i class="bi bi-file-earmark-pdf"></i></span>
    </button>
    <button
      v-if="props.showExcel"
      title="Exportar Excel"
      class="dt-button buttons-excel buttons-html5 btn btn-secondary btn-excel"
      type="button"
      @click="emit('exportExcel', 'xlsx')"
    >
      <span><i class="bi bi-file-earmark-excel"></i></span>
    </button>
    <!--<button
            title="Imprimir"
            class="dt-button buttons-print btn btn-secondary btn-imprimir"
            type="button"
            @click="emit('print')"
        >
            <span><i class="bi bi-printer"></i></span>
        </button>
        <button
            title="Copiar"
            class="dt-button buttons-copy buttons-html5 btn btn-secondary btn-copiar"
            type="button"
            @click="emit('copy')"
        >
            <span><i class="bi bi-clipboard"></i></span>
        </button>-->
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits([
  "copy",
  "print",
  "exportExcel",
  "exportPDF",
  "create",
]);
const props = defineProps({
  showCreate: {
    type: Boolean,
    default: true,
  },
  showPdf: {
    type: Boolean,
    default: false,
  },
  showExcel: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.dt-buttons {
  display: inline-block;
}
button {
  margin-left: 2px;
  margin-right: 2px;
}
</style>
