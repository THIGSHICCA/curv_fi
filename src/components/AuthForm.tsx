"use client";
import { useRouter } from "next/navigation"; // ✅ import router

import { useState } from "react";

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // ✅ New state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coins, setCoins] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter(); // ✅

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // ✅ Extra check for register
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isLogin ? "login" : "register",
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setToken(data.token);
        localStorage.setItem("token", data.token); // ✅ Store token
        setCoins(data.coins);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-3xl max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400">{error}</p>}

        <div>
          <label className="block mb-1 font-medium text-viridian-900">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-viridian-500 bg-white/10 placeholder-viridian-500 text-viridian-900 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-viridian-900">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-viridian-500 bg-white/10 placeholder-viridian-500 text-viridian-900 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* ✅ Confirm Password (only in Register) */}
        {!isLogin && (
          <div>
            <label className="block mb-1 font-medium text-viridian-900">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-viridian-500 bg-white/10 placeholder-viridian-500 text-viridian-900 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Re-enter your password"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-600/80 hover:bg-emerald-600 text-viridian-900 py-2 rounded-xl font-semibold transition-colors disabled:opacity-50"
          disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </button>
      </form>

      {token && coins !== null && (
        <div className="mt-4 p-3 bg-green-100/30 rounded-xl text-green-900 backdrop-blur-sm text-center">
          <p>✅ Authenticated successfully!</p>
          <p>Coins available: {coins}</p>
        </div>
      )}
    </div>
  );
}
