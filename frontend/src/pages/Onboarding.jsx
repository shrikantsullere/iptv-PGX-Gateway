import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, Wallet, Landmark, Network, CreditCard, Palette, Code, CheckCircle2,
  UploadCloud, Copy, ArrowRight, ArrowLeft
} from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Step 1: Business Info
  const renderStep1 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#7C3AED]/20 text-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-4"><Building2 className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Business Information</h2>
        <p className="text-gray-400 text-sm">Let's start with the basics of your company.</p>
      </div>
      <div className="space-y-4">
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Company Name</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="Acme Corp" /></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Type</label><select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none appearance-none"><option>E-commerce</option><option>SaaS</option><option>Digital Goods</option></select></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Email</label><input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="hello@acme.com" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="+1 234 567 890" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Country</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="United States" /></div>
        </div>
      </div>
    </div>
  );

  // Step 2: Company Details
  const renderStep2 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#7C3AED]/20 text-[#7C3AED] rounded-2xl flex items-center justify-center mx-auto mb-4"><MapPin className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Company Details</h2>
        <p className="text-gray-400 text-sm">Provide your registered address and tax information.</p>
      </div>
      <div className="space-y-4">
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Company Address</label><textarea className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none h-24" placeholder="123 Business Rd, Tech City..."></textarea></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Website</label><input type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="https://acme.com" /></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tax ID (Optional)</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="XX-XXXXXXX" /></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Business Description</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none" placeholder="We sell software..." /></div>
      </div>
    </div>
  );

  // Step 3: Wallet Configuration
  const renderStep3 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Wallet className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Connect Your Wallet</h2>
        <p className="text-gray-400 text-sm">Where should we send your crypto settlements?</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['MetaMask', 'WalletConnect', 'Coinbase Wallet', 'Trust Wallet'].map((w,i) => (
          <div key={i} className="bg-black/50 border border-white/10 hover:border-blue-500/50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors"></div>
            <span className="text-xs font-bold">{w}</span>
          </div>
        ))}
      </div>
      <div className="relative flex items-center py-2 mb-6">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-medium uppercase tracking-widest">OR</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>
      <div className="space-y-4">
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enter Wallet Address Manually</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none font-mono text-sm" placeholder="0x..." /></div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Supported Coins to Accept</label>
          <div className="flex gap-2">
            {['USDC', 'USDT', 'BTC', 'ETH'].map(c => (
              <span key={c} className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-3 py-1 rounded-lg text-xs font-bold">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Step 4: Settlement Info
  const renderStep4 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Landmark className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Fiat Settlement</h2>
        <p className="text-gray-400 text-sm">Add a bank account to receive fiat payouts.</p>
      </div>
      <div className="space-y-4">
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Bank Name</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none" placeholder="Chase Bank" /></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Holder</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none" placeholder="Acme Corp LLC" /></div>
        <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Account Number / IBAN</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none" placeholder="XXXX-XXXX-XXXX" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SWIFT/BIC</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none" placeholder="CHASUS33" /></div>
          <div><label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Country</label><input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-green-500 focus:outline-none" placeholder="US" /></div>
        </div>
      </div>
    </div>
  );

  // Step 5: Processors
  const renderStep5 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-cyan-500/20 text-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Network className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Payment Processors</h2>
        <p className="text-gray-400 text-sm">Select which liquidity providers to route payments through.</p>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {['MoonPay', 'Banxa', 'Transak', 'Ramp', 'Mercuryo'].map((p,i) => (
          <div key={i} className="bg-black/50 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold">{p[0]}</div>
              <div>
                <h4 className="font-bold text-sm text-white">{p}</h4>
                <div className="text-[10px] text-gray-500">Global Coverage • 50+ Coins</div>
              </div>
            </div>
            <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${i < 3 ? 'bg-cyan-500' : 'bg-gray-600'}`}>
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${i < 3 ? 'right-1' : 'left-1'}`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 6: Subscriptions
  const renderStep6 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-pink-500/20 text-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><CreditCard className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Choose Plan</h2>
        <p className="text-gray-400 text-sm">Select a subscription that fits your scale.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {n: 'Starter', p: '$0', f: '2.9%'}, 
          {n: 'Business', p: '$99', f: '1.9%', act: true}, 
          {n: 'Enterprise', p: 'Custom', f: 'Custom'}
        ].map((plan,i) => (
          <div key={i} className={`bg-black/50 border ${plan.act ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.2)]' : 'border-white/10 hover:border-white/20'} rounded-2xl p-5 flex flex-col cursor-pointer transition-all`}>
            <h4 className="font-bold text-sm mb-4 text-center">{plan.n}</h4>
            <div className="text-2xl font-black text-center mb-1">{plan.p}</div>
            <div className="text-[10px] text-center text-gray-500 mb-4">/month + {plan.f} fee</div>
            <button className={`w-full py-2 text-xs font-bold rounded-lg ${plan.act ? 'bg-pink-500 text-white' : 'bg-white/5 text-gray-400'}`}>
              {plan.act ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 7: Branding
  const renderStep7 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Palette className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">Branding</h2>
        <p className="text-gray-400 text-sm">Customize your checkout experience.</p>
      </div>
      <div className="space-y-6">
        <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500/50 hover:bg-orange-500/5 transition-all">
          <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm font-bold">Upload Company Logo</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Color</label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#7C3AED] border-2 border-white"></div>
              <input type="text" className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs" value="#7C3AED" readOnly />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#09090B] border border-white/20"></div>
              <input type="text" className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-xs" value="#09090B" readOnly />
            </div>
          </div>
        </div>
        <div className="bg-[#09090B] border border-white/10 rounded-xl p-4 flex items-center justify-between">
           <span className="text-sm font-bold">Theme Preview</span>
           <button className="bg-[#7C3AED] text-white px-4 py-1.5 rounded-lg text-xs font-bold">Pay Now</button>
        </div>
      </div>
    </div>
  );

  // Step 8: API Config
  const renderStep8 = () => (
    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><Code className="w-8 h-8" /></div>
        <h2 className="text-2xl font-black text-white mb-2">API Configuration</h2>
        <p className="text-gray-400 text-sm">Save these keys securely. You won't be able to see the secret key again.</p>
      </div>
      <div className="space-y-4">
        <div>
           <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Public Key</label>
           <div className="flex bg-black/50 border border-white/10 rounded-xl overflow-hidden">
             <input type="text" value="pk_test_8f7d6a5s4d3f2g1h" readOnly className="flex-1 bg-transparent px-4 py-3 text-gray-300 font-mono text-xs outline-none" />
             <button className="px-4 border-l border-white/10 hover:bg-white/5 text-gray-400"><Copy className="w-4 h-4" /></button>
           </div>
        </div>
        <div>
           <label className="block text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Secret Key</label>
           <div className="flex bg-black/50 border border-red-500/30 rounded-xl overflow-hidden">
             <input type="text" value="sk_test_9h8g7f6d5s4a3s2d1f" readOnly className="flex-1 bg-transparent px-4 py-3 text-white font-mono text-xs outline-none" />
             <button className="px-4 border-l border-red-500/30 hover:bg-red-500/10 text-gray-400"><Copy className="w-4 h-4" /></button>
           </div>
        </div>
        <div>
           <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Webhook URL (Optional)</label>
           <input type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:outline-none text-xs font-mono" placeholder="https://api.yoursite.com/webhooks/pgx" />
        </div>
      </div>
    </div>
  );

  // Step 9: Success
  const renderStep9 = () => (
    <div className="animate-in zoom-in-95 duration-500 text-center py-10">
      <div className="relative mb-8 w-32 h-32 mx-auto">
        <div className="absolute inset-0 bg-[#7C3AED]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute inset-0 border border-[#7C3AED]/30 rounded-full flex items-center justify-center bg-[#13131A] shadow-[0_0_40px_rgba(124,58,237,0.3)]">
          <CheckCircle2 className="w-16 h-16 text-[#7C3AED] animate-[bounce_1s_ease-out]" />
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Your Merchant Account is Ready</h2>
      <p className="text-gray-400 max-w-md mx-auto mb-10">
        You're all set up! You can now start processing crypto payments globally. Welcome to the future of finance.
      </p>
      <button 
        onClick={() => navigate('/merchant-dashboard')}
        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 mx-auto"
      >
        Go To Merchant Dashboard <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const getAccentColor = () => {
    switch (currentStep) {
      case 1: case 2: return 'bg-[#7C3AED]';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      case 5: return 'bg-cyan-500';
      case 6: return 'bg-pink-500';
      case 7: return 'bg-orange-500';
      case 8: return 'bg-indigo-500';
      default: return 'bg-[#7C3AED]';
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col font-sans text-white relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#13131A] to-transparent pointer-events-none"></div>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 ${getAccentColor()}`}></div>

      {/* Progress Bar (Hide on success) */}
      {currentStep < 9 && (
        <div className="w-full h-1.5 bg-white/5 fixed top-0 z-50">
          <div className={`h-full ${getAccentColor()} transition-all duration-500 ease-out`} style={{ width: `${(currentStep / 8) * 100}%` }}></div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-2xl">
          
          <div className="bg-[#13131A]/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
            {currentStep === 7 && renderStep7()}
            {currentStep === 8 && renderStep8()}
            {currentStep === 9 && renderStep9()}

            {/* Navigation Buttons (Hide on success) */}
            {currentStep < 9 && (
              <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">
                {currentStep > 1 ? (
                  <button onClick={prevStep} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>
                ) : <div></div>}
                
                <button onClick={nextStep} className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl ${getAccentColor().replace('bg-', 'bg-').replace('500', '600')}`}>
                  {currentStep === 8 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Onboarding;
