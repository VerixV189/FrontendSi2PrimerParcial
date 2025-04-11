//import axios from "axios";


import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { AuthResponse, ResponseDefault, UsuarioCreateRequest, UsuarioPaginado, UsuarioUpdateRequest } from "../interfaces/usuarios";


export const updateUserProfile = async (data: {
  nombre: string;
  username: string;
  email: string;
  rol_id: number;
}): Promise<AuthResponse> => {
    console.log(`data: ${JSON.stringify(data)}`)
  try {
    console.log('intentando actualizar..usuario ')
    const response = await fetch(`${API_URL}/usuarios/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
      body: JSON.stringify(data),
    });

    const result = await handleErrorResponse(response);
    console.log("Usuario actualizado:", result.usuario);
    return {
      user:result.usuario
    } as AuthResponse;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

//cambio de contrasenias
// usuarioService.ts
export const cambiarContrasenia = async (actual: string, nueva: string):Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/usuarios/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
    body: JSON.stringify({ anterior_password: actual,nueva_password: nueva }),
  });

  const data = await handleErrorResponse(response);
  return {message:data.message}; // o lo que devuelva tu backend
};

export const cambiarFotoPerfil = async (file: File) => {
  const formData = new FormData();
  formData.append("foto", file); // el nombre "foto" debe coincidir con el que espera el backend

  const response = await fetch(`${API_URL}/usuarios/upload-profile-picture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      // 'Content-Type' NO se especifica, fetch lo hace automáticamente para FormData
    },
    body: formData,
  });

  const data = await handleErrorResponse(response);
  return data.foto_url; // o lo que el backend te devuelva
};


export const getPaginatedListUsers = async (page:number = 1):Promise<UsuarioPaginado> => {
  
  const response = await fetch(`${API_URL}/usuarios/list-paginate?page=${page}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      // 'Content-Type' NO se especifica, fetch lo hace automáticamente para FormData
    },
  });
  return await handleErrorResponse(response);
};


//para admin


export const adminGetUserMethod = async (usuario:UsuarioCreateRequest): Promise<ResponseDefault> => {
 const response = await fetch(`${API_URL}/usuarios/${usuario.id}/get`, {
   method: "GET",
   headers: {
     Authorization: `Bearer ${getStoredToken()}`,
     "Content-Type": "application/json"
   },
 }); 
  const data =  await handleErrorResponse(response)
  return {
    message:data.message,
    usuario:data.usuario
  }
} 

export const adminDeleteUserMethod = async (id:number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/usuarios/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      "Content-Type": "application/json",
    },
  });
  const data = await handleErrorResponse(response)
  return {
    message:data.message
  }
}

export const adminEditUserMethod = async (usuario:UsuarioUpdateRequest):Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/usuarios/${usuario.id}/update`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`,
      "Content-Type": "application/json",
    },
  });
  const data = await handleErrorResponse(response);
  return {
    message: data.message,
    usuario: data.usuario
  };
}
