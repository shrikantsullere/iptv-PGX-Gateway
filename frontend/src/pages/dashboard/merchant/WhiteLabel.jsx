import { useState, useEffect } from 'react';
import { Box, Globe, Lock, UploadCloud, Mail, CreditCard, Save, RefreshCw, CheckCircle2, Monitor, Smartphone, Loader2 } from 'lucide-react';
import apiClient from '../../../utils/apiClient';

const WhiteLabel = () => {
  const [activeTab, setActiveTab] = useState('domain');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState({
    domain: '',
    dnsVerified: false,
    logoUrl: '',
    primaryColor: '#7C3AED',
    typography: 'Inter (Default)',
    senderName: 'Acme Digital Billing',
    replyToAddress: 'support@acme.com',
    removePoweredBy: false,
    customFooter: false,
    requireBillingAddress: false,
    requirePhoneNumber: false,
    collectCustomerKyc: true,
    showCryptoFeeEstimates: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/merchant/whitelabel');
      if (res.success && res.data) {
        setSettings({
          ...settings,
          ...res.data
        });
      }
    } catch (err) {
      console.error('Failed to fetch white label settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await apiClient.put('/merchant/whitelabel', settings);
      if (res.success) {
        alert('Configuration saved successfully!');
        if (res.data) {
           setSettings({
             ...settings,
             ...res.data
           });
        }
      }
    } catch (err) {
      console.error('Failed to save white label settings:', err);
      alert('Failed to save configuration');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-12 text-teal-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          {/* Header Section */}
          <div className="px-6 md:px-10 pt-10 pb-6 border-b border-white/5 bg-[#13131A]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                  <Box className="w-8 h-8 text-teal-500" /> White Label Studio
                </h1>
                <p className="text-gray-400">Completely remove PGX branding. Host your own checkout and emails.</p>
              </div>
              <button 
                onClick={handleSave} 
                disabled={saving}
                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl transition-all font-bold shadow-[0_0_20px_rgba(20,184,166,0.2)] disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Configuration'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-6 mt-8 overflow-x-auto pb-1">
              {[
                { id: 'domain', label: 'Domain & SSL', icon: Globe },
                { id: 'branding', label: 'Theme & Assets', icon: UploadCloud },
                { id: 'checkout', label: 'Checkout UI', icon: CreditCard },
                { id: 'emails', label: 'Email Templates', icon: Mail },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id ? 'border-teal-500 text-teal-500' : 'border-transparent text-gray-500 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Configuration Panel (Left side) */}
              <div className="lg:col-span-5 space-y-6">
                
                {activeTab === 'domain' && (
                  <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 animate-in fade-in slide-in-from-left-4">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-teal-500" /> Custom Domain Setup</h3>
                    <p className="text-sm text-gray-400 mb-6">Host your payment pages on your own domain (e.g., pay.yourcompany.com). We automatically provision SSL certificates for verified domains.</p>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Checkout Domain</label>
                        <input 
                          type="text" 
                          value={settings.domain || ''}
                          onChange={(e) => updateSetting('domain', e.target.value)}
                          placeholder="pay.acme.com" 
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500" 
                        />
                      </div>
                      <button className="w-full bg-white/5 hover:bg-white/10 text-white font-medium px-4 py-3 rounded-xl border border-white/10 transition-colors">
                        Add Domain
                      </button>
                    </div>

                    <div className="bg-black/50 border border-yellow-500/20 rounded-xl p-5 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                          <span className="font-bold text-sm text-yellow-500">DNS Verification Pending</span>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors"><RefreshCw className="w-4 h-4" /></button>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">Add the following CNAME record to your DNS provider to verify ownership.</p>
                      
                      <div className="bg-[#09090B] border border-white/10 rounded-lg p-3">
                        <div className="grid grid-cols-3 gap-2 text-xs font-mono mb-2 text-gray-500">
                          <div>Type</div>
                          <div>Name</div>
                          <div>Target</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs font-mono text-white">
                          <div>CNAME</div>
                          <div>pay</div>
                          <div className="truncate text-teal-400">cname.pgxgateway.com</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-green-500">
                      <Lock className="w-5 h-5" />
                      <div>
                        <div className="font-bold text-sm">SSL Certificate</div>
                        <div className="text-xs opacity-80">Auto-provisioning upon verification</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'branding' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                    <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
                      <h3 className="text-lg font-bold mb-4">Company Logo</h3>
                      <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-teal-500/50 hover:bg-teal-500/5 transition-all">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                          <UploadCloud className="w-6 h-6 text-gray-400" />
                        </div>
                        <h4 className="font-bold mb-1">Upload your primary logo</h4>
                        <p className="text-xs text-gray-500">SVG or transparent PNG recommended</p>
                      </div>
                    </div>

                    <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6">
                      <h3 className="text-lg font-bold mb-4">Color Palette & Fonts</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Primary Action Color</label>
                          <div className="flex gap-4">
                            <input 
                              type="color" 
                              value={settings.primaryColor} 
                              onChange={(e) => updateSetting('primaryColor', e.target.value)}
                              className="w-12 h-12 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                            />
                            <input 
                              type="text" 
                              value={settings.primaryColor}
                              onChange={(e) => updateSetting('primaryColor', e.target.value)}
                              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-sm" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Typography (Google Fonts)</label>
                          <select 
                            value={settings.typography}
                            onChange={(e) => updateSetting('typography', e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500 appearance-none text-sm"
                          >
                            <option>Inter (Default)</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                            <option>Poppins</option>
                            <option>Outfit</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'emails' && (
                  <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 animate-in fade-in slide-in-from-left-4">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-teal-500" /> Email Sender Settings</h3>
                    <p className="text-sm text-gray-400 mb-6">Configure the sender details for automated receipts and notifications sent to your customers.</p>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Sender Name</label>
                        <input 
                          type="text" 
                          value={settings.senderName} 
                          onChange={(e) => updateSetting('senderName', e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Reply-To Address</label>
                        <input 
                          type="email" 
                          value={settings.replyToAddress} 
                          onChange={(e) => updateSetting('replyToAddress', e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500" 
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm">Remove "Powered by PGX"</h4>
                          <p className="text-xs text-gray-500">Remove all PGX Gateway watermarks from emails.</p>
                        </div>
                        <div 
                          onClick={() => updateSetting('removePoweredBy', !settings.removePoweredBy)}
                          className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.removePoweredBy ? 'bg-teal-500' : 'bg-gray-600'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.removePoweredBy ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm">Custom Footer Note</h4>
                          <p className="text-xs text-gray-500">Add your company address to email footers.</p>
                        </div>
                        <div 
                          onClick={() => updateSetting('customFooter', !settings.customFooter)}
                          className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${settings.customFooter ? 'bg-teal-500' : 'bg-gray-600'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.customFooter ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'checkout' && (
                  <div className="bg-[#13131A] border border-white/5 rounded-2xl p-6 animate-in fade-in slide-in-from-left-4">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-teal-500" /> Checkout Experience</h3>
                    <p className="text-sm text-gray-400 mb-6">Configure what information you collect during the checkout flow.</p>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Require Billing Address', key: 'requireBillingAddress' },
                        { label: 'Require Phone Number', key: 'requirePhoneNumber' },
                        { label: 'Collect Customer KYC', key: 'collectCustomerKyc' },
                        { label: 'Show Crypto Network Fee Estimates', key: 'showCryptoFeeEstimates' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-xl">
                          <span className="text-sm font-medium">{item.label}</span>
                          <div 
                            onClick={() => updateSetting(item.key, !settings[item.key])}
                            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${settings[item.key] ? 'bg-teal-500' : 'bg-gray-600'}`}
                          >
                            <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${settings[item.key] ? 'right-1' : 'left-1'}`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Live Preview Panel (Right side) */}
              <div className="lg:col-span-7 h-[800px]">
                <div className="bg-[#13131A] border border-white/5 rounded-2xl h-full flex flex-col overflow-hidden relative shadow-2xl">
                  
                  {/* Browser Chrome Header */}
                  <div className="bg-[#09090B] border-b border-white/5 p-4 flex justify-between items-center z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    
                    <div className="flex-1 max-w-md mx-6 flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono justify-center border border-white/5">
                      <Lock className="w-3 h-3 text-green-500" /> https://pay.acme.com/checkout/INV-8921
                    </div>

                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
                      <button 
                        onClick={() => setPreviewMode('desktop')}
                        className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setPreviewMode('mobile')}
                        className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                      >
                        <Smartphone className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Preview Content Area */}
                  <div className="flex-1 bg-[#050508] p-8 flex items-center justify-center overflow-hidden">
                    {/* The Simulated Checkout Frame */}
                    <div 
                      className={`bg-[#0C0C11] border border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 ${
                        previewMode === 'mobile' ? 'w-[375px] h-[700px]' : 'w-full max-w-3xl h-full max-h-[600px] flex flex-row'
                      }`}
                    >
                      {/* Left Side (Order Summary for Desktop, Top for Mobile) */}
                      <div className={`bg-[#13131A] p-8 flex flex-col justify-between ${previewMode === 'mobile' ? 'border-b border-white/5' : 'w-5/12 border-r border-white/5'}`}>
                        <div>
                          {/* Fake Logo */}
                          <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white" style={{ backgroundColor: settings.primaryColor }}>A</div>
                            <span className="font-bold text-lg tracking-tight">Acme</span>
                          </div>
                          <div className="text-sm text-gray-400 mb-1">Subscribe to</div>
                          <div className="text-xl font-bold mb-6">Enterprise Plan</div>
                          <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-3xl font-black">$499.00</span>
                            <span className="text-gray-400 text-sm">/mo</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 space-y-2">
                          <div className="flex justify-between"><span>Subtotal</span><span>$499.00</span></div>
                          <div className="flex justify-between"><span>Tax</span><span>$0.00</span></div>
                          <div className="w-full h-px bg-white/10 my-2"></div>
                          <div className="flex justify-between font-bold text-white"><span>Total due today</span><span>$499.00</span></div>
                        </div>
                      </div>

                      {/* Right Side (Payment Form) */}
                      <div className={`p-8 ${previewMode === 'mobile' ? 'flex-1' : 'w-7/12'} overflow-y-auto`}>
                        <h3 className="font-bold mb-4">Contact Information</h3>
                        <div className="space-y-3 mb-6">
                          <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5"></div>
                        </div>

                        <h3 className="font-bold mb-4">Payment Method</h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="h-12 rounded-lg border-2 flex items-center justify-center gap-2 bg-[#1A1A24]" style={{ borderColor: settings.primaryColor }}>
                            <div className="w-4 h-4 rounded-full border-4" style={{ borderColor: settings.primaryColor }}></div>
                            <span className="font-bold text-sm">Card</span>
                          </div>
                          <div className="h-12 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center gap-2 text-gray-400">
                            <div className="w-4 h-4 rounded-full border-2 border-gray-500"></div>
                            <span className="font-medium text-sm">Crypto</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-8">
                          <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5"></div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5"></div>
                            <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5"></div>
                          </div>
                        </div>

                        <button 
                          className="w-full h-12 rounded-lg font-bold text-white shadow-lg transition-all"
                          style={{ backgroundColor: settings.primaryColor }}
                        >
                          Subscribe
                        </button>
                        
                        {activeTab === 'emails' ? (
                           <div className="text-center text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-1 opacity-0">Powered by PGX</div>
                        ) : (
                           <div className="text-center text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-1"><Lock className="w-3 h-3"/> Secured by PGX</div>
                        )}
                        
                      </div>
                    </div>
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

export default WhiteLabel;
