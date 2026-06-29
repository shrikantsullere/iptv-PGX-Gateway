import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the automatic failover work?',
      a: 'PGX Gateway constantly monitors the health and success rates of all connected payment processors (MoonPay, Banxa, etc.). If the primary processor goes down or rejects a transaction, our engine automatically routes the checkout to the next available processor in milliseconds, ensuring you never lose a sale.'
    },
    {
      q: 'Do I need to hold cryptocurrency?',
      a: 'No. You can configure PGX Gateway to instantly settle all crypto transactions into fiat currency (USD, EUR, GBP) directly to your corporate bank account via our settlement partners.'
    },
    {
      q: 'Is the platform truly white-label?',
      a: 'Yes. On the Business and Enterprise plans, you can host the checkout on your own domain (pay.yourcompany.com), upload your logos, match your brand colors, and completely remove all PGX Gateway branding.'
    },
    {
      q: 'How do you handle KYC and compliance?',
      a: 'We provide a built-in KYC engine that automatically collects and verifies user identities against global AML databases before allowing large transactions, keeping your platform fully compliant without requiring third-party tools.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#050508] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#09090B] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-white text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#7C3AED]' : ''}`} />
              </button>
              
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? '300px' : '0px', opacity: openIndex === i ? 1 : 0 }}
              >
                <p className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4 mt-2">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
