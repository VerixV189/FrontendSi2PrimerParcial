
import { AuthResponse, Error } from "./interfaces/usuarios";

const API_URL: string = "http://localhost:3000/api/auth";
const TOKEN: string = "token";


export const storeToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

export const getStoredToken = () => {
  return localStorage.getItem(TOKEN);
};

export const revokeToken = () => {
  return localStorage.removeItem(TOKEN);
};

// Definir una interfaz para el error personalizado

// Función genérica para manejar errores
const handleErrorResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw {
      mensaje: data.mensaje || "Error en la solicitud",
      codigo: data.errorCode || "Código Desconocido",
      errores: data.errores,
      fecha: data.fecha || new Date().toISOString(),
    } as Error;
  }
  console.log(`estoy en el servicio stringfy ${JSON.stringify(data)}`);
  console.log(`data usuario ${data.email}, data mensaje ${data.nombre}`);
  console.log(data);
  return data;
};



// Función de login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      //credentials: "include" //permite enviar y recibir cookies
    });
    
    const data = await handleErrorResponse(response);
    storeToken(data.token);
    return {
      user: data.usuario,
      token: data.token,
      mensaje: data.mensaje
    } as AuthResponse;

  } catch (error) {
    console.error("Error en checkAuth:", error);
    throw error;
  }
};

// Función de signup
export const signup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: name, email, password }),
    });
    const data = await handleErrorResponse(response);
    return {
      user: data.usuario
    } as AuthResponse;
  } catch (error) {
    console.error("Error en checkAuth:", error);
    throw error;
  }
};

// Función para verificar autenticación
export const checkAuth = async (): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${getStoredToken()}`,
        //credentials: "include" //permite enviar y recibir cookies
      },
    });
    const data = await handleErrorResponse(response);
    console.log(` checkAuth ${JSON.stringify(data)}`)
    return {
      user: data
    } as AuthResponse;
  } catch (error) {
    console.error("Error en checkAuth:", error);
    throw error;
  }
};

