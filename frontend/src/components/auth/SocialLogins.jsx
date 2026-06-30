const SocialLogins = () => {
  return (
    <div className="space-y-3 mt-6">
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-white/10"></div>
        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs font-medium uppercase tracking-widest">Or</span>
        <div className="flex-grow border-t border-white/10"></div>
      </div>

      <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#09090B] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-all">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>

      <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#09090B] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-all">
        <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-5 h-5 brightness-200" />
        Continue with GitHub
      </button>
      
      <button type="button" className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#09090B] hover:bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-gray-300 hover:text-white transition-all">
        <img src="https://www.svgrepo.com/show/475661/microsoft-color.svg" alt="Microsoft" className="w-5 h-5" />
        Continue with Microsoft
      </button>
    </div>
  );
};

export default SocialLogins;
