import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, loading } = useAuth();

  return (
    <div className="bg-[#FCFCFD] min-h-screen">
      {/* --- 1. HERO SECTION (RE-DESIGNED) --- */}
      <section className="relative pt-24 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Glassy Blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-indigo-50/50 blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Content: Typography & CTA */}
            <div className="space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm transition-all hover:border-blue-200">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Next-Gen AI Resume Analysis
                </span>
              </div>

              <h1 className="text-6xl lg:text-[80px] font-black text-slate-900 tracking-[-0.04em] leading-[1.05]">
                Elevate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Career Path.
                </span>
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium italic">
                "The secret to getting hired is a resume that speaks the language of machines (ATS) and the hearts of humans."
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
                {loading ? (
                  <div className="px-10 py-5 bg-slate-100 rounded-2xl animate-pulse w-48"></div>
                ) : user ? (
                  <Link 
                    to="/dashboard" 
                    className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-slate-200 hover:bg-blue-600 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    Go to Dashboard →
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/signup" 
                      className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1.5 transition-all duration-300"
                    >
                      Start Building Free
                    </Link>
                    <Link 
                      to="/login" 
                      className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              {/* Stats / Trust */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-black text-slate-900">10k+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Users Served</p>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <p className="text-2xl font-black text-slate-900">98%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ATS Success</p>
                </div>
              </div>
            </div>

            {/* Right Side: High-End Preview */}
            <div className="relative">
              <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-10 transform lg:rotate-2 hover:rotate-0 transition-all duration-700 group">
                <div className="flex justify-between items-center mb-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200">
                    R
                  </div>
                  <div className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                    ATS Score: 98%
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-4 w-2/3 bg-slate-100 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
                  <div className="space-y-3">
                    <div className="h-2.5 w-full bg-slate-50 rounded-full"></div>
                    <div className="h-2.5 w-[90%] bg-slate-50 rounded-full"></div>
                    <div className="h-2.5 w-[60%] bg-slate-50 rounded-full"></div>
                  </div>
                  
                  {/* Visual Charts */}
                  <div className="pt-8 grid grid-cols-2 gap-6">
                    <div className="h-20 bg-blue-50/50 rounded-3xl border border-blue-100 p-4 relative overflow-hidden">
                       <div className="absolute top-0 left-0 h-full w-[80%] bg-blue-100/50 transition-all"></div>
                       <p className="relative text-[10px] font-black text-blue-600 uppercase">Analysis</p>
                       <p className="relative text-xl font-black text-blue-800">Strong</p>
                    </div>
                    <div className="h-20 bg-slate-50 rounded-3xl border border-slate-100 p-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Keywords</p>
                       <p className="text-xl font-black text-slate-700">Perfect</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Element */}
              <div className="absolute -bottom-6 -left-10 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl hidden md:block">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-center">Export Ready</p>
                 <p className="text-sm font-bold">PDF, Word, TXT</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 2. INSTRUCTIONS / FEATURES SECTION  --- */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Simple steps to your <span className="text-blue-600 italic font-black">dream job.</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg leading-relaxed">
              Our AI-driven process ensures your resume stands out from the crowd and passes the machine filters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="bg-slate-50 p-10 rounded-[45px] border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-[20px] flex items-center justify-center font-black text-2xl mb-8 shadow-xl shadow-blue-100 group-hover:rotate-6 transition-transform">
                1
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Precision Builder</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-bold">
                No more messy Word documents. Our structured editor ensures every pixel is professional and every margin is perfect.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-10 rounded-[45px] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-[20px] flex items-center justify-center font-black text-2xl mb-8 shadow-xl shadow-indigo-100 group-hover:rotate-6 transition-transform">
                2
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">AI Content Audit</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-bold">
                Gemini AI analyzes your bullet points for impact. We help you fix passive voice and suggest powerful action verbs.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-10 rounded-[45px] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[20px] flex items-center justify-center font-black text-2xl mb-8 shadow-xl shadow-slate-100 group-hover:rotate-6 transition-transform">
                3
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">JD Matching</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-bold">
                Paste any job description, and we'll show you exactly how to tailor your resume to rank higher in that specific ATS.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-24 text-center">
            <div className="inline-block p-2 bg-slate-100 rounded-[35px]">
              <div className="px-10 py-5 bg-white rounded-[30px] border border-slate-200 shadow-sm">
                <p className="text-sm font-black text-slate-700 uppercase tracking-widest">
                  Ready to start? 
                  <Link to={user ? "/dashboard" : "/signup"} className="text-blue-600 hover:underline ml-3 transition-all">
                    Create Your Resume Now →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;