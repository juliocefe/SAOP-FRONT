import { ref } from "vue"
import { makeRequest } from "@/api/api"
import { CATALOGO_DEFAULTS } from "@/utils/constants/catalogue"
import { paginate } from '@/utils/helpers/paginationHelper'
import { exportFile } from "@/utils/helpers/exportFileHelper"
import useAlert from "./useAlert"

export const usePetition = (ENDPOINT:String) => {
    const {showAlertSuccess,showAlertWarning} = useAlert();
    const arrayData = ref({...CATALOGO_DEFAULTS})

    const getDatas = async (options:any) => {
        const {size,page,...datas} = options;

        try {
            arrayData.value.loading = true
            const response = await makeRequest(`${ENDPOINT}`, 'GET', {}, { 
                page: page, 
                page_size: size > 0 ? size: arrayData.value.pagination.page_size ,
                ...datas
            })
            arrayData.value.data= response.results
            arrayData.value.pagination = paginate(arrayData.value.pagination, page, response.count)
            arrayData.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error:any) {
            showAlertWarning(error) 
            return Promise.reject(error)
        } 

    }

    const searchData = async (options:any) => {
        const {page,...datas} = options;
        try {
            arrayData.value.loading = true
            const response = await makeRequest(`${ENDPOINT}`, 'GET', {}, { 
                page: page, 
                ...datas,
                page_size: arrayData.value.pagination.page_size 
            })

            arrayData.value.data= response.results
            arrayData.value.pagination = paginate(arrayData.value.pagination, page, response.count)
            arrayData.value.loading = false
            return Promise.resolve(response.results)
        }
        catch (error:any) {
            showAlertWarning(error) 
            return Promise.reject(error)
        } 
    }

    const getData = async (clave:string) => {
        try {
            const response = await makeRequest(`${ENDPOINT}${clave}/`, 'GET')
            return Promise.resolve(response)
        }
        catch (error:any) {
            showAlertWarning(error) 
            return Promise.reject(error)
        }
    }
    const deleteData = async (clave:string) => {
        try {
            const response = await makeRequest(`${ENDPOINT}${clave}/`, 'DELETE')
            showAlertSuccess("Registro eliminado correctamente");
            return Promise.resolve(response)
        }
        catch (err:any) {
            showAlertWarning(err) 
            return Promise.reject(err)
        }
    }

    const updateData = async (data:any) => {
        try {
            const response = await makeRequest(`${ENDPOINT}${data.id ? data.id : data.clave}/`, 'PUT', data)
            showAlertSuccess("Cambios guardados correctamente");
            return Promise.resolve(response)
        }
        catch (err:any) {
            showAlertWarning(err) 
            return Promise.reject(err)
        }
    }

    const createData = async (body:any) => {
        try {
            const response = await makeRequest(`${ENDPOINT}`, 'POST', body)
            showAlertSuccess("Datos guardados correctamente");
            return Promise.resolve(response)
        }
        catch (err:any) {
            showAlertWarning(err) 
            return Promise.reject(err)
        }
    }

    const exportData = async (type:string,cat:string) => {
        try {
            const response = await makeRequest(`doc/${ENDPOINT}${type}`, 'GET')            
            exportFile(response, `${cat}.${type}`)
            
        }
        catch (error) {
            console.error(error)
            return Promise.reject(error)
        } 
    }
    
   


    return {
        arrayData,
        getDatas,//valores dinamicos { page = 1 }
        deleteData,
        updateData,
        getData,
        createData,
        searchData,//valores dinamicos {page: page, search: term}
        exportData,//valores dinamicos,

    }
}

export default usePetition;