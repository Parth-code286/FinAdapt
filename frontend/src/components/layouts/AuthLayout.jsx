import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0e0e10] text-white font-[Poppins,sans-serif] flex flex-row relative overflow-hidden">

      {/* Left Side - Branding and Decorations */}
      <div className="w-1/2 p-12 relative flex flex-col justify-center bg-[#13131a] bg-opacity-95 backdrop-blur-md overflow-hidden">

        {/* 🎨 Abstract Glowing Shapes */}
        <div className="absolute top-[-30px] left-[-40px] w-80 h-80 bg-gradient-to-br from-[#8b5cf6] to-[#9333ea] opacity-50 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-28 left-44 w-24 h-24 bg-gradient-to-tr from-[#06b6d4] to-[#3b82f6] opacity-60 rotate-45 rounded-xl blur-lg animate-blob" />
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-tl from-[#9333ea] to-[#e879f9] opacity-50 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-16 right-20 w-24 h-24 border-[3px] border-cyan-300 rounded-full opacity-40 animate-spin-slow blur-sm" />
        <div className="absolute top-[60%] left-[60%] w-52 h-52 bg-gradient-to-tr from-[#facc15] via-[#f472b6] to-[#6366f1] rounded-3xl blur-[90px] opacity-40 animate-float" />

        {/* 🌟 Central Branding Logo */}
        <div className="relative z-10 flex flex-col items-start gap-10">
          <h1 className="text-6xl font-extrabold text-[#c084fc] drop-shadow-xl z-10">
            Expense Tracker
          </h1>
          <div className="w-44 h-44 bg-gradient-to-br from-[#1f1f2e] to-[#151524] rounded-3xl shadow-[0_0_40px_#8b5cf6aa] flex items-center justify-center border border-[#2e2e42]">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/602/595/non_2x/expense-tracker-app-gradient-icon-for-dark-theme-vector.jpg"
              alt="App Icon"
              className="w-24 h-24 object-contain rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="relative w-[6px] mx-3">
        <div className="absolute inset-0 bg-gradient-to-b from-[#9333ea] via-[#8b5cf6] to-[#22d3ee] rounded-full shadow-2xl blur-md animate-glow-pulse" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-purple-500 to-cyan-400 opacity-20 blur-xl rounded-full animate-pulse" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 flex justify-center items-center p-10 bg-[#111116] z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
