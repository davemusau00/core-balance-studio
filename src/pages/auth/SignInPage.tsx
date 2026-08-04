import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';
import { Eye, EyeOff, ArrowRight, Sparkles, User, Shield } from 'lucide-react';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, demoSignIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState<'client' | 'admin' | null>(null);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const { error: err } = await signIn(email, password);
    setIsSubmitting(false);
    if (err) { setError(err); return; }
    navigate(from, { replace: true });
  };

  const handleDemo = async (role: 'client' | 'admin') => {
    setIsDemoLoading(role);
    await demoSignIn(role);
    setIsDemoLoading(null);
    navigate(role === 'admin' ? '/admin' : '/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#fbf9fd] flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-8 py-5 border-b border-[#e5e2eb] bg-white/90 backdrop-blur-md">
        <Link to="/">
          <Logo size="md" />
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md space-y-6">

          {/* Heading */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f0fb] border border-[#d3c2f0] text-xs font-semibold text-[#6b4cc6] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#1c1c2b]">Welcome back</h1>
            <p className="text-sm text-[#6b7280]">
              Sign in to manage your classes & bookings.
            </p>
          </div>

          {/* Demo buttons */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider text-center">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleDemo('client')}
                disabled={!!isDemoLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#f4f0fb] hover:bg-[#e9e0f6] border border-[#d3c2f0] text-[#4e2f80] rounded-2xl text-xs font-semibold transition-all disabled:opacity-60"
              >
                {isDemoLoading === 'client' ? (
                  <div className="w-4 h-4 border-2 border-[#6b4cc6] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                Demo Client
              </button>
              <button
                onClick={() => handleDemo('admin')}
                disabled={!!isDemoLoading}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1c1c2b] hover:bg-black text-white rounded-2xl text-xs font-semibold transition-all disabled:opacity-60"
              >
                {isDemoLoading === 'admin' ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                Demo Admin
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#e5e2eb]" />
            <span className="text-[11px] text-[#9ca3af] font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-[#e5e2eb]" />
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium px-4 py-3 rounded-2xl">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-[#33333f]">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white rounded-2xl border border-[#e5e2eb] text-sm text-[#1c1c2b] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold text-[#33333f]">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white rounded-2xl border border-[#e5e2eb] text-sm text-[#1c1c2b] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6b4cc6] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280] p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#6b4cc6] hover:bg-[#5b3894] text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-[#6b4cc6]/25 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#6b7280]">
            New to Core Balance?{' '}
            <Link to="/signup" className="font-semibold text-[#6b4cc6] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
