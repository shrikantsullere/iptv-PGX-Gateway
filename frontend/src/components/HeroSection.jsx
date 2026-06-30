import { ArrowRight, PlayCircle, Layers, Bitcoin, ShieldCheck, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#09090B]">
      
      {/* Animated Glowing Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] mix-blend-screen" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent shadow-[0_0_15px_#7C3AED]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#7C3AED] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-ping"></span>
              Enterprise Grade Infrastructure
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              The Complete Crypto Payment Infrastructure for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-cyan-400">Modern Businesses</span>
            </h1>
            <p className="text-lg text-gray-400 mb-10 max-w-xl leading-relaxed">
              Accept crypto payments worldwide using a scalable multi-tenant gateway with automatic processor failover, fee splitting, merchant dashboards, white-label infrastructure, API integrations, and enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] hover:-translate-y-1">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                <PlayCircle className="w-5 h-5" /> Schedule Demo
              </button>
            </div>
          </div>

          {/* Right 3D Illustration Mockup */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Central Gateway Node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-[#7C3AED] to-blue-600 rounded-3xl rotate-12 shadow-[0_0_60px_rgba(124,58,237,0.4)] flex flex-col items-center justify-center border border-white/20 z-20 animate-bounce" style={{ animationDuration: '6s' }}>
              <Layers className="w-16 h-16 text-white mb-2" />
              <span className="text-white font-black tracking-widest uppercase text-sm">PGX Core</span>
            </div>

            {/* Floating Nodes */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center -rotate-12 z-30 shadow-2xl animate-pulse" style={{ animationDelay: '1s' }}>
              <Bitcoin className="w-10 h-10 text-yellow-500" />
            </div>
            
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#13131A] backdrop-blur-xl border border-white/10 rounded-2xl p-4 rotate-6 z-10 shadow-2xl flex flex-col justify-between" style={{ animation: 'bounce 8s infinite' }}>
               <div className="flex justify-between items-center"><ShieldCheck className="w-5 h-5 text-green-500"/><div className="w-2 h-2 rounded-full bg-green-500"></div></div>
               <div><div className="text-xs text-gray-500">Routing</div><div className="font-bold text-white">Active</div></div>
            </div>

            <div className="absolute top-1/3 right-1/4 w-40 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 rotate-[15deg] z-30 shadow-2xl flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-cyan-400" />
                <div><div className="text-xl font-bold text-white">99.9%</div><div className="text-[10px] text-gray-400 uppercase">Uptime</div></div>
              </div>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <path d="M 150 200 Q 250 150 300 300 T 450 400" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
              <path d="M 400 150 Q 350 250 300 300" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
            
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
