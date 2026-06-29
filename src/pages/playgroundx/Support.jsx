import { useState } from 'react';
import { HelpCircle, MessageCircle, Mail, FileText, ChevronDown, ChevronUp, Search, ExternalLink } from 'lucide-react';

const FAQS = [
  { q: "How do I create a private watch party?", a: "Go to the Lobbies page and click 'Create Private Lobby'. You can select up to 4 channels to stream simultaneously and then invite friends from your active friends list." },
  { q: "What is PGX token used for?", a: "PGX is the native currency of the PlayGroundX platform. It can be used to purchase Pay-Per-View events, upgrade to the PRO subscription, or participate in platform governance." },
  { q: "Why is my stream lagging?", a: "Ensure you have a stable internet connection of at least 15Mbps for 4K streams. If the issue persists, try switching to a different server location in your stream settings." },
  { q: "How do I upgrade to the PRO plan?", a: "You can upgrade by visiting your Profile or Settings page. The PRO plan costs 49.99 PGX per month and removes all ads while enabling unlimited lobby creation." }
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto pb-10">
      
      {/* Header */}
      <div className="bg-[#13131A] p-8 sm:p-12 rounded-3xl border border-white/5 shadow-xl text-center relative overflow-hidden group">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
           <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
           </div>
           <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">How can we help?</h1>
           <p className="text-gray-400 text-base sm:text-lg mb-8">Search our knowledge base or get in touch with our support team.</p>
           
           <div className="relative max-w-lg mx-auto">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
             <input type="text" placeholder="Search for answers..." className="w-full bg-[#09090B] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#7C3AED] transition-colors shadow-lg text-sm sm:text-base" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* Contact Cards */}
         <div className="md:col-span-1 space-y-4">
            <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#09090B] p-6 rounded-3xl border border-[#7C3AED]/30 shadow-lg text-center hover:-translate-y-1 transition-transform cursor-pointer">
               <MessageCircle className="w-8 h-8 text-[#7C3AED] mx-auto mb-3" />
               <h3 className="font-black text-white mb-1">Live Chat</h3>
               <p className="text-xs text-gray-400 mb-4">Available 24/7 for PRO members.</p>
               <button className="w-full py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl text-sm transition-colors">Start Chat</button>
            </div>
            
            <div className="bg-[#13131A] p-6 rounded-3xl border border-white/5 shadow-lg text-center hover:-translate-y-1 transition-transform cursor-pointer">
               <Mail className="w-8 h-8 text-blue-400 mx-auto mb-3" />
               <h3 className="font-black text-white mb-1">Email Support</h3>
               <p className="text-xs text-gray-400 mb-4">Expect a reply within 24 hours.</p>
               <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-colors border border-white/10">support@pgxgateway.com</button>
            </div>
            
            <div className="bg-[#13131A] p-6 rounded-3xl border border-white/5 shadow-lg text-center hover:-translate-y-1 transition-transform cursor-pointer">
               <FileText className="w-8 h-8 text-green-400 mx-auto mb-3" />
               <h3 className="font-black text-white mb-1">Documentation</h3>
               <p className="text-xs text-gray-400 mb-4">Read the full platform guide.</p>
               <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">Read Docs <ExternalLink className="w-3.5 h-3.5" /></button>
            </div>
         </div>

         {/* FAQs */}
         <div className="md:col-span-2 bg-[#13131A] p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl">
            <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-3">
               {FAQS.map((faq, i) => (
                 <div key={i} className="border border-white/5 bg-[#09090B] rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none"
                    >
                       <span className="font-bold text-white text-sm sm:text-base pr-4">{faq.q}</span>
                       {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#7C3AED] shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />}
                    </button>
                    
                    <div className={`px-4 sm:px-5 pb-5 text-sm text-gray-400 leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 pb-0'}`}>
                       {faq.a}
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
               <p className="text-sm text-gray-500">Can't find what you're looking for?</p>
               <button className="mt-2 text-[#7C3AED] hover:text-white font-bold text-sm transition-colors">Submit a support ticket →</button>
            </div>
         </div>
         
      </div>
      
    </div>
  );
}
