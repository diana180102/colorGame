
import { useState, createContext, useEffect } from "react";
import { baseUrl, tokenKey } from "../constants";
import { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const authContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useLocalStorage(tokenKey, null);

  useEffect(() => {
      if (token) {
      setIsAuthenticated(true);
    }
  }, [token,setToken]);

  async function login(data) {
      
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

     response("/login", options);
  }

  async function signup(data) {
    console.log(data);
    
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    response("/signup", options); 
    
  }

  async function response(path, options) {
     
     const response = await fetch(baseUrl + path, options);

      if (response.ok) {
      const { token } = await response.json();
      
      
      setToken(token);
      setIsAuthenticated(true);
      return;
    } else {
      const body = await response.json();
      const error =
        body.errors instanceof Array ? body.errors.join(", ") : body.errors;
      return Promise.reject(new Error(error));
    }
  }



  async function logout() {
     localStorage.clear();
     setIsAuthenticated(false);
  }

  return <authContext.Provider value={{isAuthenticated, setIsAuthenticated, login, logout, signup}}>{children}</authContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(authContext);
}
