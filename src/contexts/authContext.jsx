import * as React from "react";
import { baseUrl, tokenKey, userKey } from "../constants";
import { encryptData } from "../utils/encriptData";


const authContext = React.createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);


  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(email, password) {
    const options = {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch(baseUrl + "/auth/login", options);
      const body = await response.json();
  
      if (response.ok) {
        const { token, role } = body.data;
        const encryptedRole = encryptData(role);
        window.localStorage.setItem(tokenKey, token);
        window.localStorage.setItem(userKey, encryptedRole);
        setIsAuthenticated(true);
      } else {
        const errors = body.error.details;
        let errorMessage = "";
  
        errors.forEach((error) => {
          if (error.email === "El usuario no existe") {
            errorMessage = "El usuario no existe";
          } else if (error.email === "Contraseña incorrecta") {
            errorMessage = "Contraseña incorrecta";
          } else if (error.password === "Contraseña incorrecta") {
            errorMessage = "Contraseña incorrecta";
          }
        });
  
        return Promise.reject(new Error(errorMessage || "Error en el login"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      return Promise.reject(error);
    }
}
  

  async function signup(email, password, name, age) {
    const userData = {
      email,
      password,
      name,
      age,
    };
  
    const options = {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await fetch(baseUrl + "/auth/register", options);
      const body = await response.json();
  
      if (response.ok) {
        return { success: true, message: "Usuario registrado exitosamente" };
      } else {
        throw new Error(body.error.message || "Error desconocido al registrar usuario");
      }
    } catch (error) {
      throw new Error(error.message || "Error de red al registrar usuario");
    }
  }

  function logout() {
    window.localStorage.removeItem(tokenKey);
    window.localStorage.removeItem("lastVisitedRoute");
    window.localStorage.removeItem(userKey);
    setIsAuthenticated(false);
  }

  return <authContext.Provider value={{ isAuthenticated, login, signup, logout }}>{children}</authContext.Provider>
}

export function useAuth() {
  return React.useContext(authContext);
}
