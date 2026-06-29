import { ShieldCheck, Fingerprint, Lock, FileKey2 } from 'lucide-react';

const SecuritySection = () => {
  const securityFeatures = [
    { icon: ShieldCheck, title: 'PCI DSS Level 1', desc: 'Fully compliant infrastructure ensuring the highest level of payment data security.' },
    { icon: Fingerprint, title: 'Built-in KYC & AML', desc: 'Integrated identity verification to prevent fraud and comply with global regulations.' },
    { icon: Lock, title: 'End-to-End Encryption', desc: 'All data at rest and in transit is secured using military-grade AES-256 encryption.' },
    { icon: FileKey2, title: 'Non-Custodial Options', desc: 'Route funds directly to merchant wallets without ever holding custody of the assets.' }
  ];

  return (
    <section className="py-24 bg-[#050508] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Bank-grade security. By default.</h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Security isn't an afterthought. PGX Gateway is built from the ground up to protect your platform, your merchants, and their customers from modern threats.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {securityFeatures.map((feat, i) => (
                <div key={i}>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <h4 className="font-bold text-white mb-2">{feat.title}</h4>
                  <p className="text-sm text-gray-500">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Visual */}
          <div className="relative h-[500px] rounded-3xl border border-white/10 bg-[#09090B] overflow-hidden flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz48L3N2Zz4=')] opacity-50"></div>
            
            <div className="relative z-10 w-64 h-64">
              {/* Rotating Rings */}
              <div className="absolute inset-0 border-2 border-dashed border-[#7C3AED]/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-4 border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Core Shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-[#7C3AED] to-blue-600 rounded-full blur-[20px] opacity-50 animate-pulse"></div>
                <ShieldCheck className="w-20 h-20 text-white absolute" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
