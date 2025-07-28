"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authApi } from "../api/authApi";

type User = { id: number; email: string; name?: string };

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    Cookies.set("token", data.token);
    Cookies.set("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (email: string, password: string, name?: string) => {
    const data = await authApi.register(email, password, name);
    Cookies.set("token", data.token);
    Cookies.set("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};