export const cat_tipoProyectoValidations: any = {
    nombre: {
        rules: [
          {
            validation: (value: string) => value && value.length > 0,
            message: "Campo requerido.",
          },
          {
            validation: (value: string) => value && value.length < 31,
            message: "Maximo 30 caracteres.",
          },
        ],
      },
      descripcion: {
        rules: [
          {
            validation: (value: string) => value && value.length > 0,
            message: "Campo requerido.",
          },
          {
            validation: (value: string) => value && value.length < 121,
            message: "Maximo 120 caracteres.",
          },
        ],
      },
}