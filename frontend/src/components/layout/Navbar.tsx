import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 
import { Menu, X, Sparkles, LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-xl group-hover:rotate-12 transition-transform">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">
              RESUME<span className="text-blue-600 text-2xl">.</span>AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition">Home</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition flex items-center gap-2">
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex items-center gap-3 bg-slate-50 p-1 pr-3 rounded-full border border-slate-100">
                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                     {user.name?.charAt(0) || "U"}
                   </div>
                   <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition">
                     <LogOut size={18} />
                   </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-blue-600">Sign In</Link>
                <Link to="/signup" className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition shadow-lg shadow-blue-100">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 animate-in slide-in-from-top-5">
          <Link to="/" className="block font-bold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block font-bold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="w-full text-left font-bold text-red-500 px-4 py-2 hover:bg-red-50 rounded-xl">Logout</button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link to="/login" className="text-center font-bold text-slate-600 p-3 bg-slate-50 rounded-xl" onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link to="/signup" className="text-center font-bold text-white p-3 bg-blue-600 rounded-xl" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;