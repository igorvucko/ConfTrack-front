"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AuthContextType {
  status: "loading" | "authenticated" | "unauthenticated";
  user: any;
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user as any);
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