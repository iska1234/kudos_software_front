import { baseUrl, tokenKey } from "../constants";

export async function insertSharedData(adminId, savedDataId, sharedWithUserId) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Token de acceso no encontrado");
  }
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ adminId, savedDataId, sharedWithUserId }),
  };
  try {
    const response = await fetch(`${baseUrl}/shareddata/shared`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data;
    } else {
      throw new Error(body.message || "Error al compartir los datos");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al compartir los datos"
    );
  }
}

export async function getAllAdminSharedData(userId) {
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
    const response = await fetch(`${baseUrl}/shareddata/admin/${userId}`, options);
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

export async function getAllSharedData(userId) {
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
    const response = await fetch(`${baseUrl}/shareddata/user/${userId}`, options);
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


export async function getSharedDataById(savedDataId) {
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
    const response = await fetch(`${baseUrl}/shareddata/saved/${savedDataId}`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data[0];
    } else {
      throw new Error(body.message || "Error al obtener los datos guardados por ID");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al obtener los datos guardados por ID"
    );
  }
}

export async function getAllUsersWithUserRole() {
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
    const response = await fetch(`${baseUrl}/user/all`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data;
    } else {
      throw new Error(body.message || "Error al obtener todos los usuarios");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al obtener todos los usuarios"
    );
  }
}

export async function deleteSharedDataById(sharedDataId) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Token de acceso no encontrado");
  }
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sharedDataId }),
  };
  try {
    const response = await fetch(`${baseUrl}/shareddata/delete/${sharedDataId}`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data;
    } else {
      throw new Error(body.message || "Error al eliminar los datos compartidos");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al eliminar los datos compartidos"
    );
  }
}

export async function restoreSharedDataById(sharedDataId) {
  const token = localStorage.getItem(tokenKey);
  if (!token) {
    throw new Error("Token de acceso no encontrado");
  }
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sharedDataId }),
  };
  try {
    const response = await fetch(`${baseUrl}/shareddata/restore/${sharedDataId}`, options);
    const body = await response.json();

    if (response.ok) {
      return body.data;
    } else {
      throw new Error(body.message || "Error al restaurar los datos compartidos");
    }
  } catch (error) {
    throw new Error(
      error.message || "Error de red al restaurar los datos compartidos"
    );
  }
}


export async function getSharedDataDeleted() {
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
    const response = await fetch(`${baseUrl}/shareddata/shared/deleted`, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Error al obtener los datos compartidos con deleted en true");
    }
  } catch (error) {
    throw new Error(error.message || "Error de red al obtener los datos compartidos con deleted en true");
  }
}

