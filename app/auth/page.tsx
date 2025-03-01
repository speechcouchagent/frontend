"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const endpoint =
      mode === "login"
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      if (mode === "login") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email); // Store email for nav bar
        alert("Login successful!");
      } else {
        // signup success
        alert("Signup successful!");
        // after signup, we can log user in automatically or ask them to log in
        // let's auto-log in for convenience:
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", email);
      }
      // Go to profile
      router.push("/profile");
    } else {
      alert(data.msg || "Error");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {mode === "login" ? "Login" : "Sign Up"}
      </h1>
      <input
        className="border p-2 w-full my-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full my-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white p-2 w-full mb-4"
        onClick={handleSubmit}
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <div className="text-center">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => setMode("login")}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
