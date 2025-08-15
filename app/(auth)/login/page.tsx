"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate real auth
    console.log("Logging in with:", { email, password });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm p-6 border border-black rounded-lg shadow-sm">
        {/* Logo / Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-wide">Admin Login</h1>
          <p className="text-sm text-gray-600">Sign in to manage your store</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1 block w-full border border-black rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full border border-black rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            <LogIn size={16} />
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="underline font-medium hover:text-gray-700"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
