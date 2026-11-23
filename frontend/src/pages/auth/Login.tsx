import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Lock, Mail, Sparkles, Building2, ShieldAlert, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const ok = login(email);
      if (ok) {
        showToast('Successfully logged in!', 'success');
        if (email.includes('company')) {
          navigate('/company/dashboard');
        } else if (email.includes('admin')) {
          navigate('/admin/dashboard');
        } else {
          navigate('/teen/dashboard');
        }
      }
    }, 600);
  };

  const handleDemoClick = (role: 'teen' | 'company' | 'admin') => {
    loginAsDemo(role);
    showToast(`Logged in with Demo ${role.toUpperCase()} account`, 'info');
    if (role === 'teen') navigate('/teen/dashboard');
    else if (role === 'company') navigate('/company/dashboard');
    else navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <Logo size="lg" />
          <h2 className="text-2xl font-extrabold text-slate-900 mt-4">Welcome back</h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your projects, messages, and wallet.
          </p>
        </div>

        {/* 1-Click Quick Demo Login Section */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              One-Click Instant Demo Login
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoClick('teen')}
              className="px-2.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-bold transition-all text-center"
            >
              Teenlancer
              <span className="block text-[10px] font-normal opacity-80">Aarav (Student)</span>
            </button>
            <button
              onClick={() => handleDemoClick('company')}
              className="px-2.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-bold transition-all text-center"
            >
              Company
              <span className="block text-[10px] font-normal opacity-80">Nexus Tech</span>
            </button>
            <button
              onClick={() => handleDemoClick('admin')}
              className="px-2.5 py-2 rounded-xl bg-amber-600/30 hover:bg-amber-600 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold transition-all text-center"
            >
              Admin
              <span className="block text-[10px] font-normal opacity-80">Platform Mod</span>
            </button>
          </div>
        </div>

        {/* Standard Login Card */}
        <Card className="p-8 border-slate-200">
          <form onSubmit={handleStandardLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. teen@funngro.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link to="/auth/forgot-password" className="text-xs font-semibold text-emerald-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4 text-slate-400" />}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full font-bold"
              isLoading={isLoading}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/auth/register" className="font-bold text-emerald-600 hover:underline">
              Create free profile
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
