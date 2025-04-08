import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { MarcaPaginado } from "../interfaces/marca";


export const getPaginatedMarca = async (page:number =1):Promise<MarcaPaginado> => {
  const response = await fetch(
    `${API_URL}/marcas/list-paginate?page=${page}`,
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