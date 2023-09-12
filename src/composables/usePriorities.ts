import { ref } from "vue"
import { getRequest, postRequest, putRequest } from "@/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { deleteRequest } from "@/api/api"

const ENDPOINT = 'cat_prioridad/'

export const usePriorities = () => {

    const priorities = ref(CATALOGO_DEFAULTS)

    const getPriorities = async ({ page = 1 }) => {
        try {
            priorities.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, page_size: priorities.value.pagination.page_size })
            priorities.value.data= response.results
            priorities.value.pagination = paginate(priorities.value.pagination, page, response.count)
            priorities.value.loading = false
            console.log(response)
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar las prioridades", error)
            return Promise.reject(error)
        } 
    }

    // const searchPositions = async (term:string = '', page: number = 1) => {
    //     try {
    //         positions.value.loading = true
    //         const response = await getRequest(`${ENDPOINT}`, { page: page, search: term, page_size: positions.value.pagination.page_size })
    //         positions.value.data= response.results
    //         positions.value.pagination = paginate(positions.value.pagination, page, response.count)
    //         positions.value.loading = false
    //         return Promise.resolve(response.results)
    //     }
    //     catch (error) {
    //         console.error(error)
    //         console.log("Error al cargar puestos", error)
    //         return Promise.reject(error)
    //     } 
    // }

    const getPriorityById = async (id:any) => {
        try {
            const response = await getRequest(`${ENDPOINT}${id}/`)
            return Promise.resolve(response)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar prioridad", error)
            return Promise.reject(error)
        }
    }

    const savePriority = async (data:any) => {
        try {
            const response = await postRequest(ENDPOINT, data)
            return Promise.resolve(response)
        }
        catch(err) {
            console.error(err)
            console.log('Error al guardar la nueva prioridad', err)
            return Promise.reject(err)
        } 
    }

    const deletePriority = async (id:any) => {
        try {
            const response = await deleteRequest(`${ENDPOINT}`, id)
            return Promise.resolve(response)
        }
        catch(err) {
            console.error(err)
            console.log('Error al eliminar la prioridad', err)
            return Promise.reject(err)
        } 
    }

    const updatePriority = async (data:any) => {
        console.log(data)
        try {
            const response = await putRequest(`${ENDPOINT}`, data.clave, data)
            return Promise.resolve(response)
        }
        catch(err) {
            console.error(err)
            console.log('Error al guardar la nueva prioridad', err)
            return Promise.reject(err)
        } 
    }

    return {
        priorities, 

        getPriorities,
        savePriority,
        getPriorityById,
        updatePriority,
        deletePriority
    }
}

export default usePriorities