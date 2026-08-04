import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { Eye, EyeOff, ArrowRight, Sparkles, User, Shield } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, demoSignIn } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState<'client' | 'admin' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setIsSubmitting(true);
    const { error: err } = await signUp(email, password, name, phone);
    setIsSubmitting(false);
    if (err) { setError(err); return; }
    navigate('/dashboard', { replace: true });
  };

  const handleDemo = async (role: 'client' | 'admin') => {
    setIsDemoLoading(role);
    await demoSignIn(role);
    setIsDemoLoading(null);
    navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#fbf9fd] flex flex-col">
      <header className="px-4 sm:px-8 py-5 border-b border-[#e5e2eb] bg-white/90 backdrop-blur-md">
        <Link to="/"><Logo size="md" /></Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f0fb] border border-[#d3c2f0] text-xs font-semibold text-[#6b4cc6] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join Core Balance</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1c1c2b]">Create your account</h1>
            <p className="text-sm text-[#6b7280]">Start your reformer journey with us today.</p>
          </div>

          {/* Demo buttons */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider text-center">Or try a demo</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleDemo('client')} disabled={!!isDemoLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#f4f0fb] hover:bg-[#e9e0f6] border border-[#d3c2f0] text-[#4e2f80] rounded-2xl text-xs font-semibold transition-all disabled:opacity-60">
                {isDemoLoading === 'client' ? <div className="w-4 h-4 border-2 border-[#6b4cc6] border-t-transparent rounded-full animate-spin" /> : <User className="w-4 h-4" />}
                Demo Client
              </button>
              <button onClick={() => handleDemo('admin')} disabled={!!isDemoLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1c1c2b] hover:bg-black text-white rounded-2xl text-xs font-semibold transition-all disabled:opacity-60">
                {isDemoLoading === 'admin' ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Shield className="w-4 h-4" />}
                Demo Admin
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e5e2eb]" />
            <span className="text-[11px] text-[#9ca3af] font-medium">or create account</span>
            <div className="flex-1 h-px bg-[#e5e2eb]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium px-4 py-3 rounded-2xl">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold text-[#33333f]">Full Name</label>
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Wambui Njoroge"
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e2eb] text-sm text-[#1c1c2b] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] focus:border-transparent transition-all" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-xs font-semibold text-[#33333f]">Phone Number</label>
                <input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+254 712 345 678"
                  className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e2eb] text-sm text-[#1c1c2b] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-[#33333f]">Email Address</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e2eb] text-sm text-[#1c1c2b] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] focus:border-transparent transition-all" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-[#33333f]">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="At least 6 characters"
                  className="w-full px-4 py-3 pr-12 bg-white rounded-2xl border border-[#e5e2eb] text-sm text-[#1c1c2b] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] focus:border-transparent transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] p-1">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-3.5 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-[#6b4cc6]/25 flex items-center justify-center gap-2 disabled:opacity-60">
              {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>

            <p className="text-[10px] text-center text-[#9ca3af] leading-relaxed">
              By creating an account you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <p className="text-center text-xs text-[#6b7280]">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold text-[#6b4cc6] hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
