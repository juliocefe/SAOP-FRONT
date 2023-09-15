import Swal from 'sweetalert2'
import {  RouteParamsRaw, useRouter } from "vue-router";

export const useAlert = () => {
        const router = useRouter();

         interface routeParams{
            name:string
            params:RouteParamsRaw
        }
        const showMessage =(message:string,type:any='success')=>{
            Swal.fire({
                position: 'top-end',
                icon: type,
                title: message,
                showConfirmButton: false,
                timer: 2000});
        }
        const showAlertSuccess = (message:string) => {
            showMessage(message,'success');
        }
        const showAlertError = (message:string) => {
            showMessage(message,'error');
        }
    
        const showAlertWarning = (message:string) => {
            showMessage(message,'warning');
        }
    
        const showAlertInfo = (message:string) => {
            showMessage(message,'info');
        }

        
    
    
        
        const showConfirm=(message:string,params:routeParams|any=false)=>{
            Swal.fire({
                title: 'Aviso',
                text: message,
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
              }).then((result) => {
                if (result.isConfirmed) {
                    console.log(params)
                    if (params!=false) {
                        console.log('a')
                        router.push({name:params.name,params:params.params});
                    }else{
                        console.log('b');
                        window.history.back();
                        
                    }
                }
              })
        }
       
        

        return {
            showAlertSuccess,
            showAlertError,
            showAlertWarning,
            showAlertInfo,
            showConfirm
          }
    }
    
    export default useAlert;