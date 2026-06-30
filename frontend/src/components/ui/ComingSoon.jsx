import { Hammer, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ 
  title = "Module Coming Soon", 
  description = "This feature is currently under active development as part of the next major release.", 
  icon: Icon = Hammer 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 w-full h-full min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 relative">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Icon */}
      <div className="relative mb-8 group">
        <div className="absolute inset-0 bg-[#7C3AED] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#13131A] to-[#09090B] border border-white/10 flex items-center justify-center relative shadow-2xl group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          <Icon className="w-12 h-12 text-[#7C3AED] group-hover:text-white transition-colors duration-500" />
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-4 tracking-tight text-center">
        {title}
      </h1>
      
      <p className="text-gray-400 text-base md:text-lg max-w-lg text-center mb-10 leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 hover:border-white/20 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
        <button 
          onClick={() => navigate('/super-admin')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
        >
          Return to Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
    </div>
  );
};

export default ComingSoon;
