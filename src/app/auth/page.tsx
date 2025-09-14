"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-viridian-200  to-viridian-400">
      {/* Floating balls */}
      {/* <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500 rounded-full opacity-20 animate-bounce-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full opacity-15 animate-bounce-slower"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-emerald-600 rounded-full opacity-25 animate-bounce-fast"></div> */}

      {/* Auth Card */}
      <div
        className="relative z-10 p-8 w-full max-w-md rounded-3xl shadow-xl 
  bg-white/20 backdrop-blur-lg border border-white/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-900">
          {isLogin ? "Login" : "Register"}
        </h1>

        <AuthForm isLogin={isLogin} />

        <div className="mt-4 text-center text-emerald-900">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                className="underline font-semibold hover:text-emerald-700 transition-colors"
                onClick={() => setIsLogin(false)}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="underline font-semibold hover:text-emerald-700 transition-colors"
                onClick={() => setIsLogin(true)}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
