<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red">
    <div class="row app-options-bar">
        <div class="col buttons-component">
            <ButtonBarComponent 
                @create="handleCreate"
                :showPdf="false" 
            />
        </div>
        <div class="col search-component">
            <SearchComponent  /> <!-- @onSearch="handleSearch" -->
        </div>
    </div>
    <!-- v-if="!arrayData.loading"  -->
    <DataTableComponent 
        rowId="clave" 
        :columns="columns" 
        :data="arrayData"
        :pagination="arrayData"
        :showDelete="true"
        :showEdit="true"
        :showDetail="false"
        @onEdit="handleEdit" 
        @onDelete="handleDelete" 
        @onCreate="handleCreate" />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import DataTableComponent from '@/components/DataTableComponent.vue'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'
/* import usePetition from '@/composables/usePetition' */

const viewName = 'Catalogo Tipos de Proyecto'
/* const searchTerm = ref('') */
/* const {arrayData, getDatas, searchData } = usePetition("cat_actividad_institucional/"); */

const handleCreate = () => router.push({ name: 'crear-tipoProyecto' })
const handleEdit = (data:string) => router.push({ name: 'editar-tipoProyecto', params: { id: data } })
const handleDelete = (data:string) => router.push({ name: 'eliminar-actividades-institucionales', params: { id: data } })
const handleSubGroup = (data:any) => router.push({ name: 'listar-actividad-presupuestal', params: { act: data } })

/* const handlePaginate = (page:number) => {
    if (searchTerm.value) {
        searchData({page:page,search:searchTerm.value})
    } else {
        getDatas({ page })
    }
}

const handleSearch = (term:any) => {
    searchTerm.value = term
    searchData({page:1,search:searchTerm.value})
} */

const columns = [
    { title: 'Tipo de Proyecto', data: 'clave' },
    { title: 'Descripcion Tipo de Proyecto', data: 'descripcion' },

]

// Datos de prueba
const arrayData = ref([
    {
        clave: '1',
        descripcion: 'Esta es una descripción de la actividad 1',
    },
    {
        clave: '2',
        descripcion: 'Esta es una descripción de la actividad 2',
    },
])

/* onMounted(() => getDatas({ page: 1 })) */
</script>
<style lang="scss" scoped></style>