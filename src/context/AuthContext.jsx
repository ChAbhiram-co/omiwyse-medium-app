import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


const DEFAULT_USER = { email: "admin@example.com", password: "admin123" };

export const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "false"
  );

  // useEffect(() => {
    
  //   localStorage.setItem("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn]);

  const login = (email, password) => {
    if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
      setIsLoggedIn(true);
      localStorage.setItem("authToken", btoa(email)); 
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password!" };
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
