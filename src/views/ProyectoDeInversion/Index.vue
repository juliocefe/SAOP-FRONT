<template>
    <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true">Cartera de proyectos de inversión</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                    role="tab" aria-controls="profile" aria-selected="false">Datos financieros</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button"
                    role="tab" aria-controls="contact" aria-selected="false">Ficha técnica</button>
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
                            <div class="display-4 d-flex icon-actions py-2 col-md-4 d-flex justify-content-end">
                                <i class="pl-5 ml-2 bi bi-calendar-date"></i>
                                <i class="pl-5 ml-2 bi bi-bar-chart-steps"></i>
                                <i class="pl-5 ml-2 bi bi-file-text-fill"></i>
                                <i class="pl-5 ml-2 bi bi-folder-symlink-fill"></i>
                            </div>
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
                        @onDelete="handleDelete" @onCreate="handleCreate" />
                </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
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


const viewName = 'Cartera de Proyectos de Inversión'
const { arrayData, getDatas, searchData } = usePetition("cartera_proyectos_inversion/");
const searchTerm = ref("");
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-proyecto_de_inversion' })
const handleEdit = (data: any) => router.push({ name: 'editar-proyecto_de_inversion', params: { id: data } })
const handleDetail = (data: any) => router.push({ name: 'ver-proyecto_de_inversion', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-proyecto_de_inversion', params: { id: data } })

//Consultas para decorar
const { arrayData: arrayDataPrioridad, getDatas: getDatasPrioridad } =
  usePetition("cat_prioridad/");
const {
    arrayData: arrayDataEntidadFederativa,
    getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const {
    arrayData: arrayDataUnidadResponsable,
    getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/");
const { arrayData: arrayDataEstatusProyecto, getDatas: getDatasEstatusProyecto } =
  usePetition("cat_estatus/");
const { arrayData: arrayDataFase, getDatas: getDatasFase } =
  usePetition("cat_fase/");
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");

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
    { title: 'Proceso', data: 'proceso', align: 'left' },
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
    await getDatasEntidadFederativa({ page: 1, size: 100 });
    await getDatasUnidadResponsable({ page: 1, size: 100 });
    await getDatasPrioridad({ page: 1, size: 100 });
    await getDatasFase({ page: 1, size: 100 });
    await getDatasPais({ page: 1, size: 100 });
    await getDatasEstatusProyecto({ page: 1, size: 100 });
    await getDatas({ page: 1 }).then(() => {
        arrayData.value.data.map((item: any) => {
            // decorar entidades federativas
            let entidadFederativa = arrayDataEntidadFederativa.value.data.find((entidad: any) => entidad.id == item.entidad_federativa)
            item.entidad_federativa = entidadFederativa.descripcion_corta || '-'

            // decorar unidades responsables
            let unidadResponsable = arrayDataUnidadResponsable.value.data.find((unidad: any) => unidad.id == item.unidad_responsable)
            item.unidad_responsable = unidadResponsable.descripcion_corta || '-'

            // decorar prioridades
            let prioridad = arrayDataPrioridad.value.data.find((prioridad: any) => prioridad.id == item.prioridad)
            item.prioridad = prioridad.descripcion || '-'

            // decorar estatus proyecto
            let estatusProyecto = arrayDataEstatusProyecto.value.data.find((estatus: any) => estatus.id == item.estatus_proyecto)
            item.estatus_proyecto = estatusProyecto.descripcion || '-'

            // decorar fase
            let fase = arrayDataFase.value.data.find((fase: any) => fase.id == item.fase)
            item.fase = fase.descripcion || '-'

            // decorar pais
            let pais = arrayDataPais.value.data.find((pais: any) => pais.id == item.pais)
            item.pais = pais.nombre_oficial || '-'
        })
        // arrayData.data.map((item: any) => {
        // })
        showView.value = true
    })
})


</script>
<style lang="scss" scoped>
.icon-actions i {
    cursor: pointer;
    transition: transform 0.3s, font-size 0.2s;
    opacity: 0.8;

    &:hover {
        transform: scale(1.1);
        opacity: 1;
        color: var(--primary-red);
    }
}
</style>