<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true">Cartera de proyectos de inversión</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="datosFinancieros-tab" data-bs-toggle="tab" data-bs-target="#datosFinancieros" type="button"
                    role="tab" aria-controls="datosFinancieros" aria-selected="false">Datos financieros</button>
            </li>
            <li class="nav-item" role="presentation">
                <button :disabled="idRow === 0" class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                    role="tab" aria-controls="contact" aria-selected="false" @click="handleFichaTecnica">Ficha técnica</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div v-if="showView">
                    <h4 class="view-name">{{ viewName }}</h4>
                    <hr class="red">
                    <div class="row app-options-bar">
                        <div class="d-flex align-items-center buttons-component align-items-center">
                            <div class="col-md-8">
                                <ButtonBarComponent @onCreate="handleCreate" :show-subactions="false" />
                            </div>
                            <AccionesCartera />
                        </div>
                    </div>
                    <div class="d-flex px-2">
                        <div class="pr-3 col-md-1" style="font-size: 30px"><i class="px-2 bi bi-funnel-fill"></i></div>
                        <div class="px-3" style="min-width: 210px !important">
                            <select class="form-select form-control" v-model="cbEntidad" @change="handleFilter()">
                                <option selected value="">Entidad</option>
                                <option v-for="opt in arrayDataEntidadFederativa.data" :key="opt.value"
                                    :value="opt.descripcion_corta">
                                    {{ opt.descripcion_corta }}
                                </option>
                            </select>
                        </div>
                        <div class="px-3" style="min-width: 210px !important">
                            <select class="form-select form-control" v-model="cbUnidad" @change="handleFilter()">
                                <option value="">Unidad reponsable</option>
                                <option v-for="opt in arrayDataUnidadResponsable.data" :key="opt.value" :value="opt.clave">
                                    {{ opt.descripcion_corta }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-grow-1 d-flex justify-content-end">
                            <div class="form-group">
                                <div class="d-flex align-items-center form-group m-0">
                                    <div>
                                        <span class="font-weight-bold pr-2">No. Solicitud: </span>
                                    </div>
                                    <div>
                                        <input class="form-control w-auto" placeholder="Buscar..." type="text"
                                            v-model="inputSolicitud" @keyup.enter="handleFilter()" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataTableComponent v-if="!arrayData.loading" rowId="clave" :columns="columns" :data="arrayData.data"
                        :pagination="arrayData.pagination" :showDelete="true" :showEdit="true" :showDetail="true"
                        :fixed-actions="true" @onPaginate="handlePaginate" @onEdit="handleEdit" @onDetail="handleDetail"
                        @onDelete="handleDelete" @onCreate="handleCreate" @onGetID="handleRowClick" />
                </div>
            </div>
            <div class="tab-pane fade show active" id="datosFinancieros" role="tabpanel" aria-labelledby="datosFinancieros-tab">
                <DatosFinancieros :idRow="idRow"/>
                <div>
                </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import usePetition from "@/composables/usePetition";
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'
import AccionesCartera from '@/components/AccionesCarteraPoyectos.vue'
import DatosFinancieros from '@/components/forms/DatosFinancieros.vue'

const viewName = 'Cartera de Proyectos de Inversión'
const { arrayData, getDatas, searchData } = usePetition("cartera_proyectos_inversion/");
const searchTerm = ref("");
const idRow = ref(0)
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-proyecto_de_inversion' })
const handleEdit = (data: any) => router.push({ name: 'editar-proyecto_de_inversion', params: { id: data } })
const handleDetail = (data: any) => router.push({ name: 'ver-proyecto_de_inversion', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-proyecto_de_inversion', params: { id: data } })
const handleFichaTecnica = () =>  router.push({ name: 'ficha_tecnica-proyecto_de_inversion', params: { id: idRow.value } }
    )

const handleRowClick = (id : any) => {; // Obtén el ID del registro seleccionado
    // Realiza las operaciones necesarias con el ID del registro seleccionado
    idRow.value = parseInt(id)
    console.log('ID del registro seleccionado:', idRow.value);
};


const {
    arrayData: arrayDataEntidadFederativa
} = usePetition("cat_entidad_federativa/");
const {
    arrayData: arrayDataUnidadResponsable
} = usePetition("cat_unidad_responsable/");

const handlePaginate = (page: number) => {
    if (searchTerm.value) {
        searchData({ page: page, search: searchTerm.value });
    } else {
        getDatas({ page });
    }
};

const handleFilter = () => {
    let searchFilter = ""
    if (cbEntidad.value.length)
        searchFilter += cbEntidad.value
    if (cbUnidad.value.length) {
        if (searchFilter.length) searchFilter += ' ,'
        searchFilter += cbEntidad.value
    }
    if (inputSolicitud.value.length) {
        if (searchFilter.length) searchFilter += ' ,'
        searchFilter += inputSolicitud.value
    }
    searchData({ page: 1, search: searchFilter });
}

const cbEntidad = ref<string>('')
const cbUnidad = ref<string>('')
const inputSolicitud = ref<string>('')

const columns = [
    { title: 'Entidad', data: 'entidad_federativa', align: 'left' },
    { title: 'Unidad Responsable', data: 'unidad_responsable', align: 'left' },
    { title: 'Proceso', data: '', align: 'left' },
    { title: 'No. de Solicitud', data: 'no_solicitud', align: 'left' },
    { title: 'Descripción del proyecto', data: 'descripcion', align: 'left' },
    { title: 'Prioridad', data: 'prioridad', align: 'left' },
    { title: 'Clave Cartera', data: 'clave', align: 'left' },
    { title: 'Nombre Proyecto', data: 'nombre', align: 'left' },
    { title: 'Beneficios', data: 'beneficios', align: 'left' },
    { title: 'Localización', data: 'municipio', align: 'left' },
    { title: 'Fecha Inicial', data: 'fecha_inicial', align: 'left' },
    { title: 'Fecha Final', data: 'fecha_final', align: 'left' },
    { title: 'Fase', data: 'fase', align: 'left' },
    { title: 'Ejercicio Ptal', data: 'ejercicio_presupuestal', align: 'left' },
    { title: 'Comentarios', data: 'comentarios', align: 'left' },
    { title: 'Estatus Proyecto', data: 'estatus_proyecto', align: 'left' },
    { title: 'País', data: 'pais', align: 'left' },
    { title: 'Año Base', data: '', align: 'left' },
    { title: 'Inversión Total', data: '', align: 'left' },
    { title: 'Valor Presente Neto', data: '', align: 'left' },
    { title: 'Gastos Estimación Operación', data: '', align: 'left' },
    { title: 'Otros Costos', data: '', align: 'left' },
    { title: 'Financiamiento Adicional', data: '', align: 'left' },
    { title: 'Cto. Anual Equivalente', data: '', align: 'left' },
    { title: 'Tasa de Retorno', data: '', align: 'left' },
    { title: 'Tasa de Rendimiento Inmediata', data: '', align: 'left' },
    { title: 'Tasa de Descuento', data: '', align: 'left' },
]

onMounted(async () => {
    await getDatas({ page: 1 }).then(() => {showView.value = true})
})

</script>