import { Globe, Palette, UploadCloud, ChevronRight } from 'lucide-react';

const WhiteLabel = () => {
  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Your brand. Your domain.</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Don't redirect your customers to a third-party payment page. With PGX Gateway's white-label infrastructure, the entire checkout experience happens on your own domain with your own branding.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center shrink-0 mt-1">
                  <Globe className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Custom Domain</h4>
                  <p className="text-gray-400 text-sm">Host your checkout on <code className="text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">pay.yourcompany.com</code></p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-1">
                  <Palette className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Custom Themes</h4>
                  <p className="text-gray-400 text-sm">Match your exact brand colors, button styles, and typography.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 mt-1">
                  <UploadCloud className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Custom Assets</h4>
                  <p className="text-gray-400 text-sm">Upload your own logos and remove all PGX Gateway watermarks.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-[#09090B] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
              
              {/* Transition visualization */}
              <div className="flex flex-col gap-6">
                
                {/* Default state */}
                <div className="bg-[#13131A] rounded-xl p-4 border border-white/5 opacity-50 flex items-center justify-between grayscale">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold">PGX</div>
                      <div>
                         <div className="text-sm font-bold text-white">checkout.pgxgateway.com/pay</div>
                         <div className="text-[10px] text-gray-500">Default Gateway Experience</div>
                      </div>
                   </div>
                   <div className="px-3 py-1 bg-white/5 rounded text-xs font-medium text-gray-400">Default</div>
                </div>

                <div className="flex justify-center"><ChevronRight className="w-6 h-6 text-[#7C3AED] rotate-90" /></div>

                {/* White label state */}
                <div className="bg-gradient-to-br from-[#13131A] to-[#1a1a2e] rounded-xl p-4 border border-[#7C3AED]/30 shadow-[0_0_30px_rgba(124,58,237,0.2)] flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center text-xs font-bold text-white shadow-lg">ACME</div>
                      <div>
                         <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">pay.acme.com/checkout</div>
                         <div className="text-[10px] text-gray-400">Fully White Labeled Experience</div>
                      </div>
                   </div>
                   <div className="px-3 py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/50 rounded text-xs font-bold text-[#7C3AED]">Active</div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhiteLabel;
