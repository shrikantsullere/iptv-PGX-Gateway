import { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Bell, Monitor, Link2, Key, Smartphone, Mail, Eye, EyeOff } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');
  const [showPassword, setShowPassword] = useState(false);

  const TABS = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'display', label: 'Appearance', icon: Monitor },
    { id: 'connections', label: 'Connections', icon: Link2 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto pb-10">
      
      <div className="bg-[#13131A] p-6 rounded-3xl border border-white/5 shadow-xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
           <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Settings</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your account preferences, security, and app experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
         
         {/* Sidebar Tabs */}
         <div className="md:col-span-4 lg:col-span-3 space-y-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.id ? 'bg-[#7C3AED] text-white shadow-lg' : 'bg-[#13131A] text-gray-400 border border-white/5 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
         </div>

         {/* Content Area */}
         <div className="md:col-span-8 lg:col-span-9 bg-[#13131A] rounded-3xl border border-white/5 shadow-xl p-6 sm:p-8 min-h-[500px]">
            
            {activeTab === 'account' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div>
                    <h2 className="text-xl font-black text-white mb-4">Account Information</h2>
                    <div className="grid grid-cols-1 gap-4">
                       <div>
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Username</label>
                          <input type="text" defaultValue="CryptoKing" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm" />
                       </div>
                       <div>
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input type="email" defaultValue="crypto@example.com" className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <hr className="border-white/5" />

                 <div>
                    <h2 className="text-xl font-black text-white mb-4">Change Password</h2>
                    <div className="space-y-4">
                       <div className="relative">
                         <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                         <input type={showPassword ? 'text' : 'password'} placeholder="New Password" className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm" />
                         <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"><Eye className="w-4 h-4" /></button>
                       </div>
                       <input type={showPassword ? 'text' : 'password'} placeholder="Confirm New Password" className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#7C3AED] transition-colors text-sm" />
                       <button className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-xl transition-colors text-sm">Update Password</button>
                    </div>
                 </div>

                 <hr className="border-white/5" />
                 
                 <div>
                    <h2 className="text-xl font-black text-red-500 mb-2">Danger Zone</h2>
                    <p className="text-sm text-gray-400 mb-4">Permanently delete your account and all associated data.</p>
                    <button className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold rounded-xl transition-colors text-sm">Delete Account</button>
                 </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <h2 className="text-xl font-black text-white mb-4">Privacy & Security</h2>
                 
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#09090B] border border-white/5 rounded-2xl">
                       <div className="flex gap-3">
                          <Smartphone className="w-5 h-5 text-[#7C3AED]" />
                          <div>
                             <h4 className="font-bold text-white text-sm mb-1">Two-Factor Authentication (2FA)</h4>
                             <p className="text-xs text-gray-400">Add an extra layer of security to your account.</p>
                          </div>
                       </div>
                       <button className="px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold rounded-lg transition-colors">Enable</button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#09090B] border border-white/5 rounded-2xl">
                       <div className="flex gap-3">
                          <EyeOff className="w-5 h-5 text-blue-400" />
                          <div>
                             <h4 className="font-bold text-white text-sm mb-1">Private Profile</h4>
                             <p className="text-xs text-gray-400">Only friends can see your activity and online status.</p>
                          </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                       </label>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <h2 className="text-xl font-black text-white mb-4">Notification Preferences</h2>
                 <div className="space-y-2">
                    {[
                      { title: 'Lobby Invites', desc: 'When a friend invites you to a watch party' },
                      { title: 'Chat Mentions', desc: 'When someone tags you in a chat channel' },
                      { title: 'Wallet Activity', desc: 'Deposits, withdrawals, and purchases' },
                      { title: 'Marketing & Offers', desc: 'Promotions, PPV deals, and platform news' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-[#09090B] border border-transparent hover:border-white/5 rounded-2xl transition-colors">
                         <div>
                            <h4 className="font-bold text-white text-sm mb-0.5">{item.title}</h4>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                         </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={i !== 3} />
                            <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#7C3AED]"></div>
                         </label>
                      </div>
                    ))}
                 </div>
              </div>
            )}

            {(activeTab === 'display' || activeTab === 'connections') && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center opacity-60">
                 <SettingsIcon className="w-12 h-12 text-gray-500 mb-4 animate-spin-slow" />
                 <h3 className="text-lg font-bold text-white mb-1">More settings coming soon</h3>
                 <p className="text-sm text-gray-400 max-w-sm">We're actively building out the appearance and connections modules.</p>
              </div>
            )}

         </div>
      </div>
    </div>
  );
}
