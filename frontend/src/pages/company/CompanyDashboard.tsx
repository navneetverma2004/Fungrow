import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { storageService } from '@/services/storageService';
import {
  Briefcase,
  Users,
  FileCheck2,
  TrendingUp,
  PlusCircle,
  CreditCard,
  Clock,
  ArrowRight,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const CompanyDashboard: React.FC = () => {
  const { companyProfile } = useAuth();
  const companyId = companyProfile?.id || 'comp-1';

  const allProjects = storageService.getProjects().filter((p) => p.companyId === companyId);
  const allApplications = storageService.getApplications().filter((a) => a.companyId === companyId);
  const activeProjects = storageService.getAssignedProjects().filter((a) => a.companyId === companyId);

  const chartData = [
    { name: 'Mon', applications: 4 },
    { name: 'Tue', applications: 7 },
    { name: 'Wed', applications: 5 },
    { name: 'Thu', applications: 9 },
    { name: 'Fri', applications: 12 },
    { name: 'Sat', applications: 6 },
    { name: 'Sun', applications: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-funngro-navy to-indigo-950 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Employer Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Welcome, {companyProfile?.companyName || 'Nexus Innovations'}
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            You have {allApplications.length} candidate applications awaiting review and {activeProjects.length} active assignments in progress.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/company/post-project">
              <Button
                variant="primary"
                size="md"
                className="bg-indigo-600 hover:bg-indigo-700 shadow-md font-bold"
                icon={<PlusCircle className="w-4 h-4" />}
              >
                Post New Project
              </Button>
            </Link>
            <Link to="/company/applications">
              <Button
                variant="outline"
                size="md"
                className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700"
              >
                Review Applications ({allApplications.length})
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects Posted</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {allProjects.length || 8}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">3 Active • 5 Completed</span>
        </Card>

        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Applications Received</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {allApplications.length || 20}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            {allApplications.filter((a) => a.status === 'Accepted').length} Accepted Candidates
          </span>
        </Card>

        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Ongoing Assignments</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {activeProjects.length || 3}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Milestones on schedule</span>
        </Card>

        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Approved Spend</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹{companyProfile?.totalSpent?.toLocaleString() || '85,000'}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">All milestones verified</span>
        </Card>
      </div>

      {/* Grid: Application Volume Chart & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recharts Application Volume */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Application Volume This Week</h3>
                <p className="text-xs text-slate-500">Student proposal submissions over the last 7 days</p>
              </div>
              <Badge variant="indigo">Live Activity</Badge>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderRadius: '12px',
                      color: '#fff',
                      border: 'none',
                    }}
                  />
                  <Bar dataKey="applications" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Active Projects Quick Table */}
          <Card className="p-6 border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Active Work Deliverables</h3>
              <Link to="/company/active-projects" className="text-xs font-bold text-indigo-600 hover:underline">
                View All ({activeProjects.length}) →
              </Link>
            </div>

            <div className="space-y-3">
              {activeProjects.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <h5 className="font-bold text-slate-900">{item.projectTitle}</h5>
                    <span className="text-slate-500">Teenlancer: {item.teenName} • Due: {item.deadline}</span>
                  </div>
                  <Badge variant={item.workStatus === 'Submitted' ? 'blue' : 'green'}>
                    {item.workStatus}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Recent Applications Feed */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Recent Applications</h3>
            <Link to="/company/applications" className="text-xs font-bold text-indigo-600 hover:underline">
              Manage All →
            </Link>
          </div>

          <div className="space-y-4">
            {allApplications.slice(0, 4).map((app) => (
              <Card key={app.id} className="p-4 border-slate-200" hover>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={app.teenAvatar}
                      alt={app.teenName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{app.teenName}</h4>
                      <span className="text-[11px] text-slate-500">{app.teenEducation}</span>
                    </div>
                  </div>
                  <Badge variant={app.status === 'Accepted' ? 'green' : 'slate'} size="sm">
                    {app.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-lg mb-3">
                  "{app.coverLetter}"
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="text-slate-500">{app.projectTitle.slice(0, 24)}...</span>
                  <Link to="/company/applications">
                    <Button variant="outline" size="sm" className="text-xs py-1">
                      Review Candidate
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
