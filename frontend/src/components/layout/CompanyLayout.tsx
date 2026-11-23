import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  FileCheck2,
  Users,
  Activity,
  CreditCard,
  BarChart3,
  MessageSquare,
  Bell,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

export const CompanyLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, companyProfile, logout, loginAsDemo } = useAuth();

  const navItems = [
    { label: 'Overview', path: '/company/dashboard', icon: LayoutDashboard },
    { label: 'Post a Project', path: '/company/post-project', icon: PlusCircle, highlight: true },
    { label: 'My Projects', path: '/company/projects', icon: Briefcase },
    { label: 'Applications', path: '/company/applications', icon: FileCheck2, badge: 'Review' },
    { label: 'Discover Talent', path: '/company/talent', icon: Users },
    { label: 'Active Projects', path: '/company/active-projects', icon: Activity },
    { label: 'Payments & Invoices', path: '/company/payments', icon: CreditCard },
    { label: 'Analytics & ROI', path: '/company/analytics', icon: BarChart3 },
    { label: 'Messages', path: '/company/messages', icon: MessageSquare },
    { label: 'Notifications', path: '/company/notifications', icon: Bell },
    { label: 'Company Profile', path: '/company/profile', icon: Building2 },
    { label: 'Settings', path: '/company/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <Logo variant="light" size="sm" />
        <div className="flex items-center gap-3">
          <Link to="/company/post-project">
            <Button variant="primary" size="sm">
              Post Project
            </Button>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
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

        {/* Company Overview Card */}
        <div className="p-4 mx-4 my-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
          <img
            src={companyProfile?.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100'}
            alt="Company Logo"
            className="w-11 h-11 rounded-xl object-cover ring-2 ring-indigo-500/50 bg-white"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white truncate">
                {companyProfile?.companyName || 'Nexus Innovations'}
              </h4>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            </div>
            <p className="text-xs text-slate-400 truncate">
              {companyProfile?.industry || 'EdTech & Software'}
            </p>
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
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold'
                    : item.highlight
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/80 space-y-2">
          {/* Quick Demo Switcher */}
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-[11px] text-slate-400 block mb-1.5">Switch View (Demo):</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  loginAsDemo('teen');
                  navigate('/teen/dashboard');
                }}
                className="py-1 px-2 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[11px] font-semibold transition-colors"
              >
                Teen View
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
        {/* Top Header inside Company Portal */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-20">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {companyProfile?.companyName || 'Nexus Innovations'} Workspace
            </h2>
            <p className="text-xs text-slate-500">
              Enterprise Dashboard • 3 Active Projects • 20 Total Teen Applications
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/company/post-project">
              <Button variant="primary" size="sm" icon={<PlusCircle className="w-4 h-4" />}>
                Post New Project
              </Button>
            </Link>

            <Link
              to="/company/notifications"
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white" />
            </Link>

            <Link
              to="/company/profile"
              className="flex items-center gap-2.5 pl-3 border-l border-slate-200 hover:opacity-80 transition-opacity"
            >
              <img
                src={companyProfile?.logoUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100'}
                alt="Company Logo"
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500"
              />
              <span className="text-xs font-semibold text-slate-700 hidden lg:inline">
                {companyProfile?.contactPerson || 'Company Admin'}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
