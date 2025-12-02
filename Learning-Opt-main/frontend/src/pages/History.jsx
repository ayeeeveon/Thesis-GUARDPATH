import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import "../index.css";

export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordActive, setForgotPasswordActive] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center p-5">
  <div
    className="absolute inset-0 bg-cover bg-top bg-no-repeat"
    style={{
      backgroundImage: "url('/CvSU.jpg')",
      opacity: 0.6,  
      zIndex: 0      
    }}
  ></div>

  <div className="relative z-10 w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
    
    <p className="absolute top-5 right-5 text-green-700 font-semibold">
      TEST LANG
    </p>

    <img
      src="/log.png"
      alt="Logo"
      className="w-24 h-24 object-contain mb-3"
    />

    {/* Login Title */}
    <h1 className="text-3xl font-bold text-green-700 mb-8">
      Login
    </h1>

    {/* Form */}
    {forgotPasswordActive ? (
      <ForgotPasswordForm
        onBackToLogin={() => setForgotPasswordActive(false)}
      />
    ) : (
      <LoginForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onForgotPassword={() => setForgotPasswordActive(true)}
      />
    )}

  </div>
</div>

  );
}
