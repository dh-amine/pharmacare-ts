import { LoginForm } from "@/components/login-form";
import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center
      bg-[#106EEA] p-6">
      
      <div className="w-full max-w-sm">
        <LoginForm className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6" />
      </div>
    </div>
  );
};

export default LoginPage;
