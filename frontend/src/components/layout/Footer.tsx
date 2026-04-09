import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                R
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">ResumeAI</span>
            </Link>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
              Build high-quality, ATS-friendly resumes in minutes with our AI-powered builder. 
              Get hired by top companies worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/" className="hover:text-blue-600 transition">Templates</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">AI Analysis</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Job Matching</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-xs uppercase tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/" className="hover:text-blue-600 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {currentYear} ResumeAI Builder. Built for professionals.
          </p>
          
          {/* Text-based Social Links  */}
          <div className="flex gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
            <a href="#" className="hover:text-blue-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-700 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;