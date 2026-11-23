import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import {
  Menu,
  X,
  Sparkles,
  Briefcase,
  GraduationCap,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const location = useLocation();
  const { user, loginAsDemo, logout } = useAuth();

  const navLinks = [
    { name: 'For Teens', path: '/teen', badge: 'Earn & Learn' },
    { name: 'For Companies', path: '/company', badge: 'Hire Gen-Z' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardLink = () => {
    if (!user) return '/auth/login';
    if (user.role === 'teen') return '/teen/dashboard';
    if (user.role === 'company') return '/company/dashboard';
    return '/admin/dashboard';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Banner for Demo Quick Switch */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline font-medium text-slate-300">
            Funngro Smart Ecosystem (Demo Mode Active)
          </span>
          <span className="sm:hidden font-medium text-slate-300">Demo Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden md:inline">Instant Role Switch:</span>
          <button
            onClick={() => loginAsDemo('teen')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              user?.role === 'teen'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Teen
          </button>
          <button
            onClick={() => loginAsDemo('company')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              user?.role === 'company'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Company
          </button>
          <button
            onClick={() => loginAsDemo('admin')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              user?.role === 'admin'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                        link.path === '/teen'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardLink()}>
                  <Button variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    Go to {user.role === 'teen' ? 'Teen Portal' : user.role === 'company' ? 'Company Portal' : 'Admin'}
                  </Button>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-semibold text-slate-500 hover:text-rose-600 px-2 py-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="primary" size="sm" icon={<Sparkles className="w-4 h-4 text-emerald-200" />}>
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to={getDashboardLink()}>
              <Button variant="primary" size="sm">
                Dashboard
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="secondary" className="w-full">
                    Enter {user.role.toUpperCase()} Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-rose-600"
                >
                  Sign Out ({user.fullName})
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
