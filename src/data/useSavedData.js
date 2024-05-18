import { baseUrl, tokenKey } from "../constants";

export async function saveData(description, dataContent, userId) {

  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Token de acceso no encontrado");
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, dataContent, userId }),
  };

  try {
    const response = await fetch(`${baseUrl}/saveddata/upload`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data;
    } else {
      throw new Error(body.message || "Error al guardar los datos");
    }
  } catch (error) {
    throw new Error(error.message || "Error de red al guardar los datos");
  }
}

export async function getAllSavedData(userId) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Token de acceso no encontrado");
  }
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${baseUrl}/saveddata/all/${userId}`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data;
    } else {
      throw new Error(body.message || "Error al obtener los datos guardados");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al obtener los datos guardados"
    );
  }
}

export async function getSavedDataById(savedDataId) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Token de acceso no encontrado");
  }
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(`${baseUrl}/saveddata/detail/${savedDataId}`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data[0]; // Devolver solo el primer objeto si hay un array
    } else {
      throw new Error(body.message || "Error al obtener los datos guardados por ID");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al obtener los datos guardados por ID"
    );
  }
}
