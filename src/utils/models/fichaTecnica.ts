export default interface FichaTecnica {
  requerimiento_de_hacienda: string;
  aforo: string;
  situacion_actual: string;
  autorizacion_y_permisos: string;
  alcance_del_proyecto: string;
  clave_compromiso: string | number ;
  cartera_proyecto_inversion: string | number ;
  tipo_obra: string | number;
  tipo_documento: string | number;
  documento?:  File | Blob | null;
}
