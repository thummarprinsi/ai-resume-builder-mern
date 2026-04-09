// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode, } from "react";
import api from "../services/api";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  loading: boolean; 
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); 

useEffect(() => {
  const checkAuth = async () => {
    
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn ) {
      setLoading(false);
      setUser(null);
      return; 
    }

    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      
      localStorage.removeItem("isLoggedIn");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);


const logout = async () => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("isLoggedIn"); 
    setUser(null);
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;