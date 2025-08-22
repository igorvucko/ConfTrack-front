"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header>
      {user ? (
        <div>
          <span>Welcome, {user.name || user.email}</span>

        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </header>
  );
}
