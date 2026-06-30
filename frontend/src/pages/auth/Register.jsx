import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Building2, Mail, Phone, Globe, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/verify-email');
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Create Account</h2>
        <p className="text-gray-400 text-sm">Join the enterprise crypto payment network.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input type="text" required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm" placeholder="Full Name" />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building2 className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input type="text" required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm" placeholder="Company Name" />
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
          </div>
          <input type="email" required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm" placeholder="Business Email" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input type="tel" required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm" placeholder="Phone Number" />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <select required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm appearance-none">
              <option value="" disabled selected>Country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input type={showPassword ? 'text' : 'password'} required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm" placeholder="Password" />
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input type={showPassword ? 'text' : 'password'} required className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm" placeholder="Confirm" />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-500 hover:text-gray-300" /> : <Eye className="h-4 w-4 text-gray-500 hover:text-gray-300" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" required className="mt-1 w-4 h-4 rounded bg-[#09090B] border-white/20 text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED] cursor-pointer shrink-0" />
            <span className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">
              I accept the <a href="#" className="text-white hover:text-[#7C3AED] transition-colors">Terms & Conditions</a> and <a href="#" className="text-white hover:text-[#7C3AED] transition-colors">Privacy Policy</a> of PGX Gateway.
            </span>
          </label>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3.5 mt-2 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>Create Account <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
        
      </form>

      <p className="mt-8 text-center text-sm text-gray-400 relative z-10">
        Already have an account?{' '}
        <Link to="/login" className="text-white font-bold hover:text-[#7C3AED] transition-colors">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
