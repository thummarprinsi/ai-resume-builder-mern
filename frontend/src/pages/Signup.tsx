import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/signup", formData);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-10 lg:p-20">
      <div className="w-full max-w-7xl mx-auto flex h-full lg:h-screen bg-white rounded-none lg:rounded-[40px] overflow-hidden lg:shadow-[0_40px_100px_rgba(0,0,0,0.08)] lg:border lg:border-slate-100 flex-row-reverse">
        
        {/* Right Side: Branding & Features (Blue Section) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-50/50 flex-col items-center justify-center p-16 space-y-12 relative overflow-hidden text-slate-900">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-[80%] h-[80%] rounded-full bg-blue-500 blur-[120px] opacity-50"></div>

          <div className="space-y-6 text-center relative z-10">
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Ready to get <br /> hired?
            </h1>
            <p className="text-lg text-slate-900 font-medium leading-relaxed max-w-md mx-auto">
              Join thousands of developers using AI to build resumes that recruiters actually read.
            </p>
          </div>

          {/* Feature List (Pure CSS) */}
          <div className="grid grid-cols-1 gap-6 w-full max-w-sm relative z-10">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black">1</div>
              <p className="font-bold text-sm">AI-Powered Content Generation</p>
            </div>
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black">2</div>
              <p className="font-bold text-sm">Real-time ATS Scoring</p>
            </div>
          </div>
        </div>

        {/* Left Side: Signup Form Section */}
        <div className="w-full md:w-1/2 bg-white p-12 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-10">
            <div className="text-center md:text-left space-y-3">
              <Link to="/" className="inline-flex items-center gap-2 group mb-2">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
                  R
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tight">ResumeAI</span>
              </Link>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Create Profile</h2>
              <p className="text-base text-slate-500 font-bold uppercase tracking-widest italic">
                Start your professional journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="block w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="block w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="block w-full px-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-5 px-5 rounded-2xl shadow-[0_20px_50px_rgba(59,130,246,0.3)] bg-blue-600 text-white font-black text-lg hover:bg-blue-700 transition-all duration-300 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Get Started Now →"}
              </button>
            </form>

            <div className="mt-12 pt-10 border-t border-slate-50 text-center">
              <p className="text-base font-bold text-slate-500">
                Already a member?{" "}
                <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;