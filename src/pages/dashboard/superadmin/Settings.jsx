import { useState } from 'react';
import { Settings as SettingsIcon, Save, Server, Shield, Globe, Mail } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-[#7C3AED]" /> Global Settings
          </h1>
          <p className="text-gray-400 mt-1">Core platform configurations and maintenance toggles.</p>
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(20,184,166,0.3)] flex items-center gap-2 transition-all">
          <Save className="w-4 h-4" /> Save Configuration
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
              <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">Sandbox Environment</h4>
                <p className="text-sm text-gray-500">Allow merchants to create sandbox API keys.</p>
              </div>
              <div className="w-12 h-6 bg-[#7C3AED]/20 rounded-full relative cursor-pointer border border-[#7C3AED]/30">
                <div className="w-4 h-4 bg-[#7C3AED] rounded-full absolute right-1 top-1 shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>
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
              <div className="w-12 h-6 bg-[#7C3AED]/20 rounded-full relative cursor-pointer border border-[#7C3AED]/30">
                <div className="w-4 h-4 bg-[#7C3AED] rounded-full absolute right-1 top-1 shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold">Strict IP Whitelisting</h4>
                <p className="text-sm text-gray-500">Only allow admin logins from office IPs.</p>
              </div>
              <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-1 top-1"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
