"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import BackgroundEffects from "@/components/BackgroundEffect";


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);



  return (
    <div>
      
    <BackgroundEffects />
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden ">

      {/* Background gradient with blur */}
      <div className="absolute inset-0 -z-10  animate-iris opacity-80"></div>

      

      {/* Auth Card */}
      <div className="relative z-10 p-8 w-full max-w-md rounded-3xl shadow-xl 
        bg-white/10 backdrop-blur-lg border border-white/30">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-400">
          {isLogin ? "Login" : "Register"}
        </h1>

        <AuthForm isLogin={isLogin} />

        <div className="mt-4 text-center text-emerald-400 ">
          {isLogin ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                className="underline font-semibold hover:text-emerald-400 transition-colors"
                onClick={() => setIsLogin(false)}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                className="underline font-semibold hover:text-emerald-400 transition-colors"
                onClick={() => setIsLogin(true)}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
