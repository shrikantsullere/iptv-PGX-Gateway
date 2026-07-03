import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Building2, Gamepad2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';

import apiClient from '../../utils/apiClient';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.success) {
        localStorage.setItem('pgx_token', res.data.token);
        localStorage.setItem('pgx_user', JSON.stringify(res.data.user));
        
        // Route based on role
        if (res.data.user.role === 'Merchant' || email.includes('merchant')) {
           navigate('/merchant-dashboard');
        } else if (res.data.user.role === 'User' || email.includes('user@pgx')) {
           navigate('/playgroundx');
        } else {
           navigate('/super-admin');
        }
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="mb-8 relative z-10">
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome back</h2>
        <p className="text-gray-400 text-sm">Log in to your PGX Gateway account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between">
            {error}
          </div>
        )}

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            required
            className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
            placeholder="Business Email"
          />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-[#7C3AED] transition-colors" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            required
            className="w-full bg-[#09090B] border border-white/10 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all text-sm"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-500 hover:text-gray-300 transition-colors" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded bg-[#09090B] border-white/20 text-[#7C3AED] focus:ring-[#7C3AED] focus:ring-offset-[#13131A] accent-[#7C3AED] cursor-pointer" />
            <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-[#7C3AED] font-bold hover:text-cyan-400 transition-colors">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>Login <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#13131A] text-gray-500">Quick Access (Live API Demo)</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                const form = document.querySelector('form');
                form.elements['email'].value = 'superadmin@pgx.com';
                form.elements['password'].value = 'password123';
                handleSubmit({ preventDefault: () => {}, target: form });
              }}
              className="flex flex-col items-center justify-center gap-2 py-3 bg-[#09090B] border border-white/10 hover:border-purple-500/50 hover:bg-white/5 rounded-xl transition-all group"
              title="Super Admin Login"
            >
              <ShieldCheck className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider">Admin</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const form = document.querySelector('form');
                form.elements['email'].value = 'merchant@pgx.com';
                form.elements['password'].value = 'password123';
                handleSubmit({ preventDefault: () => {}, target: form });
              }}
              className="flex flex-col items-center justify-center gap-2 py-3 bg-[#09090B] border border-white/10 hover:border-cyan-500/50 hover:bg-white/5 rounded-xl transition-all group"
              title="Merchant Login"
            >
              <Building2 className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider">Merchant</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const form = document.querySelector('form');
                form.elements['email'].value = 'user@pgx.com';
                form.elements['password'].value = 'password123';
                handleSubmit({ preventDefault: () => {}, target: form });
              }}
              className="flex flex-col items-center justify-center gap-2 py-3 bg-[#09090B] border border-white/10 hover:border-pink-500/50 hover:bg-white/5 rounded-xl transition-all group"
              title="PlayGroundX"
            >
              <Gamepad2 className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider">PGX</span>
            </button>
          </div>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-gray-400 relative z-10">
        Don't have an account?{' '}
        <Link to="/register" className="text-white font-bold hover:text-[#7C3AED] transition-colors">
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
