import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import {ModeloPaginado} from "../interfaces/modelo"


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