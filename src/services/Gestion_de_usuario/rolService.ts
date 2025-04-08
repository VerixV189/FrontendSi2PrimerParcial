import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { Rol } from "../interfaces/usuarios";





// Servicio para obtener los roles
export const getListRoles = async (): Promise<Rol[]> => {
  const response = await fetch(`${API_URL}/rol/list`, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getStoredToken()}`,
    },
  });
 console.log(response)
  const data = await handleErrorResponse(response);
  return data as Rol[]
};