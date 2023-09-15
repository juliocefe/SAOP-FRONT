import { ref } from "vue"
import { getRequest, postRequest, putRequest } from "@/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { deleteRequest } from "@/api/api"

const ENDPOINT = 'cat_tipo_obra/'

export const useConstructionTypes = () => {

    const constructionTypes = ref(CATALOGO_DEFAULTS)

    const getConstructionTypes = async ({ page = 1 }) => {
        try {
            constructionTypes.value.loading = true
            const response = await getRequest(`${ENDPOINT}`, { page: page, page_size: constructionTypes.value.pagination.page_size })
            console.log(response)
            constructionTypes.value.data= response.results
            constructionTypes.value.pagination = paginate(constructionTypes.value.pagination, page, response.count)
            constructionTypes.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar los tipos de obra", error)
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

    const getConstructionTypeById = async (id:any) => {
        try {
            const response = await getRequest(`${ENDPOINT}${id}/`)
            return Promise.resolve(response)
        }
        catch (error) {
            console.error(error)
            console.log("Error al cargar tipo de obra", error)
            return Promise.reject(error)
        }
    }

    const saveConstructionType = async (data:any) => {
        try {
            const response = await postRequest(ENDPOINT, data)
            return Promise.resolve(response)
        }
        catch(err) {
            console.error(err)
            console.log('Error al guardar el nuevo tipo de obra', err)
            return Promise.reject(err)
        } 
    }

    const deleteConstructionType = async (id:any) => {
        try {
            const response = await deleteRequest(`${ENDPOINT}`, id)
            return Promise.resolve(response)
        }
        catch(err) {
            console.error(err)
            console.log('Error al eliminar el puesto', err)
            return Promise.reject(err)
        } 
    }

    const updateConstructionType = async (data:any) => {
        console.log(data)
        try {
            const response = await putRequest(`${ENDPOINT}`, data.clave, data)
            return Promise.resolve(response)
        }
        catch(err) {
            console.error(err)
            console.log('Error al guardar el nuevo tipo de obra', err)
            return Promise.reject(err)
        } 
    }

    return {
        constructionTypes, 

        getConstructionTypes,
        saveConstructionType,
        getConstructionTypeById,
        updateConstructionType,
        deleteConstructionType
    }
}

export default useConstructionTypes