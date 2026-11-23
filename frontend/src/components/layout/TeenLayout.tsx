import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Compass,
  FileText,
  Briefcase,
  CheckSquare,
  UserCheck,
  Wallet,
  Trophy,
  Users,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

export const TeenLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, teenProfile, logout, loginAsDemo } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/teen/dashboard', icon: LayoutDashboard },
    { label: 'Explore Projects', path: '/teen/explore', icon: Compass, badge: 'New' },
    { label: 'My Applications', path: '/teen/my-applications', icon: FileText },
    { label: 'My Projects', path: '/teen/my-projects', icon: Briefcase },
    { label: 'Tasks & Milestones', path: '/teen/tasks', icon: CheckSquare },
    { label: 'My Portfolio', path: '/teen/portfolio', icon: UserCheck },
    { label: 'Earnings & Wallet', path: '/teen/earnings', icon: Wallet, highlight: true },
    { label: 'Leaderboard', path: '/teen/leaderboard', icon: Trophy },
    { label: 'Referrals', path: '/teen/referrals', icon: Users },
    { label: 'Messages', path: '/teen/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/teen/notifications', icon: Bell },
    { label: 'Settings', path: '/teen/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <Logo variant="light" size="sm" />
        <div className="flex items-center gap-3">
          <Link to="/teen/notifications" className="p-1.5 text-slate-300 hover:text-white">
            <Bell className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-72 bg-funngro-navy text-slate-300 flex flex-col border-r border-slate-800 z-50 md:z-10 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <Logo variant="light" size="md" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teen Profile Overview Card */}
        <div className="p-4 mx-4 my-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <img
            src={teenProfile?.avatarUrl || user?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
            alt="Teen Avatar"
            className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/50"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate">
              {teenProfile?.displayName || user?.fullName || 'Aarav S.'}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {teenProfile?.badgeLevel || 'Pro Teenlancer'}
              </span>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-0.5">
                <Sparkles className="w-3 h-3" /> {teenProfile?.points || 1250}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="text-xs font-bold text-emerald-400">
                    ₹{teenProfile?.availableBalance?.toLocaleString() || '8,200'}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          {/* Role switcher for evaluation convenience */}
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 block mb-1.5">Switch View (Demo):</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  loginAsDemo('company');
                  navigate('/company/dashboard');
                }}
                className="py-1 px-2 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[11px] font-semibold transition-colors"
              >
                Company View
              </button>
              <button
                onClick={() => {
                  loginAsDemo('admin');
                  navigate('/admin/dashboard');
                }}
                className="py-1 px-2 rounded bg-amber-600/30 hover:bg-amber-600 text-amber-300 hover:text-white text-[11px] font-semibold transition-colors"
              >
                Admin View
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header inside Teen Portal */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Welcome back, {teenProfile?.displayName || user?.fullName || 'Aarav'} 👋
            </h2>
            <p className="text-xs text-slate-500">
              You have 2 active projects in progress and ₹{teenProfile?.availableBalance?.toLocaleString() || '8,200'} available to withdraw.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/teen/explore"
              className="px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 flex items-center gap-1.5 transition-colors"
            >
              <Compass className="w-3.5 h-3.5" /> Explore 15+ Projects
            </Link>

            <Link
              to="/teen/notifications"
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </Link>

            <Link
              to="/teen/portfolio"
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity"
            >
              <img
                src={teenProfile?.avatarUrl || user?.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
              />
              <span className="text-xs font-semibold text-slate-700 hidden lg:inline">
                {teenProfile?.displayName || 'My Profile'}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Outlet */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
