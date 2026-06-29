import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, User, Mail, Phone, MapPin, Calendar, CreditCard, ShieldAlert } from 'lucide-react';

const KYCDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto">
      
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-[#13131A] hover:bg-white/10 rounded-xl border border-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Review Verification: {id || 'KYC-8492'}</h1>
          <p className="text-gray-400 text-sm mt-1">Submitted 10 mins ago • High Priority</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Customer Profile */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full">
           <div className="p-8 flex flex-col items-center border-b border-white/5 relative">
              <div className="absolute top-4 right-4 bg-orange-500/10 text-orange-500 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                Pending
              </div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7C3AED] to-cyan-500 p-1 mb-4">
                <div className="w-full h-full rounded-full bg-[#09090B] flex items-center justify-center">
                   <User className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-white">Alex Johnson</h2>
              <p className="text-[#7C3AED] font-bold text-sm">Customer ID: CUS-991203</p>
           </div>
           
           <div className="p-6 space-y-6 flex-1">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Mail className="w-3 h-3" /> Email Address</label>
                <div className="font-medium text-white">alex.johnson@example.com</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Phone className="w-3 h-3" /> Phone Number</label>
                <div className="font-medium text-white">+1 (555) 019-2831</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</label>
                <div className="font-medium text-white">San Francisco, CA, USA</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><Calendar className="w-3 h-3" /> Date of Birth</label>
                <div className="font-medium text-white">14 May 1990</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><CreditCard className="w-3 h-3" /> Connected Wallet</label>
                <div className="font-mono text-white text-sm bg-white/5 p-2 rounded-lg border border-white/10 break-all">0x71C...9A23</div>
              </div>
           </div>
        </div>

        {/* Right: Documents & Actions */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
           
           <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-6">Uploaded Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Document 1 Placeholder */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white text-sm">Passport (Front)</h4>
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded font-bold uppercase tracking-wider">AI Verified (99%)</span>
                  </div>
                  <div className="w-full aspect-[4/3] rounded-xl bg-[#09090B] border-2 border-dashed border-white/10 flex items-center justify-center relative overflow-hidden group">
                     {/* Abstract representation of a document */}
                     <div className="absolute inset-4 border border-white/5 rounded-lg p-4 flex flex-col gap-2 opacity-50">
                        <div className="w-12 h-16 bg-white/10 rounded"></div>
                        <div className="w-3/4 h-2 bg-white/10 rounded"></div>
                        <div className="w-1/2 h-2 bg-white/10 rounded"></div>
                        <div className="w-full h-8 bg-white/5 rounded mt-auto"></div>
                     </div>
                     <button className="absolute bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">View Full Resolution</button>
                  </div>
                </div>

                {/* Document 2 Placeholder */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white text-sm">Selfie / Liveness</h4>
                    <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded font-bold uppercase tracking-wider">Match (95%)</span>
                  </div>
                  <div className="w-full aspect-[4/3] rounded-xl bg-[#09090B] border-2 border-dashed border-white/10 flex items-center justify-center relative overflow-hidden group">
                     <div className="w-24 h-32 rounded-full border-4 border-[#7C3AED]/30 opacity-50 flex items-center justify-center">
                        <User className="w-12 h-12 text-white/20" />
                     </div>
                     <button className="absolute bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Play Video</button>
                  </div>
                </div>

              </div>

              <div className="mt-8 bg-red-500/5 border border-red-500/10 rounded-xl p-4 flex gap-4">
                 <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                 <div>
                   <h4 className="font-bold text-red-500 text-sm">AML Risk Flag</h4>
                   <p className="text-xs text-red-400/80 mt-1">Wallet address has interacted with a mixer 45 days ago. Review compliance protocol before approving.</p>
                 </div>
              </div>
           </div>

           {/* Action Bar */}
           <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl p-6 flex flex-wrap gap-4 items-center justify-between">
              <button className="text-gray-400 hover:text-white font-bold text-sm px-4 py-2 rounded-lg border border-white/5 hover:bg-white/5 transition-colors">
                Request More Info
              </button>
              <div className="flex gap-4">
                <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-8 py-3 rounded-xl font-bold border border-red-500/20 transition-colors flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Reject
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-[#09090B] px-8 py-3 rounded-xl font-black transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-5 h-5" /> Approve KYC
                </button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default KYCDetails;
