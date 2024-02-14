export interface IEtiqueta {
    etiqueta: string | null;
    vista: string | null;
    usa_imagen: boolean | null;
    antes_descripcion: string | null;
    publicacion: string | null;
    libro: string | null;
    tema: string | null;
    parte: string | null;
    titulo: string | null;
    capitulo: string | null;

  }
  
  export const defaultValues: IEtiqueta = {
    etiqueta: null,
    vista: null,
    usa_imagen: null,
    antes_descripcion: null,
    publicacion: null,
    libro: null,
    tema: null,
    parte: null,
    titulo: null,
    capitulo: null,
  };
  