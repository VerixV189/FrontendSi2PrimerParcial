import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { PermisoPaginado } from "../interfaces/permiso";

export const getPaginatedPermisos = async (page:number =1):Promise<PermisoPaginado> => {
  const response = await fetch(
    `${API_URL}/permisos/list-paginate?page=${page}`,
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