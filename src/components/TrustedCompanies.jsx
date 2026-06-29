import { ShieldCheck } from 'lucide-react';

const TrustedCompanies = () => {
  const companies = ['Stripe', 'Coinbase', 'Plaid', 'Circle', 'Binance', 'Kraken'];

  return (
    <section className="py-12 border-b border-white/5 bg-[#09090B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-8 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Trusted by innovative enterprises
        </p>
        
        {/* Scrolling or Flex Grid of Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company, index) => (
            <div key={index} className="text-xl md:text-2xl font-black text-white/80 hover:text-white transition-colors cursor-pointer select-none">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
