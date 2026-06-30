import { Palette, UploadCloud, Save } from 'lucide-react';

const Branding = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Palette className="w-8 h-8 text-indigo-500" /> Branding
              </h1>
              <p className="text-gray-400">Customize the look and feel of your checkout pages and emails.</p>
            </div>
            <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl transition-all font-bold">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Company Logo</h3>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-6 h-6 text-gray-400" />
                  </div>
                  <h4 className="font-bold mb-1">Click to upload or drag and drop</h4>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>

              <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Brand Colors</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Primary Color</label>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#7C3AED] border border-white/20"></div>
                      <input type="text" value="#7C3AED" className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm" readOnly />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Background Color (Dark Mode)</label>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0C0C11] border border-white/20"></div>
                      <input type="text" value="#0C0C11" className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-white font-mono text-sm" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6">Live Preview (Checkout)</h3>
              <div className="w-full h-[400px] bg-black rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                <div className="w-64 bg-[#111118] border border-white/10 rounded-xl p-4 shadow-2xl">
                  <div className="w-10 h-10 bg-indigo-500 rounded-lg mx-auto mb-4"></div>
                  <div className="h-4 w-32 bg-white/10 rounded mx-auto mb-8"></div>
                  <div className="space-y-3">
                    <div className="h-8 w-full bg-white/5 rounded"></div>
                    <div className="h-8 w-full bg-white/5 rounded"></div>
                    <div className="h-10 w-full bg-indigo-500 rounded mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Branding;
