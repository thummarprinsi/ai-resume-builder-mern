import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume");
      setResumes(res.data.resumes);
    } catch (err) {
      toast.error("Failed to fetch resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateNew = async () => {
    try {
      const res = await api.post("/resume/create");
      toast.success("New resume initialized!");
      navigate(`/resumes/${res.data.resume._id}`);
    } catch (err) {
      toast.error("Could not create resume");
    }
  };

  const handleUploadAndAnalyze = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("File is too large (Max 5MB)");
    }

    setIsProcessing(true);
    const toastId = toast.loading("AI is starting to process...");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // 1. Extract & 2. AI Auto-fill (Combined logic for cleaner UX)
      toast.loading("Gemini AI is analyzing your PDF...", { id: toastId });
      const extractRes = await api.post("/resume/extract-text", formData);
      const rawText = extractRes.data.text;

      if (!rawText) throw new Error("Could not read text from PDF");

      const autoFillRes = await api.post("/resume/auto-fill", { text: rawText });
      const aiData = autoFillRes.data.data;

      // 3. Create & 4. Update
      const createRes = await api.post("/resume/create");
      const newResumeId = createRes.data.resume._id;

      await api.put(`/resume/update/${newResumeId}`, {
        resumeData: aiData,
        title: file.name.replace(".pdf", ""),
        rawtext: rawText 
      });

      toast.success("AI Import Successful! 🚀", { id: toastId });
      setTimeout(() => navigate(`/resumes/${newResumeId}`), 1000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "AI Analysis failed", { id: toastId });
    } finally {
      setIsProcessing(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this resume permanently?")) return;
    try {
      await api.delete(`/resume/delete/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
      toast.success("Resume removed");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-widest italic opacity-70">
              Your Professional AI Command Center
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <label className={`group relative flex items-center gap-2 bg-white border-2 border-slate-200 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all cursor-pointer active:scale-95 ${isProcessing ? 'opacity-50 pointer-events-none' : 'shadow-sm hover:shadow-xl shadow-slate-200'}`}>
              {isProcessing ? "Analyzing..." : "✨ AI Import"}
              <input type="file" className="hidden" accept=".pdf" onChange={handleUploadAndAnalyze} disabled={isProcessing} />
            </label>

            <button
              onClick={handleCreateNew}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              + Create New
            </button>
          </div>
        </div>

        {/* --- CONTENT --- */}
        {resumes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <div key={resume._id} className="group bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-500 flex flex-col relative overflow-hidden">
                {/* Score Badge */}
                <div className="absolute top-0 right-0 p-6">
                   <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                     (resume.atsScore || 0) > 75 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                   }`}>
                     ATS: {resume.atsScore || 0}%
                   </div>
                </div>

                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  📄
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-2 truncate group-hover:text-blue-600 transition-colors">
                  {resume.title || "Untitled Project"}
                </h3>
                
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                  Edited {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3 mt-auto">
                  <Link
                    to={`/resumes/${resume._id}`}
                    className="flex-[2] p-3 text-center bg-slate-900 text-white py-4 rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all"
                  >
                    Edit Workspace
                  </Link>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="flex-1 flex justify-center items-center bg-slate-50 text-slate-400 py-4 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all border border-slate-100"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="bg-white rounded-[40px] border border-slate-100 p-5 text-center shadow-sm">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl animate-bounce">
              🚀
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Your career starts here.</h2>
            <p className="text-slate-400 mb-10 max-w-sm mx-auto font-bold text-sm leading-relaxed">
              Upload your existing PDF to let Gemini AI optimize it, or start fresh with our premium templates.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button onClick={handleCreateNew} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                  Build from scratch
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;