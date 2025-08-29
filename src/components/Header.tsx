"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setIsDropdownOpen(false);
    router.refresh();
  };


  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header className="bg-gray-900 text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-400">
              ConfTrack
            </Link>
          </div>


          <nav className="hidden md:flex space-x-8">
            <Link href="/conferences" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Conferences
            </Link>
            <Link href="/schedule" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Schedule
            </Link>
            <Link href="/speakers" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Speakers
            </Link>
            <Link href="/locations" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Locations
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              About
            </Link>


            {status === "authenticated" && (
              <Link href="/reviews" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Write Review
              </Link>
            )}
          </nav>


          <div className="flex items-center gap-2">
            {status === "loading" ? (
              <div className="flex space-x-2">
                <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : status === "authenticated" && session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                  </div>
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium text-white truncate">{session.user.name || session.user.email}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium border border-gray-600 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className="md:hidden bg-gray-800 border-t border-gray-700">
        <div className="grid grid-cols-5 gap-1 py-2 px-2">
          <Link href="/conferences" className="flex flex-col items-center text-xs text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Conferences
          </Link>
          <Link href="/schedule" className="flex flex-col items-center text-xs text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Schedule
          </Link>
          <Link href="/speakers" className="flex flex-col items-center text-xs text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Speakers
          </Link>
          <Link href="/locations" className="flex flex-col items-center text-xs text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Locations
          </Link>
          <Link href="/about" className="flex flex-col items-center text-xs text-gray-300 hover:text-white p-2 rounded-md hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About
          </Link>
        </div>
      </div>
    </header>
  );
}