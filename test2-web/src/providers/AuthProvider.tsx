"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  allowedAccess: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkPromoCode: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        // User is not authenticated, that's okay
        console.log("User not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post("/api/auth/login", { email, password });
      
      if (response.data.user) {
        setUser(response.data.user);
        router.push("/courses");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to login");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      
      if (response.data.user) {
        setUser(response.data.user);
        router.push("/courses");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to register");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const checkPromoCode = async (code: string): Promise<boolean> => {
    try {
      const response = await axios.post("/api/promocodes/verify", { code });
      return response.data.valid;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        checkPromoCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 