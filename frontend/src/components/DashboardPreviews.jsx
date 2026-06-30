const DashboardPreviews = () => {
  return (
    <section id="solutions" className="py-24 bg-[#050508] border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#7C3AED]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Enterprise grade dashboards</h2>
          <p className="text-gray-400 text-lg">Powerful command centers tailored for both the platform operator and the end merchant.</p>
        </div>

        <div className="space-y-24">
          
          {/* Admin Desktop Preview */}
          <div>
            <h3 className="text-2xl font-bold text-center text-white mb-10"><span className="text-[#7C3AED]">PGX Super Admin</span> Command Center</h3>
            <div className="max-w-5xl mx-auto bg-[#1a1a1a] rounded-t-3xl rounded-b-lg p-2 md:p-4 border-t-4 border-l-4 border-r-4 border-[#333] shadow-2xl relative">
              
              {/* Screen Content */}
              <div className="bg-[#09090B] rounded-xl overflow-hidden border border-white/5 flex h-[400px] md:h-[600px]">
                {/* Fake Sidebar */}
                <div className="w-48 bg-[#050508] border-r border-white/5 p-4 hidden md:flex flex-col gap-4">
                  <div className="w-full h-8 bg-white/10 rounded-lg mb-4"></div>
                  {[1,2,3,4,5,6,7].map(i => <div key={i} className="w-full h-6 bg-white/5 rounded-md"></div>)}
                </div>
                {/* Fake Main Content */}
                <div className="flex-1 p-6 flex flex-col gap-6">
                  <div className="flex justify-between">
                    <div className="w-48 h-8 bg-white/10 rounded-lg"></div>
                    <div className="w-32 h-8 bg-white/10 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white/5 rounded-xl border border-white/5"></div>)}
                  </div>
                  <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-4">
                     <div className="w-full h-4 bg-white/10 rounded-md"></div>
                     <div className="w-full h-4 bg-white/10 rounded-md"></div>
                     <div className="w-full h-4 bg-white/10 rounded-md"></div>
                     <div className="w-full h-4 bg-white/10 rounded-md"></div>
                  </div>
                </div>
              </div>
              
              {/* Stand */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-gradient-to-b from-[#333] to-[#111] rounded-b-2xl shadow-xl"></div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-2 bg-[#222] rounded-full"></div>
            </div>
          </div>

          <div className="h-16"></div> {/* Spacing for stand */}

          {/* Merchant MacBook Preview */}
          <div>
            <h3 className="text-2xl font-bold text-center text-white mb-10"><span className="text-cyan-400">Merchant</span> Portal</h3>
            <div className="max-w-4xl mx-auto">
               <div className="bg-[#1a1a1a] rounded-t-3xl p-2 md:p-4 border-t-2 border-l-2 border-r-2 border-[#444] shadow-2xl relative mx-auto w-[90%] md:w-[100%]">
                 {/* Screen Content */}
                 <div className="bg-[#09090B] rounded-xl overflow-hidden border border-white/5 flex h-[300px] md:h-[500px]">
                   {/* Fake Sidebar */}
                   <div className="w-16 md:w-48 bg-[#13131A] border-r border-white/5 p-4 flex flex-col gap-4">
                     <div className="w-full h-8 bg-[#7C3AED]/20 rounded-lg mb-4"></div>
                     {[1,2,3,4,5].map(i => <div key={i} className="w-full h-6 bg-white/5 rounded-md"></div>)}
                   </div>
                   {/* Fake Main Content */}
                   <div className="flex-1 p-6 flex flex-col gap-6">
                     <div className="flex justify-between">
                       <div className="w-32 h-8 bg-white/10 rounded-lg"></div>
                     </div>
                     <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex items-end justify-between gap-2">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                           <div key={i} className="w-full bg-[#7C3AED]" style={{ height: `${h}%`, borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}></div>
                        ))}
                     </div>
                   </div>
                 </div>
               </div>
               {/* MacBook Base */}
               <div className="w-full h-4 md:h-6 bg-gradient-to-b from-[#555] to-[#222] rounded-b-3xl shadow-2xl flex justify-center relative z-10">
                  <div className="w-32 h-2 bg-[#111] rounded-b-xl"></div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardPreviews;
