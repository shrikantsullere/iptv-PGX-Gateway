import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Server, Shield, Globe, Mail, Check, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

export default function Settings() {
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Settings State
  const [maintenance, setMaintenance] = useState(false);
  const [sandbox, setSandbox] = useState(true);
  const [twoFa, setTwoFa] = useState(true);
  const [ipWhite, setIpWhite] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/settings');
      if (res.success && res.data) {
        // Map backend schema
        const mMode = res.data.find(s => s.settingKey === 'maintenance_mode');
        const sMode = res.data.find(s => s.settingKey === 'sandbox_enabled');
        const tMode = res.data.find(s => s.settingKey === 'force_2fa');
        const iMode = res.data.find(s => s.settingKey === 'ip_whitelist');

        if (mMode) setMaintenance(mMode.settingValue === 'true');
        if (sMode) setSandbox(sMode.settingValue === 'true');
        if (tMode) setTwoFa(tMode.settingValue === 'true');
        if (iMode) setIpWhite(iMode.settingValue === 'true');
      }
    } catch (err) {
      console.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Mock update to the backend endpoint
      await apiClient.put('/admin/settings', {
        maintenance_mode: maintenance.toString(),
        sandbox_enabled: sandbox.toString(),
        force_2fa: twoFa.toString(),
        ip_whitelist: ipWhite.toString()
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err) {
      alert('Failed to save settings');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 space-y-4">
        <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin" />
        <p className="text-gray-400 font-bold">Loading System Config...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-[#7C3AED]" /> Global Settings
          </h1>
          <p className="text-gray-400 mt-1">Core platform configurations and maintenance toggles.</p>
        </div>
        <button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(20,184,166,0.3)] flex items-center gap-2 transition-all">
          {isSaved ? <><Check className="w-4 h-4" /> Saved Successfully!</> : <><Save className="w-4 h-4" /> Save Configuration</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* System Settings */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <Server className="w-5 h-5 text-[#7C3AED]" />
            <h3 className="text-lg font-bold text-white">System Operations</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Take the gateway offline for updates. Returns 503 to API requests.</p>
              </div>
              <div onClick={() => setMaintenance(!maintenance)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${maintenance ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${maintenance ? 'right-1 bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.8)]' : 'left-1 bg-gray-400'}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">Sandbox Environment</h4>
                <p className="text-sm text-gray-500">Allow merchants to create sandbox API keys.</p>
              </div>
              <div onClick={() => setSandbox(!sandbox)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${sandbox ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${sandbox ? 'right-1 bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.8)]' : 'left-1 bg-gray-400'}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-[#13131A] border border-white/5 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-white">Security Policies</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">Force 2FA for Admins</h4>
                <p className="text-sm text-gray-500">Require 2FA setup on next login for all staff.</p>
              </div>
              <div onClick={() => setTwoFa(!twoFa)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${twoFa ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${twoFa ? 'right-1 bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.8)]' : 'left-1 bg-gray-400'}`}></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">Strict IP Whitelisting</h4>
                <p className="text-sm text-gray-500">Only allow admin logins from office IPs.</p>
              </div>
              <div onClick={() => setIpWhite(!ipWhite)} className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${ipWhite ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/30' : 'bg-white/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-1 transition-all ${ipWhite ? 'right-1 bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.8)]' : 'left-1 bg-gray-400'}`}></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
