import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function ProLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    navigate("/select")
   // e.preventDefault();
   // alert(`Logging in with username: ${username}`);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a17] px-4">
      {/* Blue glowing circles */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-blue-600 opacity-70 filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-600 opacity-70 filter blur-3xl animate-pulse animation-delay-1000"></div>

      {/* Logo placeholder */}
      <img
        src="https://laboratoirespharmacare.tn/wp-content/uploads/2024/11/cropped-cropped-cropped-LOGO-ph-1.png"
        alt="Laboratoires Pharmacare Logo"
        className="relative z-10 mb-4 h-40 w-auto select-none"
      />

      {/* Title */}
     {/*  <h1 className="relative z-10 mb-8 text-3xl font-extrabold tracking-wide text-white select-none">
        laboratoires pharmacare
      </h1> */}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-gray-900 bg-opacity-80 backdrop-blur-md p-10 shadow-xl">
        <h2 className="mb-8 text-3xl font-semibold text-white text-center">
          Login Here
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Email or Phone"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-white py-3 font-semibold text-gray-900 hover:bg-gray-200 transition"
          >
            Log In
          </button>
        </form>

       
      </div>
    </div>
  );
}
