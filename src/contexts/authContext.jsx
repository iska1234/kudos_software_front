import * as React from "react";
import { baseUrl, tokenKey } from "../constants";

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
      console.log("Sending login request...");
      const response = await fetch(baseUrl + "/auth/login", options);
      console.log("Login request response:", response);
  
      const body = await response.json();
  
      if (response.ok) {
        const { token } = body.data;
        window.localStorage.setItem(tokenKey, token);
        setIsAuthenticated(true);
      } else {
        const error =
          body.errors instanceof Array ? body.errors.join(", ") : body.errors;
        return Promise.reject(new Error(error));
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
  
      if (response.ok) {
        return { success: true, message: "Usuario registrado exitosamente" };
      } else {
        const body = await response.json();
        const error =
          body.message || "Error desconocido al registrar usuario";
        return Promise.reject(new Error(error));
      }
    } catch (error) {
      return Promise.reject(new Error("Error de red al registrar usuario"));
    }
  }
  
  

  function logout() {
    window.localStorage.removeItem(tokenKey);
    setIsAuthenticated(false);
  }

  return <authContext.Provider value={{ isAuthenticated, login, signup, logout }}>{children}</authContext.Provider>
}

export function useAuth() {
  return React.useContext(authContext);
}
