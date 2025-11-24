import React from "react";

import { Button } from "@/components/ui/button";

interface LoginProps {}

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login({}: LoginProps): JSX.Element {
  const [form, setForm] = React.useState<LoginForm>({
    username: "",
    password: "",
    remember: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitted:", form);
    alert(`Login → ${form.username}`);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f2547] to-[#0f3f7a] relative overflow-hidden">
      {/* Background floating shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-[600px] h-[600px] bg-blue-500 blur-[160px] rounded-full absolute -left-40 top-10"></div>
        <div className="w-[500px] h-[500px] bg-indigo-500 blur-[160px] rounded-full absolute right-0 bottom-0"></div>
      </div>

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-md shadow-2xl text-center border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-lg px-4 py-3 focus-within:border-blue-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dceeff" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
              <path d="M3 21c0-3.866 3.582-7 9-7s9 3.134 9 7" strokeLinecap="round" />
            </svg>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none text-white w-full placeholder-white/60"
              required
            />
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-lg px-4 py-3 focus-within:border-blue-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dceeff" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V8a5 5 0 0 1 10 0v3" strokeLinecap="round" />
            </svg>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none text-white w-full placeholder-white/60"
              required
            />
          </div>

          <div className="flex items-center justify-between text-white/80 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                type="checkbox" className="accent-blue-400" /> Remember me
            </label>
            <a href="#" className="hover:underline">Forgot your password?</a>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 duration-200"
          >
            LOGIN
          </button>
        </form>

        <p className="text-white/80 text-sm mt-5">
          New here?
          <a href="#" className="text-white font-semibold ml-1 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
