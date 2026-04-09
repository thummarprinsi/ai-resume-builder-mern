import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import api from "../services/api";
import toast from "react-hot-toast";
import { 
  User, Briefcase, GraduationCap, Code, Layers, FileText, 
  ChevronLeft, Download, Sparkles, X, Plus, Trash2, Save 
} from "lucide-react";

// --- TEMPLATES START ---

const formatDate = (d: string) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "";

const renderDesc = (text: string) => {
  if (!text) return "";
  return text.split('\n').map(line => 
    `<div style="display: flex; gap: 8px; margin-bottom: 3px;">
      <span style="color: #666;">•</span>
      <span>${line.trim()}</span>
    </div>`
  ).join('');
};

// 1. MODERN TEMPLATE (With Conditions)
const modernTemplate = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    @media print { @page { margin: 0; } body { padding: 1cm; } }
    body { font-family: 'Inter', 'Helvetica', sans-serif; margin: 0; padding: 0; color: #334155; line-height: 1.5; -webkit-print-color-adjust: exact; }
    .header { background: #1e293b; color: white; padding: 30px; text-align: center; }
    .header h1 { margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 26px; font-weight: 800; }
    .contact-info { font-size: 11px; margin-top: 12px; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; opacity: 0.9; }
    .container { padding: 30px; }
    .section-title { border-bottom: 2px solid #e2e8f0; color: #0f172a; font-weight: 800; margin-top: 20px; padding-bottom: 5px; text-transform: uppercase; font-size: 14px; letter-spacing: 1px; }
    .item { margin-bottom: 15px; margin-top: 10px; }
    .item-header { display: flex; justify-content: space-between; font-weight: 700; color: #1e293b; font-size: 14px; }
    .item-sub { color: #64748b; font-style: italic; font-size: 13px; margin-bottom: 4px; font-weight: 500; }
    .link { color: #3b82f6; text-decoration: none; font-size: 11px; font-weight: 600; }
    .skill-tag { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 6px; font-size: 11px; display: inline-block; margin: 2px; color: #475569; font-weight: 600; }
    .content { margin: 5px 0; font-size: 12.5px; text-align: justify; color: #334155; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${data.personalInfo.name || 'Your Name'}</h1>
    <div class="contact-info">
      <span>${data.personalInfo.email}</span> | <span>${data.personalInfo.phone}</span> | <span>${data.personalInfo.address}</span>
      ${data.personalInfo.linkedin ? ` | <a href="${data.personalInfo.linkedin}" style="color:white; text-decoration:none;">LinkedIn</a>` : ''}
      ${data.personalInfo.github ? ` | <a href="${data.personalInfo.github}" style="color:white; text-decoration:none;">GitHub</a>` : ''}
      ${data.personalInfo.portfolio ? ` | <a href="${data.personalInfo.portfolio}" style="color:white; text-decoration:none;">Portfolio</a>` : ''}
    </div>
  </div>
  <div class="container">
    ${data.summary ? `<div class="section-title">Summary</div><div class="content" style="margin-top:8px;">${data.summary}</div>` : ''}

    ${data.experience?.length > 0 ? `
      <div class="section-title">Experience</div>
      ${data.experience.map((exp: any) => `
        <div class="item">
          <div class="item-header"><span>${exp.jobTitle || exp.role}</span><span>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span></div>
          <div class="item-sub">${exp.company}</div>
          <div class="content">${renderDesc(exp.description)}</div>
        </div>
      `).join("")}
    ` : ''}

    ${data.projects?.length > 0 ? `
      <div class="section-title">Projects</div>
      ${data.projects.map((p: any) => `
        <div class="item">
          <div class="item-header">
            <span>${p.name}</span>
            ${p.link ? `<a class="link" href="${p.link}">View Project ↗</a>` : ''}
          </div>
          <div class="content">${renderDesc(p.description)}</div>
        </div>
      `).join("")}
    ` : ''}

    ${data.education?.length > 0 ? `
      <div class="section-title">Education</div>
      ${data.education.map((edu: any) => `
        <div class="item">
          <div class="item-header"><span>${edu.degree}</span><span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span></div>
          <div class="item-sub">${edu.school}</div>
        </div>
      `).join("")}
    ` : ''}

    ${data.skills?.length > 0 ? `
      <div class="section-title">Skills</div>
      <div style="margin-top:12px;">
        ${data.skills.map((skill: string) => `<span class="skill-tag">${skill}</span>`).join("")}
      </div>
    ` : ''}
  </div>
</body>
</html>`;
};

// 2. MINIMAL TEMPLATE (With Conditions)
const minimalTemplate = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    @media print { @page { margin: 0; } body { padding: 1.5cm; } }
    body { font-family: 'Charter', 'Georgia', serif; line-height: 1.6; color: #1a1a1a; padding: 40px; }
    .name { font-size: 32px; font-weight: bold; text-align: center; letter-spacing: -0.5px; }
    .contact { text-align: center; font-size: 12px; border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px; color: #555; }
    h3 { text-transform: uppercase; font-size: 13px; letter-spacing: 1.5px; margin-top: 25px; border-bottom: 1px solid #1a1a1a; padding-bottom: 2px; }
    .row { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
    .link { color: #000; text-decoration: underline; font-size: 11px; font-weight: normal; }
    .desc { font-size: 13px; margin: 5px 0; color: #222; }
  </style>
</head>
<body>
  <div class="name">${data.personalInfo.name}</div>
  <div class="contact">
    ${data.personalInfo.email} &bull; ${data.personalInfo.phone} <br>
    ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}" style="color:#555;text-decoration:none;">LinkedIn</a> &bull; ` : ''} 
    ${data.personalInfo.github ? `<a href="${data.personalInfo.github}" style="color:#555;text-decoration:none;">GitHub</a> &bull; ` : ''}
    ${data.personalInfo.portfolio ? `<a href="${data.personalInfo.portfolio}" style="color:#555;text-decoration:none;">Portfolio</a>` : ''}
  </div>

  ${data.summary ? `<h3>Summary</h3><div class="desc">${data.summary}</div>` : ''}

  ${data.experience?.length > 0 ? `
    <h3>Professional Experience</h3>
    ${data.experience.map((exp: any) => `
      <div style="margin-bottom:15px;">
        <div class="row"><span>${exp.jobTitle || exp.role}</span><span>${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span></div>
        <div style="font-style: italic; font-size: 13px; color: #444;">${exp.company}</div>
        <div class="desc">${renderDesc(exp.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.projects?.length > 0 ? `
    <h3>Projects</h3>
    ${data.projects.map((p: any) => `
      <div style="margin-bottom:12px;">
        <div class="row"><span>${p.name}</span> ${p.link ? `<a class="link" href="${p.link}">Project Link</a>` : ''}</div>
        <div class="desc">${renderDesc(p.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.education?.length > 0 ? `
    <h3>Education</h3>
    ${data.education.map((edu: any) => `
      <div style="margin-bottom:10px;">
        <div class="row"><span>${edu.degree}</span><span>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span></div>
        <div style="font-size: 13px;">${edu.school}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.skills?.length > 0 ? `<h3>Skills</h3><p class="desc">${data.skills.join(", ")}</p>` : ''}
</body>
</html>`;
};

// 3. CLASSIC TEMPLATE (With Conditions)
const classicTemplate = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    @media print { @page { margin: 0; } body { padding: 1cm; } }
    body { font-family: 'Times New Roman', serif; padding: 40px; color: black; line-height: 1.3; }
    .header { text-align: center; margin-bottom: 15px; }
    .section-head { background: #f3f4f6; font-weight: bold; padding: 5px 10px; margin-top: 18px; border-top: 1.5px solid #000; font-size: 14px; text-transform: uppercase; }
    .item-box { margin-bottom: 12px; margin-top: 6px; }
    .bold { font-weight: bold; }
    .right { float: right; }
    .clear { clear: both; }
    .desc { font-size: 13px; margin: 4px 0; text-align: justify; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin:0; font-size: 24px;">${data.personalInfo.name}</h2>
    <p style="font-size: 12px; margin-top: 5px;">
      ${data.personalInfo.address} | ${data.personalInfo.phone} | ${data.personalInfo.email} <br>
      ${data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin} ` : ''} 
      ${data.personalInfo.github ? `| GitHub: ${data.personalInfo.github} ` : ''}
      ${data.personalInfo.portfolio ? `| Portfolio: ${data.personalInfo.portfolio}` : ''}
    </p>
  </div>

  ${data.summary ? `<div class="section-head">Professional Summary</div><div class="desc" style="margin-top:8px;">${data.summary}</div>` : ''}

  ${data.experience?.length > 0 ? `
    <div class="section-head">Work Experience</div>
    ${data.experience.map((exp: any) => `
      <div class="item-box">
        <span class="bold">${exp.company}</span> <span class="right">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
        <div class="clear"></div>
        <div class="bold" style="font-style: italic;">${exp.jobTitle || exp.role}</div>
        <div class="desc">${renderDesc(exp.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.projects?.length > 0 ? `
    <div class="section-head">Key Projects</div>
    ${data.projects.map((p: any) => `
      <div class="item-box">
        <span class="bold">${p.name}</span> ${p.link ? `<span class="right" style="font-size:11px;">${p.link}</span>` : ''}
        <div class="clear"></div>
        <div class="desc">${renderDesc(p.description)}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.education?.length > 0 ? `
    <div class="section-head">Education</div>
    ${data.education.map((edu: any) => `
      <div class="item-box">
        <span class="bold">${edu.school}</span> <span class="right">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</span>
        <div class="clear"></div>
        <div style="font-size: 13px;">${edu.degree}</div>
      </div>
    `).join("")}
  ` : ''}

  ${data.skills?.length > 0 ? `<div class="section-head">Technical Skills</div><p class="desc" style="padding: 5px 0;">${data.skills.join(" • ")}</p>` : ''}
</body>
</html>`;
};

// --- TEMPLATES END ---

const EditResume = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
 
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
 const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [resume, setResume] = useState<any>({
    title: "Untitled Resume",
    resumeData: {
      personalInfo: { name: "", email: "", phone: "",address: "",  linkedin: "",github: "", portfolio: "" },
      summary: "",
      skills: [],
      experience: [],
      education: [],
      projects: []
    }
  });

  const steps = [
    { id: 1, label: "Contact", icon: <User size={18} /> },
    { id: 2, label: "Education", icon: <GraduationCap size={18} /> },
    { id: 3, label: "Summary", icon: <FileText size={18} /> },
    { id: 4, label: "Experience", icon: <Briefcase size={18} /> },
    { id: 5, label: "Skills", icon: <Code size={18} /> },
    { id: 6, label: "Projects", icon: <Layers size={18} /> },
  ];

  const handlePrint = () => {
  // આપણી પાસે પહેલેથી જ iframe છે, તેને શોધો
  const iframe = document.querySelector('iframe[title="Resume Preview"]') as HTMLIFrameElement;
  
  if (iframe && iframe.contentWindow) {
    // iframe ની અંદર પ્રિન્ટ કમાન્ડ આપો
    iframe.contentWindow.print();
  } else {
    toast.error("Preview is not ready yet!");
  }
};

  
  // --- PREVIEW LOGIC ---
  const getPreviewHtml = () => {
    const data = resume.resumeData;
    if (selectedTemplate === "minimal") return minimalTemplate(data);
    if (selectedTemplate === "classic") return classicTemplate(data);
    return modernTemplate(data);
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resume/${id}`);
        if (res.data?.resume) {
          const finalData = location.state?.importedData || res.data.resume;
          setResume(finalData);
          if(res.data.resume.atsScore) setAiScore(res.data.resume.atsScore);
        }
      } catch (err) {
        toast.error("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResume();
  }, [id, location.state]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/resume/update/${id}`, resume);
      toast.success("Saved Successfully!");
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleAiAnalyze = async () => {
    setIsAnalyzing(true);
    const loadingToast = toast.loading("AI is scanning...");
    try {
      await api.put(`/resume/update/${id}`, resume);
      const res = await api.post(`/resume/${id}/analyze`);
      if (res.data.success) {
        setAiScore(res.data.analysis.score);
        setAnalysisData(res.data.analysis);
        toast.success("Analysis Complete!", { id: loadingToast });
        setIsAiOpen(true);
      }
    } catch (err) {
      toast.error("AI Analysis failed", { id: loadingToast });
    } finally {
      setIsAnalyzing(false);
    }
  };
   const handleJobMatch = async () => {
    if (!jobDescription) return toast.error("Please paste a Job Description first!");
    const loadingToast = toast.loading("Checking compatibility...");
    try {
      const res = await api.post(`/resume/${id}/job-match`, { jobDescription });
      if (res.data.success) {
        setMatchResult(res.data.result);
        toast.success("Comparison Ready!", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Job Match failed", { id: loadingToast });
    }
  };

  const addField = (type: string, schema: any) => {
    const current = resume?.resumeData?.[type] || [];
    setResume({ ...resume, resumeData: { ...resume.resumeData, [type]: [...current, schema] } });
  };

  const removeField = (type: string, index: number) => {
    const updated = (resume?.resumeData?.[type] || []).filter((_: any, i: number) => i !== index);
    setResume({ ...resume, resumeData: { ...resume.resumeData, [type]: updated } });
  };

  const updateArrayField = (type: string, index: number, field: string, value: string) => {
    const updated = [...(resume?.resumeData?.[type] || [])];
    if (updated[index]) {
      updated[index][field] = value;
      setResume({ ...resume, resumeData: { ...resume.resumeData, [type]: updated } });
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white font-black text-blue-600 text-xl md:text-2xl italic animate-pulse">
      SETTING UP YOUR WORKSPACE...
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans text-slate-900 m-0 p-0">
      
      <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 w-full z-[100] shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
            <ChevronLeft size={20} />
          </button>
          <input 
            value={resume?.title || ""} 
            onChange={(e) => setResume({...resume, title: e.target.value})} 
            className="font-bold text-slate-700 outline-none border-b-2 border-transparent focus:border-blue-500 bg-transparent px-2 w-32 md:w-auto" 
          />
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={saving} className="hidden sm:flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-200 transition">
             <Save size={16}/> {saving ? "Saving..." : "Save"}
          </button>
          <button onClick={() => setIsAiOpen(true)} className="flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-2 rounded-xl font-bold hover:bg-purple-100 border border-purple-100 transition">
            <Sparkles size={16}/> <span className="hidden sm:inline">{aiScore ? `ATS: ${aiScore}%` : 'AI Experts'}</span>
          </button>
          <button onClick={() => handlePrint()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            <Download size={16}/> <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="hidden md:flex w-20 lg:w-64 bg-white border-r border-slate-200 p-4 flex-col space-y-1">
          {steps.map((s) => (
            <button key={s.id} onClick={() => setStep(s.id)} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all ${step === s.id ? "bg-blue-600 text-white shadow-xl shadow-blue-100" : "text-slate-400 hover:bg-slate-50"}`}>
              {s.icon} <span className="font-bold text-sm hidden lg:block">{s.label}</span>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto bg-white p-4 md:p-8 lg:p-12">
          
          <div className="max-w-2xl mx-auto pb-40">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Personal Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-100 outline-none transition" value={resume?.resumeData?.personalInfo?.name || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, name: e.target.value}}})} />
                  </div>
                  <input placeholder="Email" className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200" value={resume?.resumeData?.personalInfo?.email || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, email: e.target.value}}})} />
                  <input placeholder="Phone" className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200" value={resume?.resumeData?.personalInfo?.phone || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, phone: e.target.value}}})} />
                  <input placeholder="Address" className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200" value={resume?.resumeData?.personalInfo?.address || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, address: e.target.value}}})} />
                  <input placeholder="linkedin Link" className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200" value={resume?.resumeData?.personalInfo?.linkedin || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, linkedin: e.target.value}}})} />
                  <input placeholder="Github Link" className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200" value={resume?.resumeData?.personalInfo?.github || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, github: e.target.value}}})} />
                  <input placeholder="portfolio Link" className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-slate-200" value={resume?.resumeData?.personalInfo?.portfolio || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, personalInfo: {...resume.resumeData.personalInfo, portfolio: e.target.value}}})} />
                </div>
              </div>
            )}

            {step === 2 && (
  <div className="space-y-6 animate-in fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-black">Education</h2>
      <button onClick={() => addField('education', {school: "", degree: "", startDate: "", endDate: ""})} className="text-blue-600 font-bold flex items-center gap-1 hover:underline"><Plus size={16}/> Add</button>
    </div>
    {(resume?.resumeData?.education || []).map((edu: any, i: number) => (
      <div key={i} className="p-6 bg-slate-50 rounded-3xl relative border border-slate-100 group">
        <button onClick={() => removeField('education', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition"><Trash2 size={18}/></button>
        <input placeholder="School/University" className="w-full bg-transparent font-bold text-lg outline-none mb-3 border-b-2 border-transparent focus:border-blue-600" value={edu.school || ""} onChange={(e) => updateArrayField('education', i, 'school', e.target.value)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Degree" className="bg-transparent outline-none border-b text-sm p-1" value={edu.degree || ""} onChange={(e) => updateArrayField('education', i, 'degree', e.target.value)} />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase">Start Date</label>
    <input 
      type="date" 
      className="w-full bg-transparent outline-none border-b text-sm p-1 focus:border-blue-600 transition" 
      value={edu.startDate || ""} 
      onChange={(e) => updateArrayField('education', i, 'startDate', e.target.value)} 
    />
  </div>
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase">End Date</label>
    <input 
      type="date" 
      className="w-full bg-transparent outline-none border-b text-sm p-1 focus:border-blue-600 transition" 
      value={edu.endDate || ""} 
      onChange={(e) => updateArrayField('education', i, 'endDate', e.target.value)} 
    />
  </div>
</div>
        </div>
      </div>
    ))}
  </div>
)}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-3xl font-black">Professional Summary</h2>
                <textarea className="w-full p-6 bg-slate-50 rounded-3xl h-64 border-2 border-transparent focus:border-blue-100 outline-none transition resize-none" placeholder="Write about your expertise..." value={resume?.resumeData?.summary || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, summary: e.target.value}})} />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex justify-between items-center"><h2 className="text-3xl font-black">Experience</h2><button onClick={() => addField('experience', {company: "", role: "", description: ""})} className="text-blue-600 font-bold flex items-center gap-1 hover:underline"><Plus size={16}/> Add</button></div>
                {(resume?.resumeData?.experience || []).map((exp: any, i: number) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl relative border border-slate-100 group">
                    <button onClick={() => removeField('experience', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition"><Trash2 size={18}/></button>
                    <input placeholder="Company Name" className="w-full bg-transparent font-bold text-lg outline-none mb-1" value={exp.company} onChange={(e) => updateArrayField('experience', i, 'company', e.target.value)} />
                    <div className="grid grid-cols-2 gap-4 mb-4">
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Joined</label>
    <input 
      type="date" 
      className="bg-transparent outline-none border-b text-sm p-2 focus:border-blue-600" 
      value={exp.startDate || ""} 
      onChange={(e) => updateArrayField('experience', i, 'startDate', e.target.value)} 
    />
  </div>
  <div className="flex flex-col">
    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Left / Present</label>
    <input 
      type="date" 
      className="bg-transparent outline-none border-b text-sm p-2 focus:border-blue-600" 
      value={exp.endDate || ""} 
      onChange={(e) => updateArrayField('experience', i, 'endDate', e.target.value)} 
    />
  </div>
</div>
                 <textarea placeholder="Key responsibilities..." className="w-full bg-transparent text-sm text-slate-600 outline-none resize-none" rows={4} value={exp.description} onChange={(e) => updateArrayField('experience', i, 'description', e.target.value)} />
                  </div>
                ))}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <h2 className="text-3xl font-black">Skills</h2>
                <textarea className="w-full p-6 bg-slate-50 rounded-3xl h-48 border-2 border-transparent focus:border-blue-100 outline-none font-medium resize-none" placeholder="React, Node.js..." value={resume?.resumeData?.skills?.join(", ") || ""} onChange={(e) => setResume({...resume, resumeData: {...resume.resumeData, skills: e.target.value.split(",").map(s => s.trim())}})} />
              </div>
            )}

            {step === 6 && (
  <div className="space-y-6 animate-in fade-in">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-black">Projects</h2>
      <button 
        onClick={() => addField('projects', {name: "", description: "", link: ""})} 
        className="text-blue-600 font-bold flex items-center gap-1 hover:underline"
      >
        <Plus size={16}/> Add
      </button>
    </div>
    {(resume?.resumeData?.projects || []).map((proj: any, i: number) => (
      <div key={i} className="p-6 bg-slate-50 rounded-3xl relative border border-slate-100 group">
        <button onClick={() => removeField('projects', i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition">
          <Trash2 size={18}/>
        </button>
        
        <input 
          placeholder="Project Name" 
          className="w-full bg-transparent font-bold text-lg outline-none mb-2 border-b border-transparent focus:border-blue-500" 
          value={proj.name || ""} 
          onChange={(e) => updateArrayField('projects', i, 'name', e.target.value)} 
        />
        
        {/* લિંક માટેનું નવું ઇનપુટ */}
        <input 
          placeholder="Project Link (GitHub/Live)" 
          className="w-full bg-transparent text-sm text-blue-500 underline outline-none mb-3" 
          value={proj.link || ""} 
          onChange={(e) => updateArrayField('projects', i, 'link', e.target.value)} 
        />

        <textarea 
          placeholder="Describe tech used and features..." 
          className="w-full bg-transparent text-sm text-slate-600 outline-none resize-none" 
          rows={3} 
          value={proj.description || ""} 
          onChange={(e) => updateArrayField('projects', i, 'description', e.target.value)} 
        />
      </div>
    ))}
  </div>
)}

            <div className="max-w-2xl mx-auto mt-10 mb-20 flex gap-3">
                {step > 1 && <button onClick={() => setStep(step - 1)} className="px-6 py-4 font-bold text-slate-400">Back</button>}
                <button onClick={() => step < 6 ? setStep(step + 1) : handleSave()} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition shadow-xl">
                  {step === 6 ? (saving ? "Saving..." : "Finish & Save 🚀") : "Continue →"}
                </button>
            </div>
          </div>
        </main>

        {/* --- IMPROVED PREVIEW PANEL --- */}
        <section className="hidden xl:flex flex-col w-[550px] 2xl:w-[650px] bg-slate-100 border-l border-slate-200">
          <div className="p-4 bg-white border-b flex gap-2 justify-center sticky top-0 z-10">
            {['modern', 'classic', 'minimal'].map((temp) => (
              <button 
                key={temp}
                onClick={() => setSelectedTemplate(temp)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${selectedTemplate === temp ? "bg-blue-600 text-white shadow-md" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
              >
                {temp}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex justify-center bg-slate-200/30">
             <div className="w-full max-w-[210mm] bg-white shadow-2xl overflow-hidden rounded-md sticky top-0 h-[297mm]">
                <iframe 
                  title="Resume Preview"
                  className="w-full h-full border-none"
                  srcDoc={getPreviewHtml()}
                />
             </div>
          </div>
        </section>
        
        
        
{/* --- UPDATED AI PANEL WITH RE-SCAN --- */}
<aside className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[150] transform transition-transform duration-500 border-l flex flex-col ${isAiOpen ? "translate-x-0" : "translate-x-full"}`}>
    <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
        <h3 className="font-black text-xl flex items-center gap-3">AI Resume Expert <Sparkles className="text-purple-600" size={18}/></h3>
        <button onClick={() => setIsAiOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400"><X size={24}/></button>
    </div>

    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        
        {/* SECTION 1: ATS SCORE & FEEDBACK */}
        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-3xl border border-purple-100 shadow-sm">
            <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-3 text-center">ATS Optimization</h4>
            {aiScore ? (
                <div className="text-center space-y-4">
                    <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-purple-600 border-t-transparent animate-spin-slow">
                         <span className="text-3xl font-black text-purple-600 animate-none">{aiScore}%</span>
                    </div>
                    
                    <div className="text-left space-y-3 mt-4">
                        <p className="text-sm font-bold text-slate-700 flex justify-between items-center">
                            <span>💡 AI Feedback:</span>
                            {/* RE-SCAN BUTTON WHEN SCORE EXISTS */}
                            <button 
                                onClick={handleAiAnalyze} 
                                disabled={isAnalyzing}
                                className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-md hover:bg-purple-200 transition disabled:opacity-50"
                            >
                                {isAnalyzing ? "Scanning..." : "Re-scan ↻"}
                            </button>
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed bg-white/50 p-3 rounded-xl border border-purple-50 italic">
                            "{analysisData?.summaryFeedback || "Your resume is looking good! Try adding more quantitative achievements."}"
                        </p>
                    </div>
                </div>
            ) : (
                <button 
                    onClick={handleAiAnalyze} 
                    disabled={isAnalyzing}
                    className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all disabled:opacity-50"
                >
                    {isAnalyzing ? "Scanning Resume..." : "Analyze ATS Score"}
                </button>
            )}
        </div>

        {/* SECTION 2: JOB DESCRIPTION MATCH */}
        <div className="space-y-4">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-1">Job Match Checker</h4>
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <textarea 
                    className="w-full bg-transparent text-sm outline-none resize-none min-h-[120px]" 
                    placeholder="Paste the Job Description here to check if you're a good fit..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />
                <button 
                    onClick={handleJobMatch}
                    disabled={isAnalyzing || !jobDescription}
                    className="w-full mt-3 bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Check Compatibility
                </button>
            </div>

            {/* MATCH RESULT DISPLAY */}
            {matchResult && (
                <div className="animate-in fade-in slide-in-from-top-2">
                    <div className={`p-5 rounded-3xl border ${matchResult.matchPercentage > 70 ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold uppercase tracking-tight text-slate-500">Match Rate</span>
                            <span className={`text-xl font-black ${matchResult.matchPercentage > 70 ? 'text-green-600' : 'text-orange-600'}`}>
                                {matchResult.matchPercentage}%
                            </span>
                        </div>
                        
                        {/* Missing Skills */}
                        {matchResult.missingSkills?.length > 0 && (
                            <div className="mt-3">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Missing Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                    {matchResult.missingSkills.map((skill: string, i: number) => (
                                        <span key={i} className="px-2 py-1 bg-white rounded-md text-[10px] font-medium text-red-500 border border-red-50">
                                            + {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* RE-CHECK JOB MATCH BUTTON */}
                        <button 
                            onClick={handleJobMatch}
                            className="w-full mt-4 text-[10px] font-bold text-slate-400 hover:text-blue-600 transition uppercase tracking-widest"
                        >
                            ↻ Re-check Match
                        </button>
                    </div>
                </div>
            )}
        </div>

    </div>

    {/* FOOTER TIP */}
    <div className="p-6 border-t bg-slate-50/30">
        <p className="text-[10px] text-slate-400 text-center font-medium">
            AI analysis is based on 2026 industry standards for MERN & Frontend roles.
        </p>
    </div>
</aside>
              </div>
    </div>
  );
};

export default EditResume;