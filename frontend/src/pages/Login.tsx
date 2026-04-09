import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("isLoggedIn", "true");
      setUser(res.data.user);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-10 lg:p-20">
      {/* Main Container with subtle shadow and border */}
      <div className="w-full max-w-7xl mx-auto flex h-full lg:h-[90vh] bg-white rounded-none lg:rounded-[40px] overflow-hidden lg:shadow-[0_40px_100px_rgba(0,0,0,0.08)] lg:border lg:border-slate-100">
        
        {/* Left Side: Modern Interactive Resume Preview (Image alternative) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50/50 flex-col items-center justify-center p-16 space-y-12 relative overflow-hidden">
          {/* Subtle Background Shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-blue-100 blur-[120px]"></div>

          <div className="space-y-4 text-center relative">
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-[-0.04em] leading-[1.05]">
              ResumeAI<span className="text-blue-600 font-black">.</span>
            </h1>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md">
              The only platform built to get you hired, by optimizing your resume for modern recruiter systems.
            </p>
          </div>

          {/* Floating 'Resume Preview' Card Design */}
          <div className="relative group w-full max-w-md">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 transform rotate-3 group-hover:rotate-0 transition-all duration-700">
              <div className="flex justify-between items-center mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
                  R
                </div>
                <div className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-green-100">
                  ATS Score: 98%
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-1/2 bg-slate-100 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-3 w-[90%] bg-slate-50 rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Decoration Bubble */}
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-50 hidden md:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <p className="text-sm font-bold">PDF Ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Clean Form */}
        <div className="w-full md:w-1/2 bg-white p-12 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-12">
            <div className="text-center md:text-left space-y-3">
              <Link to="/" className="inline-flex items-center gap-2 group mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                  R
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">ResumeAI</span>
              </Link>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-base text-slate-500 font-bold uppercase tracking-widest italic">
                Continue your career growth.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="block w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3 ml-1">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Password</label>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-5 px-5 rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.3)] bg-blue-600 text-white font-black text-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 active:scale-95"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div className="mt-12 pt-10 border-t border-slate-50 text-center">
              <p className="text-base font-bold text-slate-500">
                New to ResumeAI?{" "}
                <Link to="/signup" className="text-blue-600 font-black hover:underline underline-offset-4">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;