// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("userEmail"); 
    // We'll store user email in localStorage after login or signup
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
      {userEmail ? (
        <div className="flex items-center space-x-4">
          <span>{userEmail}</span>
          <button className="bg-red-500 px-2 py-1 rounded" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : null}
    </nav>
  );
}
