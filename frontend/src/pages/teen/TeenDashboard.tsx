import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { storageService } from '@/services/storageService';
import {
  Compass,
  Briefcase,
  FileText,
  Wallet,
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
} from 'lucide-react';

export const TeenDashboard: React.FC = () => {
  const { user, teenProfile } = useAuth();
  const allProjects = storageService.getProjects();
  const myApplications = storageService.getApplications().filter((a) => a.teenId === (teenProfile?.id || 'teen-1'));
  const myAssigned = storageService.getAssignedProjects().filter((a) => a.teenId === (teenProfile?.id || 'teen-1'));

  const recommendedProjects = allProjects.filter((p) => p.featured || (p.matchScore && p.matchScore > 90)).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 text-white p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Profile Completion: {teenProfile?.completionScore || 95}%</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Hey {teenProfile?.displayName || user?.fullName || 'Aarav'}! Ready to create today?
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed mb-6">
            You have 2 active projects in progress and 3 high-match projects waiting for your application.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/teen/explore">
              <Button
                variant="primary"
                className="bg-white text-emerald-800 hover:bg-emerald-50 shadow-md font-bold"
                icon={<Compass className="w-4 h-4 text-emerald-600" />}
              >
                Browse Matched Projects
              </Button>
            </Link>
            <Link to="/teen/tasks">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                View Pending Tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Balance</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹{teenProfile?.availableBalance?.toLocaleString() || '8,200'}
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
            <span>Pending: ₹{teenProfile?.pendingBalance?.toLocaleString() || '4,500'}</span>
            <Link to="/teen/earnings" className="text-emerald-600 font-bold hover:underline">
              Withdraw →
            </Link>
          </div>
        </Card>

        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {myAssigned.length || 2}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            <span>Next deadline: Nov 28</span>
          </div>
        </Card>

        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Applications</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {myApplications.length || 2}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            <span className="text-emerald-600 font-bold">2 Accepted</span>
          </div>
        </Card>

        <Card className="p-5 border-slate-200">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Earned</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹{teenProfile?.totalEarnings?.toLocaleString() || '24,500'}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            <span>{teenProfile?.completedProjectsCount || 8} projects certified</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Active Assignments & Smart Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Active Assignments & Tasks */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Ongoing Project Assignments</h3>
            <Link to="/teen/my-projects" className="text-xs font-bold text-emerald-600 hover:underline">
              View All ({myAssigned.length}) →
            </Link>
          </div>

          <div className="space-y-4">
            {myAssigned.map((item) => (
              <Card key={item.id} className="p-5 border-slate-200" hover>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.companyName}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{item.projectTitle}</h4>
                  </div>
                  <Badge variant={item.workStatus === 'Submitted' ? 'blue' : 'green'}>
                    {item.workStatus}
                  </Badge>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" /> Deadline: {item.deadline}
                  </span>
                  <span className="font-bold text-emerald-700">₹{item.totalAmount.toLocaleString()}</span>
                  <Link to="/teen/tasks">
                    <Button variant="outline" size="sm" className="text-xs">
                      Submit Work
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Skill Progress & Gamification */}
          <Card className="p-6 border-slate-200 bg-gradient-to-br from-indigo-500/5 to-emerald-500/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">Skill Growth & Badges</h4>
                <p className="text-xs text-slate-500">Earn 250 more points to level up to "Master Teenlancer"</p>
              </div>
              <Badge variant="indigo">{teenProfile?.badgeLevel || 'Pro Teenlancer'}</Badge>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-4">
              <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '83%' }} />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-amber-500 font-bold block">★ 4.9</span>
                <span className="text-[11px] text-slate-500">Rating</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-indigo-600 font-bold block">1,250</span>
                <span className="text-[11px] text-slate-500">XP Points</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200/80">
                <span className="text-emerald-600 font-bold block">8 Badges</span>
                <span className="text-[11px] text-slate-500">Earned</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Col: Smart Project Recommendations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Recommended for You</h3>
            </div>
            <Link to="/teen/explore" className="text-xs font-bold text-emerald-600 hover:underline">
              Explore All →
            </Link>
          </div>

          <div className="space-y-4">
            {recommendedProjects.map((p) => (
              <Card key={p.id} className="p-4 border-slate-200" hover>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="indigo" size="sm">{p.category}</Badge>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {p.matchScore}% Match
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{p.title}</h4>
                <p className="text-xs text-slate-500 mb-3">{p.companyName}</p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-extrabold text-slate-900">₹{p.stipendAmount.toLocaleString()}</span>
                  <Link to={`/teen/projects/${p.id}`}>
                    <Button variant="primary" size="sm" className="text-xs py-1">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Learning Suggestion */}
          <Card className="p-5 border-slate-200 bg-slate-900 text-white">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-2">
              <BookOpen className="w-4 h-4" /> Next Skill Tip
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Learn Tailwind CSS animations</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Companies are currently offering 25% higher stipends for responsive front-end projects with micro-animations.
            </p>
            <Link to="/teen/explore?category=Web%20Development">
              <span className="text-xs font-bold text-emerald-400 hover:underline">
                View 48+ Web Dev Openings →
              </span>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};
