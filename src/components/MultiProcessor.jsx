import { CheckCircle2 } from 'lucide-react';

const MultiProcessor = () => {
  const processors = [
    { name: 'MoonPay', bg: 'bg-purple-500', countries: '160+', coins: '80+', rate: '98.5%' },
    { name: 'Banxa', bg: 'bg-blue-500', countries: '130+', coins: '60+', rate: '97.2%' },
    { name: 'Transak', bg: 'bg-yellow-500', countries: '150+', coins: '75+', rate: '96.8%' },
    { name: 'Ramp', bg: 'bg-green-500', countries: '150+', coins: '40+', rate: '99.1%' },
    { name: 'Coinbase Pay', bg: 'bg-blue-400', countries: '100+', coins: '100+', rate: '99.9%' },
    { name: 'Mercuryo', bg: 'bg-orange-500', countries: '135+', coins: '50+', rate: '95.5%' },
  ];

  return (
    <section className="py-24 bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Connect once, access everyone.</h2>
            <p className="text-gray-400 text-lg">One API integration gives you instant access to the world's leading crypto payment processors. Maximize approval rates globally.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processors.map((proc, i) => (
            <div key={i} className="bg-[#13131A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${proc.bg} flex items-center justify-center font-black text-white text-sm shadow-lg`}>
                    {proc.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-white text-lg">{proc.name}</h3>
                </div>
                <div className="flex items-center gap-1.5 bg-green-500/10 text-green-500 px-2.5 py-1 rounded-full text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Countries</div>
                  <div className="font-bold text-white">{proc.countries}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Coins</div>
                  <div className="font-bold text-white">{proc.coins}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Success</div>
                  <div className="font-bold text-green-400 flex items-center gap-1">
                    {proc.rate} <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MultiProcessor;
