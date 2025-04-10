import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import {ModeloPaginado} from "../interfaces/modelo"
import { ResponseDefault } from "../interfaces/usuarios";


export const getPaginatedModelos = async (page:number =1):Promise<ModeloPaginado> => {
  const response = await fetch(
    `${API_URL}/modelos/list-paginate?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
}

export const deleteModelo = async (id: number): Promise<ResponseDefault> => {
  const response = await fetch(`${API_URL}/marcas/${id}/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getStoredToken()}`
    }
  });
  const data = await handleErrorResponse(response);
  return { message: data.message };
};

// export const updateModelo = async (id: number, nombre: string): Promise<ResponseDefault> => {
//   const response = await fetch(`${API_URL}/marcas/${id}/update`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getStoredToken()}`
//     },
//     body: JSON.stringify({ nombre })
//   });
//   const data = await handleErrorResponse(response);
//   return { message: data.message };
// };


