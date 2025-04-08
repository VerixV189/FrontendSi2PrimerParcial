export interface DatoGeneral{
    id: number,
    nombre: string,
    updatedAt: string,
    createdAt: string
}

export type Permiso = DatoGeneral;

export interface Rol extends DatoGeneral{
    permisos ?: Permiso[];
 }

export interface Usuario extends DatoGeneral{
    email:string,
    roId: number,
    rol?: Rol
}

export interface Error {
  message: string;
  error: number;
  fecha: string;
}

// Tipo para el retorno de los servicios de login y signup
export interface AuthResponse {
  user: Usuario; // Puedes especificar un tipo más detallado según la respuesta
  message?: string;
  token?: string;
}