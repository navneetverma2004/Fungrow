import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldAlert,
  Users,
  Building,
  FolderKanban,
  FileSpreadsheet,
  Receipt,
  Flag,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loginAsDemo } = useAuth();

  const navItems = [
    { label: 'Admin Dashboard', path: '/admin/dashboard', icon: ShieldAlert },
    { label: 'Manage Users', path: '/admin/users', icon: Users },
    { label: 'Verify Companies', path: '/admin/companies', icon: Building },
    { label: 'Review Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Monitor Applications', path: '/admin/applications', icon: FileSpreadsheet },
    { label: 'Transaction Audit', path: '/admin/payments', icon: Receipt },
    { label: 'Moderation Reports', path: '/admin/reports', icon: Flag },
    { label: 'Platform Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-950 px-4 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-slate-800">
        <Logo variant="light" size="sm" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 z-50 md:z-10 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Logo variant="light" size="md" />
        </div>

        <div className="p-4 mx-4 my-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <span className="font-bold block text-sm">Super Admin Console</span>
          Ecosystem Moderation & Safety Audits
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => {
                loginAsDemo('teen');
                navigate('/teen/dashboard');
              }}
              className="py-1 px-2 rounded bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Teen Portal
            </button>
            <button
              onClick={() => {
                loginAsDemo('company');
                navigate('/company/dashboard');
              }}
              className="py-1 px-2 rounded bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Company Portal
            </button>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/30 rounded-lg"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-y-auto">
        <header className="px-8 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Production Safety Guard • 0 Flagged Violations
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Session ID: adm-demo-root</span>
        </header>
        <div className="p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
