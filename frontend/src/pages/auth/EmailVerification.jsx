import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';

const EmailVerification = () => {
  return (
    <AuthLayout>
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Animated Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#13131A] to-[#09090B] border border-green-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(34,197,94,0.3)]">
             {/* Circular SVG animation */}
             <svg className="absolute inset-0 w-full h-full -rotate-90 text-green-500" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="301" strokeDashoffset="0" className="animate-[dash_1.5s_ease-out_forwards]" />
             </svg>
             <style>{`
               @keyframes dash {
                 from { stroke-dashoffset: 301; }
                 to { stroke-dashoffset: 0; }
               }
             `}</style>
             <CheckCircle2 className="w-12 h-12 text-green-500 animate-[bounce_1s_ease-out]" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Email Verified!</h2>
        <p className="text-gray-400 text-sm mb-10 max-w-sm">
          Your email has been verified successfully. Your PGX Gateway account is now active and ready to use.
        </p>

        <Link
          to="/merchant-dashboard"
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2"
        >
          Continue to Dashboard <ArrowRight className="w-5 h-5" />
        </Link>

      </div>
    </AuthLayout>
  );
};

export default EmailVerification;
