import { API_URL, getStoredToken, handleErrorResponse } from "../authService";
import { RolPaginado } from "../interfaces/rol";
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

export const getPaginatedRoles = async (page:number =1):Promise<RolPaginado> => {
  const response = await fetch(
    `${API_URL}/rol/list-paginate?page=${page}`,
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