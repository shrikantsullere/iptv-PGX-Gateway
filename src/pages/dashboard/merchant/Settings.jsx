import { Settings as SettingsIcon, ShieldCheck, User, Save } from 'lucide-react';

const Settings = () => {
  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <SettingsIcon className="w-8 h-8 text-gray-400" /> Settings
              </h1>
              <p className="text-gray-400">Manage your profile, security, and notification preferences.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl transition-all font-bold">
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>

          <div className="max-w-4xl space-y-6">
            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><User className="w-5 h-5" /> Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
                  <input type="text" defaultValue="Acme Digital Ltd." className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                  <input type="email" defaultValue="admin@acme.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Timezone</label>
                  <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary appearance-none">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Security & 2FA</h3>
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-xl mb-4">
                <div>
                  <h4 className="font-bold text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Protect your account with an extra layer of security.</p>
                </div>
                <button className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg font-bold text-sm">
                  Disable 2FA
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-xl">
                <div>
                  <h4 className="font-bold text-white">Change Password</h4>
                  <p className="text-sm text-gray-500">Update your account password.</p>
                </div>
                <button className="bg-white/5 text-white border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                  Update
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Settings;
