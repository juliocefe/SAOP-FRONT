import { LOADER_DELAY } from '@/utils/constants/application'
import { clearToken, getToken, isAuthenticated } from '@/utils/helpers/authenticationHelper'
import { useApplicationStore } from '@/store/applicationStore'
import { IFetch, defaultValues } from '@/utils/models/fetchModel'
import { getBaseURL, logRequestError, sleep } from '@/utils/helpers/applicationHelper'

const defaultConfig: IFetch = {...defaultValues}
const baseURL:string = getBaseURL()

/**
 * 
 * MÉTODO PARA REALIZAR PETICIONES AL BACKEND
 * ADJUNTANDO EL HEADER DE AUTORIZACIÓN
 * Y GESTIONANDO EL COMPONENTE LOADER Y LAS CREDENCIALES.
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso
 * @param {string} method método por el cual se realizará la petición
 * @param {any} body cuerpo de la petición
 * @return {any} response data
 * 
 */
const makeRequest = async (url:string, method:string, body:any = {}, params:any = {}): Promise<any> => {
    const appStore = useApplicationStore()
    try {
        appStore.initTransaction()

        let config:any = { ...defaultConfig }
        config.method = method


        if (isAuthenticated()) {
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }

        if (Object.keys(body).length > 0) {
            config.body = JSON.stringify(body)
        }

        const query = Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&')

        const fullPath = Object.keys(params).length > 0 ? `${url}?` + query : url

        const response = await fetch(`${baseURL + fullPath}`, config)

        if (response.status >= 500) {
            throw new Error(`There was a 5xx error on ${url} with method ${method}. Check with the sys admin.`)
        }

        if (response.status >= 400 && response.status !== 401 && response.status < 500) {
            throw new Error(`There was a 4xx error on ${url} with method ${method}. Check your request.`)
        }

        if (response.status === 401) {
            clearToken()
            throw new Error(`Please, check your credentials and try again.`)
        }

        const isJSON = response.headers.get('content-type') === 'application/json'

        const data = isJSON? await response.json() : {}

        await sleep(LOADER_DELAY)
        
        appStore.endTransaction()

        return Promise.resolve(data)
    }
    catch (error) {
        appStore.endTransaction()
        logRequestError(url, method, body, params, error)
        return Promise.reject(error)
    }
}

/**
 * Wrapper para peticiones GET
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {any} params query string 
 * @returns {any} response data
 */
export const getRequest = (url:string, params:any = {}): Promise<any> => makeRequest(url, 'GET', {}, params)

/**
 * Wrapper para peticiones POST
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {any} body cuerpo de la petición
 * @returns {any} response data
 */
export const postRequest = (url = '', body = {}): Promise<any> => makeRequest(url, 'POST', body)

/**
 * Wrapper para peticiones PUT
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {string} id identificador del recurso
 * @param {any} body cuerpo de la petición
 * @returns {any} response data
 */
export const putRequest = (url:string, id:string, body:any): Promise<any> => makeRequest(`${url}${id}/`, 'PUT', body)

/**
 * Wrapper para peticiones DELETE
 * 
 * @author Gildardo Solis <gildardo.gs5@gmail.com>
 * @param {string} url url del recurso 
 * @param {string} id identificador del recurso
 * @param {any} body cuerpo de la petición
 * @returns {any} response data
 */
export const deleteRequest = (url:string, id:string): Promise<any> => makeRequest(`${url}${id}/`, 'DELETE', {}, {})