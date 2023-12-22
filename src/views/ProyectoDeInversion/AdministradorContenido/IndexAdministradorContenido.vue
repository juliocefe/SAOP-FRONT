<template>
    <div>
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <div class="container">
            <div class="row app-options-bar">
                <div class="d-flex align-items-center buttons-component align-items-center">
                    <div class="col-md-8">
                        <span>
                            <button title="Cancelar" class="btn btn-secondary mr-4" type="button" @click="handleCancel">
                                <span><b>Cancelar</b></span>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <!-- Usar el modal con título personalizado -->
                <Modal :title="modalTitle" >
                    <p>Contenido del modal...</p>
                </Modal>
            </div>
        </div>
        <div class="container">
            <DataTableComponent rowId="id" :columns="dynamicColumns" :data="dataTableDataRecursos" :pagination="paginate" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import DataTableComponent from '@/components/DataTableComponent.vue'
import Modal from '@/components/Modals.vue'

const router = useRouter();

const viewName = "Administrador de Contenido";

const paginate = { "page_size": 10, "page": 1, "total": 1, "total_pages": 1, "previous_page": 1, "next_page": 1 }

const modalTitle = 'My Modal Title';

const handleCancel = () => router.push({ name: "listar-proyecto_de_inversion" });

const dynamicColumns = ref([
    { title: "No. Solicitud", data: "id" },
    { title: "Año Base", data: "year" },
    { title: "Origen Recursos", data: "origin" },
    { title: "RECURSOS", data: "recurso" },
]);

const dataTableDataRecursos = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', recurso: '1234124' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', recurso: '5342345' },
]);

onMounted(async () => { });
onBeforeUnmount(() => { });
</script>
  