import { useState } from 'react';
import { Users, Search, Download, ExternalLink, Mail, UserPlus, Eye, Edit2, Trash2, X, Save } from 'lucide-react';

const initialCustomers = Array(15).fill(null).map((_, i) => ({
  id: `CUST-${1000 + i}`,
  name: ['John Smith', 'Sarah Jones', 'Michael Brown', 'Emma Wilson', 'David Lee'][Math.floor(Math.random() * 5)],
  email: `user${1000+i}@example.com`,
  ltv: (Math.random() * 5000 + 100).toFixed(2),
  txCount: Math.floor(Math.random() * 50 + 1),
  risk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
  joined: new Date(Date.now() - Math.random() * 50000000000).toLocaleDateString(),
}));

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [modalType, setModalType] = useState(null); // 'add', 'edit', 'view'
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: '', email: '', risk: 'Low', ltv: '0.00', txCount: 0, joined: new Date().toLocaleDateString() 
  });

  const filteredCustomers = customers.filter(cust => 
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const openAddModal = () => {
    setFormData({ name: '', email: '', risk: 'Low', ltv: '0.00', txCount: 0, joined: new Date().toLocaleDateString() });
    setModalType('add');
  };

  const openEditModal = (cust) => {
    setSelectedCustomer(cust);
    setFormData({ name: cust.name, email: cust.email, risk: cust.risk, ltv: cust.ltv, txCount: cust.txCount, joined: cust.joined });
    setModalType('edit');
  };

  const openViewModal = (cust) => {
    setSelectedCustomer(cust);
    setModalType('view');
  };

  const handleSave = () => {
    if (!formData.name || !formData.email) return;

    if (modalType === 'add') {
      const newCust = {
        id: `CUST-${Math.floor(Math.random() * 9000) + 1000}`,
        name: formData.name,
        email: formData.email,
        risk: formData.risk,
        ltv: formData.ltv,
        txCount: formData.txCount,
        joined: formData.joined,
      };
      setCustomers([newCust, ...customers]);
    } else if (modalType === 'edit') {
      setCustomers(customers.map(c => 
        c.id === selectedCustomer.id 
          ? { ...c, name: formData.name, email: formData.email, risk: formData.risk, ltv: formData.ltv, txCount: formData.txCount, joined: formData.joined }
          : c
      ));
    }
    setModalType(null);
  };

  return (
    <div className="w-full animate-in fade-in zoom-in-95 duration-500">
      <div className="w-full flex flex-col">
        <div className="w-full">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" /> Customers
              </h1>
              <p className="text-gray-400">Manage your customers and view their lifetime value.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2.5 rounded-xl transition-all font-bold text-sm">
                <Download className="w-4 h-4" /> Export
              </button>
              <button 
                onClick={openAddModal}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl transition-all font-bold text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
              >
                <UserPlus className="w-4 h-4" /> Add Customer
              </button>
            </div>
          </div>

          <div className="bg-[#13131A] border border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-white/5 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search customers by name, email, or ID..." 
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-white/5 bg-black/20">
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Joined Date</th>
                    <th className="p-4 font-medium text-right">Tx Count</th>
                    <th className="p-4 font-medium text-right">Lifetime Value</th>
                    <th className="p-4 font-medium text-center">Risk</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-gray-500">No customers found.</td>
                    </tr>
                  ) : filteredCustomers.map((cust, i) => (
                    <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shadow-sm border border-primary/20">
                            {cust.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-white">{cust.name}</div>
                            <div className="text-[10px] text-gray-500 font-mono tracking-wider">{cust.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400">
                        <div className="flex items-center gap-2 text-xs">
                          <Mail className="w-3.5 h-3.5 text-gray-500" /> {cust.email}
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 text-xs">{cust.joined}</td>
                      <td className="p-4 text-white text-right font-medium">{cust.txCount}</td>
                      <td className="p-4 text-green-400 font-bold text-right">${cust.ltv}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          cust.risk === 'Low' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          cust.risk === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {cust.risk}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openViewModal(cust)} className="p-1.5 bg-white/5 hover:bg-white/10 text-blue-400 rounded-md transition-colors" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => openEditModal(cust)} className="p-1.5 bg-white/5 hover:bg-white/10 text-yellow-400 rounded-md transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(cust.id)} className="p-1.5 bg-white/5 hover:bg-red-500/20 text-red-400 rounded-md transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#13131A] border border-white/10 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-[#09090B]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {modalType === 'view' ? <Eye className="w-5 h-5 text-primary" /> : 
                 modalType === 'edit' ? <Edit2 className="w-5 h-5 text-primary" /> : 
                 <UserPlus className="w-5 h-5 text-primary" />}
                {modalType === 'view' ? 'Customer Details' : 
                 modalType === 'edit' ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <button 
                onClick={() => setModalType(null)}
                className="text-gray-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5">
              
              {modalType === 'view' && selectedCustomer ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-2xl border border-primary/20">
                      {selectedCustomer.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{selectedCustomer.name}</h4>
                      <p className="text-sm text-gray-400 font-mono">{selectedCustomer.id}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Email</p>
                      <p className="text-sm text-white">{selectedCustomer.email}</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Joined Date</p>
                      <p className="text-sm text-white">{selectedCustomer.joined}</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Lifetime Value</p>
                      <p className="text-lg font-bold text-green-400">${selectedCustomer.ltv}</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Transactions</p>
                      <p className="text-lg font-bold text-white">{selectedCustomer.txCount}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-bold text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. john@example.com" 
                      className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-bold text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Joined Date</label>
                      <input 
                        type="text" 
                        value={formData.joined}
                        onChange={(e) => setFormData({...formData, joined: e.target.value})}
                        className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Tx Count</label>
                      <input 
                        type="number" 
                        value={formData.txCount}
                        onChange={(e) => setFormData({...formData, txCount: e.target.value})}
                        className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-bold text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Lifetime Value (LTV)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                        <input 
                          type="text" 
                          value={formData.ltv}
                          onChange={(e) => setFormData({...formData, ltv: e.target.value})}
                          className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-bold text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Risk Profile</label>
                      <select 
                        value={formData.risk}
                        onChange={(e) => setFormData({...formData, risk: e.target.value})}
                        className="w-full bg-[#09090B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none font-bold text-sm"
                      >
                        <option value="Low">Low Risk</option>
                        <option value="Medium">Medium Risk</option>
                        <option value="High">High Risk</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-[#09090B] flex gap-3 shrink-0">
              <button 
                onClick={() => setModalType(null)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white transition-colors"
              >
                {modalType === 'view' ? 'Close' : 'Cancel'}
              </button>
              {modalType !== 'view' && (
                <button 
                  onClick={handleSave}
                  disabled={!formData.name || !formData.email}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" /> 
                  {modalType === 'edit' ? 'Save Changes' : 'Add Customer'}
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Customers;
