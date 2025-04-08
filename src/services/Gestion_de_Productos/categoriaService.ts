import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { CategoriaPaginado } from "../interfaces/categoria";



export const getPaginatedCategorias = async (
  page: number = 1
): Promise<CategoriaPaginado> => {
  const response = await fetch(
    `${API_URL}/categorias/list-paginate?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getStoredToken()}`,
      },
    }
  );
  return await handleErrorResponse(response);
};