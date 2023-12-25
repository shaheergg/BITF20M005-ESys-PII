import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const localData = localStorage.getItem("token");
    return localData ? true : false;
  });
  const [token, setToken] = useState(() => {
    const localData = localStorage.getItem("token");
    return localData ? localData : null;
  });
  const value = {
    auth,
    setAuth,
    token,
    setToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
