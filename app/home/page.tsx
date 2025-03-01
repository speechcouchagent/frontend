"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to AI Agent Coaching</h1>
      <p className="mb-6">
        Empower your interviews and conversations with our AI-driven voice agent!
      </p>
      <div className="space-x-4">
        <Link
          href="/auth"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign Up or Login
        </Link>
      </div>
    </div>
  );
}
