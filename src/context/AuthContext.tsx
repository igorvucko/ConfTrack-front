"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AuthContextType {
  status: "loading" | "authenticated" | "unauthenticated";
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
}

const AuthContext = createContext<AuthContextType>({
  status: "loading",
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || undefined,
      });
    } else {
      setUser(null);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ status, user }}>
      {children}
    </AuthContext.Provider>
  );
}