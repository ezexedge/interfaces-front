export type User  = {
    nombre?: string,
    apellido?: string,
    token?: string,
    password?: string,
    email?: string
  }


 export type TodoSuccessResponse = {
    message?: User
  };

 export type TodoErrorResponse = {
    error?: string
  };
  export type Local = {
    id: string,
    nombre: string,
    calle: string,
    altura: string,
    latitud: string,
    longitud: string,
    horaApertura: string,
    horaCierre: string,
    imagen: string,
    pais: string,
    provincia: string,
    localidad: string,
    likes: string[],
    dislikes: string[],
    comentarios: string[],
    categoria: string
    createdAt: string
    
  }
  