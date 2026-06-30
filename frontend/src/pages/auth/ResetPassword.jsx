import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <AuthLayout>
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Set New Password</h2>
        <p className="text-gray-400 text-sm">Please enter your new password below.</p>
      </div>

      {isSuccess ? (
        <div className="relative z-10 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Password Updated Successfully</h3>
          <p className="text-sm text-gray-400 mb-6">
            Your password has been changed. You can now log in.
          </p>
          <Link to="/login" className="w-full inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all">
            Go to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
              placeholder="New Password"
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300" /> : <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300" />}
            </button>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
              placeholder="Confirm New Password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Update Password <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
