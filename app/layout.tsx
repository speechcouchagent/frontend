"use client"; // <-- Add this line to mark the file as a client component

import "@livekit/components-styles";
import "./globals.css";
import Link from "next/link";
import { Public_Sans } from "next/font/google";
import { useState, useEffect } from "react";

const publicSans400 = Public_Sans({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Attempt to read the user's email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <html lang="en" className={`h-full ${publicSans400.className}`}>
      <body className="h-full">
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/auth">Sign Up / Login</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/agent">Agent</Link>
            </li>
          </ul>
          <div>
            {email ? (
              <div className="flex items-center space-x-4">
                <span>{email}</span>
                <button
                  className="bg-red-500 px-2 py-1 rounded"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <span>Not logged in</span>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
