import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section id="cta" className="py-24 bg-[#09090B] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#7C3AED]/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to Build Your Crypto Payment Infrastructure?</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Join the world's most innovative companies processing billions in crypto volume every year.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:-translate-y-1 text-lg">
            Start Free Trial <ArrowRight className="w-6 h-6" />
          </Link>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1 text-lg">
            Book Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
