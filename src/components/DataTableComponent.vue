  
  
<template>
    <div id="data-table-component">
        <DataTable class="table table-hover table-bordered" :options="OPTIONS">
            <thead>
                <tr>
                    <th v-for="col in columns" class="text-center">{{ col.title }}</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="value in data" :key="value[rowId]">
                    <td v-for="col in columns" class="text-left" v-html="render(value[col.data])"></td>
                    <td class="text-center action_items">
                        <button v-if="showEdit" class="btn btn-primary btn-sm active mr-2 mt-2 mb-2" data-placement="top"
                            title="Editar" @click="emit('onEdit', value[rowId])"><i class="bi bi-pencil"></i></button>
                        <button v-if="showDelete" class="btn btn-primary btn-sm active mr-2 mt-2 mb-2" data-placement="top"
                            title="Eliminar" @click="emit('onDelete', value[rowId])"><i class="bi bi-trash"></i></button>
                        <button v-if="showDetail" class="btn btn-primary btn-sm active mt-2 mb-2" data-placement="top"
                            title="Ver" @click="emit('onDetail', value[rowId])"><i class="bi bi-search"></i></button>
                        <button v-if="showSubGroup" class="btn btn-primary btn-sm active mt-2 mb-2" data-placement="top"
                            title="Ver subgrupo" @click="emit('onSubGroup', value[rowId])"><i class="bi bi-eye"></i></button>
                    </td>
                </tr>
            </tbody>
        </DataTable>
        <nav aria-label="Page navigation" class="text-center" v-if="pagination.total > 0 && pagination.total_pages > 0">
            <div>Total de registros activos: <b>{{ pagination.total }}</b></div>
            <div>Página <b>{{  pagination.page }}</b> de <b>{{  pagination.total_pages }}</b></div>
            <ul class="pagination">
                <li class="page-item" :class="{disabled: pagination.total_pages <= 1}"><a class="page-link" href="#" @click.prevent @click="handlePage(pagination.previous_page)">Anterior</a></li>
                <li class="page-item" 
                    v-for="(item, index) in pagination.total_pages" 
                    v-show="showPaginationNumbers(item)" 
                    :class="{active : hasActiveClass(item), disabled: (pagination.total_pages > PAGINATION_MAX_PAGES && item === PAGINATION_DOTS)}" 
                    :key="index" 
                    @click.prevent 
                    @click="handlePage(item)">
                        <a :disabled="true" class="page-link" href="#">{{ pagination.total_pages > PAGINATION_MAX_PAGES && item === PAGINATION_DOTS? '...' : item }}</a>
                </li>
                <li class="page-item" :class="{disabled: pagination.total_pages <= 1}"><a class="page-link" href="#" @click.prevent @click="handlePage(pagination.next_page)">Siguiente</a></li>
            </ul>
        </nav>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs4';
import { DEFAULT_OPTIONS } from '@/utils/constants/datatable'
import { render } from '@/utils/helpers/renderHelper'
import { PAGINATION_MAX_PAGES, PAGINATION_OFFSET, PAGINATION_DOTS } from '@/utils/constants/pagination'
import { IDatatable } from '@/utils/models/dataTableModel'


DataTable.use(DataTablesCore);

const props = defineProps<IDatatable>()

const emit = defineEmits(['onEdit', 'onDelete', 'onCreate', 'onDetail', 'onPaginate', 'onSubGroup'])
const handlePage = (page:any) => emit('onPaginate', page)

const hasActiveClass = (item: number) => {
    if (props.pagination.total_pages > PAGINATION_MAX_PAGES) {
        return (props.pagination.total_pages > PAGINATION_MAX_PAGES && props.pagination.page === item && item !== PAGINATION_DOTS)
    }
    return props.pagination.page === item
}

const showPaginationNumbers = (item:any) => {
    let response = true 
    if (props.pagination.total_pages > PAGINATION_MAX_PAGES) {
        if ( (item > PAGINATION_DOTS && item <= props.pagination.total_pages - PAGINATION_OFFSET)) {
            response = false
        }
    } 
    return response
}

const OPTIONS = ref<any>({...DEFAULT_OPTIONS})

OPTIONS.value.columnDefs = [{
    'targets': [props.columns.length],
    'orderable': false,
}]
</script>
<style lang="scss" scoped>
div.dataTables_wrapper div.dataTables_paginate,
.dataTables_info,
.dataTables_paginate .paging_simple_numbers,
#table_paginate {
    text-align: center;
}

.page-item.active .page-link,
.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover {
    background-color: #691C32;
    border-color: #691C32;
}

    #data-table-component {
        overflow-x: auto;
    }
.action_items{
    display: flex !important;
    align-items: center;
}

</style>