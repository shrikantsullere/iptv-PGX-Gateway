import { Gamepad2 } from 'lucide-react';

const PGXComingSoon = ({ title }) => {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
       <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 to-cyan-500/20 blur-xl group-hover:blur-2xl transition-all"></div>
         <Gamepad2 className="w-10 h-10 text-white relative z-10" />
       </div>
       <h1 className="text-3xl font-black text-white mb-2 text-center">{title}</h1>
       <p className="text-gray-400 text-center max-w-md">This module is currently under construction for the PlayGroundX platform. Stay tuned for updates.</p>
       <button className="mt-8 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:scale-105">
         Return Home
       </button>
    </div>
  );
};

export default PGXComingSoon;
