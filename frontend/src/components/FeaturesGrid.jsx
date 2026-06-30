import { Users, Palette, Route, Zap, SplitSquareHorizontal, LayoutDashboard, Wallet, Webhook, Fingerprint, ShieldAlert, CheckCircle, BarChart3 } from 'lucide-react';

const FeaturesGrid = () => {
  const features = [
    { icon: Users, title: 'Multi Tenant SaaS', desc: 'Create infinite merchant accounts under one master gateway with isolated data.' },
    { icon: Palette, title: 'White Label Platform', desc: 'Fully customize domains, colors, and emails to match your brand identity.' },
    { icon: Route, title: 'Multi Processor Routing', desc: 'Connect multiple liquidity providers and route transactions intelligently.' },
    { icon: Zap, title: 'Automatic Failover', desc: 'Never lose a sale. Instantly failover to backup processors if the primary is down.' },
    { icon: SplitSquareHorizontal, title: 'Fee Splitting Engine', desc: 'Automatically calculate and route processing fees and platform revenue.' },
    { icon: LayoutDashboard, title: 'Merchant Dashboard', desc: 'Give your customers a beautiful, Stripe-like dashboard to manage their business.' },
    { icon: Wallet, title: 'Wallet Management', desc: 'Securely generate and manage crypto wallets for every merchant.' },
    { icon: Webhook, title: 'API & Webhooks', desc: 'Enterprise-grade REST APIs and real-time webhook notifications.' },
    { icon: Fingerprint, title: 'KYC & AML', desc: 'Built-in identity verification and compliance tools for onboarding.' },
    { icon: ShieldAlert, title: 'Fraud Detection', desc: 'AI-powered risk analysis to detect and block suspicious transactions.' },
    { icon: CheckCircle, title: 'Settlement Engine', desc: 'Automate fiat and crypto payouts to your merchants on custom schedules.' },
    { icon: BarChart3, title: 'Enterprise Reporting', desc: 'Deep analytics, custom reporting, and automated accounting exports.' }
  ];

  return (
    <section id="features" className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Everything you need to run a crypto payment gateway</h2>
          <p className="text-gray-400 text-lg">We've built all the complex infrastructure so you don't have to. Launch your own enterprise payment processor in days, not years.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="group bg-white/[0.02] border border-white/5 hover:border-[#7C3AED]/30 rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(124,58,237,0.1)] cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#7C3AED]/10 group-hover:border-[#7C3AED]/30 transition-all duration-300">
                <feat.icon className="w-6 h-6 text-gray-400 group-hover:text-[#7C3AED] transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#7C3AED] transition-colors">{feat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
