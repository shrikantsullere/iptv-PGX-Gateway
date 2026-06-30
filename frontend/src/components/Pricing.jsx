import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect for new businesses testing crypto payments.',
      price: '0',
      fee: '2.9%',
      features: ['Up to 500 tx/month', 'Standard Support', 'Basic Analytics', 'PGX Branding'],
      theme: 'from-gray-800 to-gray-900',
      border: 'border-white/10',
      btn: 'bg-white/10 hover:bg-white/20 text-white'
    },
    {
      name: 'Business',
      desc: 'For growing companies that need custom branding.',
      price: '99',
      fee: '1.9%',
      features: ['Up to 5,000 tx/month', 'Priority Support', 'Advanced Analytics', 'White-label Checkout', 'Custom Domain'],
      theme: 'from-[#7C3AED]/20 to-blue-900/20',
      border: 'border-[#7C3AED]/50',
      btn: 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]',
      popular: true
    },
    {
      name: 'Enterprise',
      desc: 'For massive scale and dedicated infrastructure.',
      price: 'Custom',
      fee: 'Custom',
      features: ['Unlimited Transactions', 'Dedicated Manager', 'Custom Routing Rules', 'On-premise Deployment', 'SLA Guarantee'],
      theme: 'from-gray-800 to-gray-900',
      border: 'border-white/10',
      btn: 'bg-white/10 hover:bg-white/20 text-white'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Transparent pricing for scale</h2>
          <p className="text-gray-400 text-lg">No hidden fees, no surprises. Pay as you grow with our flexible infrastructure tiers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`relative bg-gradient-to-b ${plan.theme} border ${plan.border} rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2`}>
              
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-cyan-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-400 mb-6 h-10">{plan.desc}</p>
              
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  {plan.price !== 'Custom' && <span className="text-2xl text-gray-400">$</span>}
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-400">/mo</span>}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-300">
                  + {plan.fee} per transaction
                </div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-[#7C3AED]' : 'text-gray-500'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.btn}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
